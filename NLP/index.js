const { NlpManager } = require("node-nlp");
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Create a new instance of NlpManager
const manager = new NlpManager({ languages: ["vi"] });

// Load an existing model or train a new one
async function loadModel() {
  // Load a model from file (optional, if you have a pre-trained model saved)
  await manager.load("model.nlp");
  manager.save();
}
loadModel();

function askQuestion() {
  rl.question("User: ", async (answer) => {
    const response = await manager.process("vi", answer);
    console.log(response);
    if (response.answer) {
      console.log("Bot:", response.answer);
    } else {
      console.log("Bot:", "Tôi không hiểu câu hỏi của bạn. Bạn có thể nói rõ hơn không?");
    }
    askQuestion(); // Ask the next question
  });
}

askQuestion();
