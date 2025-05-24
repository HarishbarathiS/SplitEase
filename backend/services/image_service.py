from supabase_client import supabase

def save_bill_image_to_db(file, contents):
    file_path = f"bills/{file.filename}"
    supabase.storage.from_("bills").upload(file_path, contents)

    public_url = supabase.storage.from_("bills").get_public_url(file_path)
    print(public_url)