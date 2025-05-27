<script>
function answerQuestion() {
  const question = document.getElementById("userQuestion").value.trim();
  const box = document.getElementById("answerBox");

  if (!question) {
    box.innerText = "Please enter a question.";
    return;
  }

  box.innerText = "🤖 Thinking...";

  fetch("chat.php", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({question})
  })
  .then(res => res.text())
  .then(answer => {
    box.innerText = answer;
    document.getElementById("userQuestion").value = "";
  })
  .catch(err => {
    box.innerText = "Error getting answer. Try again later.";
  });
}
</script>
