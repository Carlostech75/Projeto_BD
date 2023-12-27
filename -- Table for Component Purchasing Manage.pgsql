-- Table for Component Purchasing Management
CREATE TABLE components (
    component_id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    acquisition_date DATE,
    armament_date DATE,
    stock_quantity INT,
    -- Other relevant fields

    -- Foreign key to link components to suppliers
    supplier_id INT REFERENCES suppliers(supplier_id)
);

CREATE TABLE suppliers (
    supplier_id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    -- Other supplier details
);

-- Table for Equipment Management
CREATE TABLE equipment (
    equipment_id SERIAL PRIMARY KEY,
    type VARCHAR(255) NOT NULL,
    production_date DATE,
    cost_value DECIMAL,
    -- Other relevant fields

    -- Foreign key to link equipment to components
    component_id INT REFERENCES components(component_id)
);

-- Table for Management of Equipment Sales
CREATE TABLE clients (
    client_id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    -- Other client details
);

CREATE TABLE equipment_sales (
    sale_id SERIAL PRIMARY KEY,
    equipment_id INT REFERENCES equipment(equipment_id),
    client_id INT REFERENCES clients(client_id),
    sale_date DATE,
    -- Other sale details
);

-- Inserting a new supplier
INSERT INTO suppliers (name) VALUES ('Supplier A');

-- Inserting a new component
INSERT INTO components (name, acquisition_date, armament_date, stock_quantity, supplier_id)
VALUES ('Component A', '2023-01-01', '2023-01-05', 100, 1);

-- Inserting a new equipment
INSERT INTO equipment (type, production_date, cost_value, component_id)
VALUES ('Laptop', '2023-02-01', 800.00, 1);

-- Inserting a new client
INSERT INTO clients (name) VALUES ('Client X');

-- Inserting a new equipment sale
INSERT INTO equipment_sales (equipment_id, client_id, sale_date)
VALUES (1, 1, '2023-02-15');

-- Query to retrieve components in stock
SELECT * FROM components WHERE stock_quantity > 0;

-- Query to retrieve equipment production details
SELECT e.*, c.name AS component_name
FROM equipment e
JOIN components c ON e.component_id = c.component_id;

-- Update stock quantity of a component
UPDATE components SET stock_quantity = stock_quantity - 10 WHERE component_id = 1;

-- Delete a client and associated equipment sale
DELETE FROM clients WHERE client_id = 1;
