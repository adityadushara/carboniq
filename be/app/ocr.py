import google.generativeai as genai
from pydantic import BaseModel
from typing import Optional
import json
from tenacity import retry, stop_after_attempt, wait_exponential
from config import settings, logger

# Configure Gemini
api_key = settings.gemini_api_key
if api_key:
    genai.configure(api_key=api_key)

# Move prompt to system_instruction for prompt injection defense
system_instruction = """
You are an AI that strictly extracts carbon footprint data from receipts and utility bills.
Analyze the provided image and extract:
1. The type of activity ("transport" for gas/fuel receipts, "electricity" for power bills, "food" for groceries/restaurants).
2. The primary quantity that implies emissions. 
   - For gas/fuel: extract the total gallons or liters of fuel purchased. If not available, extract the total cost in USD.
   - For electricity: extract the total kWh used.
   - For food: extract the total cost in USD.
3. The unit of that quantity (e.g. "gallons", "liters", "kWh", "USD").
4. A brief description (e.g. "Shell Gas Station", "PG&E Electricity Bill").

Return the data strictly in the following JSON schema:
{
    "activity_type": "transport" | "electricity" | "food",
    "quantity": float,
    "unit": "string",
    "description": "string"
}
"""

generation_config = {
  "temperature": 0.1,
  "top_p": 0.95,
  "top_k": 40,
  "max_output_tokens": 8192,
  "response_mime_type": "application/json",
}

model = genai.GenerativeModel(
  model_name="gemini-2.5-flash",
  generation_config=generation_config,
  system_instruction=system_instruction
)

class OCRExtractionResult(BaseModel):
    activity_type: str # "transport", "food", or "electricity"
    quantity: float
    unit: str # e.g. "gallons", "kWh", "USD"
    description: str

def analyze_receipt(image_bytes: bytes, mime_type: str) -> Optional[OCRExtractionResult]:
    try:
        if not api_key:
            raise ValueError("GEMINI_API_KEY is not set")

        image_part = {
            "mime_type": mime_type,
            "data": image_bytes
        }

        @retry(stop=stop_after_attempt(3), wait=wait_exponential(multiplier=1, min=2, max=10), reraise=True)
        def _call_gemini():
            # Pass only the image, system_instruction handles the logic
            return model.generate_content([image_part])

        response = _call_gemini()
        result_json = json.loads(response.text)
        
        return OCRExtractionResult(**result_json)
    except Exception as e:
        logger.error(f"OCR Error: {e}")
        return None
