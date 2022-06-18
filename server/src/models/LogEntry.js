const Model = require("./Model.js");

class LogEntry extends Model {
  static get tableName() {
    return "logEntries";
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["title", "city", "startDate", "endDate", "longitude", "latitude"],
      properties: {
        title: { type: "string" },
        description: { type: "string" },
        city: { type: "string" },
        startDate: { type: "string" },
        endDate: { type: "string" },
        longitude: { type: "number" },
        latitude: { type: "number" },
        images: { type: "string" },
      },
    };
  }
  static get relationMappings() {
    const { User } = require("./index.js");
    return {
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: "logEntries.userId",
          to: "users.id",
        },
      },
    };
  }
}
module.exports = LogEntry;
