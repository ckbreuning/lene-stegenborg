// Her vælges containeren til alle behandlinger
const container = document.querySelector(".behandlinger");
// Definer basis-URL til WordPress REST API
const baseUrl = "https://lenestegenborg.hesselbergsdomain.dk/wp-json";
// Definer URL-parameter til at hente alle posts
const postsUrl = "/wp/v2/posts?acf_format=standard&per_page=10&_embed`"
// https://lenestegenborg.hesselbergsdomain.dk/wp-json/wp/v2/posts?acf_format=standard&per_page=25

// Laver en slug så der oprettes nye url'er til hver enkelt behandling fra posts. Dette gøres så vi ikke skal lave enkelte html sider til hver enkelt behandling
const parameter = new URLSearchParams(window.location.search)
const slug = parameter.get("slug")

// Funktion der kan splitte ord og derfor gøre beskrivelsen kortere til cards. Teksten splittes ved mellemrum. Hvis teksten er kortere end max ord retuneres teksten som den er. Ellers retuneres teksten med max antal ord og slutter på "..."
function truncateWords(text, maxWords) {
    const words = text.split(" ");
    if (words.length <= maxWords) return text;
    return words.slice(0, maxWords).join(" ") + "...";
}

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
                    <article class="enkeltBehandling">
                <img src="${post.acf.billede.sizes.medium}" alt="">
                <div class="behandlingTekst">
                    <h2>${post.acf.behandling}</h2>
                    <p>${truncateWords(post.acf.beskrivelse, 50)}</p>
                    <a href="behandling.html?slug=${post.slug}">Læs mere</a>
                </div>
            </article>
        `
    })
   
}

// Lægger alle posts ud
getAllPosts();


// Til de enkelte behandlinger



async function getBehandling() {
    try{
    // Henter alle enkelte behandlinger med det givne slug
    const response = await fetch(`${baseUrl}/wp/v2/posts?slug=${slug}&acf_format=standard`);
     const data = await response.json();
    const enkelteBehandlinger = data[0];

    // Fejlbesked hvis enkelte behandlinger ikke kan findes

    if(!enkelteBehandlinger) {
        document.body.innerhTML = "<p>Behandling ikke fundet</p>"; return;
    }

    // Sender behandling videre til functionen visBehandling, samt getRelated posts til sit
    visBehandling(enkelteBehandlinger);
    getRelatedPosts(slug);
    
 }
//  Fanger fejl og lægger dem ind i consolen
 catch (error) {
    console.error(error);
    }
}

   

// Hver enkelte behandlingsside
const container2 = document.querySelector(".behandlingBody")

// function der looper igennem hver eneste behandling

//replace property gør sådan at der er linebreak i teksten sådan som det blev sat ind, som gør teksten mere brugervenlig
function visBehandling(behandling) {
    container2.innerHTML =
     `
     <body class="behandlingBody">
<header>
<img src="${behandling.acf.billede.sizes.large}" alt="${behandling.acf.caption}">
</header>
<main class="bMain">


<section class="behandling">
<div class="bTekst">
<h1>${behandling.acf.behandling}</h1>

<div class="tags"></div>


<article class="beskrivelse">

    <p>${behandling.acf.beskrivelse.replace(/\n/g, "<br>")}</p>
</article>
</div>

<div class="aside">
<ul class="info">
    <li>Pris: ${behandling.acf.pris}</li>
    <li>Session Varighed: ${behandling.acf.session_varighed}</li>
    <li>Antal Sessioner: ${behandling.acf.antal_sessioner}</li>
</ul>

<a href="../kontakt.html">Kontakt</a>
</div>

</section>

<h2>Se også andre behandlinger</h2>
<section class="related">


</section>

</main>
</body>

    `
}

// Fanger hvad nuværende slug er
async function getRelatedPosts(currentSlug){
const response = await fetch(`${baseUrl}/wp/v2/posts?acf_format=standard&per_page=10`);
const data = await response.json();

// Filtrere den aktive side fra
const relatedPosts = data.filter(post => post.slug !== currentSlug);

// Viser kun tre posts
const treRelated = relatedPosts.slice(0, 3);

renderRelated(treRelated);

}


// Render de relaterede behandlinger
function renderRelated(posts) {
    const rContainer = document.querySelector(".related")
    rContainer.innerHTML = ""

    posts.forEach(post => {
        rContainer.innerHTML += `
        <section class="related">
<article class="relatedCard">
<img src="${post.acf.billede.sizes.medium}" alt="${post.acf.caption}">
<a href="behandling.html?slug=${post.slug}"> ${post.acf.behandling}</a>
</article>
</section>
        `
    })
}

getAllPosts();

if (slug) {
    getBehandling();
}
