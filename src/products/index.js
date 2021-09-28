import express, { Router } from "express";
import pool from "../utlis/database.js";
const productRouter = express.Router();

productRouter.get("/", async (req, res, next) => {
  try {
    const query = `SELECT * FROM products`;
    const allProducts = await pool.query(query);
    res.send(allProducts.rows);
  } catch (error) {
    console.log(error);
  }
});
productRouter.post("/", async (req, res, next) => {
  try {
    const { name, description, brand, image_url, price, category } = req.body;
    const query = `INSERT INTO products(
            name,
            description,
            brand,
            image_url,
            price,
            category

        )
        VALUES(
            ${"'" + name + "'"},
            ${"'" + description + "'"},
            ${"'" + brand + "'"},
            ${"'" + image_url + "'"},
            ${"'" + price + "'"},
            ${"'" + category + "'"}

        )
 `;
    const product = await pool.query(query);
    console.log(product);
    res.status(201).send({ product: "data sent" });
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});

productRouter.get("/:id", async (req, res, next) => {
  try {
    const query = `SELECT * FROM products WHERE product_id=${req.params.id}`;
    const product = await pool.query(query);
    if (product.rows.length > 0) {
      res.send(product.rows[0]);
    } else {
      res
        .status(404)
        .send({ message: `Product with ${req.params.id} is not found` });
    }
  } catch (error) {
    console.log(error);
  }
});

productRouter.put("/:id", async (req, res, next) => {
  try {
    const { name, description, brand, image_url, price, category } = req.body;
    const query = `UPDATE products SET
    name= ${"'" + name + "'"},
    description=  ${"'" + description + "'"},
    brand=   ${"'" + brand + "'"},
    image_url= ${"'" + image_url + "'"},
    price= ${"'" + price + "'"},
    category=   ${"'" + category + "'"}
        WHERE product_id = ${req.params.id}
    `;
    const product = await pool.query(query);
    if (product.rows.length > 0) {
      res.send(product.rows[0]);
    } else {
      res
        .status(404)
        .send({ message: `Product with ${req.params.id} is not found` });
    }
  } catch (error) {
    console.log(error);
  }
});
// reviews(
//     review_id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,

//     comment TEXT NOT NULL,
//     brand VARCHAR(50) NOT NULL,

//     rate INTEGER NOT NULL,
//     product_id VARCHAR(50) NOT NULL,
//     created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

// )
export default productRouter;
