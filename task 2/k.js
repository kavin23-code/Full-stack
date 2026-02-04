class Expense {
    constructor(title, amount, category, date) {
        this.title = title;
        this.amount = amount;
        this.category = category;
        this.date = date;
    }
}

let expenses = JSON.parse(localStorage.getItem("expenses")) || [];

const form = document.getElementById("expenseForm");
const list = document.getElementById("expenseList");
const canvas = document.getElementById("chart");
const ctx = canvas.getContext("2d");
const clearBtn = document.getElementById("clearBtn");

form.addEventListener("submit", function (e) {
    e.preventDefault();

    const expense = new Expense(
        title.value,
        Number(amount.value),
        category.value,
        date.value
    );

    expenses.push(expense);
    localStorage.setItem("expenses", JSON.stringify(expenses));

    displayExpenses();
    drawChart();
    form.reset();
});

clearBtn.addEventListener("click", function () {
    expenses = [];
    localStorage.removeItem("expenses");
    displayExpenses();
    drawChart();
});

function displayExpenses() {
    list.innerHTML = "";
    expenses.forEach(exp => {
        const li = document.createElement("li");
        li.textContent = `${exp.title} - ₹${exp.amount} (${exp.category})`;
        list.appendChild(li);
    });
}

function categorySummary() {
    const categories = [...new Set(expenses.map(e => e.category))];

    return categories.map(cat => {
        const total = expenses
            .filter(e => e.category === cat)
            .reduce((sum, e) => sum + e.amount, 0);
        return { cat, total };
    });
}

function drawChart() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const data = categorySummary();

    let x = 30;
    data.forEach(item => {
        ctx.fillStyle = "green";
        ctx.fillRect(x, canvas.height - item.total, 40, item.total);
        ctx.fillStyle = "black";
        ctx.fillText(item.cat, x, canvas.height - 5);
        x += 70;
    });
}

AdisplayExpenses();
drawChart();