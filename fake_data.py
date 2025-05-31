import json
import random
from datetime import datetime, timedelta

brands = ["Nike", "Adidas", "Puma", "Gucci", "Mira"]
categories = ["nam", "nữ"]
categories2 = ["giày chạy", "giày bóng đá", "giày bóng rổ", "giày thời trang"]
shoe_sizes = [size for size in range(30, 46)]  # EU sizes from 36 to 45
image_links = [
    "https://res.cloudinary.com/dddsn07b9/image/upload/v1742865771/v1aibhdd7246kxaeqjqv.webp",
    "https://res.cloudinary.com/dddsn07b9/image/upload/v1742861414/shoes.jpg",
    "https://res.cloudinary.com/dddsn07b9/image/upload/v1742734973/cld-sample-5.jpg",
    "https://res.cloudinary.com/dddsn07b9/image/upload/v1742957879/neklnpe27t9t2h0di2qx.webp",
    "https://res.cloudinary.com/dddsn07b9/image/upload/v1742957814/j8m5m1xx5mevl9quavjr.webp"
]

product_data = []

for i in range(1, 201):
    brand = random.choice(brands)
    
    # Categories
    category_selection = random.sample(categories, k=random.randint(1, 2))
    category_selection2 = random.sample(categories2, k=random.randint(1, len(categories2)))
    all_categories = category_selection + category_selection2
    
    if random.random() < 0.5:
        all_categories.append("người lớn")
    if random.random() < 0.5:
        all_categories.append("trẻ em")

    # Sizes
    min_size = 0
    max_size = 0
    while max_size <= min_size:
        min_size = random.choice(range(30, 45))
        max_size = random.choice(range(30, 45))
    product_sizes = [size for size in range(min_size, max_size + 1)]

    product = {
        "product_name": f"Product {i}",
        "img_url": random.choice(image_links),
        "description": f"Description for Product {i}",
        "brand": brand,
        "discount": round(random.uniform(0, 0.9), 2),
        "start_date": (datetime.now() - timedelta(days=random.randint(0, 30))).isoformat(),
        "end_date": (datetime.now() + timedelta(days=random.randint(1, 30))).isoformat(),
        "price": random.randint(100, 5000) * 1000,
        "remaining": random.randint(0, 1000),
        "category": all_categories,
        "promotion": [],
        "size": product_sizes
    }

    product_data.append(product)


with open("products_shoes.json", "w", encoding="utf-8") as f:
    json.dump(product_data, f, indent=4, ensure_ascii=False)

print("products_shoes.json file with shoe sizes, random categories, and empty promotion list generated.")
