const searchQuery = document.getElementById("search_query");
const newsApiKey = "982f4b0584e745f28923e879920ae7c0";
const articlesToDisplay = 5;

async function GetNews() {
    const endpoint = `https://newsapi.org/v2/everything?q=${searchQuery.value}&language=en&from=2023-07-09&sortBy=relevancy&apiKey=${newsApiKey}`;
    const response = await fetch(endpoint);
    const json = await response.json();

    const articles = document.querySelector(".articles");
    if (json.status !== 'ok') {
        const errorDisplay = document.createElement('p');
        errorDisplay.innerHTML = json.message;
        articles.appendChild(errorDisplay);
        return;
    }
    const numArticles = Math.min(articlesToDisplay, json.totalResults);


    
    articles.innerHTML = "";
   
    for (let i = 0; i < numArticles; i++) {
        const newArticle = document.createElement("div");
        newArticle.style.padding = "10px 10px 10px 10px";

        if (i % 2 == 0) {
            newArticle.style.backgroundColor = 'rgb(240, 240, 255)';
        } else{
            newArticle.style.backgroundColor = 'lightcyan';
        }

        const newTitle = document.createElement("h3");
        newTitle.class = "article_title";
        newTitle.innerHTML = json.articles[i].title;
        newArticle.appendChild(newTitle);

        const newDescription = document.createElement("p");
        newDescription.class = "article_description";
        newDescription.innerHTML = json.articles[i].description;
        newArticle.appendChild(newDescription);

        const newLink = document.createElement("a");
        newLink.class = "full_article_link";
        newLink.href = json.articles[i].url;
        newLink.innerHTML = "Full Article";

        newArticle.appendChild(newLink);

        articles.appendChild(newArticle);
    }
}

document.getElementById("search_button").addEventListener("click", GetNews);