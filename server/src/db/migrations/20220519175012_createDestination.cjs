/**
 * @typedef {import("knex")} Knex
 */

/**
 * @param {Knex} knex
 */
exports.up = async (knex) => {
  return knex.schema.createTable("destinations", (table) => {
    table.bigIncrements("id");
    table.float("latitude").notNullable();
    table.float("longitude").notNullable();
    table.bigInteger("logEntryId").notNullable().index().unsigned().references("logEntries.id");
    table.timestamp("createdAt").notNullable().defaultTo(knex.fn.now());
    table.timestamp("updatedAt").notNullable().defaultTo(knex.fn.now());
  });
};

/**
 * @param {Knex} knex
 */
exports.down = (knex) => {
  return knex.schema.dropTableIfExists("destinations");
};
