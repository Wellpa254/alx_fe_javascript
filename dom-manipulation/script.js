// Load quotes from local storage or use default quotes
let quotes = loadQuotes() || [
  { text: "Life is what happens when you're busy making other plans.", category: "Life" },
  { text: "The only limit to our realization of tomorrow is our doubts of today.", category: "Motivation" },
  { text: "In the middle of every difficulty lies opportunity.", category: "Inspiration" },
];

// Get references to DOM elements
const quoteDisplay = document.getElementById("quoteDisplay");
const newQuoteBtn = document.getElementById("newQuote");

/**
 * Saves the quotes array to local storage.
 */
function saveQuotes() {
  localStorage.setItem("quotes", JSON.stringify(quotes));
}

/**
 * Loads quotes from local storage.
 * @returns {Array} Array of quotes or an empty array if none exist.
 */
function loadQuotes() {
  const storedQuotes = localStorage.getItem("quotes");
  return storedQuotes ? JSON.parse(storedQuotes) : [];
}

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
  sessionStorage.setItem("lastViewedQuote", JSON.stringify(randomQuote)); // Save last viewed quote
}

/**
 * Displays the last viewed quote from session storage if available.
 */
function loadLastViewedQuote() {
  const lastQuote = sessionStorage.getItem("lastViewedQuote");
  if (lastQuote) {
    const quote = JSON.parse(lastQuote);
    quoteDisplay.innerHTML = `"${quote.text}" - <strong>${quote.category}</strong>`;
  }
}

/**
 * Creates a form for adding new quotes and appends it to the DOM.
 */
function createAddQuoteForm() {
  const formContainer = document.createElement("div");

  const quoteInput = document.createElement("input");
  quoteInput.id = "newQuoteText";
  quoteInput.type = "text";
  quoteInput.placeholder = "Enter a new quote";

  const categoryInput = document.createElement("input");
  categoryInput.id = "newQuoteCategory";
  categoryInput.type = "text";
  categoryInput.placeholder = "Enter quote category";

  const addButton = document.createElement("button");
  addButton.textContent = "Add Quote";
  addButton.id = "addQuote";

  formContainer.appendChild(quoteInput);
  formContainer.appendChild(categoryInput);
  formContainer.appendChild(addButton);

  document.body.appendChild(formContainer);

  addButton.addEventListener("click", addQuote);
}

/**
 * Adds a new quote to the quotes array and updates local storage.
 */
function addQuote() {
  const text = document.getElementById("newQuoteText").value.trim();
  const category = document.getElementById("newQuoteCategory").value.trim();

  if (!text || !category) {
    alert("Please fill in both fields!");
    return;
  }

  quotes.push({ text, category });
  saveQuotes();
  populateCategories();
  alert("Quote added successfully!");

  document.getElementById("newQuoteText").value = "";
  document.getElementById("newQuoteCategory").value = "";
}

/**
 * Populates the category filter dropdown dynamically.
 */
function populateCategories() {
  const categoryFilter = document.getElementById("categoryFilter");
  const categories = [...new Set(quotes.map((quote) => quote.category))];

  categoryFilter.innerHTML = '<option value="all">All Categories</option>';
  categories.forEach((category) => {
    const option = document.createElement("option");
    option.value = category;
    option.textContent = category;
    categoryFilter.appendChild(option);
  });
}

/**
 * Filters quotes based on the selected category.
 */
function filterQuotes() {
  const selectedCategory = document.getElementById("categoryFilter").value;
  const filteredQuotes = selectedCategory === "all"
    ? quotes
    : quotes.filter((quote) => quote.category === selectedCategory);

  quoteDisplay.innerHTML = filteredQuotes.length
    ? filteredQuotes.map((quote) => `"${quote.text}" - <strong>${quote.category}</strong>`).join("<br>")
    : "No quotes available for this category.";

  localStorage.setItem("lastFilter", selectedCategory);
}

/**
 * Loads the last selected filter and applies it.
 */
function loadLastFilter() {
  const lastFilter = localStorage.getItem("lastFilter") || "all";
  document.getElementById("categoryFilter").value = lastFilter;
  filterQuotes();
}

/**
 * Exports the quotes array to a JSON file.
 */
function exportToJsonFile() {
  const dataStr = JSON.stringify(quotes, null, 2);
  const blob = new Blob([dataStr], { type: "application/json" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "quotes.json";
  a.click();

  URL.revokeObjectURL(url);
}

/**
 * Imports quotes from a JSON file and updates local storage.
 * @param {Event} event The file input change event.
 */
function importFromJsonFile(event) {
  const fileReader = new FileReader();
  fileReader.onload = function (event) {
    try {
      const importedQuotes = JSON.parse(event.target.result);
      if (Array.isArray(importedQuotes)) {
        quotes.push(...importedQuotes);
        saveQuotes();
        populateCategories();
        alert("Quotes imported successfully!");
      } else {
        alert("Invalid JSON file format.");
      }
    } catch (error) {
      alert("Error reading JSON file.");
    }
  };
  fileReader.readAsText(event.target.files[0]);
}

// Attach event listeners and initialize
newQuoteBtn.addEventListener("click", showRandomQuote);

const exportButton = document.createElement("button");
exportButton.textContent = "Export Quotes as JSON";
exportButton.addEventListener("click", exportToJsonFile);
document.body.appendChild(exportButton);

const importInput = document.createElement("input");
importInput.type = "file";
importInput.accept = ".json";
importInput.addEventListener("change", importFromJsonFile);
document.body.appendChild(importInput);

const categoryFilter = document.createElement("select");
categoryFilter.id = "categoryFilter";
categoryFilter.addEventListener("change", filterQuotes);
document.body.insertBefore(categoryFilter, quoteDisplay);

populateCategories();
loadLastFilter();
loadLastViewedQuote() || showRandomQuote();
createAddQuoteForm();
