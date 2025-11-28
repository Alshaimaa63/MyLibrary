const container = document.getElementById("booksGrid");
const title = document.getElementById("category-title");
let currentBooks = []; 

function loadBooks(category) {
    title.textContent = `${category.charAt(0).toUpperCase() + category.slice(1)} Books Collection`;
    container.innerHTML = "<p>Loading books...</p>";

    fetch(`https://openlibrary.org/search.json?q=${category}`)
        .then(res => res.json())
        .then(data => {
            container.innerHTML = "";
            currentBooks = data.docs.slice(0, 8); 
            if (currentBooks.length === 0) {
                container.innerHTML = "<p>No books found.</p>";
                return;
            }

            displayBooks(currentBooks);
        })
        .catch(err => {
            container.innerHTML = "<p>Error loading books.</p>";
            console.error(err);
        });
}

function displayBooks(books) {
    container.innerHTML = "";
    books.forEach(book => {
        const coverId = book.cover_i
            ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
            : "https://via.placeholder.com/200x250?text=No+Cover";

        const div = document.createElement("div");
        div.className = "book-card";
        div.innerHTML = `
      <img src="${coverId}" alt="Book">
      <h3>${book.title}</h3>
      <p><strong>Author:</strong> ${book.author_name ? book.author_name[0] : "Unknown"}</p>
      <p><strong>Year:</strong> ${book.first_publish_year || "N/A"}</p>
    `;
        container.appendChild(div);
    });
}

function searchBooks() {
    const input = document.getElementById("searchInput").value.toLowerCase();
    const filtered = currentBooks.filter(book => {
        const title = book.title ? book.title.toLowerCase() : "";
        const author = book.author_name ? book.author_name[0].toLowerCase() : "";
        return title.includes(input) || author.includes(input);
    });

    if (filtered.length === 0) {
        container.innerHTML = "<p>No matching books found.</p>";
    } else {
        displayBooks(filtered);
    }
}
let menuToggle = document.querySelector(".menu-toggle");
let headLinks = document.querySelector(".head-links");

menuToggle.addEventListener("click", () => {
headLinks.classList.toggle("active");
});