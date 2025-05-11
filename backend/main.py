from typing import Union
from fastapi import FastAPI, UploadFile, File
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from PIL import Image
import io
import base64
from mistralai import Mistral
from mistralai import DocumentURLChunk, ImageURLChunk, TextChunk
import json
from pydantic import BaseModel

api_key = "UFcjdPEUcb2vujouTVDxOkyJ3DJMmyFK"

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class StructuredOCR(BaseModel):
    file_name: str
    topics: list[str]
    languages: str
    ocr_contents: dict

@app.post("/handle_bill")
async def handle_bill(file: UploadFile = File(...)):
    try:
        # Ensure it's an image
        if not file.content_type.startswith("image/"):
            return JSONResponse(content={"status": "not okay", "reason": "Not an image"}, status_code=400)

        client = Mistral(api_key=api_key)

        # Encode image as base64 for API
        contents = await file.read()
        encoded = base64.b64encode(contents).decode()
        base64_data_url = f"data:image/jpeg;base64,{encoded}"

        # Process image with OCR
        image_response = client.ocr.process(
            document=ImageURLChunk(image_url=base64_data_url),
            model="mistral-ocr-latest"
        )

        image_ocr_markdown = image_response.pages[0].markdown

    # Parse the OCR result into a structured JSON response
        chat_response = client.chat.parse(
            model="pixtral-12b-latest",
            messages=[
                {
                    "role": "user",
                    "content": [
                        ImageURLChunk(image_url=base64_data_url),
                        TextChunk(text=(
                            f"This is the image's OCR in markdown:\n{image_ocr_markdown}\n.\n"
                            "Convert this into a structured JSON response "
                            "with the OCR contents in a sensible dictionnary."
                            )
                        )
                    ]
                }
            ],
            response_format=StructuredOCR,
            temperature=0
        )

        structured_response = chat_response.choices[0].message.parsed
        # Parse and return JSON response
        response_dict = json.loads(structured_response.model_dump_json())
        print(json.dumps(response_dict, indent=4))

        return JSONResponse(content={"status": "okay", "data": response_dict}, status_code=200)

    except Exception as e:
        return JSONResponse(content={"status": "not okay", "reason": str(e)}, status_code=400)


@app.get("/items/{item_id}")
def read_item(item_id: int, q: Union[str, None] = None):
    return {"item_id": item_id, "q": q}