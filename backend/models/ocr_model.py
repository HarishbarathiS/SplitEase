from pydantic import BaseModel

class Item(BaseModel):
    product_name: str
    price: float

class OCRContents(BaseModel):
    shop_name: str
    currency: str
    items: list[Item]
    sgst: float
    cgst: float
    other_tax: float
    total: float
    net_total: float

class StructuredOCR(BaseModel):
    file_name: str
    topics: list[str]
    languages: str
    ocr_contents: OCRContents
