import base64
import models.ocr_model as StructuredOCR
from mistralai import Mistral
from mistralai import ImageURLChunk, TextChunk

def encode_image_to_base64(contents : bytes) -> str:
    encoded = base64.b64encode(contents).decode()
    return f"data:image/jpeg;base64,{encoded}"

def extract_structured_data(client, base64_data_url: str, ) -> dict:

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
                        "   - `currency`: Currency type:\n"
                        "   - `items`: A list of products, each with:\n"
                        "     - `product_name`: The name of the product.\n"
                        "     - `price`: The price of that product.\n"
                        "   - `sgst`: The SGST value, if present.\n"
                        "   - `cgst`: The CGST value, if present.\n"
                        "   - `other_tax`: The service charge or other tax, if present.\n"
                        "   - `total`: The total billed amount **before tax**.\n"
                        "   - `net_total`: The total billed amount **after tax** (i.e., total + sgst + cgst + service_charge).\n\n"
                        "Return the result as structured JSON only. Do not include any explanations or text outside the JSON."

                    )),
        
                ]
            }
        ],
        response_format=StructuredOCR,
        temperature=0
    )

    return chat_response.choices[0].message.parsed
