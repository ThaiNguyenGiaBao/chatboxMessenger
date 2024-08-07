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

async function getUserName(sender_psid) {
  let response = await fetch(
    `https://graph.facebook.com/${sender_psid}?fields=first_name,last_name,profile_pic&access_token=${PAGE_ACCESS_TOKEN}`
  )
    .then((res) => res.json())
    .catch((error) => {
      console.error("Unable to get user name:", error);
    });

  let userName = `${response.first_name} ${response.last_name}`;
  return userName;
}

async function handleGetStarted(sender_psid) {
  const username = await getUserName(sender_psid);
  let response = {
    text: `Hello ${username}! I'm a chatbot. How can I help you?`,
  };
  return response;
}

export { callSendAPI, handleGetStarted };
