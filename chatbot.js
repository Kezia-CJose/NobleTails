// chatbot.js - small keyword chatbot (floating button, bottom-right)
var fab = document.createElement("button");
fab.id = "chatFab";
fab.textContent = "💬";
var chatBox = document.createElement("div");
chatBox.id = "chatBox";
chatBox.innerHTML = '<div id="chatLog"><div class="bot-msg">Hi! I am the NobleTails helper. Ask me about adopting, fostering, volunteering or donating.</div></div>' +
  '<input type="text" id="chatInput" placeholder="Type here..."><button id="chatSend">Send</button>';
document.body.appendChild(fab);
document.body.appendChild(chatBox);

var chatLog = document.getElementById("chatLog");
var chatInput = document.getElementById("chatInput");

var replies = [
  { words: ["adopt", "adoption"], text: "To adopt, pick a pet from this page and register on the Join Us page. Choose 'Adopt a pet' and we will call you." },
  { words: ["foster"], text: "Fostering means keeping a pet at home for a few weeks until it finds a family. Register and choose 'Foster a pet'." },
  { words: ["volunteer", "club", "join"], text: "Join our Volunteer Club! Check the Volunteer Club page for roles and meeting time, then register." },
  { words: ["donate", "donation", "money"], text: "Donations buy food and medicine. Try the Food Calculator page to see how much food we need." },
  { words: ["food", "calculator"], text: "The Food Calculator page works out how much food our pets need for any number of days." },
  { words: ["rescue", "injured", "stray"], text: "If you find an injured or stray cat or dog, use the Report Stray page. Our rescue team gets notified with the address." },
  { words: ["play", "game", "fun", "bored", "sound"], text: "Go to the Adopt page and click on any pet. It will bark, growl, meow or purr back at you!" },
  { words: ["hi", "hello", "hey"], text: "Hello! How can I help you today?" },
  { words: ["bye", "thanks", "thank"], text: "Thank you! Be kind to animals. 🐾" }
];

function addMsg(text, cls) {
  var d = document.createElement("div");
  d.className = cls;
  d.textContent = text;
  chatLog.appendChild(d);
  chatLog.scrollTop = chatLog.scrollHeight;
}

function sendChat() {
  var msg = chatInput.value.trim();
  if (msg === "") return;
  addMsg(msg, "user-msg");
  chatInput.value = "";
  var answer = "Sorry, I did not understand. Try words like adopt, foster, volunteer or donate.";
  var found = false;
  var lower = msg.toLowerCase();
  for (var i = 0; i < replies.length && !found; i++) {
    for (var j = 0; j < replies[i].words.length; j++) {
      if (lower.indexOf(replies[i].words[j]) !== -1) { answer = replies[i].text; found = true; break; }
    }
  }
  setTimeout(function () { addMsg(answer, "bot-msg"); }, 400);
}

fab.addEventListener("click", function () { chatBox.classList.toggle("open"); });
document.getElementById("chatSend").addEventListener("click", sendChat);
chatInput.addEventListener("keydown", function (e) { if (e.key === "Enter") sendChat(); });
