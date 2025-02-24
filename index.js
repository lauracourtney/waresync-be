import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import warehouseRoute from "./routes/warehouseRoute.js";
import inventoryRoute from "./routes/inventoryRoute.js";
import morgan from "morgan";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(morgan("dev"));

app.use(cors());
app.use(express.json());

app.use("/api/warehouses", warehouseRoute);
app.use("/api/inventories", inventoryRoute);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
