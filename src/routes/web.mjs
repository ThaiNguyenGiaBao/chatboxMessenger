import express from "express";
import { configDotenv } from "dotenv";
configDotenv();

const PAGE_ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN;
const VERIFY_TOKEN = process.env.VERIFY_TOKEN;

let router = express.Router();

// Handles messages events
function handleMessage(sender_psid, received_message) {
  let response;
  if (received_message.text) {
    response = {
      text: `You sent the message: "${received_message.text}". Now send me an image!`,
    };
  } else if (received_message.attachments) {
    let attachment_url = received_message.attachments[0].payload.url;
    response = {
      attachment: {
        type: "template",
        payload: {
          template_type: "generic",
          elements: [
            {
              title: "Is this the right picture?",
              subtitle: "Tap a button to answer.",
              image_url: attachment_url,
              buttons: [
                {
                  type: "postback",
                  title: "Yes!",
                  payload: "yes",
                },
                {
                  type: "postback",
                  title: "No!",
                  payload: "no",
                },
              ],
            },
          ],
        },
      },
    };
  }
  callSendAPI(sender_psid, response);
}

// Handles messaging_postbacks events
function handlePostback(sender_psid, received_postback) {
  let response;
  let payload = received_postback.payload;
  if (payload === "yes") {
    response = { text: "Thanks!" };
  } else if (payload === "no") {
    response = { text: "Oops, try sending another image." };
  }
  callSendAPI(sender_psid, response);
}

// Sends response messages via the Send API
function callSendAPI(sender_psid, response) {
  let request_body = {
    recipient: {
      id: sender_psid,
    },
    message: response,
  };
  fetch(
    "https://graph.facebook.com/v11.0/me/messages?access_token=" +
      PAGE_ACCESS_TOKEN,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(request_body),
    }
  )
    .then((res) => res.json())
    .then((res) => {
      console.log("Message sent successfully!", res);
    })
    .catch((error) => {
      console.error("Unable to send message:", error);
    });
}

function setupProfile() {
  let request_body = {
    get_started: { payload: "GET_STARTED" },
    whitelisted_domains: ["https://drum-expert-miserably.ngrok-free.app/"],
  };
  fetch(
    "https://graph.facebook.com/v11.0/me/messenger_profile?access_token=" +
      PAGE_ACCESS_TOKEN,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(request_body),
    }
  )
    .then((res) => res.json())
    .then((res) => {
      console.log("Setup profile successfully!", res);
    })
    .catch((error) => {
      console.error("Unable to setup profile:", error);
    });
}

// Write routes for Webhook Messenger
let initWEBRoutes = (app) => {
  router.get("/", (req, res) => {
    return res.render("homePage.ejs");
  });

  router.post("/webhook", (req, res) => {
    let body = req.body;
    if (body.object === "page") {
      body.entry.forEach(function (entry) {
        // entry.messaging is an array, but only ever contains one message => get index 0
        let webhook_event = entry.messaging[0];
        console.log(webhook_event);

        if (webhook_event.message) {
          handleMessage(webhook_event.sender.id, webhook_event.message);
        } else if (webhook_event.postback) {
          handlePostback(webhook_event.sender.id, webhook_event.postback);
        }
      });
      return res.status(200).send("EVENT_RECEIVED");
    } else {
      return res.sendStatus(404);
    }
  });

  router.get("/webhook", (req, res) => {
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

  // router.post("/setup-profile", (req, res) => {
  //   console.log("Setup profile...");
  //   setupProfile();
  //   return res.send("Setup profile successfully!");
  // });

  return app.use("/", router);
};

export default initWEBRoutes;
