from fastapi import APIRouter, Depends, Request
from fastapi.concurrency import run_in_threadpool
from app.auth import get_current_user
from app.coach import ChatRequest, generate_coach_response

router = APIRouter(prefix="/api/coach", tags=["Coach"])

@router.post("/chat")
async def coach_chat(request: Request, body: ChatRequest, user = Depends(get_current_user)):
    response_text = await run_in_threadpool(generate_coach_response, body)
    return {"response": response_text}

@router.get("/weekly-plan")
async def weekly_plan(request: Request, user = Depends(get_current_user)):
    prompt = ChatRequest(message="Generate a concise, 3-point weekly action plan for me to reduce my carbon footprint. Format as a bulleted list.", history=[])
    response_text = await run_in_threadpool(generate_coach_response, prompt)
    return {"plan": response_text}
