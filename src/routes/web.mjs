import express from "express";
import { configDotenv } from "dotenv";
configDotenv();
import ChatbotService from "../services/chatbotService.mjs";

import { NlpManager } from "node-nlp";
const manager = new NlpManager({ languages: ["vi"] });
async function loadModel() {
  // Load a model from file (optional, if you have a pre-trained model saved)
  await manager.load("model.nlp");
  manager.save();
}
try {
  loadModel();
} catch (error) {
  console.log("Error loading model:", error);
}

const PAGE_ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN;
const VERIFY_TOKEN = process.env.VERIFY_TOKEN;

let router = express.Router();

// Handles messages events
async function handleMessage(sender_psid, received_message) {
  let response;
  if (received_message.text && !received_message.quick_reply) {
    // response = {
    //   text: `You sent the message: "${received_message.text}". Now send me an image!`,
    // };
    const botAnswer = await manager.process("vi", received_message.text);
    console.log("Bot Answer:", botAnswer);
    if (botAnswer.answer) {
      response = {
        text: botAnswer.answer,
      };
    } else {
      response = {
        text: "Tôi không hiểu câu hỏi của bạn. Bạn có thể nói rõ hơn không?",
      };
    }
    ChatbotService.callSendAPI(sender_psid, response);
  } else if (received_message.quick_reply) {
    let payload = received_message.quick_reply.payload;
    switch (payload) {
      // DISEASE ACCIDENT OTHERS
      case "DISEASE":
      case "ACCIDENT":
      case "OTHERS":
        response = ChatbotService.handleAppointment(sender_psid);
        break;
      default:
        response = { text: "Oops! I don't understand that." };
        ChatbotService.callSendAPI(sender_psid, response);
    }
  }
  // else if (received_message.attachments) {
  //   let attachment_url = received_message.attachments[0].payload.url;
  //   response = {
  //     attachment: {
  //       type: "template",
  //       payload: {
  //         template_type: "generic",
  //         elements: [
  //           {
  //             title: "Is this the right picture?",
  //             subtitle: "Tap a button to answer.",
  //             image_url: attachment_url,
  //             buttons: [
  //               {
  //                 type: "postback",
  //                 title: "Yes!",
  //                 payload: "yes",
  //               },
  //               {
  //                 type: "postback",
  //                 title: "No!",
  //                 payload: "no",
  //               },
  //             ],
  //           },
  //         ],
  //       },
  //     },
  // };
  //}
  // ChatbotService.callSendAPI(sender_psid, response);
}

// Handles messaging_postbacks events
async function handlePostback(sender_psid, received_postback) {
  let response;
  let payload = received_postback.payload;

  switch (payload) {
    case "RESTART_CONVERSATION":
    case "GET_STARTED":
      await ChatbotService.handleGetStarted(sender_psid);
      break;
    case "CONTACT_AGENT":
      response = {
        text: "Đây là số điện thoại của bác sĩ: 0123456789",
      };
      break;

    case "ADVISE":
      response = ChatbotService.handleAdvice(sender_psid);
      break;

    case "SERVICES":
      await ChatbotService.handleServices(sender_psid);
      break;
    case "APPOINTMENT":
      await ChatbotService.handleAppointment(sender_psid);
      break;

    case "BOOK_HEALTH_CHECK":
      await ChatbotService.handleAppointment(sender_psid);
      break;

    default:
      response = { text: "Xin lỗi, trợ lý không hiểu ý của bạn!" };
      ChatbotService.callSendAPI(sender_psid, response);
  }
}

function setup() {
  let request_body = {
    get_started: { payload: "GET_STARTED" },
    whitelisted_domains: ["https://drum-expert-miserably.ngrok-free.app/"],
    persistent_menu: [
      {
        locale: "default",
        composer_input_disabled: false,
        call_to_actions: [
          {
            type: "postback",
            title: "Liên hệ với bác sĩ",
            payload: "TALK_TO_AGENT",
          },
          {
            type: "postback",
            title: "Bắt đầu lại cuộc trò chuyện",
            payload: "RESTART_CONVERSATION",
          },
          {
            type: "web_url",
            title: "Website phòng khám",
            url: "https://www.facebook.com",
          },
        ],
      },
    ],
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
      console.log("Setup successfully!", res);
    })
    .catch((error) => {
      console.error("Unable to setup profile:", error);
    });

  // Initiate NLP

  fetch(
    "https://graph.facebook.com/v11.0/me/nlp_configs?access_token=" +
      PAGE_ACCESS_TOKEN +
      "&nlp_enabled=true" +
      "n_best_values=4",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(request_body),
    }
  )
    .then((res) => res.json())
    .then((res) => {
      console.log("NLP initiated successfully!", res);
    })
    .catch((error) => {
      console.error("Unable to initiate NLP:", error);
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
          console.log("Locales:", webhook_event.message.nlpv2.detected_locales);
          console.log("Entities:", webhook_event.message.nlpv2.entities);
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

  router.post("/setup", (req, res) => {
    setup();
    return res.send("Setup successfully!");
  });

  router.post("/setup-nlp", (req, res) => {
    let request_body = {
      nlp_configs: {
        nlp_enabled: true,
      },
    };
  });

  return app.use("/", router);
};

export default initWEBRoutes;
