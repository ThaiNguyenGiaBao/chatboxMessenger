import { configDotenv } from "dotenv";
import Response from "./response.mjs";
configDotenv();

const PAGE_ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN;

export default class ChatbotService {
  static async callSendAPI(sender_psid, response) {
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

  static async getUserName(sender_psid) {
    let response = await fetch(
      `https://graph.facebook.com/${sender_psid}?fields=first_name,last_name,profile_pic&access_token=${PAGE_ACCESS_TOKEN}`
    )
      .then((res) => res.json())
      .catch((error) => {
        console.error("Unable to get user name:", error);
      });

    let userName = `${response.first_name} ${response.last_name}`;
    console.log("User name:", userName);
    return userName;
  }

  static async handleGetStarted(sender_psid) {
    const username = await this.getUserName(sender_psid);
    //console.log("Username:", username);

    // Send the response message
    const response1 = {
      text: `Hello ${username}! I'm a chatbot. How can I help you?`,
    };
    await this.callSendAPI(sender_psid, response1);

    const respone2 = Response.genGenericTemplate(
      "https://www.facebook.com/images/fb_icon_325x325.png",
      "What do you want to do?",
      "Please select an option",
      [
        Response.genPostbackButton("Start a new order", "NEW_ORDER"),
        Response.genPostbackButton("Track an order", "TRACK_ORDER"),
      ]
    );
    await this.callSendAPI(sender_psid, respone2);
  }
}
