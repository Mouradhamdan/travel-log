import express from "express";
import path from "path";
import logger from "morgan";
import multer from "multer";
import { fileURLToPath } from "url";
import "./boot.js";
import configuration from "./config.js";
import addMiddlewares from "./middlewares/addMiddlewares.js";
import rootRouter from "./routes/rootRouter.js";

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

const app = express();
import hbsMiddleware from "express-handlebars";

app.set("views", path.join(__dirname, "../views"));
app.engine(
  "hbs",
  hbsMiddleware({
    defaultLayout: "default",
    extname: ".hbs",
  })
);
app.set("view engine", "hbs");
app.use(logger("dev"));
app.use(express.static(path.join(__dirname, "../public")));
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(multer().any());
addMiddlewares(app);
app.use(rootRouter);
app.listen(configuration.web.port, configuration.web.host, () => {
  console.log("Server is listening...");
});
export default app;
