import express from "express";
import cors from "cors";
import productRouter from "./products/index.js";

import createDbTables from "./utlis/db_tables.js";
const server = express();

const port = process.env.PORT || 5000;

server.use(cors());
server.use(express.json());

server.use("/products", productRouter);
server.listen(port, async () => {
  console.log(`server running on port ${port}`);
  await createDbTables();
});
