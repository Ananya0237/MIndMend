import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI('AIzaSyCqFobXB4dbsnz7B2LGhPTjYPGHkF1WFAk');
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// Set up button click event
document.querySelector("#send-button").onclick = () => handleUserMessage();

// Set up 'Enter' key to trigger message send
document.getElementById("user-input").addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        handleUserMessage();
    }
});

async function handleUserMessage() {
    const inputField = document.getElementById("user-input");
    const userMessage = inputField.value.trim();
    console.log('hello');
    
    // If input is empty, do nothing
    if (!userMessage) return;

    // Display user's message and clear the input field
    displayMessage(userMessage, "user-message");
    inputField.value = "";

    // Generate and display the bot's response
    const botResponse = await getBotResponse(userMessage);
    displayMessage(botResponse, "bot-message");
}

// Function to display messages in the chat box
function displayMessage(message, className) {
    const chatBox = document.getElementById("chat-box");
    const messageDiv = document.createElement("div");
    messageDiv.textContent = message;
    messageDiv.className = className;
    chatBox.appendChild(messageDiv);
    chatBox.scrollTop = chatBox.scrollHeight; // Auto-scroll to the bottom
}

// Function to get bot response from Google Generative AI
async function getBotResponse(prompt) {
  try {
      // Directly pass the prompt string as shown in the documentation
      const result = await model.generateContent(prompt);
      
      // Check if the response is present, then return the response text
      if (result && result.response && typeof result.response.text === "function") {
          return result.response.text();
      } else {
          console.error("Unexpected response structure:", result);
          return "Bot could not respond. Please try again.";
      }
  } catch (error) {
      console.error("Error generating bot response:", error);
      return "There was an error processing your request.";
  }
}
