// Quotes array with objects containing "text" and "category" properties
const quotes = [
  { text: "Life is what happens when you're busy making other plans.", category: "Life" },
  { text: "The only limit to our realization of tomorrow is our doubts of today.", category: "Motivation" },
  { text: "In the middle of every difficulty lies opportunity.", category: "Inspiration" },
];

// Get references to DOM elements
const quoteDisplay = document.getElementById("quoteDisplay");
const newQuoteBtn = document.getElementById("newQuote");

/**
 * Displays a random quote from the quotes array.
 */
function showRandomQuote() {
  if (quotes.length === 0) {
    quoteDisplay.innerHTML = "No quotes available. Add one!";
    return;
  }

  const randomIndex = Math.floor(Math.random() * quotes.length);
  const randomQuote = quotes[randomIndex];
  quoteDisplay.innerHTML = `"${randomQuote.text}" - <strong>${randomQuote.category}</strong>`;
}

/**
 * Creates a form for adding new quotes and appends it to the DOM.
 */
function createAddQuoteForm() {
  // Create the form container
  const formContainer = document.createElement("div");

  // Create input for quote text
  const quoteInput = document.createElement("input");
  quoteInput.id = "newQuoteText";
  quoteInput.type = "text";
  quoteInput.placeholder = "Enter a new quote";

  // Create input for quote category
  const categoryInput = document.createElement("input");
  categoryInput.id = "newQuoteCategory";
  categoryInput.type = "text";
  categoryInput.placeholder = "Enter quote category";

  // Create a button to add the quote
  const addButton = document.createElement("button");
  addButton.textContent = "Add Quote";
  addButton.id = "addQuote";

  // Append inputs and button to the form container
  formContainer.appendChild(quoteInput);
  formContainer.appendChild(categoryInput);
  formContainer.appendChild(addButton);

  // Append the form container to the body
  document.body.appendChild(formContainer);

  // Attach an event listener to the button
  addButton.addEventListener("click", addQuote);
}

/**
 * Adds a new quote to the quotes array and updates the DOM.
 */
function addQuote() {
  const text = document.getElementById("newQuoteText").value.trim();
  const category = document.getElementById("newQuoteCategory").value.trim();

  if (!text || !category) {
    alert("Please fill in both fields!");
    return;
  }

  quotes.push({ text, category });
  alert("Quote added successfully!");

  document.getElementById("newQuoteText").value = "";
  document.getElementById("newQuoteCategory").value = "";
}

// Attach event listener to the "Show New Quote" button
newQuoteBtn.addEventListener("click", showRandomQuote);

// Initialize the application
showRandomQuote();
createAddQuoteForm();
