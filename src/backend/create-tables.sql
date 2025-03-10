CREATE TABLE Account (
    account_id SERIAL PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    dob DATE NOT NULL,
    role VARCHAR(255) NOT NULL,
    phone_number VARCHAR(255) NOT NULL,
    address VARCHAR(255) NOT NULL,
    sex VARCHAR(255) NOT NULL,
);

CREATE TABLE Category (
    category_id SERIAL PRIMARY KEY,
    category_name VARCHAR(255) NOT NULL,
);

CREATE TABLE Size (
    size_id SERIAL PRIMARY KEY,
    size_name VARCHAR(255) NOT NULL,
);

CREATE TABLE Product (
    product_id SERIAL PRIMARY KEY,
    product_name VARCHAR(255) NOT NULL,
    brand VARCHAR(255) NOT NULL,
    remaining INT NOT NULL,
    price DECIMAL NOT NULL,
    description TEXT NOT NULL,
    category_id INT NOT NULL,
    size_id INT NOT NULL,
    FOREIGN KEY (category_id) REFERENCES Category(category_id),
    FOREIGN KEY (size_id) REFERENCES Size(size_id),
);

CREATE TABLE Cart (
    cart_id SERIAL PRIMARY KEY,
    product_id INT NOT NULL,
    quantity INT NOT NULL,
    FOREIGN KEY (account_id) REFERENCES Account(account_id),
    FOREIGN KEY (product_id) REFERENCES Product(product_id),
);

CREATE TABLE Order (
    order_id SERIAL PRIMARY KEY,
    cart_id INT NOT NULL,
    order_time TIMESTAMP NOT NULL,
    FOREIGN KEY (cart_id) REFERENCES Cart(cart_id),
);
