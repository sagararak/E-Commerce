const express = require("express");
const router = express.Router();
router.use(express.json());

// Import the pool or database connection
const pool = require("../../db");

//home page
router.get("/products", function (req, res) {
  res.send("it's Home Page!!!");
});
//registration page
router.post("/addProduct", async (req, res) => {
    try {
      const {
        id,
        title,
        description,
        main_category_id,
        sub_category_id,
        status,
      } = req.body;
  
      // Execute the query using the established pool
      const newUser = await pool.query(
        "INSERT INTO users (id, title, description, main_category_id,sub_category_id,status ) VALUES ($1, $2, $3, $4, $5,$6) RETURNING *",
        [
          id,
          title,
          description,  
          main_category_id,
          sub_category_id,
          status,
          
        ]
      );
  
      res.json(newUser.rows[0]);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server Error");
    }
  });
  

module.exports=router;