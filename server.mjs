import express from "express";
import initWEBRoutes from "./src/routes/web.mjs";
import configViewEngine from "./src/config/viewEngine.mjs";
import { configDotenv } from "dotenv";
import bodyParser from "body-parser";

configDotenv();

let app = express();

// Config view engine
configViewEngine(app);

// Use body-parser to post data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Init all web routes
initWEBRoutes(app);

let port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`App is running at the http://localhost:${port}`);
});
