// Quotes array with objects containing "text" and "category" properties
const quotes = [
  { text: "Life is what happens when you're busy making other plans.", category: "Life" },
  { text: "The only limit to our realization of tomorrow is our doubts of today.", category: "Motivation" },
  { text: "In the middle of every difficulty lies opportunity.", category: "Inspiration" },
];

// Get references to DOM elements
const quoteDisplay = document.getElementById("quoteDisplay");
const newQuoteBtn = document.getElementById("newQuote");
const addQuoteBtn = document.getElementById("addQuote");
const newQuoteText = document.getElementById("newQuoteText");
const newQuoteCategory = document.getElementById("newQuoteCategory");

/**
 * Displays a random quote from the quotes array.
 * This function is now named 'showRandomQuote' as required.
 */
function showRandomQuote() {
  // Ensure there are quotes in the array
  if (quotes.length === 0) {
    quoteDisplay.innerHTML = "No quotes available. Add one!";
    return;
  }

  // Select a random quote
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const randomQuote = quotes[randomIndex];

  // Update the DOM using innerHTML
  quoteDisplay.innerHTML = `"${randomQuote.text}" - <strong>${randomQuote.category}</strong>`;
}

/**
 * Adds a new quote to the quotes array and updates the DOM.
 */
function addQuote() {
  // Get user input
  const text = newQuoteText.value.trim();
  const category = newQuoteCategory.value.trim();

  // Validate input
  if (!text || !category) {
    alert("Please fill in both fields!");
    return;
  }

  // Add new quote to the array
  quotes.push({ text, category });

  // Confirm and reset form
  alert("Quote added successfully!");
  newQuoteText.value = "";
  newQuoteCategory.value = "";
}

// Attach event listeners
newQuoteBtn.addEventListener("click", showRandomQuote);
addQuoteBtn.addEventListener("click", addQuote);

// Initialize with a random quote
showRandomQuote();
