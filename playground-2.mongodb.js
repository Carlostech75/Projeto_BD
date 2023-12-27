// Collection for Component Purchasing Management
db.createCollection("components");

// Inserting a new supplier
db.suppliers.insert({
  name: "Supplier A",
  contact_person: "John Doe",
  email: "suppliera@example.com",
  phone_number: "123-456-7890",
  // Other supplier details
});

// Inserting a new component
db.components.insert({
  name: "Component A",
  description: "High-performance CPU",
  acquisition_date: ISODate("2023-01-01"),
  armament_date: ISODate("2023-01-05"),
  stock_quantity: 100,
  supplier: ObjectId("supplier_id"), // Reference to the supplier
  // Other relevant fields
});

// Collection for Equipment Management
db.createCollection("equipment");

// Inserting a new equipment
db.equipment.insert({
  type: "Laptop",
  production_date: ISODate("2023-02-01"),
  cost_value: 800.00,
  component: ObjectId("component_id"), // Reference to the component
  is_assembled: true,
  // Other relevant fields
});

// Collection for Equipment Attributes
db.createCollection("equipment_attributes");

// Inserting a new equipment attribute
db.equipment_attributes.insert({
  name: "Weight",
  // Other attribute details
});

// Collection for Equipment Attribute Values
db.createCollection("equipment_attribute_values");

// Inserting a new equipment attribute value
db.equipment_attribute_values.insert({
  equipment: ObjectId("equipment_id"), // Reference to the equipment
  attribute: ObjectId("attribute_id"), // Reference to the attribute
  value: "2.5 kg",
  // Other details
});

// Collection for Component Reviews
db.createCollection("component_reviews");

// Inserting a new component review
db.component_reviews.insert({
  component: ObjectId("component_id"), // Reference to the component
  review_text: "Excellent performance and durability.",
  rating: 4.8,
  reviewer: "User123",
  // Other details
});

// Collection for Management of Equipment Sales
db.createCollection("clients");

// Inserting a new client
db.clients.insert({
  name: "Client X",
  email: "clientx@example.com",
  // Other client details
});

// Inserting a new equipment sale
db.equipment_sales.insert({
  equipment: ObjectId("equipment_id"), // Reference to the equipment
  client: ObjectId("client_id"), // Reference to the client
  sale_date: ISODate("2023-02-15"),
  // Other sale details
});

// Query to retrieve components in stock
db.components.find({ stock_quantity: { $gt: 0 } });

// Query to retrieve equipment production details with attributes
db.equipment.aggregate([
  {
    $lookup: {
      from: "components",
      localField: "component",
      foreignField: "_id",
      as: "component_info",
    },
  },
  {
    $unwind: "$component_info",
  },
  {
    $lookup: {
      from: "equipment_attribute_values",
      localField: "_id",
      foreignField: "equipment",
      as: "attribute_values",
    },
  },
]);

// Update stock quantity of a component
db.components.update({ _id: ObjectId("component_id") }, { $inc: { stock_quantity: -10 } });

// Delete a client and associated equipment sale
db.clients.remove({ _id: ObjectId("client_id") });
db.equipment_sales.remove({ client: ObjectId("client_id") });

// Query to retrieve average rating for a component
db.component_reviews.aggregate([
  {
    $match: { component: ObjectId("component_id") },
  },
  {
    $group: {
      _id: "$component",
      average_rating: { $avg: "$rating" },
    },
  },
]);

// Query to find clients who made multiple purchases
db.equipment_sales.aggregate([
  {
    $group: {
      _id: "$client",
      total_purchases: { $sum: 1 },
    },
  },
  {
    $match: { total_purchases: { $gt: 1 } },
  },
]);

// Query to find the most popular equipment type
db.equipment.aggregate([
  {
    $group: {
      _id: "$type",
      count: { $sum: 1 },
    },
  },
  {
    $sort: { count: -1 },
  },
  {
    $limit: 1,
  },
]);
