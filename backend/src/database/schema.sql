-- AB ENTERPRISES PRIVATE LIMITED — MySQL schema
-- Safe to run repeatedly (uses IF NOT EXISTS / INSERT ... ON DUPLICATE KEY in seeds).

CREATE DATABASE IF NOT EXISTS ab_enterprises
  CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

USE ab_enterprises;

CREATE TABLE IF NOT EXISTS roles (
  id          INT UNSIGNED NOT NULL AUTO_INCREMENT,
  name        VARCHAR(50)  NOT NULL,
  PRIMARY KEY (id),
  UNIQUE KEY uq_roles_name (name)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS users (
  id            INT UNSIGNED NOT NULL AUTO_INCREMENT,
  name          VARCHAR(120) NOT NULL,
  email         VARCHAR(190) NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  role_id       INT UNSIGNED NOT NULL,
  status        ENUM('active','disabled') NOT NULL DEFAULT 'active',
  created_at    TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at    TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY uq_users_email (email),
  KEY idx_users_role (role_id),
  CONSTRAINT fk_users_role FOREIGN KEY (role_id) REFERENCES roles (id)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS service_categories (
  id          INT UNSIGNED NOT NULL AUTO_INCREMENT,
  name        VARCHAR(120) NOT NULL,
  slug        VARCHAR(140) NOT NULL,
  description TEXT,
  icon        VARCHAR(80),
  sort_order  INT NOT NULL DEFAULT 0,
  status      ENUM('published','draft') NOT NULL DEFAULT 'published',
  created_at  TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at  TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY uq_service_categories_slug (slug)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS services (
  id           INT UNSIGNED NOT NULL AUTO_INCREMENT,
  category_id  INT UNSIGNED NOT NULL,
  name         VARCHAR(160) NOT NULL,
  slug         VARCHAR(180) NOT NULL,
  short_description VARCHAR(255),
  description  TEXT,
  image_url    VARCHAR(500),
  icon         VARCHAR(80),
  status       ENUM('published','draft') NOT NULL DEFAULT 'published',
  created_at   TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at   TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY uq_services_slug (slug),
  KEY idx_services_category (category_id),
  KEY idx_services_status (status),
  FULLTEXT KEY ft_services (name, short_description, description),
  CONSTRAINT fk_services_category FOREIGN KEY (category_id) REFERENCES service_categories (id)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS product_categories (
  id          INT UNSIGNED NOT NULL AUTO_INCREMENT,
  name        VARCHAR(120) NOT NULL,
  slug        VARCHAR(140) NOT NULL,
  description TEXT,
  image_url   VARCHAR(500),
  icon        VARCHAR(80),
  sort_order  INT NOT NULL DEFAULT 0,
  status      ENUM('published','draft') NOT NULL DEFAULT 'published',
  created_at  TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at  TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY uq_product_categories_slug (slug)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS products (
  id           INT UNSIGNED NOT NULL AUTO_INCREMENT,
  category_id  INT UNSIGNED NOT NULL,
  name         VARCHAR(160) NOT NULL,
  slug         VARCHAR(180) NOT NULL,
  brand        VARCHAR(120),
  short_description VARCHAR(255),
  description  TEXT,
  price        DECIMAL(12,2) NULL,
  image_url    VARCHAR(500),
  status       ENUM('published','draft') NOT NULL DEFAULT 'published',
  created_at   TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at   TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY uq_products_slug (slug),
  KEY idx_products_category (category_id),
  KEY idx_products_status (status),
  FULLTEXT KEY ft_products (name, brand, short_description, description),
  CONSTRAINT fk_products_category FOREIGN KEY (category_id) REFERENCES product_categories (id)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS industries (
  id          INT UNSIGNED NOT NULL AUTO_INCREMENT,
  name        VARCHAR(120) NOT NULL,
  slug        VARCHAR(140) NOT NULL,
  description TEXT,
  image_url   VARCHAR(500),
  icon        VARCHAR(80),
  sort_order  INT NOT NULL DEFAULT 0,
  status      ENUM('published','draft') NOT NULL DEFAULT 'published',
  created_at  TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at  TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY uq_industries_slug (slug)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS enquiries (
  id            INT UNSIGNED NOT NULL AUTO_INCREMENT,
  type          ENUM('contact','quote','amc') NOT NULL DEFAULT 'contact',
  name          VARCHAR(120) NOT NULL,
  email         VARCHAR(190) NOT NULL,
  phone         VARCHAR(20)  NOT NULL,
  company       VARCHAR(160),
  subject       VARCHAR(160),
  message       TEXT NOT NULL,
  status        ENUM('new','in_progress','resolved','closed') NOT NULL DEFAULT 'new',
  ip_address    VARCHAR(45),
  created_at    TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at    TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  KEY idx_enquiries_status (status),
  KEY idx_enquiries_type (type),
  KEY idx_enquiries_created (created_at)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS enquiry_items (
  id           INT UNSIGNED NOT NULL AUTO_INCREMENT,
  enquiry_id   INT UNSIGNED NOT NULL,
  item_type    ENUM('service','product') NOT NULL,
  item_id      INT UNSIGNED NOT NULL,
  quantity     INT UNSIGNED NOT NULL DEFAULT 1,
  created_at   TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  KEY idx_enquiry_items_enquiry (enquiry_id),
  CONSTRAINT fk_enquiry_items_enquiry FOREIGN KEY (enquiry_id)
    REFERENCES enquiries (id) ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS articles (
  id           INT UNSIGNED NOT NULL AUTO_INCREMENT,
  title        VARCHAR(200) NOT NULL,
  slug         VARCHAR(220) NOT NULL,
  category     VARCHAR(80),
  excerpt      VARCHAR(300),
  content      TEXT,
  image_url    VARCHAR(500),
  author       VARCHAR(120),
  published_at DATETIME NULL,
  status       ENUM('published','draft') NOT NULL DEFAULT 'draft',
  created_at   TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at   TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY uq_articles_slug (slug),
  KEY idx_articles_status (status, published_at)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS testimonials (
  id           INT UNSIGNED NOT NULL AUTO_INCREMENT,
  customer_name VARCHAR(120) NOT NULL,
  organization  VARCHAR(160),
  quote        TEXT NOT NULL,
  rating       TINYINT UNSIGNED,
  is_sample    TINYINT(1) NOT NULL DEFAULT 1,
  status       ENUM('published','draft') NOT NULL DEFAULT 'draft',
  created_at   TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at   TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS site_settings (
  `key`       VARCHAR(80) NOT NULL,
  `value`     TEXT,
  updated_at  TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`key`)
) ENGINE=InnoDB;
