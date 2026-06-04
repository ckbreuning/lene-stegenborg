// Vælg container til alle opskriftskort
const container = document.querySelector(".behandlinger");
// Definer basis-URL til WordPress REST API
const baseUrl = "https://lenestegenborg.hesselbergsdomain.dk/wp-json";
// Definer URL-parameter til at hente alle posts
const postsUrl = "/wp/v2/posts?acf_format=standard&per_page=10&_embed`"
// https://lenestegenborg.hesselbergsdomain.dk/wp-json/wp/v2/posts?acf_format=standard&per_page=25

// Henter ALLE public posts
function getAllPosts() {

    fetch(baseUrl + postsUrl)
        .then(res => res.json())
        .then(data => renderArticles(data))
        .catch(err => console.log("FEJL!: ", err));
}

// Kører alle posts igenenm en for each og render dem alle i containeren
function renderArticles(posts){
container.innerHTML = "";

    posts.forEach(post => {
  
        container.innerHTML +=
        `
                    <article class="behandling">
                <img src="${post.acf.billede.sizes.medium}" alt="">
                <div class="behandlingTekst">
                    <h2>${post.acf.behandling}</h2>
                    <p>${post.acf.beskrivelse}</p>
                    <a href=""></a>
                </div>
            </article>
        `;
    })
   
}


getAllPosts();


