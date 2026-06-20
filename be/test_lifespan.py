import asyncio
from fastapi import FastAPI
from main import app, lifespan

async def test():
    async with lifespan(app):
        pass

if __name__ == "__main__":
    asyncio.run(test())
