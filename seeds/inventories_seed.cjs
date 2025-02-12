/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
module.exports.seed = async function (knex) {
  await knex("inventories").del();
  await knex("inventories").insert([
    {
      id: 1,
      warehouse_id: 1,
      item_name: "Fireproof Saddle",
      description:
        "A durable saddle enchanted to withstand extreme dragon fire and high-altitude flights.",
      category: "Dragon Gear",
      status: "In Stock",
      quantity: 15,
    },
    {
      id: 2,
      warehouse_id: 1,
      item_name: "Scale Polish",
      description:
        "A magical solution that keeps dragon scales shiny and resistant to dark magic.",
      category: "Dragon Care",
      status: "In Stock",
      quantity: 120,
    },
    {
      id: 3,
      warehouse_id: 1,
      item_name: "Dragon Treats",
      description:
        "Roasted enchanted cattle infused with minerals to keep dragons healthy and energetic.",
      category: "Dragon Food",
      status: "Out of Stock",
      quantity: 0,
    },

    {
      id: 4,
      warehouse_id: 2,
      item_name: "Rainbow Mane Conditioner",
      description:
        "An herbal elixir that enhances the colors of a unicorn’s mane and tail.",
      category: "Equine Care",
      status: "In Stock",
      quantity: 50,
    },
    {
      id: 5,
      warehouse_id: 2,
      item_name: "Pegasus Wing Balm",
      description:
        "A soothing cream that strengthens Pegasus wing muscles and prevents molting.",
      category: "Equine Care",
      status: "In Stock",
      quantity: 75,
    },
    {
      id: 6,
      warehouse_id: 2,
      item_name: "Glowing Horn Polish",
      description:
        "A rare gemstone-infused wax that increases the brilliance of a unicorn’s horn.",
      category: "Unicorn Supplies",
      status: "Out of Stock",
      quantity: 0,
    },

    {
      id: 7,
      warehouse_id: 3,
      item_name: "Phoenix Feather Quill",
      description:
        "A rare writing instrument that never runs out of ink and grants wisdom to its user.",
      category: "Magical Artifacts",
      status: "In Stock",
      quantity: 30,
    },
    {
      id: 8,
      warehouse_id: 3,
      item_name: "Spellbound Parchment",
      description:
        "Scrolls that automatically translate ancient runes into modern languages.",
      category: "Wizardry Tools",
      status: "Out of Stock",
      quantity: 0,
    },
    {
      id: 9,
      warehouse_id: 3,
      item_name: "Portable Potion Cauldron",
      description:
        "A foldable cauldron that expands into a full brewing station with self-stirring capabilities.",
      category: "Alchemy Equipment",
      status: "In Stock",
      quantity: 40,
    },

    {
      id: 10,
      warehouse_id: 4,
      item_name: "Elven Bow of the Moon",
      description:
        "A lightweight silverwood bow blessed by the Moon Goddess for precision and power.",
      category: "Weapons",
      status: "In Stock",
      quantity: 25,
    },
    {
      id: 11,
      warehouse_id: 4,
      item_name: "Dwarven Battle Axe",
      description:
        "A double-headed axe forged in the heart of a volcano, enchanted for extra strength.",
      category: "Weapons",
      status: "In Stock",
      quantity: 12,
    },
    {
      id: 12,
      warehouse_id: 4,
      item_name: "Titanium-Plated Cloak",
      description:
        "A lightweight enchanted cloak that offers the protection of armor without the weight.",
      category: "Armor",
      status: "Out of Stock",
      quantity: 0,
    },

    {
      id: 13,
      warehouse_id: 5,
      item_name: "Sunlight Resistance Ring",
      description:
        "A magical ring that allows vampires to walk in daylight for limited periods.",
      category: "Vampire Accessories",
      status: "In Stock",
      quantity: 60,
    },
    {
      id: 14,
      warehouse_id: 5,
      item_name: "Silver-Clad Shackles",
      description:
        "Resistant to werewolf transformations, these shackles are used for controlled full moons.",
      category: "Werewolf Supplies",
      status: "Out of Stock",
      quantity: 0,
    },
    {
      id: 15,
      warehouse_id: 5,
      item_name: "Blood Substitute Elixir",
      description:
        "A laboratory-created alternative to fresh blood, perfect for ethical vampires.",
      category: "Vampire Food",
      status: "In Stock",
      quantity: 200,
    },

    {
      id: 16,
      warehouse_id: 6,
      item_name: "Pearl-Encrusted Comb",
      description:
        "A magical comb that keeps mermaid hair smooth even in stormy waters.",
      category: "Mermaid Accessories",
      status: "In Stock",
      quantity: 45,
    },
    {
      id: 17,
      warehouse_id: 6,
      item_name: "Enchanted Coral Armor",
      description:
        "A lightweight armor set that grows with the user and enhances underwater agility.",
      category: "Armor",
      status: "Out of Stock",
      quantity: 0,
    },
    {
      id: 18,
      warehouse_id: 6,
      item_name: "Waterbreathing Amulet",
      description:
        "Allows land dwellers to breathe underwater for up to 24 hours per charge.",
      category: "Magical Artifacts",
      status: "In Stock",
      quantity: 15,
    },

    {
      id: 19,
      warehouse_id: 7,
      item_name: "Bag of Endless Holding",
      description:
        "A small pouch that can hold an infinite number of items without adding weight.",
      category: "Magical Artifacts",
      status: "In Stock",
      quantity: 8,
    },
    {
      id: 20,
      warehouse_id: 7,
      item_name: "Cursed Mirror of Foresight",
      description:
        "Shows glimpses of the future but at the cost of small misfortunes.",
      category: "Cursed Objects",
      status: "Out of Stock",
      quantity: 0,
    },
    {
      id: 21,
      warehouse_id: 7,
      item_name: "Phoenix Ash Vial",
      description:
        "Contains the ashes of a phoenix, used in resurrection and powerful potions.",
      category: "Alchemy Ingredients",
      status: "In Stock",
      quantity: 5,
    },
  ]);
};
