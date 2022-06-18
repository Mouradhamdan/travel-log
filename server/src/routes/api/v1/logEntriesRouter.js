import express from "express";
import { LogEntry } from "../../../models/index.js";
import { ValidationError } from "objection";
import cleanUserInput from "../../../services/cleanUserInput.js";
import fs from "fs";

const logEntriesRouter = new express.Router();

logEntriesRouter.get("/", async (req, res) => {
  try {
    const logEntries = await LogEntry.query();
    res.status(200).json({ logEntries: logEntries });
  } catch (error) {
    return res.status(500).json({ error: error });
  }
});
logEntriesRouter.get("/:id", async (req, res) => {
  try {
    const logEntry = await LogEntry.query().findById(req.params.id);

    return res.status(200).json({ logEntry });
  } catch (error) {
    return res.status(500).json({ error });
  }
});

logEntriesRouter.post("/", async (req, res) => {
  const { body, files } = req;
  const verifyString = cleanUserInput(body);

  try {
    if (req.user) {
      verifyString.userId = req.user.id;
    } else {
      throw new Error();
    }
    let newLogEntry = await LogEntry.query().insertAndFetch(verifyString);
    if (files && files.length) {
      for (const file of files) {
        const filename = file.originalname;
        var buffer = new Buffer.from(file.buffer);
        fs.writeFile(`./public/uploads/${filename}`, buffer, async (err) => {
          //TODO: handle error
        });
      }
      await LogEntry.query()
        .findById(newLogEntry.id)
        .patch({
          images: files.map((f) => f.originalname).join(","),
        });

      return res.status(201).json({ logEntry: newLogEntry });
    }

    return res.status(201).json({ logEntry: newLogEntry });
  } catch (err) {
    if (err instanceof ValidationError) {
      return res.status(422).json({ err });
    }
    return res.status(500).json({ error: err });
  }
});

export default logEntriesRouter;
