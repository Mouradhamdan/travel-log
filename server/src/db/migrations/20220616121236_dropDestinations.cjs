/**
 * @typedef {import("knex")} Knex
 */

/**
 * @param {Knex} knex
 */
exports.up = async (knex) => {
  return knex.schema.dropTable("destinations");
};

/**
 * @param {Knex} knex
 */
exports.down = (knex) => {};
