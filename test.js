function lightSleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function performAction() {
  console.log("Starting action...");
  setTimeout(() => {
    console.log("Action paused for 2 seconds.");
  }, 2000);
  console.log("End");
}

performAction();
