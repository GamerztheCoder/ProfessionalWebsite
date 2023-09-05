"use strict";

// Define a class for text scrambling animation
class TextScramble {
  constructor(el) {
    this.el = el;
    this.chars = "!<>-_\\/[]{}—=+*^?#________";
    this.update = this.update.bind(this);
  }

  // Set text with a scrambling effect
  setText(newText) {
    const oldText = this.el.innerHTML;
    const length = Math.max(oldText.length, newText.length);
    const promise = new Promise((resolve) => (this.resolve = resolve));
    this.queue = [];
    for (let i = 0; i < length; i++) {
      const from = oldText[i] || "";
      const to = newText[i] || "";
      const start = Math.floor(Math.random() * 40);
      const end = start + Math.floor(Math.random() * 40);
      this.queue.push({ from, to, start, end });
    }
    cancelAnimationFrame(this.frameRequest);
    this.frame = 0;
    this.update();
    return promise;
  }

  // Update the text scrambling animation
  update() {
    let output = "";
    let complete = 0;
    for (let i = 0, n = this.queue.length; i < n; i++) {
      let { from, to, start, end, char } = this.queue[i];
      if (this.frame >= end) {
        complete++;
        output += to;
      } else if (this.frame >= start) {
        if (!char || Math.random() < 0.28) {
          char = this.randomChar();
          this.queue[i].char = char;
        }
        output += `<span class="dud">${char}</span>`;
      } else {
        output += from;
      }
    }
    this.el.innerHTML = output;
    if (complete === this.queue.length) {
      this.resolve();
    } else {
      this.frameRequest = requestAnimationFrame(this.update);
      this.frame++;
    }
  }

  // Generate a random character from the defined character set
  randomChar() {
    return this.chars[Math.floor(Math.random() * this.chars.length)];
  }
}

// Initialize the text scrambling animations
let textChange = document.getElementById("changeText");
let phrases = ["web developer.", "videogame developer."];
const el = document.querySelector("#changeText");
const fx = new TextScramble(el);

let counter = 0;

// Function to change the text with scrambling effect
const next = () => {
  fx.setText(phrases[counter]).then(() => {
    setTimeout(next, 2500);
  });
  counter = (counter + 1) % phrases.length;
};

next();

// Initialize another text scrambling animation
let words = ["I would love your email,", "so I can send you a thank you."];
let le = document.querySelector("#login");
let xf = new TextScramble(le);
let retnuoc = 0;

// Function to change the login text with scrambling effect
let txen = () => {
  xf.setText(words[retnuoc]).then(() => {
    setTimeout(txen, 1500);
  });
  retnuoc = (retnuoc + 1) % words.length;
};

txen();

// Function to open a program in a new popup window
function openProgram(program) {
  const filePath = program;
  const popupOptions = "width=600,height=600,resizable=no,scrollbars=no";

  // Open a new popup window with specified program and options
  const popup = window.open(filePath, "PopupWindow", popupOptions);

  // If popup is blocked by the browser, display an alert
  if (!popup) {
    alert(
      "Your browser has blocked usage of my program from your browser. Please allow popups to continue."
    );
  }
}

// Function to send an email to the webmaster
function emailWebMaster(event) {
  let email = document.getElementById("email").value;
  let name = document.getElementById("name").value;
  let userMessage = document.getElementById("message").value;

  emailjs.init("SwlAmiR7IPUU2WCz1");

  let params = {
    to_email: "haptonstall.aiden@gmail.com",
    from_name: email,
    message:
      name +
      ", has visited your website and left you this message. " +
      userMessage,
  };

  emailjs
    .send("service_sqtd1dk", "template_5732h16", params)
    .then(function (response) {
      console.log("Email sent:", response);
    })
    .catch(function (error) {
      console.error("Error sending email:", error);
    });
}

// Function to read the content aloud when the "Read" button is clicked
const readButton = document.getElementById("readButton");
const contentToRead = document.querySelector(".speek");

const synth = window.speechSynthesis;
const utterance = new SpeechSynthesisUtterance();

readButton.addEventListener("click", () => {
  utterance.text = contentToRead.textContent;
  console.log(utterance);
  synth.speak(utterance);
});

// Function to handle changes in CSS classes based on window width
function classChange() {
  let windowWidth = window.innerWidth;
  if (windowWidth <= 720) {
    let navigation = document.querySelectorAll(".navBar");
    navigation.forEach((element) => {
      element.classList.remove("navBar");
      element.classList.add("hiddenNav");
    });
  } else {
    let navigation = document.querySelectorAll(".hiddenNav");
    navigation.forEach((element) => {
      element.classList.remove("hiddenNav");
      element.classList.add("navBar");
    });
  }
}

setInterval(classChange, 100);

// Function to enable text-to-speech on button focus
const speachButton = document.querySelector("#texttoSpeech");

function textToSpeech() {
  const htnys = window.speechSynthesis;
  const ecnarettu = new SpeechSynthesisUtterance();
  ecnarettu.text = speachButton.textContent;
  htnys.speak(ecnarettu);
}

speachButton.addEventListener("focus", () => {
  console.log("Running");
  textToSpeech();
});

// Function to open the modal overlay
function openModal() {
  document.getElementById("modal-overlay").style.display = "block";
}

// Function to close the modal overlay
function closeModal() {
  document.getElementById("modal-overlay").style.display = "none";
}

// Function to close the modal and send user information
function closeSignIn() {
  let email = document.querySelector("#email");
  emailWebMaster(event);
  email.value = "";
  document.getElementById("name").value = "";
  document.getElementById("message").value = "";
  closeModal();
}

// Event listener to close the modal when the overlay is clicked
let overlay = document.querySelector(".modal-overlay");
overlay.addEventListener("click", function (event) {
  if (event.target.className == "modal-overlay") {
    closeModal();
  }
});
