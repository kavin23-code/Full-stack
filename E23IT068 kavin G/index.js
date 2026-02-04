const questions = [
    {
        question: "What does HTML stand for?",
        options: [
            "Hyper Text Markup Language",
            "High Text Machine Language",
            "Hyperlinks and Text Markup Language",
            "Home Tool Markup Language"
        ],
        correctIndex: 0
    },
    {
        question: "Which CSS property controls text color?",
        options: ["font-style", "color", "text-decoration", "background-color"],
        correctIndex: 1
    },
    {
        question: "Which symbol is used for comments in JavaScript?",
        options: ["<!-- -->", "//", "/* */", "#"],
        correctIndex: 1
    },
    {
        question: "Which method is used to select an element by ID?",
        options: [
            "querySelectorAll()",
            "getElementsByClassName()",
            "getElementById()",
            "getElementsByTagName()"
        ],
        correctIndex: 2
    },
    {
        question: "Which keyword declares a constant in JavaScript?",
        options: ["var", "let", "const", "static"],
        correctIndex: 2
    }
];

let currentIndex = 0;
const answers = new Array(questions.length).fill(null);

const questionContainer = document.getElementById("question-container");
const progress = document.getElementById("progress");
const resultDiv = document.getElementById("result");

const loadQuestion = () => {
    const q = questions[currentIndex];

    progress.textContent = `Question ${currentIndex + 1} of ${questions.length}`;

    questionContainer.innerHTML = `
        <h3>${q.question}</h3>
        <div class="options">
            ${q.options.map((opt, index) => `
                <label>
                    <input type="radio" name="option" value="${index}"
                    ${answers[currentIndex] === index ? "checked" : ""}>
                    ${opt}
                </label>
            `).join("")}
        </div>
    `;

    document.querySelectorAll("input[name='option']").forEach(input => {
        input.addEventListener("change", e => {
            answers[currentIndex] = Number(e.target.value);
        });
    });
};

document.getElementById("nextBtn").addEventListener("click", () => {
    if (currentIndex < questions.length - 1) {
        currentIndex++;
        loadQuestion();
    }
});

document.getElementById("prevBtn").addEventListener("click", () => {
    if (currentIndex > 0) {
        currentIndex--;
        loadQuestion();
    }
});

document.getElementById("submitBtn").addEventListener("click", () => {
    if (answers.includes(null)) {
        alert("Please answer all questions before submitting.");
        return;
    }

    let score = 0;

    answers.forEach((ans, i) => {
        if (ans === questions[i].correctIndex) {
            score++;
        }
    });

    const percentage = (score / questions.length) * 100;
    let feedback = percentage >= 70 ? "Great job! 🎉" : "Keep practicing! 💪";

    resultDiv.classList.remove("hidden");
    resultDiv.innerHTML = `
        <h3>Quiz Completed</h3>
        <p>Score: ${score} / ${questions.length}</p>
        <p>Percentage: ${percentage}%</p>
        <p>${feedback}</p>
    `;
});

loadQuestion();
