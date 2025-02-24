import initKnex from "knex";
import configuration from "../knexfile.js";

const environment = process.env.NODE_ENV || "development";
const knexConfig = configuration[environment];
const knex = initKnex(knexConfig);

import express from "express";
const router = express.Router();
import { validateWarehouseData } from "../utils/utils.js";

router.get("/", async (req, res) => {
  const { sort_by, order_by } = req.query;

  try {
    let query = knex("warehouses");

    const validColumns = [
      "warehouse_name",
      "address",
      "city",
      "country",
      "contact_name",
      "contact_email",
      "contact_phone",
    ];

    if (sort_by && validColumns.includes(sort_by)) {
      query = query.orderBy(sort_by, order_by === "desc" ? "desc" : "asc");
    }

    const warehouses = await query;
    res.status(200).json(warehouses);
  } catch (error) {
    console.error("Error fetching warehouses:", error.message);
    res.status(500).json({
      message: "Unable to fetch warehouses.",
      error: error.message,
    });
  }
});

router.post("/", async (req, res) => {
  const validationResult = validateWarehouseData(req.body);
  if (!validationResult.isValid) {
    return res.status(400).json({
      message: validationResult.message,
    });
  }

  try {
    const [createdWarehouse] = await knex("warehouses")
      .insert(req.body)
      .returning("*");

    res.status(201).json(createdWarehouse);
  } catch (error) {
    console.error("Error creating warehouse:", error.message);
    res.status(500).json({
      message: `Unable to create new warehouse: ${error.message}`,
    });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const warehouse = await knex("warehouses")
      .where({ id: req.params.id })
      .first();

    if (!warehouse) {
      return res.status(404).json({
        message: `No warehouse found with id: ${req.params.id}`,
      });
    }

    res.status(200).json(warehouse);
  } catch (error) {
    console.error("Error fetching warehouse:", error.message);
    res.status(500).json({
      message: `Error fetching warehouse with id: ${req.params.id}`,
      error: error.message,
    });
  }
});

router.put("/:id", async (req, res) => {
  const validationResult = validateWarehouseData(req.body);
  if (!validationResult.isValid) {
    return res.status(400).json({
      message: validationResult.message,
    });
  }

  try {
    const warehouse = await knex("warehouses")
      .where({ id: req.params.id })
      .first();

    if (!warehouse) {
      return res.status(404).json({
        message: `No warehouse found with id: ${req.params.id}`,
      });
    }

    await knex("warehouses").where({ id: req.params.id }).update(req.body);

    const updatedWarehouse = await knex("warehouses")
      .where({ id: req.params.id })
      .first();

    res.status(200).json(updatedWarehouse);
  } catch (error) {
    console.error("Error updating warehouse:", error.message);
    res.status(500).json({
      message: `Unable to update warehouse: ${error.message}`,
    });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const warehouse = await knex("warehouses")
      .where({ id: req.params.id })
      .first();

    if (!warehouse) {
      return res.status(404).json({
        message: `No warehouse found with id: ${req.params.id}`,
      });
    }

    await knex("inventories").where({ warehouse_id: req.params.id }).del();
    await knex("warehouses").where({ id: req.params.id }).del();

    res.status(204).send();
  } catch (error) {
    console.error("Error deleting warehouse:", error.message);
    res.status(500).json({
      message: `Unable to delete warehouse: ${error.message}`,
    });
  }
});

router.get("/:id/inventories", async (req, res) => {
  const { sort_by, order_by } = req.query;

  try {
    const warehouse = await knex("warehouses")
      .where({ id: req.params.id })
      .first();

    if (!warehouse) {
      return res.status(404).json({
        message: `No warehouse found with id: ${req.params.id}`,
      });
    }

    let query = knex("inventories")
      .select("id", "item_name", "category", "status", "quantity")
      .where({ warehouse_id: req.params.id });

    const validColumns = ["item_name", "category", "status", "quantity"];

    if (sort_by && validColumns.includes(sort_by)) {
      query = query.orderBy(sort_by, order_by === "desc" ? "desc" : "asc");
    }

    const inventories = await query;

    res.status(200).json(inventories);
  } catch (error) {
    console.error("Error fetching inventories:", error.message);
    res.status(500).json({
      message: "Unable to fetch inventories for the warehouse.",
      error: error.message,
    });
  }
});

export default router;
