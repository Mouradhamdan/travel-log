import { LogEntry } from "../../models/index.js";

class LogEntrySeeder {
  static async seed() {
    //TODO: fix seeder to add longitude and latitude data
    const logEntryData = [
      {
        title: "In Search For Sunrise!",
        description: "Post Breakup trip to heal and connect with loved ones",
        city: "Rome",
        startDate: "08/04/2018",
        endDate: "09/01/2018",
        userId: 1,
      },
      {
        title: "Escaping Reality",
        description: "Summer vacation to see family and enjoy some sunshine!",
        city: "Istanbul",
        startDate: "09/04/2021",
        endDate: "09/28/2021",
        userId: 2,
      },
      {
        title: "Favorite City",
        description: "visited Malta for the first time. Made new friends and met my friend Fatima.",
        city: "Malta",
        startDate: "08/15/2019",
        endDate: "08/29/2019",
        userId: 3,
      },
    ];
    for (const singleLogEntryData of logEntryData) {
      const currentLogEntry = await LogEntry.query().findOne(singleLogEntryData);
      if (!currentLogEntry) {
        await LogEntry.query().insert(singleLogEntryData);
      }
    }
  }
}

export default LogEntrySeeder;
