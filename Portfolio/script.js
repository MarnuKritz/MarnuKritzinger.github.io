
/* =========================================
   1. SHRINK THE NAVIGATION ON SCROLL
   ========================================= */

// Find the navigation header in the HTML.
const header = document.querySelector("#site-header");

// Check how far the page has been scrolled.
function updateHeader() {
    if (window.scrollY > 40) {
        header.classList.add("header--compact");
    } else {
        header.classList.remove("header--compact");
    }
}

// Run the function whenever the visitor scrolls.
window.addEventListener("scroll", updateHeader, { passive: true });

// Set the correct state when the page first loads.
updateHeader();


/* =========================================
   2. AUTOMATICALLY UPDATE THE FOOTER YEAR
   ========================================= */

const yearElement = document.querySelector("#current-year");

yearElement.textContent = new Date().getFullYear();
