// MK Beauty Saloon - Main Script

document.addEventListener("DOMContentLoaded", () => {
    
    /* --- Mobile Navigation Toggle --- */
    const hamburger = document.getElementById("hamburger");
    const navLinks = document.getElementById("nav-links");
    const links = document.querySelectorAll(".nav-link");

    hamburger.addEventListener("click", () => {
        navLinks.classList.toggle("active");
        
        // Toggle hamburger animation
        hamburger.classList.toggle("toggle");
    });

    // Close menu when clicking a link
    links.forEach(link => {
        link.addEventListener("click", () => {
            if (navLinks.classList.contains("active")) {
                navLinks.classList.remove("active");
                hamburger.classList.remove("toggle");
            }
        });
    });

    /* --- Sticky Navigation on Scroll --- */
    const navbar = document.getElementById("navbar");
    window.addEventListener("scroll", () => {
        if (window.scrollY > 50) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }
    });

    /* --- Scroll Reveal Animations (Intersection Observer) --- */
    const reveals = document.querySelectorAll(".reveal, .reveal-left, .reveal-right, .reveal-up");
    
    const revealOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add("active");
                observer.unobserve(entry.target);
            }
        });
    }, revealOptions);

    reveals.forEach(reveal => {
        revealOnScroll.observe(reveal);
    });

    /* --- Contact Form Simulation --- */
    const contactForm = document.getElementById("contactForm");
    const submitBtn = document.querySelector(".submit-btn");
    const btnText = submitBtn.querySelector("span");
    const loader = submitBtn.querySelector(".loader");
    const formMessage = document.getElementById("formMessage");

    if (contactForm) {
        contactForm.addEventListener("submit", (e) => {
            e.preventDefault();

            // Simulate form submission
            btnText.style.display = "none";
            loader.style.display = "inline-block";
            formMessage.innerText = "";
            
            setTimeout(() => {
                // Success message
                loader.style.display = "none";
                btnText.style.display = "inline-block";
                
                formMessage.style.color = "var(--primary-color)";
                formMessage.innerText = "Thank you! Your appointment request has been sent successfully. We will contact you soon.";
                
                contactForm.reset();

                // Clear message after 5 seconds
                setTimeout(() => {
                    formMessage.innerText = "";
                }, 5000);

            }, 2000);
        });
    }

});
