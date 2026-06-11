// Hamburger-menu toggle
const hamburger = document.getElementById("hamburger");
const mobileNav = document.getElementById("mobileNav");

hamburger.addEventListener("click", function () {
    mobileNav.classList.toggle("åben");
});

// FAQ Accordion
// aria-expanded bruges til tilgængelighed (screen readers) — https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-expanded
const accordionKnapper = document.querySelectorAll(".accordionKnap");

accordionKnapper.forEach(function (knap) {
    knap.addEventListener("click", function () {
        const erÅben = knap.getAttribute("aria-expanded") === "true";
        const indhold = knap.nextElementSibling;

        // Luk alle andre accordion-punkter og sæt pil til ned
        accordionKnapper.forEach(function (andenkap) {
            andenkap.setAttribute("aria-expanded", "false");
            andenkap.nextElementSibling.classList.remove("åben");
            const pil = andenkap.querySelector(".accordionPil");
            pil.classList.remove("fa-chevron-up");
            pil.classList.add("fa-chevron-down");
        });

        // Åbn det klikkede, medmindre det allerede var åbent
        if (!erÅben) {
            knap.setAttribute("aria-expanded", "true");
            indhold.classList.add("åben");
            const pil = knap.querySelector(".accordionPil");
            pil.classList.remove("fa-chevron-down");
            pil.classList.add("fa-chevron-up");
        }
    });
});