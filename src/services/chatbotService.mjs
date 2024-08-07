import { configDotenv } from "dotenv";
configDotenv();

const PAGE_ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN;

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

function handleGetStarted() {
  let response = {
    text: "Welcome to BK page! How can I help you?",
  };
  return response;
}

export { callSendAPI, handleGetStarted };
