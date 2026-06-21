from fastapi import APIRouter, Depends, HTTPException, UploadFile, File, Request
from fastapi.concurrency import run_in_threadpool
from auth import get_current_user
from ocr import analyze_receipt

router = APIRouter(prefix="/api/ocr", tags=["OCR"])

@router.post("/scan")
async def scan_receipt(request: Request, file: UploadFile = File(...), user = Depends(get_current_user)):
    contents = await file.read()
    result = await run_in_threadpool(analyze_receipt, contents, file.content_type)
    
    if not result:
        raise HTTPException(status_code=400, detail="Could not extract data from the image")
        
    return result
