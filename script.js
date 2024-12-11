// Fetch News API
const newsContainer = document.getElementById("news-container");
const categorySelect = document.getElementById("category-select");

// Load news when category changes
categorySelect.addEventListener("change", loadNews);

async function loadNews() {
    const category = categorySelect.value;
    const apiKey = "12b1ddae459d4f83a17130d766603f09"; // Replace with your API key
    const url = `https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=${apiKey}`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();

        newsContainer.innerHTML = ""; // Clear previous news

        data.articles.forEach(article => {
            const newsCard = document.createElement("div");
            newsCard.classList.add("news-card");

            newsCard.innerHTML = `
                <img src="${article.urlToImage || 'fallback-image.jpg'}" alt="${article.title}">
                <div class="content">
                    <h3>${article.title}</h3>
                    <p>${article.description || 'No description available.'}</p>
                    <a href="${article.url}" target="_blank">Read more</a>
                </div>
            `;

            newsContainer.appendChild(newsCard);
        });
    } catch (error) {
        console.error("Error fetching news:", error);
        newsContainer.innerHTML = "<p>Failed to load news. Please try again later.</p>";
    }
}

// Load news by default
loadNews();
