const startSprintBtn = document.getElementById('startSprintBtn');
const sprintArea = document.getElementById('sprintArea');
const timerDisplay = document.getElementById('timerDisplay');
const stopSprintBtn = document.getElementById('stopSprintBtn');

let sprintTimer;
let totalSeconds = 10 * 60; // 10 دقائق

function formatTime(seconds) {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
}

function startSprint() {
  startSprintBtn.style.display = 'none';
  sprintArea.classList.remove('hidden');
  totalSeconds = 10 * 60;
  timerDisplay.textContent = formatTime(totalSeconds);

  sprintTimer = setInterval(() => {
    totalSeconds--;
    timerDisplay.textContent = formatTime(totalSeconds);

    if (totalSeconds <= 0) {
      clearInterval(sprintTimer);
      alert('انتهت جلسة المذاكرة، أحسنت!');
      endSprint();
    }
  }, 1000);
}

function endSprint() {
  sprintArea.classList.add('hidden');
  startSprintBtn.style.display = 'block';
}

startSprintBtn.addEventListener('click', startSprint);
stopSprintBtn.addEventListener('click', () => {
  clearInterval(sprintTimer);
  alert('تم إيقاف الجلسة');
  endSprint();
});
const flashcardsBtn = document.getElementById("flashcardsBtn");
const flashcardSection = document.getElementById("flashcardSection");
const flashcardForm = document.getElementById("flashcardForm");
const cardsContainer = document.getElementById("cardsContainer");

let flashcards = JSON.parse(localStorage.getItem("flashcards")) || [];

function renderFlashcards() {
  cardsContainer.innerHTML = "";
  flashcards.forEach((card, index) => {
    const cardDiv = document.createElement("div");
    cardDiv.style.border = "1px solid #ccc";
    cardDiv.style.padding = "15px";
    cardDiv.style.margin = "10px";
    cardDiv.style.borderRadius = "8px";
    cardDiv.style.background = "#fff";

    const q = document.createElement("p");
    q.textContent = `❓ ${card.question}`;
    const a = document.createElement("p");
    a.textContent = `✅ ${card.answer}`;
    a.style.display = "none";

    const toggleBtn = document.createElement("button");
    toggleBtn.textContent = "👁️ عرض/إخفاء الإجابة";
    toggleBtn.onclick = () => {
      a.style.display = a.style.display === "none" ? "block" : "none";
    };

    cardDiv.appendChild(q);
    cardDiv.appendChild(a);
    cardDiv.appendChild(toggleBtn);
    cardsContainer.appendChild(cardDiv);
  });
}

flashcardForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const question = document.getElementById("question").value;
  const answer = document.getElementById("answer").value;

  if (question && answer) {
    flashcards.push({ question, answer });
    localStorage.setItem("flashcards", JSON.stringify(flashcards));
    flashcardForm.reset();
    renderFlashcards();
  }
});

flashcardsBtn.addEventListener("click", () => {
  sprintArea.classList.add("hidden");
  flashcardSection.classList.remove("hidden");
  renderFlashcards();
});
