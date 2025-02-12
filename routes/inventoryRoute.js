import initKnex from "knex";
import configuration from "../knexfile.js";
const knex = initKnex(configuration);
import express from "express";
const router = express.Router();
import { validateInventoryData } from "../utils/utils.js";

router.get("/inventories", async (req, res) => {
  const { sort_by, order_by } = req.query;

  try {
    let query = knex("inventories")
      .select(
        "inventories.id",
        "warehouses.warehouse_name",
        "inventories.item_name",
        "inventories.description",
        "inventories.category",
        "inventories.status",
        "inventories.quantity"
      )
      .join("warehouses", "inventories.warehouse_id", "=", "warehouses.id");

    if (sort_by) {
      const validColumns = [
        "item_name",
        "category",
        "status",
        "quantity",
        "warehouse_name",
      ];

      if (validColumns.includes(sort_by)) {
        query = query.orderBy(sort_by, order_by === "desc" ? "desc" : "asc");
      } else {
        return res.status(400).json({ message: "Invalid sort_by column" });
      }
    }

    const inventories = await query;

    res.status(200).json(inventories);
  } catch (error) {
    console.error("Error fetching inventories:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.get("/inventories/:id", async (req, res) => {
  const { id } = req.params;
  const { warehouse_id } = req.query;

  try {
    let query = knex("inventories")
      .select(
        "inventories.id",
        "warehouses.id as warehouse_id",
        "warehouses.warehouse_name",
        "inventories.item_name",
        "inventories.description",
        "inventories.category",
        "inventories.status",
        "inventories.quantity"
      )
      .join("warehouses", "inventories.warehouse_id", "=", "warehouses.id")
      .where("inventories.id", id);

    if (warehouse_id) {
      query = query.andWhere("warehouses.id", warehouse_id);
    }

    const inventoryItem = await query.first();

    if (!inventoryItem) {
      return res.status(404).json({ message: "Inventory item not found" });
    }

    res.status(200).json(inventoryItem);
  } catch (error) {
    console.error("Error fetching inventory item:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.delete("/inventories/:id", async (req, res) => {
  try {
    const inventory = await knex("inventories")
      .where({ id: req.params.id })
      .first();

    if (!inventory) {
      return res.status(404).send({
        message: `No inventory item found with id: ${req.params.id}`,
      });
    }

    await knex("inventories").where({ id: req.params.id }).del();
    res.status(204).send("Inventory item deleted");
  } catch (e) {
    res.status(500).json({
      message: `Error deleting Inventory ${req.params.id}`,
      error: e.message,
    });
  }
});

router.put("/inventories/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const inventoryExists = await knex("inventories").where({ id }).first();
    if (!inventoryExists) {
      return res
        .status(404)
        .json({ message: `Inventory item with ID ${id} not found` });
    }

    const validationResult = validateInventoryData(req.body);
    if (!validationResult.isValid) {
      return res.status(400).json({ message: validationResult.message });
    }

    if (req.body.warehouse_id !== undefined) {
      const warehouseExists = await knex("warehouses")
        .where({ id: req.body.warehouse_id })
        .first();
      if (!warehouseExists) {
        return res
          .status(400)
          .json({ message: "Invalid warehouse_id provided" });
      }
    }

    const updateData = {
      warehouse_id: req.body.warehouse_id,
      item_name: req.body.item_name.trim(),
      description: req.body.description.trim(),
      category: req.body.category.trim(),
      status: req.body.status.trim(),
      quantity:
        req.body.status === "In Stock" ? parseInt(req.body.quantity, 10) : 0,
    };

    await knex("inventories").where({ id }).update(updateData);

    const updatedInventory = await knex("inventories").where({ id }).first();
    res.status(200).json(updatedInventory);
  } catch (error) {
    console.error("Error updating inventory item:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.post("/inventories", async (req, res) => {
  const { warehouse_id, item_name, description, category, status, quantity } =
    req.body;

  if (
    !warehouse_id ||
    !item_name ||
    !description ||
    !category ||
    !status ||
    quantity === undefined
  ) {
    return res.status(400).json({ message: "All fields are required." });
  }

  if (isNaN(quantity) || quantity < 0) {
    return res
      .status(400)
      .json({ message: "Quantity must be a non-negative number." });
  }

  try {
    const warehouseExists = await knex("warehouses")
      .where({ id: warehouse_id })
      .first();

    if (!warehouseExists) {
      return res.status(400).json({ message: "Invalid warehouse ID." });
    }

    const [newInventory] = await knex("inventories")
      .insert({
        warehouse_id,
        item_name,
        description,
        category,
        status,
        quantity,
      })
      .returning("*");

    res.status(201).json(newInventory);
  } catch (error) {
    console.error("Error creating inventory item:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
});

export default router;
