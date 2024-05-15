const apiKey = '087ab420dd234fe3a700c9ddd86400fe'
const blogContainer = document.getElementById("blog-container");
const searchField = document.getElementById("search-input")
const searchButton = document.getElementById("search-button")
async function fetchRandomNews(){
    try{
        const apiUrl = `https://newsapi.org/v2/top-headlines?sources=techcrunch&pageSize=20&apikey=${apiKey}`
        const response = await fetch(apiUrl)
        const data = await response.json()
        return data.articles;
    } catch(error){
        console.error("Error fetching Random News",error);
        return []
    }
}

searchButton.addEventListener("click", async () => {
    const query = searchField.value.trim();
    if (query !== "") {
        try {
            const articles = await fetchNewsQuery(query); // Corrected function name
            displayBlog(articles); // Used the correct variable name
        } catch (error) {
            console.log("Error fetching news by query", error);
        }
    }
});


async function fetchNewsQuery(query){
    try{
        const apiUrl = `https://newsapi.org/v2/everything?q=${query}&pageSize=20&apikey=${apiKey}`
        const response = await fetch(apiUrl)
        const data = await response.json()
        return data.articles;
    } catch(error){
        console.error("Error fetching Random News",error);
        return []
    }
}

function displayBlog(articles){
    blogContainer.innerHTML = ""
    articles.forEach((articles)=>{
        const blogcard = document.createElement("div")
        blogcard.classList.add("blog-card")
        const img = document.createElement("img")
        img.src = articles.urlToImage
        img.alt  = articles.title
        const title = document.createElement("h2")
        const truncatedTitle = articles.title.length > 30 ? articles.title.slice(0,30) + "....." : articles.title;
        title.textContent = truncatedTitle;
        // title.textContent = articles.title
        const description  = document.createElement("p")
        // description.textContent = articles.description
        const truncatedDes = articles.description.length > 120 ? articles.description.slice(0,120) + "....." : articles.description;
        description.textContent = truncatedDes;

        blogcard.appendChild(img)
        blogcard.appendChild(title)
        blogcard.appendChild(description)
        blogcard.addEventListener("click",()=>{
            window.open(articles.url,"_blank")
        })
        blogContainer.appendChild(blogcard)

    })
}

(async ()=>{
    try{
        const articles = await fetchRandomNews();
        displayBlog(articles);
    } catch (error){
        console.error("Error fetching Random News",error);
    }
})();