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



class Item(BaseModel):
    product_name: str
    price: float

class OCRContents(BaseModel):
    shop_name: str
    items: list[Item]
    sgst: float
    cgst: float
    total: float

class StructuredOCR(BaseModel):
    file_name: str
    topics: list[str]
    languages: str
    ocr_contents: OCRContents


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
                            f"This is the OCR result from a bill image:\n\n{image_ocr_markdown}\n\n"
                            "From this, extract and return a structured JSON object with the following fields:\n\n"
                            "1. `file_name`: The name of the uploaded file.\n"
                            "2. `languages`: The language(s) used in the bill.\n"
                            "3. `topics`: Any relevant tags or categories about the contents.\n"
                            "4. `ocr_contents`: An object containing:\n"
                            "   - `shop_name`: The name of the shop or merchant.\n"
                            "   - `items`: A list of products, each with:\n"
                            "     - `product_name`: The name of the product.\n"
                            "     - `price`: The price of that product.\n"
                            "   - `sgst`: The SGST tax value in the bill.\n"
                            "   - `cgst`: The CGST tax value in the bill.\n"
                            "   - `total`: The total billed amount (after tax).\n\n"
                            "Ensure keys are named exactly as above. Return only the structured JSON — do not include any explanations or extra text."
                        )),
            
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