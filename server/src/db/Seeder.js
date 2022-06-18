/* eslint-disable no-console */
import { connection } from "../boot.js";
import LogEntrySeeder from "./seeders.js/LogEntrySeeder.js";
import UserSeeder from "./seeders.js/UserSeeder.js";
class Seeder {
  static async seed() {
    console.log("seeding users...");
    await UserSeeder.seed();
    console.log("Done");

    console.log("seeding Log entries...");
    await LogEntrySeeder.seed();
    console.log("Done!");
    await connection.destroy();
  }
}

export default Seeder;
