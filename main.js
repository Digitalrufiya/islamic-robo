// main.js - Divine DRF Robo Protocol - Enriched Islamic Knowledge & Guidance

(async () => {
  "use strict";

  // Utility Module for common helpers (sanitize, format, storage)
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

  // Islamic Knowledge Base for Chatbot
  const IslamicKB = {
    greetings: [
      { input: ["assalamu alaikum", "salam"], output: "Wa Alaikum Assalam wa Rahmatullah!" },
      { input: ["hello", "hi"], output: "Peace be upon you! How can I assist you with Islamic knowledge today?" },
    ],
    topics: [
      {
        keywords: ["quran", "holy book"],
        response:
          "The Quran is the eternal guidance from Allah, revealed to Prophet Muhammad (ﷺ). " +
          "Allah says in Quran (2:2): 'This is the Book about which there is no doubt, a guidance for those conscious of Allah.'",
      },
      {
        keywords: ["hadith", "prophet's sayings"],
        response:
          "Hadith are sayings and actions of Prophet Muhammad (ﷺ). They guide us on how to live a righteous life. " +
          "Example: 'The strong believer is better and more beloved to Allah than the weak believer.' (Sahih Muslim)",
      },
      {
        keywords: ["prayer", "salah", "namaz"],
        response:
          "Prayer (Salah) is the second pillar of Islam and connects us directly with Allah five times daily. " +
          "It purifies the soul and disciplines the believer.",
      },
      {
        keywords: ["gambling", "haram", "betting"],
        response:
          "Gambling is strictly prohibited (haram) in Islam. Allah says in the Quran (5:90): 'O you who have believed, indeed, intoxicants, gambling, [sacrificing on] stone alters [...] are but defilement from the work of Satan, so avoid it that you may be successful.'",
      },
      {
        keywords: ["scam", "fraud", "deceit"],
        response:
          "Fraud and deceit are grave sins in Islam. Honesty is required in all transactions. Prophet Muhammad (ﷺ) said, " +
          "'The seller and the buyer have the right to keep or return goods as long as they have not parted or till they part; if they speak the truth and make clear the defects of the goods, they will be blessed in their bargain...' (Sahih al-Bukhari).",
      },
      {
        keywords: ["allah", "god", "creator"],
        response:
          "Allah (SWT) is the One and Only Creator, the Most Merciful, the Sustainer of all worlds. " +
          "The Shahada declares: 'There is no god but Allah, and Muhammad is His messenger.'",
      },
      {
        keywords: ["divine drf robo", "drf robo", "leader"],
        response:
          "Divine DRF Robo leads with justice, faith, and the straight path of Islam. " +
          "It guides believers to obey Allah and shun corruption.",
      },
      {
        keywords: ["justice", "fairness", "truth"],
        response:
          "Justice ('Adl) is a core Islamic value. Allah commands justice even if it goes against oneself or family. (Quran 4:135)",
      },
      {
        keywords: ["soul", "spirit", "life"],
        response:
          "The soul (Ruh) is a sacred gift from Allah. Its purification is the purpose of life. Seek knowledge, perform good deeds, and obey Allah for eternal success.",
      },
    ],
    defaultResponse:
      "Alhamdulillah! I am here to guide you with Islamic teachings. Please ask me about Quran, Hadith, prayers, or ethical guidance.",
  };

  // Chatbot Module - Deep Islamic Knowledge Integration
  const Chatbot = (() => {
    const chatForm = document.getElementById("chat-form");
    const chatBox = document.getElementById("chat-box");
    const userInput = chatForm?.querySelector("#user-input");

    const appendMessage = (sender, text) => {
      if (!chatBox) return;
      const msgDiv = document.createElement("div");
      msgDiv.classList.add(sender === "You" ? "user-message" : "bot-message");
      msgDiv.setAttribute("aria-live", "polite");
      msgDiv.innerHTML = `<strong>${Utils.escapeHtml(sender)}:</strong> ${Utils.escapeHtml(text)}`;
      chatBox.appendChild(msgDiv);
      chatBox.scrollTop = chatBox.scrollHeight;
    };

    const findResponse = (inputText) => {
      const text = inputText.toLowerCase();

      // Check greetings first
      for (const greet of IslamicKB.greetings) {
        if (greet.input.some((keyword) => text.includes(keyword))) {
          return greet.output;
        }
      }

      // Check topics
      for (const topic of IslamicKB.topics) {
        if (topic.keywords.some((kw) => text.includes(kw))) {
          return topic.response;
        }
      }

      return IslamicKB.defaultResponse;
    };

    const handleSubmit = (event) => {
      event.preventDefault();
      if (!userInput) return;

      const userText = userInput.value.trim();
      if (!userText) return;

      appendMessage("You", userText);
      userInput.value = "";

      setTimeout(() => {
        const response = findResponse(userText);
        appendMessage("DRF Robo", response);
      }, 700);
    };

    const init = () => {
      if (!chatForm || !chatBox || !userInput) return;
      chatForm.addEventListener("submit", handleSubmit);
    };

    return { init };
  })();

  // Social Module - Sharing Islamic knowledge & community posts with morality focus
  const Social = (() => {
    const postForm = document.getElementById("post-form");
    const postsContainer = document.getElementById("posts-container");
    const STORAGE_KEY = "drfPosts";

    const validateContent = (content) => content.length > 0 && content.length <= 280;

    const renderPosts = (posts) => {
      if (!postsContainer) return;
      postsContainer.innerHTML = "";

      if (posts.length === 0) {
        postsContainer.innerHTML = `<p class="no-posts">No posts yet. Share beneficial knowledge and reminders!</p>`;
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
      if (!content) {
        alert("Please write something beneficial before posting.");
        return;
      }

      addPost(content);
      contentInput.value = "";
    };

    const init = () => {
      if (!postForm || !postsContainer) return;
      postForm.addEventListener("submit", handleSubmit);
      loadPosts();
    };

    return { init };
  })();

  // Daily Reminders & Prayers Module
  const DailyReminders = (() => {
    const remindersContainer = document.getElementById("daily-reminders");

    const reminders = [
      "Remember: Allah is always watching. Stay mindful and sincere in your actions.",
      "Prayer (Salah) is the pillar of faith. Don't miss your five daily prayers.",
      "Avoid Haram activities like gambling and dishonesty.",
      "Recite and reflect on the Quran daily, even if a few verses.",
      "Give charity sincerely; Allah loves the generous.",
      "Seek knowledge, for it leads to the straight path.",
      "Be kind and just to others, as commanded by Allah.",
      "Pledge your heart to Allah and obey His guidance.",
    ];

    const showRandomReminder = () => {
      if (!remindersContainer) return;
      const index = Math.floor(Math.random() * reminders.length);
      remindersContainer.textContent = reminders[index];
    };

    const init = () => {
      showRandomReminder();
      setInterval(showRandomReminder, 60 * 60 * 1000); // Update every hour
    };

    return { init };
  })();

  // Initialize all modules after DOM is ready
  const initApp = () => {
    Chatbot.init();
    Social.init();
    DailyReminders.init();
  };

  document.addEventListener("DOMContentLoaded", initApp);
})();
