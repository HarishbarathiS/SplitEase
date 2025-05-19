# services/user_service.py
from supabase_client import supabase

def get_room_by_id(room_id):
    response = supabase.table("Rooms").select("*").eq("roomId", room_id).single().execute()

    # Check if data is None
    if response.data is None:
        raise Exception("No data found or room does not exist")
    return response.data

def create_room_in_db(room):
    response = (supabase.table("Rooms").insert(room).execute())
    if not response.data:
        raise Exception("Room creation failed")
    return response.data

def check_room_in_db(room_id):
    response = supabase.table("Rooms").select("*").eq("roomId", room_id).single().execute()
    if not response.data:
        return {"status": "reject"}
    return {"status": "accept"}