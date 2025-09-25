function sendMessage() {
  const input = document.getElementById("userInput");
  const chatbox = document.getElementById("chatbox");
  if (!input.value.trim()) return;

  // Add user message
  const userMsg = document.createElement("p");
  userMsg.textContent = "You: " + input.value;
  chatbox.appendChild(userMsg);

  // Simulated AI response
  const aiMsg = document.createElement("p");
  aiMsg.textContent = "AI: I'm here to assist you! 🚀";
  chatbox.appendChild(aiMsg);

  input.value = "";
  chatbox.scrollTop = chatbox.scrollHeight;
}
