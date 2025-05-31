import json
import requests

with open("products_shoes.json", "r", encoding="utf-8") as f:
    products = json.load(f)
    print(f"Loaded {len(products)} products from JSON file.")

url = "http://localhost:8000/product"

for product in products:
    response = requests.post(url, json=product)
    if response.status_code == 200:
        print(f"✅ Product '{product['product_name']}' created.")
    else:
        print(f"❌ Failed to create '{product['product_name']}': {response.json()}")