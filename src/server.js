const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const mysql = require('mysql2'); // MySQL database package
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

dotenv.config();
const app = express();
const port = process.env.PORT || 5000;

// Parse incoming JSON requests
app.use(bodyParser.json());
// Secret key for JWT
const JWT_SECRET = process.env.JWT_SECRET || 'supersecret';

// Database connection setup
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
});

db.connect(err => {
  if (err) {
    console.error('Database connection failed:', err);
  } else {
    console.log('Connected to database');
  }
});

// Serve static files from the React app (production build)
app.use(express.static(path.join(__dirname, 'build')));

// Create tables if they don't exist
const createTables = () => {
  const createProductsTable = `
    CREATE TABLE IF NOT EXISTS products(
      productID INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
      productName VARCHAR(255) NOT NULL,
      productCategory VARCHAR(255) NOT NULL,
      productPrice DECIMAL(10, 2),
      productImageUrl VARCHAR(255)
    )
  `;
  
  const createFarmersTable = `
    CREATE TABLE IF NOT EXISTS farmers(
      farmerID INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
      farmName VARCHAR(255) NOT NULL,
      location VARCHAR(255) NOT NULL,
      productID INT,
      email VARCHAR(255) NOT NULL,
      password VARCHAR(255) NOT NULL,
      bannerImageUrl VARCHAR(255),
      CONSTRAINT fk_products FOREIGN KEY(productID) REFERENCES products(productID) ON DELETE CASCADE ON UPDATE CASCADE
    )
  `;
  
  const createOrderTable = `
    CREATE TABLE IF NOT EXISTS orders(
      orderID INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
      location VARCHAR(255),
      customerID INT,
      productID INT,
      deliveryStatus BOOLEAN,
      CONSTRAINT fk_customer FOREIGN KEY(customerID) REFERENCES customers(customerID) ON DELETE CASCADE ON UPDATE CASCADE
      CONSTRAINT fk_products FOREIGN KEY(productID) REFERENCES products(productID) ON DELETE CASCADE ON UPDATE CASCADE
    )
  `;
  
  const createCustomersTable = `
    CREATE TABLE IF NOT EXISTS customers(
      customerID INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
      customerName VARCHAR(255) NOT NULL,
      orderID INT,
      email VARCHAR(255) NOT NULL,
      password VARCHAR(255) NOT NULL,
      CONSTRAINT fk_orders FOREIGN KEY(orderID) REFERENCES orders(orderID) ON DELETE CASCADE ON UPDATE CASCADE
    )
  `;
  
  const createRecipeTable = `
    CREATE TABLE IF NOT EXISTS recipes(
      recipeID INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
      foodName VARCHAR(255) NOT NULL,
      ingredients JSON,
      procedure JSON,
      farmerID INT,
      foodImageUrl VARCHAR(255),
      CONSTRAINT fk_farmer FOREIGN KEY(farmerID) REFERENCES farmers(farmerID) ON DELETE CASCADE ON UPDATE CASCADE
    )
  `;
  
  const createCartTable = `
    CREATE TABLE IF NOT EXISTS carts(
      cartID INT NOT NULL AUTO_INCREMENT,
      productIDs JSON,
      customerID INT,
      CONSTRAINT fk_customer FOREIGN KEY(customerID) REFERENCES customers(customerID) ON DELETE CASCADE ON UPDATE CASCADE
    )
  `;
  
  db.query(createProductsTable, (err,results)=>{
    if (err) return console.log(err);
    console.log("Products table created/checked")
  });
  db.query(createFarmersTable, (err,results)=>{
    if(err) return console.log(err);
    console.log('Farmers Table created/checked');
  });
  db.query(createOrderTable, (err)=>{
    if(err) return console.log(err);
    console.log('Orders table created/checked')
  });
  db.query(createCustomersTable, (err)=> {
    if(err)return console.log(err);
    console.log('Customers table created/checked')
  });
  db.query(createRecipeTable, (err)=> {
    if(err) return console.log(err);
    console.log('Recipe table created/checked');
  });
  db.query(createCartTable, (err)=>{
    if(err) return console.log(err);
    console.log('Cart table created/checked');
  });
};

createTables(); // Initialize tables when the server starts

// API Routes

// Customer Register Route
app.post('/api/customer/register', async (req, res) => {
  const { customerName, email, password } = req.body;
  
  if (!customerName || !email || !password) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  try {
    // Check if email already exists
    const existingUser = await db.query('SELECT * FROM customers WHERE email = ?', [email]);
    if (existingUser.length > 0) {
      return res.status(400).json({ message: 'Email already exists.' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert new customer into the database
    const result = await db.query('INSERT INTO customers (customerName, email, password) VALUES (?, ?, ?)', 
      [customerName, email, hashedPassword]);

    return res.status(201).json({ message: 'User registered successfully!' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
});

// Customer Login Route
app.post('/api/customer/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Both email and password are required.' });
  }

  try {
    // Check if user exists
    const user = await db.query('SELECT * FROM customers WHERE email = ?', [email]);
    if (user.length === 0) {
      return res.status(400).json({ message: 'Invalid credentials.' });
    }

    // Check password
    const validPassword = await bcrypt.compare(password, user[0].password);
    if (!validPassword) {
      return res.status(400).json({ message: 'Invalid credentials.' });
    }

    // Generate JWT token
    const token = jwt.sign({ customerID: user[0].customerID, email: user[0].email }, JWT_SECRET, { expiresIn: '1h' });

    return res.status(200).json({ message: 'Login successful!', token });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
});

// Farmer Register Route
app.post('/api/farmer/register', async (req, res) => {
  const { customerName, email, password } = req.body;
  
  if (!customerName || !email || !password) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  try {
    // Check if email already exists
    const existingUser = await db.query('SELECT * FROM farmers WHERE email = ?', [email]);
    if (existingUser.length > 0) {
      return res.status(400).json({ message: 'Email already exists.' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert new customer into the database
    const result = await query('INSERT INTO farmers (farmerName, email, password) VALUES (?, ?, ?)', 
      [customerName, email, hashedPassword]);

    return res.status(201).json({ message: 'User registered successfully!' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
});

// Farmer Login Route
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Both email and password are required.' });
  }

  try {
    // Check if user exists
    const user = await query('SELECT * FROM farmers WHERE email = ?', [email]);
    if (user.length === 0) {
      return res.status(400).json({ message: 'Invalid credentials.' });
    }

    // Check password
    const validPassword = await bcrypt.compare(password, user[0].password);
    if (!validPassword) {
      return res.status(400).json({ message: 'Invalid credentials.' });
    }

    // Generate JWT token
    const token = jwt.sign({ customerID: user[0].customerID, email: user[0].email }, JWT_SECRET, { expiresIn: '1h' });

    return res.status(200).json({ message: 'Login successful!', token });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
});

// Get all products
app.get('/api/products', (req, res) => {
  db.query('SELECT * FROM products', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// Create a new product
app.post('/api/products', (req, res) => {
  const { productName, productCategory, productPrice } = req.body;
  const sql = `INSERT INTO products (productName, productCategory, productPrice) VALUES (?, ?, ?)`;
  db.query(sql, [productName, productCategory, productPrice], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ message: 'Product added', productID: result.insertId });
  });
});

// Get a specific farmer by ID
app.get('/api/farmers/:id', (req, res) => {
  const farmerID = req.params.id;
  db.query('SELECT * FROM farmers WHERE farmerID = ?', [farmerID], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    if (result.length === 0) return res.status(404).json({ message: 'Farmer not found' });
    res.json(result[0]);
  });
});

// Create a new farmer
app.post('/api/farmers', (req, res) => {
  const { farmName, location, email, password, bannerImageUrl } = req.body;
  const sql = `INSERT INTO farmers (farmName, location, email, password, bannerImageUrl) VALUES (?, ?, ?, ?, ?)`;
  db.query(sql, [farmName, location, email, password, bannerImageUrl], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ message: 'Farmer added', farmerID: result.insertId });
  });
});

// Update delivery status of an order
app.put('/api/orders/:id', (req, res) => {
  const orderID = req.params.id;
  const { deliveryStatus } = req.body;
  const sql = `UPDATE orders SET deliveryStatus = ? WHERE orderID = ?`;
  db.query(sql, [deliveryStatus, orderID], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Order updated' });
  });
});

// Delete a product
app.delete('/api/products/:id', (req, res) => {
  const productID = req.params.id;
  db.query('DELETE FROM products WHERE productID = ?', [productID], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Product deleted' });
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
