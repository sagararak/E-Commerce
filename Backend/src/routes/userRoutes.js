const express = require("express");
const router = express.Router();
router.use(express.json());

// Import the pool or database connection
const pool = require("../../db");

//home page
router.get("/", function (req, res) {
  res.send("it's Home Page!!!");
});

//registration page
router.post("/registration", async (req, res) => {
  try {
    const {
      id,
      name,
      email,
      gender,
      mob_no,
      birth_date,
      address,
      pin_code,
      city,
      password,
    } = req.body;

    // Execute the query using the established pool
    const newUser = await pool.query(
      "INSERT INTO users (id, name, email, gender, mob_no, birth_date, address, pin_code, city, password) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *",
      [
        id,
        name,
        email,
        gender,
        mob_no,
        birth_date,
        address,
        pin_code,
        city,
        password,
      ]
    );

    res.json(newUser.rows[0]);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

// All users
router.get("/allUsers", async (req, res) => {
  try {
    const allUsers = await pool.query("SELECT * FROM users");
    if (allUsers.rows.length === 0) {
      // If no user found, send a custom message
      return res.status(404).json({ message: "User not found" });
    }

    res.json(allUsers.rows); // Send rows from the query result
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error");
  }
});

// search users
router.get("/users/:id", async (req, res) => {
  try {
    const { id } = req.params; // Extract id from params
    const userSearch = await pool.query("SELECT * FROM users WHERE id = $1", [
      id,
    ]);

    if (userSearch.rows.length === 0) {
      // If no user found, send a custom message
      return res.status(404).json({ message: "User not found" });
    }

    res.json(userSearch.rows); // Send rows from the query result
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

// update user
router.put("/updateUser/:id", async (req, res) => {
  try {
    const { id } = req.params; // Extract id from params

    const { name, mob_no, address, pin_code, city, password } = req.body; // Extract individual fields from req.body

    const updateUser = await pool.query(
      "UPDATE users SET name = $1, mob_no = $2, address = $3, pin_code = $4, city = $5, password = $6 WHERE id =$7",
      [name, mob_no, address, pin_code, city, password, id] // Add id to the parameter list
    );

    res.json("User updated!!");
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

// delete users
router.delete("/deleteUser/:id", async (req, res) => {
  try {
    const { id } = req.params; // Extract id from params

    const deleteUser = await pool.query("DELETE FROM users WHERE id = $1", [
      id,
    ]);

    res.json("User deleted!!");
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

module.exports = router;