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
    this.sendTypingOn(sender_psid);

    setTimeout(() => {
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
    }, 5000);
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

    // Send the response message
    const response1 = {
      text: `Phòng khám chuyên khoa nhi Bé Bé Yêu xin chào ${username}!`,
    };

    const response2 = Response.genGenericTemplate(
      "https://scontent-hkg4-2.xx.fbcdn.net/v/t39.30808-6/319815262_711019103936431_1276742203420179473_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=MGpD6Q3MIc0Q7kNvgEHz2Qm&_nc_ht=scontent-hkg4-2.xx&oh=00_AYAVAAUHcJMAtO4-n_QMyJir9LnlZ9H7lV_7m3bU_aOIAw&oe=66B961CF",
      "Hãy cho bác sĩ biết bạn đang cần gì?",
      "Nhấn các nút bên dưới để chọn",
      [
        Response.genPostbackButton("Cần tư vấn", "ADVISE"),
        Response.genPostbackButton("Danh sách dịch vụ khám", "SERVICES"),
        Response.genPostbackButton("Đặt lịch hẹn", "APPOINTMENT"),
      ]
    );

    // const elements = [];
    // elements.push(
    //   Response.genELementsTemplate(
    //     "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQCB-OyweWXxSDnlPOxkeL5EZd4ezG8lk3oBgB9tQzBmYrZ4CBmLBvOYAPnNUo1FiWjglc&usqp=CAU",
    //     "Welcome to our restaurant",
    //     "Please select an option",
    //     [
    //       Response.genPostbackButton("Start a new order", "NEW_ORDER"),
    //       Response.genPostbackButton("Main menu", "MAIN_MENU"),
    //       Response.genPostbackButton("Use the chatbot", "USE_CHATBOT"),
    //     ]
    //   )
    // );
    // elements.push(
    //   Response.genELementsTemplate(
    //     "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQV3V_QmFRmB8xPPSOmShms0tMMMAH1G9i7pg&s",
    //     "Our restaurant opens at 8:00 AM and closes at 10:00 PM",
    //     "Please select an option",
    //     [Response.genPostbackButton("Order", "NEW_ORDER")]
    //   )
    // );
    // // menu
    // elements.push(
    //   Response.genELementsTemplate(
    //     "https://www.hoteljob.vn/uploads/images/18-09-18-15/menu-la-gi2.jpg",
    //     "Menu",
    //     "Please select an option",
    //     [
    //       Response.genPostbackButton("Breakfast", "BREAKFAST"),
    //       Response.genPostbackButton("Lunch", "LUNCH"),
    //       Response.genPostbackButton("Dinner", "DINNER"),
    //     ]
    //   )
    // );
    //response2.attachment.payload.elements = elements;

    // Quick replies
    // const response3 = Response.genQuickReply("What do you want to do next?", [
    //   {
    //     title: "Start a new order",
    //     payload: "NEW_ORDER",
    //   },
    //   {
    //     title: "Main menu",
    //     payload: "MAIN_MENU",
    //   },
    //   {
    //     title: "Use the chatbot",
    //     payload: "USE_CHATBOT",
    //   },
    // ]);

    await this.callSendAPI(sender_psid, response1);
    await this.callSendAPI(sender_psid, response2);
    //await this.callSendAPI(sender_psid, response3);
  }

  static async handleAdvice(sender_psid) {
    // const response = Response.genGenericTemplate(
    //   "https://www.hoteljob.vn/uploads/images/18-09-18-15/menu-la-gi2.jpg",
    //   "Menu",
    //   "Please select an option",
    //   [
    //     Response.genPostbackButton("Breakfast", "BREAKFAST"),
    //     Response.genPostbackButton("Lunch", "LUNCH"),
    //     Response.genPostbackButton("Dinner", "DINNER"),
    //   ]
    // );

    // Quick replies for advice service about children health
    const response = Response.genQuickReply("Bạn cần tư vấn về vấn đề gì?", [
      {
        title: "Bệnh lý",
        payload: "DISEASE",
      },
      {
        title: "Tai nạn và chấn thương",
        payload: "ACCIDENT",
      },
      {
        title: "Các vấn đề khác",
        payload: "OTHERS",
      },
    ]);

    await this.callSendAPI(sender_psid, response);
  }

  static async handleServices(sender_psid) {
    const response = Response.genGenericTemplate("", "", "", []);

    const elements = [];
    elements.push(
      Response.genELementsTemplate(
        "https://benhvienbacha.vn/wp-content/uploads/2023/02/long-bien-kham-suc-khoe-tong-quat-cho-tre-em-o-dau-tot-2.jpg",
        "Khám sức khỏe tổng quát",
        "Bác sĩ sẽ trao đổi, đồng thời giải đáp để phụ huynh hiểu về tình trạng của bé",
        [
          Response.genPostbackButton("Đặt lịch ngay", "BOOK_HEALTH_CHECK"),
          Response.genPostbackButton("Thông tin chi tiết", "DETAIL_HEALTH_CHECK"),
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
    response.attachment.payload.elements = elements;
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
