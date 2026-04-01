from typing import List, Dict, Any

def allocate_workers(tasks: List[Any], workers: List[Any]) -> List[Dict[str, Any]]:
    """
    Simple rule-based worker allocation algorithm.
    """
    allocations = []
    
    # Group workers by skill
    workers_by_skill = {}
    for worker in workers:
        if not worker.availability:
            continue
        skill = worker.skill_type
        if skill not in workers_by_skill:
            workers_by_skill[skill] = []
        workers_by_skill[skill].append(worker)
    
    # Sort tasks by priority (higher first) and duration (longer first)
    sorted_tasks = sorted(tasks, key=lambda x: (x.priority, x.estimated_duration), reverse=True)
    
    worker_assignments = {w.id: [] for w in workers} # Track assignments per worker

    for task in sorted_tasks:
        required_skill = task.skill_required
        available_workers = workers_by_skill.get(required_skill, [])
        
        # Find best worker (least loaded)
        best_worker = None
        min_load = float('inf')
        
        for worker in available_workers:
            current_load = len(worker_assignments[worker.id])
            if current_load < min_load:
                min_load = current_load
                best_worker = worker
        
        if best_worker:
            allocations.append({
                "task_id": task.id,
                "worker_id": best_worker.id,
                "worker_name": best_worker.name,
                "task_name": task.name,
                "reason": f"Matched skill {required_skill} and balanced workload."
            })
            worker_assignments[best_worker.id].append(task.id)
        else:
            allocations.append({
                "task_id": task.id,
                "worker_id": None,
                "worker_name": "Unassigned",
                "task_name": task.name,
                "reason": f"No available workers with skill {required_skill}."
            })
            
    return allocations
