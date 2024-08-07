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

    await this.sendMarkSeen(sender_psid);
    await this.sendTypingOn(sender_psid);

    await setTimeout(() => {
    }, 5000);

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

  static async sendTypingOn(sender_psid) {
    let request_body = {
      recipient: {
        id: sender_psid,
      },
      sender_action: "typing_on",
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
        console.log("Typing on sent successfully!", res);
      })
      .catch((error) => {
        console.error("Unable to send typing on:", error);
      });
  }

  static async sendMarkSeen(sender_psid) {
    let request_body = {
      recipient: {
        id: sender_psid,
      },
      sender_action: "mark_seen",
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
        console.log("Mark seen sent successfully!", res);
      })
      .catch((error) => {
        console.error("Unable to send mark seen:", error);
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

    const response2 = Response.genGenericTemplate(
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQCB-OyweWXxSDnlPOxkeL5EZd4ezG8lk3oBgB9tQzBmYrZ4CBmLBvOYAPnNUo1FiWjglc&usqp=CAU",
      "Welcome to our restaurant",
      "Please select an option",
      []
    );

    const elements = [];
    elements.push(
      Response.genELementsTemplate(
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQCB-OyweWXxSDnlPOxkeL5EZd4ezG8lk3oBgB9tQzBmYrZ4CBmLBvOYAPnNUo1FiWjglc&usqp=CAU",
        "Welcome to our restaurant",
        "Please select an option",
        [
          Response.genPostbackButton("Start a new order", "NEW_ORDER"),
          Response.genPostbackButton("Main menu", "MAIN_MENU"),
          Response.genPostbackButton("Use the chatbot", "USE_CHATBOT"),
        ]
      )
    );
    elements.push(
      Response.genELementsTemplate(
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQV3V_QmFRmB8xPPSOmShms0tMMMAH1G9i7pg&s",
        "Our restaurant opens at 8:00 AM and closes at 10:00 PM",
        "Please select an option",
        [Response.genPostbackButton("Order", "NEW_ORDER")]
      )
    );
    // menu
    elements.push(
      Response.genELementsTemplate(
        "https://www.hoteljob.vn/uploads/images/18-09-18-15/menu-la-gi2.jpg",
        "Menu",
        "Please select an option",
        [
          Response.genPostbackButton("Breakfast", "BREAKFAST"),
          Response.genPostbackButton("Lunch", "LUNCH"),
          Response.genPostbackButton("Dinner", "DINNER"),
        ]
      )
    );

    response2.attachment.payload.elements = elements;

    await this.callSendAPI(sender_psid, response2);
  }

  static async handleMenu(sender_psid) {
    const response = Response.genGenericTemplate(
      "https://www.hoteljob.vn/uploads/images/18-09-18-15/menu-la-gi2.jpg",
      "Menu",
      "Please select an option",
      [
        Response.genPostbackButton("Breakfast", "BREAKFAST"),
        Response.genPostbackButton("Lunch", "LUNCH"),
        Response.genPostbackButton("Dinner", "DINNER"),
      ]
    );
    await this.callSendAPI(sender_psid, response);
  }

  static async handleBreakfast(sender_psid) {
    const response = Response.genGenericTemplate(
      "https://www.hoteljob.vn/uploads/images/18-09-18-15/menu-la-gi2.jpg",
      "Breakfast",
      "In the morning, we serve breakfast with bread, noodles, and rice.",
      [
        Response.genPostbackButton("Bread", "BREAD"),
        Response.genPostbackButton("Noodles", "NOODLES"),
        Response.genPostbackButton("Rice", "RICE"),
      ]
    );
    await this.callSendAPI(sender_psid, response);
  }

  static async handleLunch(sender_psid) {
    const response = Response.genGenericTemplate(
      "https://www.hoteljob.vn/uploads/images/18-09-18-15/menu-la-gi2.jpg",
      "Lunch",
      "At lunchtime, we serve lunch with rice, noodles, and bread.",
      [
        Response.genPostbackButton("Rice", "RICE"),
        Response.genPostbackButton("Noodles", "NOODLES"),
        Response.genPostbackButton("Bread", "BREAD"),
      ]
    );
    await this.callSendAPI(sender_psid, response);
  }

  static async handleDinner(sender_psid) {
    const response = Response.genGenericTemplate(
      "https://www.hoteljob.vn/uploads/images/18-09-18-15/menu-la-gi2.jpg",
      "Dinner",
      "In the evening, we serve dinner with noodles, bread, and rice.",
      [
        Response.genPostbackButton("Noodles", "NOODLES"),
        Response.genPostbackButton("Bread", "BREAD"),
        Response.genPostbackButton("Rice", "RICE"),
      ]
    );
    await this.callSendAPI(sender_psid, response);
  }
}
