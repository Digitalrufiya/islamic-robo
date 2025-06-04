import { initializeApp } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-app.js";
import { getDatabase, ref, push, onValue } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-database.js";

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyB-W_j74lsbmJUFnTbJpn79HM62VLmkQC8",
  authDomain: "drfsocial-23a06.firebaseapp.com",
  databaseURL: "https://drfsocial-23a06-default-rtdb.firebaseio.com",
  projectId: "drfsocial-23a06",
  storageBucket: "drfsocial-23a06.appspot.com",
  messagingSenderId: "608135115201",
  appId: "1:608135115201:web:dc999df2c0f37241ff3f40",
  measurementId: "G-W6VHMP77YR"
};
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// ImgBB API key
const IMGBB_API_KEY = "02aeb122c5b92d7f3b98d91ad02cdadd";

// Upload image to ImgBB
async function uploadImage(file) {
  const formData = new FormData();
  formData.append("image", file);

  const res = await fetch(`https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`, {
    method: "POST",
    body: formData,
  });
  const data = await res.json();
  return data.data.url;
}

// Post form handler
document.getElementById("postForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const caption = document.getElementById("caption").value;
  const wallet = document.getElementById("wallet").value;
  const file = document.getElementById("mediaFile").files[0];

  if (!caption || !wallet || !file) return alert("All fields required!");

  const imageUrl = await uploadImage(file);
  const postRef = ref(db, "posts");
  await push(postRef, {
    caption,
    wallet,
    imageUrl,
    timestamp: Date.now()
  });

  document.getElementById("postForm").reset();
  alert("Posted successfully!");
});

// Load feed
const feed = document.getElementById("feed");
const postsRef = ref(db, "posts");

onValue(postsRef, (snapshot) => {
  feed.innerHTML = "";
  const posts = snapshot.val();
  if (posts) {
    Object.values(posts)
      .sort((a, b) => b.timestamp - a.timestamp)
      .forEach((post) => {
        const div = document.createElement("div");
        div.className = "post";
        div.innerHTML = `
          <strong>${post.wallet}</strong><br/>
          <p>${post.caption}</p>
          ${post.imageUrl.endsWith(".mp4") 
            ? `<video controls src="${post.imageUrl}"></video>` 
            : `<img src="${post.imageUrl}" alt="Media" />`}
        `;
        feed.appendChild(div);
      });
  }
});
