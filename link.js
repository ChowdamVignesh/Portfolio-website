//hamburger
    // 1. Get the necessary elements
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const hamburgerIcon = hamburger.querySelector('i'); // The <i> tag for the icon

    // 2. Function to toggle the menu state
    function toggleMenu() {
        // Toggle the 'active' class on the links container (this handles sliding the menu)
        navLinks.classList.toggle('active');

        // Toggle the icon class (this handles changing the icon)
        if (navLinks.classList.contains('active')) {
            // Menu is open: show the cross mark
            hamburgerIcon.classList.remove('fa-bars');
            hamburgerIcon.classList.add('fa-times'); // 'fa-times' is the Font Awesome cross
            hamburger.setAttribute('aria-expanded', 'true');
        } else {
            // Menu is closed: show the hamburger icon
            hamburgerIcon.classList.remove('fa-times');
            hamburgerIcon.classList.add('fa-bars'); // 'fa-bars' is the Font Awesome hamburger
            hamburger.setAttribute('aria-expanded', 'false');
        }
    }

    // 3. Attach the event listeners
    hamburger.addEventListener('click', toggleMenu);

    // Optional: Close the menu when a link is clicked (common mobile behavior)
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) {
                toggleMenu(); // Closes the menu
            }
        });
    });

// swiper
const swiper = new Swiper(".card-wrapper", {
  loop: true,
  spaceBetween: 30,

  // If we need pagination
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
    dynamicBullets: true,
  },

  // Navigation arrows
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  breakpoints: {
    0: {
      slidesPerView: 1,
    },
    768: {
      slidesPerView: 2,
    },
    1024: {
      slidesPerView: 3,
    },
  },
});
const chatContainer = document.getElementById("chat-container");
const chatToggle = document.getElementById("chat-toggle");
const closeChat = document.getElementById("close-chat");
const chatBox = document.getElementById("chat-box");
const userInput = document.getElementById("user-input");
const sendBtn = document.getElementById("send-btn");

// Toggle chat open/close
chatToggle.addEventListener("click", () => {
  chatContainer.style.display = "flex";
  chatToggle.style.display = "none";
});

closeChat.addEventListener("click", () => {
  chatContainer.style.display = "none";
  chatToggle.style.display = "flex";
});

// Add message to chat
function addMessage(content, sender) {
  const message = document.createElement("div");
  message.classList.add("message", sender);
  message.textContent = content;
  chatBox.appendChild(message);
  chatBox.scrollTop = chatBox.scrollHeight;
}

// Simple AI response (mock)
function getBotResponse(text) {
  const lower = text.toLowerCase();

  if (lower.includes("hi")) return "Hello! 👋";
  if (lower.includes("hello")) return "Hi there! 👋";
  if (lower.includes("how are you")) return "I'm doing great, thanks for asking!";
  if (lower.includes("name")) return "I'm ChatGPT AI 🤖";
  if (lower.includes("bye")) return "Goodbye! 👋";

  return "I'm not sure I understand that yet 😅";
}

// Handle send
sendBtn.addEventListener("click", () => {
  const text = userInput.value.trim();
  if (text === "") return;

  addMessage(text, "user");
  userInput.value = "";

  setTimeout(() => {
    const reply = getBotResponse(text);
    addMessage(reply, "bot");
  }, 500);
});

