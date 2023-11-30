const express = require("express");
const router = express.Router();
router.use(express.json());

// Import the pool or database connection
const pool = require("../../db");

router.get("/categories", function (req, res) {
  res.send("it's categories Page!!!");
});

//add categories
router.post("/addCategory", async (req, res) => {
  try {
    const { id, title, image_url } = req.body;

    // Execute the query using the established pool
    const newUser = await pool.query(
      "INSERT INTO main_category (id, title, image_url) VALUES ($1, $2, $3) RETURNING *",
      [id, title, image_url]
    );

    res.json(newUser.rows[0]);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

// all categories
router.get("/allCategories", async (req, res) => {
  try {
    const allCategories = await pool.query("SELECT * FROM main_category");
    if (allCategories.rows.length === 0) {
      // If no user found, send a custom message
      return res.status(404).json({ message: "category not found" });
    }

    res.json(allCategories.rows); // Send rows from the query result
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error");
  }
});

// search categories
router.get("/categories/:id", async (req, res) => {
  try {
    const { id } = req.params; // Extract id from params
    const searchCategory = await pool.query(
      "SELECT * FROM main_category WHERE id = $1",
      [id]
    );

    if (searchCategory.rows.length === 0) {
      // If no user found, send a custom message
      return res.status(404).json({ message: "Category not found" });
    }

    res.json(searchCategory.rows); // Send rows from the query result
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

// update category
router.put("/updateCategory/:id", async (req, res) => {
  try {
    const { id } = req.params; // Extract id from params

    const { title, image_url } = req.body; // Extract individual fields from req.body

    const updateCategory = await pool.query(
      "UPDATE main_category SET title = $1, image_url = $2 WHERE id =$3",
      [title, image_url, id] // Add id to the parameter list
    );

    res.json("Category updated!!");
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

// delete category
router.delete("/deleteCategory/:id", async (req, res) => {
  try {
    const { id } = req.params; // Extract id from params

    const deleteCategory = await pool.query(
      "DELETE FROM main_category WHERE id = $1",
      [id]
    );

    res.json("Category deleted!!");
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

module.exports = router;