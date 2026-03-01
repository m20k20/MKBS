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

    const revealOnScroll = new IntersectionObserver(function (entries, observer) {
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

            btnText.style.display = "none";
            loader.style.display = "inline-block";
            formMessage.innerText = "";

            // Use FormSubmit to send email without backend/account config
            const formData = new FormData(contactForm);

            // Add custom subject parameter
            formData.append("_subject", "New Appointment Request from " + formData.get("user_name"));
            // Set autoresponse (optional) but good for UX
            formData.append("_autoresponse", "Thank you for your request. We have received your message and will be in touch shortly.");

            fetch("https://formsubmit.co/ajax/mk.beautysaloon20@gmail.com", {
                method: "POST",
                headers: {
                    'Accept': 'application/json'
                },
                body: formData
            })
                .then(response => response.json())
                .then(data => {
                    if (data.success === "true" || data.success === true) {
                        console.log('SUCCESS!', data);
                        loader.style.display = "none";
                        btnText.style.display = "inline-block";

                        formMessage.style.color = "var(--primary-color)";
                        formMessage.innerText = "Thank you! Your appointment request has been sent successfully. We will contact you soon.";

                        contactForm.reset();

                        setTimeout(() => {
                            formMessage.innerText = "";
                        }, 5000);
                    } else {
                        throw new Error(data.message || "Failed to send message");
                    }
                })
                .catch(error => {
                    console.log('FAILED...', error);
                    loader.style.display = "none";
                    btnText.style.display = "inline-block";

                    formMessage.style.color = "red";
                    formMessage.innerText = "Oops! Something went wrong. Please try again later.";
                });
        });
    }

});
