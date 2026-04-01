from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List, Optional
from agents.worker_allocator import allocate_workers

app = FastAPI()

class Task(BaseModel):
    id: int
    name: str
    skill_required: str
    estimated_duration: int # days
    priority: int = 1

class Worker(BaseModel):
    id: int
    name: str
    skill_type: str
    daily_capacity: int # hours
    availability: bool

class AllocationRequest(BaseModel):
    tasks: List[Task]
    workers: List[Worker]

@app.post("/allocate-workers")
async def allocate_workers_endpoint(request: AllocationRequest):
    try:
        allocations = allocate_workers(request.tasks, request.workers)
        return {"allocations": allocations}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/health")
async def health_check():
    return {"status": "ok"}
