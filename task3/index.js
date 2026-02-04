let maxChars = 0;
let warningLimit = 0;

const form = document.getElementById("configForm");
const textarea = document.getElementById("textArea");
const counter = document.getElementById("counter");

form.addEventListener("submit", function (e) {
    e.preventDefault();

    maxChars = parseInt(document.getElementById("maxChars").value);
    const warnPercent = parseInt(document.getElementById("warnPercent").value);

    if (maxChars <= 0 || warnPercent <= 0) {
        alert("Values must be positive numbers");
        return;
    }

    warningLimit = Math.floor((warnPercent / 100) * maxChars);

    if (warningLimit >= maxChars) {
        alert("Warning limit must be less than maximum characters");
        return;
    }

    textarea.value = "";
    textarea.disabled = false;
    textarea.maxLength = maxChars;
    counter.textContent = `Remaining: ${maxChars}`;
    counter.style.color = "black";
});

textarea.addEventListener("input", function () {
    const used = textarea.value.length;
    const remaining = maxChars - used;

    counter.textContent = `Remaining: ${remaining}`;

    if (used >= warningLimit) {
        counter.style.color = "red";
    } else {
        counter.style.color = "green";
    }
});