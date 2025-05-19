from fastapi import APIRouter, UploadFile, File
from fastapi.responses import JSONResponse
import base64
import json
from mistralai import Mistral
from services.ocr_service import encode_image_to_base64, extract_structured_data
import os

api_key = os.getenv("MISTRAL_API_KEY")

router = APIRouter()

@router.post("/handle_bill")
async def handle_bill(file: UploadFile = File(...)):
    try:
        # Ensure it's an image
        if not file.content_type.startswith("image/"):
            return JSONResponse(content={"status": "not okay", "reason": "Not an image"}, status_code=400)


        # Encode image as base64 for API
        contents = await file.read()
        encoded_image = encode_image_to_base64(contents)

        client = Mistral(api_key=api_key)

        structured_response = extract_structured_data(client, encoded_image)
        # Parse and return JSON response
        response_dict = json.loads(structured_response.model_dump_json())
        print(json.dumps(response_dict, indent=4))

        return JSONResponse(content={"status": "okay", "data": response_dict}, status_code=200)

    except Exception as e:
        return JSONResponse(content={"status": "not okay", "reason": str(e)}, status_code=400)
