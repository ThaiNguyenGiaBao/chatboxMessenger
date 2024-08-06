import express from "express";
import { configDotenv } from "dotenv";
configDotenv();

let router = express.Router();

// Write routes for Webhook Messenger

let initWEBRoutes = (app) => {
  router.get("/", (req, res) => {
    return res.send(`<h1>Hello World</h1>`);
  });

  router.post("/webhook", (req, res) => {
    let body = req.body;
    if (body.object === "page") {
      body.entry.forEach(function (entry) {
        // entry.messaging is an array, but only ever contains one message => get index 0
        let webhook_event = entry.messaging[0];
        console.log(webhook_event);
      });
      return res.status(200).send("EVENT_RECEIVED");
    } else {
      return res.sendStatus(404);
    }
  });

  router.get("/webhook", (req, res) => {
    let VERIFY_TOKEN = process.env.VERIFY_TOKEN;

    let mode = req.query["hub.mode"];
    let token = req.query["hub.verify_token"];
    let challenge = req.query["hub.challenge"];
    if (mode && token) {
      if (mode === "subscribe" && token === VERIFY_TOKEN) {
        console.log("WEBHOOK_VERIFIED");
        return res.status(200).send(challenge);
      } else {
        return res.sendStatus(403);
      }
    } else {
      return res.sendStatus(404);
    }
  });

  return app.use("/", router);
};

export default initWEBRoutes;
