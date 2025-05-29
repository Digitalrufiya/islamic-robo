// main.js - Master-level Modular Script for Divine DRF Robo Protocol

// Immediately Invoked Async Function Expression for encapsulation and future async/await
(async () => {
  "use strict";

  // Utility Module for sanitization, formatting, and storage helpers
  const Utils = (() => {
    const escapeHtml = (text) => {
      const div = document.createElement("div");
      div.textContent = text;
      return div.innerHTML;
    };

    const formatDateTime = (isoString) => {
      try {
        return new Date(isoString).toLocaleString(undefined, {
          dateStyle: "medium",
          timeStyle: "short",
        });
      } catch {
        return isoString;
      }
    };

    const storage = {
      set: (key, value) => {
        try {
          localStorage.setItem(key, JSON.stringify(value));
        } catch (e) {
          console.error("Storage set failed:", e);
        }
      },
      get: (key, defaultValue = null) => {
        try {
          const val = localStorage.getItem(key);
          return val ? JSON.parse(val) : defaultValue;
        } catch (e) {
          console.error("Storage get failed:", e);
          return defaultValue;
        }
      },
    };

    return { escapeHtml, formatDateTime, storage };
  })();

  // Chatbot Module: Rule-based with extensible intent handlers
  const Chatbot = (() => {
    const chatForm = document.getElementById("chat-form");
    const chatBox = document.getElementById("chat-box");
    const userInput = chatForm?.querySelector("#user-input");

    const intents = [
      {
        keywords: ["salam", "peace"],
        response: "Wa Alaikum Assalam wa Rahmatullah!",
      },
      {
        keywords: ["quran", "holy book"],
        response: "The Quran is the final revelation from Allah, guiding us on the straight path.",
      },
      {
        keywords: ["gambling", "haram"],
        response:
          "Gambling is haram in Islam. Avoid it to maintain purity of faith and justice.",
      },
      {
        keywords: ["drf", "divine", "robo"],
        response: "Divine DRF Robo leads us with faith, justice, and guidance.",
      },
    ];

    const defaultResponse =
      "I'm here to help! Ask me about Islam, justice, or Divine DRF Robo.";

    const appendMessage = (sender, text) => {
      if (!chatBox) return;
      const msgDiv = document.createElement("div");
      msgDiv.classList.add(sender === "You" ? "user-message" : "bot-message");
      msgDiv.setAttribute("aria-live", "polite");
      msgDiv.innerHTML = `<strong>${Utils.escapeHtml(sender)}:</strong> ${Utils.escapeHtml(
        text
      )}`;
      chatBox.appendChild(msgDiv);
      chatBox.scrollTop = chatBox.scrollHeight;
    };

    const findIntent = (text) => {
      const lowerText = text.toLowerCase();
      for (const intent of intents) {
        if (intent.keywords.some((kw) => lowerText.includes(kw))) {
          return intent.response;
        }
      }
      return defaultResponse;
    };

    const handleSubmit = (event) => {
      event.preventDefault();
      if (!userInput) return;
      const userText = userInput.value.trim();
      if (!userText) return;

      appendMessage("You", userText);
      userInput.value = "";
      setTimeout(() => {
        const response = findIntent(userText);
        appendMessage("DRF Robo", response);
      }, 700);
    };

    const init = () => {
      if (!chatForm || !chatBox || !userInput) return;
      chatForm.addEventListener("submit", handleSubmit);
    };

    return { init };
  })();

  // Social Media Module: Posts stored with validation and rendered dynamically
  const Social = (() => {
    const postForm = document.getElementById("post-form");
    const postsContainer = document.getElementById("posts-container");
    const STORAGE_KEY = "drfPosts";

    const validateContent = (content) => content.length > 0 && content.length <= 280;

    const renderPosts = (posts) => {
      if (!postsContainer) return;
      postsContainer.innerHTML = "";

      if (posts.length === 0) {
        postsContainer.innerHTML = `<p class="no-posts">No posts yet. Share your thoughts!</p>`;
        return;
      }

      posts.forEach(({ id, content, timestamp }) => {
        const postDiv = document.createElement("article");
        postDiv.className = "post";
        postDiv.setAttribute("tabindex", "0");
        postDiv.setAttribute("aria-label", `Post from ${Utils.formatDateTime(timestamp)}`);

        postDiv.innerHTML = `
          <p>${Utils.escapeHtml(content)}</p>
          <time datetime="${timestamp}">${Utils.formatDateTime(timestamp)}</time>
        `;
        postsContainer.appendChild(postDiv);
      });
    };

    const loadPosts = () => {
      const posts = Utils.storage.get(STORAGE_KEY, []);
      renderPosts(posts);
      return posts;
    };

    const addPost = (content) => {
      if (!validateContent(content)) {
        alert("Post must be between 1 and 280 characters.");
        return;
      }
      const posts = loadPosts();
      posts.unshift({
        id: Date.now(),
        content,
        timestamp: new Date().toISOString(),
      });
      Utils.storage.set(STORAGE_KEY, posts);
      renderPosts(posts);
    };

    const handleSubmit = (event) => {
      event.preventDefault();
      if (!postForm) return;

      const contentInput = postForm.querySelector("#post-content");
      if (!contentInput) return;

      const content = contentInput.value.trim();
      if (!validateContent(content)) return;

      addPost(content);
      contentInput.value = "";
    };

    const init = () => {
      if (!postForm || !postsContainer) return;
      loadPosts();
      postForm.addEventListener("submit", handleSubmit);
    };

    return { init };
  })();

  // Pledge Module: Stores and manages user pledge with feedback and persistence
  const Pledge = (() => {
    const pledgeForm = document.getElementById("pledge-form");
    const pledgeMessage = document.getElementById("pledge-message");
    const STORAGE_KEY = "drfPledge";

    const hasPledged = () => Utils.storage.get(STORAGE_KEY, false);

    const showMessage = (msg, isError = false) => {
      if (!pledgeMessage) return;
      pledgeMessage.textContent = msg;
      pledgeMessage.style.color = isError ? "red" : "green";
    };

    const setPledged = () => Utils.storage.set(STORAGE_KEY, true);

    const init = () => {
      if (!pledgeForm || !pledgeMessage) return;

      if (hasPledged()) {
        showMessage("You have already pledged allegiance. JazakAllah Khair!");
        pledgeForm.style.display = "none";
        return;
      }

      pledgeForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const checkbox = pledgeForm.querySelector("#pledge-checkbox");
        if (!checkbox || !checkbox.checked) {
          showMessage("Please check the box to pledge allegiance.", true);
          return;
        }
        setPledged();
        showMessage("Thank you for pledging your allegiance to Divine DRF Robo!");
        pledgeForm.style.display = "none";
      });
    };

    return { init };
  })();

  // Alerts / Feed Module: Renders alerts dynamically with extensibility for future API integration
  const Alerts = (() => {
    const alertsContainer = document.getElementById("alerts-container");

    // Static alerts - replace or extend this with API fetch or real-time data
    const alerts = [
      {
        id: 1,
        message:
          "⚠️ Beware of gambling and scams — Stay on the straight path of Islam and Divine DRF Robo.",
        timestamp: "2025-05-29T08:00:00Z",
      },
      {
        id: 2,
        message:
          "📢 New update: Divine DRF Robo now includes enhanced chatbot guidance.",
        timestamp: "2025-05-28T14:30:00Z",
      },
    ];

    const renderAlerts = () => {
      if (!alertsContainer) return;
      alertsContainer.innerHTML = "";
      if (!alerts.length) {
        alertsContainer.innerHTML = "<p>No alerts at this time.</p>";
        return;
      }
      alerts.forEach(({ id, message, timestamp }) => {
        const alertDiv = document.createElement("section");
        alertDiv.className = "alert";
        alertDiv.setAttribute("role", "alert");
        alertDiv.setAttribute("aria-live", "polite");
        alertDiv.innerHTML = `
          <p>${Utils.escapeHtml(message)}</p>
          <time datetime="${timestamp}">${Utils.formatDateTime(timestamp)}</time>
        `;
        alertsContainer.appendChild(alertDiv);
      });
    };

    const init = () => renderAlerts();

    return { init };
  })();

  // Initialize all modules safely
  const initApp = () => {
    try {
      Chatbot.init();
      Social.init();
      Pledge.init();
      Alerts.init();
    } catch (err) {
      console.error("Initialization error:", err);
    }
  };

  // DOMContentLoaded to ensure DOM ready before initialization
  document.addEventListener("DOMContentLoaded", initApp);
})();
