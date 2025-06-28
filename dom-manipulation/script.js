const quotes = [
  { text: "Day by Day what you think, what you do, is who you become", category: "Life" },
  { text: "New day new chance.", category: "Motivation" },
];
const quoteDisplay = document.getElementById('quoteDisplay');
const newQuoteBtn = document.getElementById('newQuote');
const addQuoteBtn = document.getElementById('addQuote');
const newQuoteText = document.getElementById('newQuoteText');
const newQuoteCategory = document.getElementById('newQuoteCategory');

function showRandomQuote() {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const quote = quotes[randomIndex];
  quoteDisplay.textContent = `"${quote.text}" - ${quote.category}`;
}

function addQuote() {
  const text = newQuoteText.value.trim();
  const category = newQuoteCategory.value.trim();
  if (text && category) {
    quotes.push({ text, category });
    alert("Quote added!");
    newQuoteText.value = '';
    newQuoteCategory.value = '';
  } else {
    alert("Please fill in both fields!");
  }
}

newQuoteBtn.addEventListener('click', showRandomQuote);
addQuoteBtn.addEventListener('click', addQuote);
