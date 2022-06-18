/**
 * @typedef {import("knex")} Knex
 */

/**
 * @param {Knex} knex
 */
exports.up = async (knex) => {
  return knex.schema.alterTable("logEntries", (table) => {
    table.float("latitude");
    table.float("longitude");
  });
};

/**
 * @param {Knex} knex
 */
exports.down = (knex) => {};
