// ------------------------------------------------------------
// 1. Load any saved quotes, or fall back to three defaults
// ------------------------------------------------------------
let quotes = loadQuotes() || [
  { text: "Life is what happens when you're busy making other plans.", category: "Life" },
  { text: "The only limit to our realization of tomorrow is our doubts of today.", category: "Motivation" },
  { text: "In the middle of every difficulty lies opportunity.", category: "Inspiration" },
];

// ------------------------------------------------------------
// 2. Mock‑server endpoint (swap for your real API if you have one)
// ------------------------------------------------------------
const API_URL = "https://jsonplaceholder.typicode.com/posts";

// ------------------------------------------------------------
// 3. Handy DOM refs
// ------------------------------------------------------------
const quoteDisplay = document.getElementById("quoteDisplay");
const newQuoteBtn  = document.getElementById("newQuote");

// ------------------------------------------------------------
// 4. ───  SERVER SYNC  ────────────────────────────────────────
// ------------------------------------------------------------

/**
 * Fetch fresh quotes from the server and merge them with local quotes.
 * The server “wins” if there is a duplicate (same text).
 */
async function fetchQuotesFromServer() {
  try {
    const res = await fetch(API_URL);
    if (!res.ok) throw new Error(`Server error: ${res.statusText}`);

    // jsonplaceholder returns lots of posts → we convert titles into quotes
    const serverRaw = await res.json();
    const serverQuotes = serverRaw.map(post => ({
      text: post.title,
      category: "Server"
    }));

    // Merge + resolve conflicts
    quotes = resolveConflicts(quotes, serverQuotes);
    saveQuotes();
    populateCategories();
    filterQuotes();       // refresh whatever is currently being shown
    notifyUser("Quotes synced with server ✔︎");
  } catch (err) {
    console.error("Failed to fetch quotes:", err);
    notifyUser("❌ Could not sync with server", true);
  }
}

/**
 * Server wins.  Keep every server quote; add any local quote
 * whose text is NOT already present.
 */
function resolveConflicts(localQuotes, serverQuotes) {
  const merged = [...serverQuotes];
  localQuotes.forEach(lq => {
    if (!serverQuotes.some(sq => sq.text === lq.text)) merged.push(lq);
  });
  return merged;
}

/**
 * Tiny banner at the top so the user knows something happened.
 * If ‘error’ is true it shows in red.
 */
function notifyUser(msg, error = false) {
  const note = document.createElement("div");
  note.textContent = msg;
  note.style.cssText = `
    background:${error ? "#ff6b6b" : "#ffeb3b"};
    padding:8px;
    margin:10px 0;
    font-weight:bold;
    text-align:center;
  `;
  document.body.prepend(note);
  setTimeout(() => note.remove(), 4000);
}

// ------------------------------------------------------------
// 5. ───  LOCAL STORAGE HELPERS  ─────────────────────────────
// ------------------------------------------------------------
function saveQuotes() {
  localStorage.setItem("quotes", JSON.stringify(quotes));
}
function loadQuotes() {
  const stored = localStorage.getItem("quotes");
  return stored ? JSON.parse(stored) : [];
}

// ------------------------------------------------------------
// 6. ───  YOUR EXISTING UI FUNCTIONS  (unchanged)  ───────────
// ------------------------------------------------------------
// showRandomQuote, addQuote, populateCategories, filterQuotes,
// loadLastViewedQuote, loadLastFilter, createAddQuoteForm …
/* … keep your earlier code here … */

// ------------------------------------------------------------
// 7. ───  EXTRA BUTTON TO MANUALLY SYNC  ─────────────────────
// ------------------------------------------------------------
function addFetchQuotesButton() {
  const btn = document.createElement("button");
  btn.textContent = "Fetch Quotes from Server";
  btn.addEventListener("click", fetchQuotesFromServer);
  document.body.appendChild(btn);
}

// ------------------------------------------------------------
// 8. ───  INITIALISE EVERYTHING  ─────────────────────────────
// ------------------------------------------------------------
newQuoteBtn.addEventListener("click", showRandomQuote);
addFetchQuotesButton();

// Build category dropdown, restore filters, first quote etc.
populateCategories();
loadLastFilter();
loadLastViewedQuote() || showRandomQuote();
createAddQuoteForm();

// Auto‑sync every 30 seconds
setInterval(fetchQuotesFromServer, 30_000);
