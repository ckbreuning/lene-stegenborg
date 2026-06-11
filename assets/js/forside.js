
//  Udvalgte behandlinger fra WordPress API 
function loadTreatments() {
    const grid = document.querySelector('.treatment-grid');

    fetch(baseUrl + postsUrl)
        .then(res => res.json())
        .then(posts => {
            const firstThree = posts.slice(0, 3);

            grid.innerHTML = firstThree.map(post => {
                return `
          <article class="treatment-card">
            <img src="${post.acf.billede.sizes.medium_large}" alt="${post.acf.behandling}" loading="lazy">
            <a href="behandling.html?slug=${post.slug}" class="btn">Læs mere om ${post.acf.behandling}</a>
          </article>`;
            }).join('');
        })
        .catch(err => {
            console.error('Kunne ikke hente behandlinger:', err);
            grid.innerHTML = '<p class="grid-message">Behandlingerne kunne desværre ikke hentes lige nu. Prøv igen senere.</p>';
        });
}

loadTreatments();