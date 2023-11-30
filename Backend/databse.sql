CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    name VARCHAR(50),
    email VARCHAR(300),
    gender VARCHAR(30),
    mob_no INTEGER,
    birth_date VARCHAR(50),
    address VARCHAR(100),
    pin_code INTEGER,
    city VARCHAR(50),
    password VARCHAR(50)
);

CREATE TABLE main_category(
    id SERIAL PRIMARY KEY,
    title VARCHAR(30),
    image_url VARCHAR(255) 
);

CREATE TABLE sub_category(
    id SERIAL PRIMARY KEY,
    title VARCHAR(30),
    main_category_id INTEGER 
);

CREATE TABLE sub_category (
    id SERIAL PRIMARY KEY,
    title varchar(50),
    main_category_id int,
    CONSTRAINT fk_subCat_mainCat FOREIGN KEY(main_category_id) REFERENCES main_category(id)
);

CREATE TABLE products (
    id SERIAL PRIMARY KEY,
	title varchar(50),
    description varchar(100),
    main_category_id int,
    CONSTRAINT fk_prod_mainCat FOREIGN KEY(main_category_id) REFERENCES main_category(id),
    sub_category_id int,
    CONSTRAINT fk_prod_subCat FOREIGN KEY(sub_category_id) REFERENCES sub_category(id),
    status boolean DEFAULT TRUE NOT NULL;
);

CREATE TABLE product_images(
    id SERIAL PRIMARY KEY,
    image_url VARCHAR(255) NOT NULL,
    alternate_text VARCHAR(100) not NULL,
    is_primary_image BOOLEAN NOT NULL,
    product_id INT,
    CONSTRAINT fk_prodImg_products FOREIGN KEY(product_id) REFERENCES products(id)
);

CREATE TABLE product_price(
    id SERIAL PRIMARY KEY,
    product_id INT,
    CONSTRAINT fk_prodPrice_products FOREIGN KEY(product_id) REFERENCES products(id),
    price DECIMAL(10,2) NOT NULL,
    from_date  DATE NOT NULL,
    to_date DATE NOT NULL,
    added_on DATE NOT NULL 
);

CREATE TABLE orders(
    id SERIAL PRIMARY KEY,
    user_id INT,
    CONSTRAINT fk_orders_users FOREIGN KEY(user_id) REFERENCES users(id),
    date_time DATE NOT NULL,
    shipping_address VARCHAR(100)  NOT NULL,
    shipping_pin INT NOT NULL,
    shipping_city VARCHAR(30) NOT NULL,
    shipping_status INT NOT NULL
);


CREATE TABLE order_details(
    id SERIAL PRIMARY KEY,
    order_id INT,
    CONSTRAINT fk_orderDetails_orders FOREIGN KEY(order_id) REFERENCES orders(id),
    product_id INT,
    CONSTRAINT fk_orderDetails_products FOREIGN KEY(product_id) REFERENCES products(id),
    product_quantity INT NOT NULL,
    product_status BOOLEAN NOT NULL
);

CREATE TABLE discount(
    id SERIAL PRIMARY KEY,
    discount_percentage INT NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    price_id INT,
    CONSTRAINT fk_discount_prodPrice FOREIGN KEY(price_id) REFERENCES product_price(id) 
);