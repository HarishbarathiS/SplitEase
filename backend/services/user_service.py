# services/user_service.py
from supabase_client import supabase

def get_user_by_id(user_id):
    response = supabase.table("users").select("*").eq("id", user_id).single().execute()
    if response.error:
        raise Exception(response.error.message)
    return response.data
