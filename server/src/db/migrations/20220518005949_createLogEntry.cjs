/**
 * @typedef {import("knex")} Knex
 */

/**
 * @param {Knex} knex
 */
exports.up = async (knex) => {
  return knex.schema.createTable("logEntries", (table) => {
    table.bigIncrements("id");
    table.string("title").notNullable();
    table.string("description");
    table.string("city").notNullable();
    table.date("startDate").notNullable();
    table.date("endDate").notNullable();
    table.bigInteger("userId").notNullable().index().unsigned().references("users.id");
    table.string("images");
    table.timestamp("createdAt").notNullable().defaultTo(knex.fn.now());
    table.timestamp("updatedAt").notNullable().defaultTo(knex.fn.now());
  });
};

/**
 * @param {Knex} knex
 */
exports.down = (knex) => {
  return knex.schema.dropTableIfExists("logEntries");
};
