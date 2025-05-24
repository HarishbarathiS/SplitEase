from fastapi import APIRouter
from services.room_service import get_room_by_id, create_room_in_db, check_room_in_db
router = APIRouter()


@router.get("/room/{room_id}")
async def get_room(room_id: int):
    try:
        room = get_room_by_id(room_id)
        if not room:
            return {"status": "not okay", "reason": "Room not found"}
        return {"status": "okay", "data": room}
    except Exception as e:
        return {"status": "not okay", "reason": str(e)}

@router.post("/api/create_room")
async def create_room(room: dict):
    try:
        # print(room)
        # Assuming you have a function to create a room
        new_room = create_room_in_db(room)  # Replace with your actual function
        return {"status": "okay", "data": new_room}
    except Exception as e:
        return {"status": "not okay", "reason": str(e)}
    
@router.post("/api/check_room")
async def check_room(data : dict):
    try:
        room_id = data.get("roomId")
        room = check_room_in_db(room_id)
        if room["status"] == "reject":
            return {"status": "reject"}
        return {"status": "success"}
    except Exception as e:
        return {"status": "reject"}