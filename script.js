

/* =========================================
   1. SHRINK THE NAVIGATION ON SCROLL
   ========================================= */

// Find the navigation header in the HTML.
const header = document.querySelector("#site-header");

// Check how far the page has been scrolled.
function updateHeader() {
    // Some pages, such as project pages, may not have this header.
    if (!header) return;

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

const yearElement = document.querySelector("#year");

if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
}


/* ==========================================
   PROJECT IMAGE CAROUSELS
========================================== */

document.querySelectorAll("[data-case-carousel]").forEach((carousel) => {
    const slides = Array.from(
        carousel.querySelectorAll(".case-study-carousel-slide")
    );

    const previousButton = carousel.querySelector(
        "[data-carousel-previous]"
    );

    const nextButton = carousel.querySelector(
        "[data-carousel-next]"
    );

    const position = carousel.querySelector(
        "[data-carousel-position]"
    );

    const dotsContainer = carousel.querySelector(
        "[data-carousel-dots]"
    );

    if (
        slides.length === 0 ||
        !previousButton ||
        !nextButton ||
        !position ||
        !dotsContainer
    ) {
        return;
    }

    let currentIndex = 0;

    // Create one clickable indicator for each image.
    const dots = slides.map((slide, index) => {
        const dot = document.createElement("button");

        dot.type = "button";
        dot.className = "case-study-carousel-dot";
        dot.setAttribute(
            "aria-label",
            `Show image ${index + 1} of ${slides.length}`
        );

        dot.addEventListener("click", () => {
            showSlide(index);
        });

        dotsContainer.appendChild(dot);

        return dot;
    });

    function showSlide(index) {
        currentIndex = (index + slides.length) % slides.length;

        slides.forEach((slide, slideIndex) => {
            const isActive = slideIndex === currentIndex;

            slide.hidden = !isActive;
            slide.setAttribute("aria-hidden", String(!isActive));
        });

        dots.forEach((dot, dotIndex) => {
            if (dotIndex === currentIndex) {
                dot.setAttribute("aria-current", "true");
            } else {
                dot.removeAttribute("aria-current");
            }
        });

        position.textContent =
            `${currentIndex + 1} / ${slides.length}`;
    }

    previousButton.addEventListener("click", () => {
        showSlide(currentIndex - 1);
    });

    nextButton.addEventListener("click", () => {
        showSlide(currentIndex + 1);
    });

    showSlide(0);
});

/* ==========================================
   IMAGE LIGHTBOX
========================================== */

const lightbox = document.querySelector("#image-lightbox");
const lightboxImage = document.querySelector("#image-lightbox-image");
const lightboxCaption = document.querySelector("#image-lightbox-caption");
const lightboxClose = document.querySelector("#image-lightbox-close");

if (lightbox && lightboxImage && lightboxClose) {
    // Make project images clickable.
    document.querySelectorAll(
        ".case-study-carousel-slide img, " +
        ".case-study-hero img, " +
        ".case-study-results-image" +
        ".small-project-images img"
    ).forEach((img) => {
        img.style.cursor = "zoom-in";

        img.addEventListener("click", () => {
            lightboxImage.src = img.src;
            lightboxImage.alt = img.alt;

            const caption = img.closest("figure")?.querySelector("figcaption");
            lightboxCaption.textContent = caption?.textContent || img.alt || "";

            lightbox.classList.add("is-open");
            lightbox.setAttribute("aria-hidden", "false");
            document.body.style.overflow = "hidden";
            lightboxClose.focus();
        });
    });

    function closeLightbox() {
        lightbox.classList.remove("is-open");
        lightbox.setAttribute("aria-hidden", "true");
        lightboxImage.src = "";
        document.body.style.overflow = "";
    }

    lightboxClose.addEventListener("click", closeLightbox);

    lightbox.addEventListener("click", (event) => {
        if (event.target === lightbox) {
            closeLightbox();
        }
    });

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape" && lightbox.classList.contains("is-open")) {
            closeLightbox();
        }
    });
}

/* ==========================================
   VIDEO LIGHTBOX
========================================== */

document.addEventListener("DOMContentLoaded", () => {
    const lightbox = document.getElementById("video-lightbox");
    const lightboxVideo = document.getElementById("video-lightbox-player");
    const lightboxCaption = document.getElementById("video-lightbox-caption");
    const closeButton = document.getElementById("video-lightbox-close");

    if (!lightbox || !lightboxVideo || !closeButton) return;

    const closeLightbox = () => {
        lightboxVideo.pause();
        lightboxVideo.removeAttribute("src");
        lightboxVideo.load();

        lightbox.classList.remove("is-open");
        document.body.style.overflow = "";
    };

    document.querySelectorAll(".case-study-video video").forEach(video => {
        video.addEventListener("click", () => {
            const source = video.querySelector("source");
            if (!source) return;

            lightboxVideo.src = source.src;
            lightboxCaption.textContent =
                video.closest("figure")?.querySelector("figcaption")?.textContent.trim() || "";

            lightbox.classList.add("is-open");
            document.body.style.overflow = "hidden";

            lightboxVideo.load();
            lightboxVideo.play().catch(() => {});
        });
    });

    closeButton.addEventListener("click", closeLightbox);

    lightbox.addEventListener("click", event => {
        if (event.target === lightbox) {
            closeLightbox();
        }
    });

    document.addEventListener("keydown", event => {
        if (event.key === "Escape" && lightbox.classList.contains("is-open")) {
            closeLightbox();
        }
    });
});