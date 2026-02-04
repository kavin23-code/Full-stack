// Simple Phonebook app (with optional pre-populated contacts)
// Stores contacts in an array and in localStorage
// Features: add, display, search (filter by name), delete

const STORAGE_KEY = 'phonebook_contacts_v1';

let contacts = []; // array of {id, name, phone, email}

const form = document.getElementById('add-contact-form');
const nameInput = document.getElementById('name');
const phoneInput = document.getElementById('phone');
const emailInput = document.getElementById('email');
const searchInput = document.getElementById('search');
const tbody = document.getElementById('contacts-tbody');
const emptyMessage = document.getElementById('empty-message');

// A small set of 15 sample contacts (used only when there are no saved contacts)
const SAMPLE_CONTACTS = [
    { name: "kavin", phone: "9344194492", email: "alice.j@example.com" },
    { name: "gugan", phone: "+1 415-555-0144", email: "bob.m@example.com" },
    { name: "kathir", phone: "+44 20 7946 0958", email: "c.rivera@example.co.uk" },
    { name: "thamil", phone: "+61 2 9123 4567", email: "diana.lee@example.au" },
    { name: "prakash", phone: "+1 212-555-0199", email: "ebrown@example.com" },
    { name: "gokul", phone: "+86 10 5555 1212", email: "fiona.z@example.cn" },
    { name: "suresh", phone: "+91 22 5555 0202", email: "gpatel@example.in" },
    { name: "hari", phone: "+49 30 5555 3333", email: "h.schultz@example.de" },
    { name: "rajith", phone: "+420 2 5555 4444", email: "ivan.n@example.cz" },
    { name: "sri", phone: "+33 1 55 55 55 55", email: "julia.moreau@example.fr" },
    { name: "shanmugham", phone: "+233 30 222 3333", email: "kofi.m@example.gh" },
    { name: " sudhan", phone: "+39 06 5555 6666", email: "laura.rossi@example.it" },
    { name: "vijay", phone: "+34 91 555 7777", email: "mateo.g@example.es" },
    { name: "john", phone: "+46 8 555 8888", email: "nora.s@example.se" },
    { name: "saai", phone: "+971 4 555 9999", email: "omar.ali@example.ae" }
];

function uniqueId() {
    return String(Date.now()) + Math.random().toString(36).slice(2, 8);
}

function loadContacts() {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        contacts = raw ? JSON.parse(raw) : [];

        // If no saved contacts, populate with sample contacts (one-time)
        if (!contacts || contacts.length === 0) {
            contacts = SAMPLE_CONTACTS.map(c => ({
                id: uniqueId(),
                name: c.name,
                phone: c.phone,
                email: c.email
            }));
            saveContacts();
        }
    } catch (e) {
        contacts = [];
        console.error('Failed to load contacts - script.js:57', e);
    }
}

function saveContacts() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(contacts));
}

function createRow(contact) {
    const tr = document.createElement('tr');
    tr.dataset.id = contact.id;

    const nameTd = document.createElement('td');
    nameTd.textContent = contact.name;

    const phoneTd = document.createElement('td');
    phoneTd.textContent = contact.phone;

    const emailTd = document.createElement('td');
    emailTd.textContent = contact.email || '';

    const actionsTd = document.createElement('td');
    const delBtn = document.createElement('button');
    delBtn.textContent = 'Delete';
    delBtn.className = 'danger';
    delBtn.dataset.id = contact.id;
    delBtn.addEventListener('click', onDeleteContact);
    actionsTd.appendChild(delBtn);

    tr.appendChild(nameTd);
    tr.appendChild(phoneTd);
    tr.appendChild(emailTd);
    tr.appendChild(actionsTd);

    return tr;
}

function renderContacts(filterText = '') {
    // Clear
    tbody.innerHTML = '';

    const filter = filterText.trim().toLowerCase();
    const filtered = contacts.filter(c => c.name.toLowerCase().includes(filter));

    if (filtered.length === 0) {
        emptyMessage.style.display = 'block';
    } else {
        emptyMessage.style.display = 'none';
    }

    // Append rows
    for (const c of filtered) {
        tbody.appendChild(createRow(c));
    }
}

function addContact(contact) {
    // Simple duplicate prevention by exact name + phone
    const exists = contacts.some(c => c.name === contact.name && c.phone === contact.phone);
    if (exists) {
        alert('A contact with the same name and phone already exists.');
        return false;
    }
    contacts.push(contact);
    saveContacts();
    return true;
}

function onDeleteContact(e) {
    const id = e.currentTarget.dataset.id;
    if (!id) return;
    // confirm
    if (!confirm('Delete this contact?')) return;
    contacts = contacts.filter(c => c.id !== id);
    saveContacts();
    renderContacts(searchInput.value);
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = nameInput.value.trim();
    const phone = phoneInput.value.trim();
    const email = emailInput.value.trim();

    if (!name || !phone) {
        alert('Please enter both name and phone.');
        return;
    }

    const contact = {
        id: uniqueId(),
        name,
        phone,
        email
    };

    const ok = addContact(contact);
    if (!ok) return;

    form.reset();
    nameInput.focus();
    renderContacts(searchInput.value);
});

searchInput.addEventListener('input', (e) => {
    renderContacts(e.target.value);
});

// keyboard: allow Enter in search to focus new contact name
searchInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        e.preventDefault();
        nameInput.focus();
    }
});

// initialization
loadContacts();
renderContacts();