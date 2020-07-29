-- CREATE DATABASE "product";

-- DROP TABLE IF EXISTS product;

CREATE TABLE product (
  id INTEGER PRIMARY KEY,
  name VARCHAR(100),
  slogan VARCHAR(150),
  description VARCHAR(450),
  category VARCHAR(80),
  default_price VARCHAR(80)
);

-- DROP TABLE IF EXISTS `styles`;

CREATE TABLE styles (
  style_id INTEGER PRIMARY KEY,
  productId INTEGER,
  name VARCHAR(150),
  sale_price VARCHAR(10),
  original_price VARCHAR(10),
  "default?" INTEGER
);

-- DROP TABLE IF EXISTS `related products`;

CREATE TABLE related_products (
  id INTEGER PRIMARY KEY,
  current_product_id INTEGER,
  related_product_id INTEGER
);

-- DROP TABLE IF EXISTS `features`;

CREATE TABLE features (
  id INTEGER PRIMARY KEY,
  productId INTEGER,
  feature VARCHAR(50),
  value VARCHAR(50)
);

-- DROP TABLE IF EXISTS `skus`;

CREATE TABLE skus (
  id INTEGER PRIMARY KEY,
  styleId INTEGER,
  size VARCHAR(20),
  quantity INTEGER
);

-- DROP TABLE IF EXISTS `photos`;

CREATE TABLE photos (
  id INTEGER PRIMARY KEY,
  styleId INTEGER,
  url VARCHAR,
  thumbnail_url VARCHAR
);

-- ---
-- Foreign Keys
-- ---

-- ALTER TABLE `styles` ADD FOREIGN KEY (productId) REFERENCES `product` (`id`);
-- ALTER TABLE `related products` ADD FOREIGN KEY (current_product_id) REFERENCES `product` (`id`);
-- ALTER TABLE `related products` ADD FOREIGN KEY (related_product_id) REFERENCES `product` (`id`);
-- ALTER TABLE `features` ADD FOREIGN KEY (productId) REFERENCES `product` (`id`);
-- ALTER TABLE `skus` ADD FOREIGN KEY (style_id_styles) REFERENCES `styles` (`style_id`);
-- ALTER TABLE `photos` ADD FOREIGN KEY (style_id_styles) REFERENCES `styles` (`style_id`);

