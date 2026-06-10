// Hamburger-menu toggle
const hamburger = document.getElementById("hamburger");
const mobileNav = document.getElementById("mobileNav");

hamburger.addEventListener("click", function () {
    mobileNav.classList.toggle("åben");
});

// Formular-validering
const form = document.getElementById("kontaktForm");

form.addEventListener("submit", function (event) {
    event.preventDefault();

    const navn = document.getElementById("navn");
    const email = document.getElementById("email");
    const telefon = document.getElementById("telefon");
    const besked = document.getElementById("besked");

    let gyldig = true;

    // Nulstil fejlbeskeder
    document.querySelectorAll(".fejl").forEach(el => el.textContent = "");

    // Validér navn
    if (navn.value.trim() === "") {
        document.getElementById("navnFejl").textContent = "Udfyld venligst dit navn.";
        gyldig = false;
    }

    // Validér email med simpelt regex — https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_expressions
    const emailMønster = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailMønster.test(email.value)) {
        document.getElementById("emailFejl").textContent = "Indtast en gyldig emailadresse.";
        gyldig = false;
    }

    // Validér telefon — kun tal, mellemrum og +/-()/(), mindst 8 tegn — https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_expressions
    const telefonMønster = /^[\d\s+\-()]{8,}$/;
    if (!telefonMønster.test(telefon.value)) {
        document.getElementById("telefonFejl").textContent = "Indtast et gyldigt telefonnummer.";
        gyldig = false;
    }

    // Validér besked
    if (besked.value.trim() === "") {
        document.getElementById("beskedFejl").textContent = "Skriv venligst en besked.";
        gyldig = false;
    }

    // Vis success-besked hvis alt er gyldigt
    if (gyldig) {
        document.getElementById("successBesked").classList.add("synlig");
        form.reset();
    }
});
