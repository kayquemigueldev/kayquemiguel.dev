const revealElements = document.querySelectorAll(
    ".hero-text, .hero-visual, .placeholder-section"
);

const observer = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
            }
        });
    },
    {
        threshold: 0.15
    }
);

revealElements.forEach((element) => {
    element.classList.add("reveal");
    observer.observe(element);
});

const glow = document.createElement("div");
glow.classList.add("mouse-glow");
document.body.appendChild(glow);

window.addEventListener("mousemove", (event) => {
    glow.style.left = `${event.clientX}px`;
    glow.style.top = `${event.clientY}px`;
});

const codeCard = document.querySelector(".code-card");

if (codeCard) {
    window.addEventListener("mousemove", (event) => {
        const x = event.clientX / window.innerWidth - 0.5;
        const y = event.clientY / window.innerHeight - 0.5;

        codeCard.style.transform = `
            rotateY(${x * 8}deg)
            rotateX(${y * -8}deg)
            translateY(-4px)
        `;
    });

    window.addEventListener("mouseleave", () => {
        codeCard.style.transform = "rotate(1.5deg)";
    });
}

const buttons = document.querySelectorAll(".button");

buttons.forEach((button) => {
    button.addEventListener("mousemove", (event) => {
        const rect = button.getBoundingClientRect();
        const x = event.clientX - rect.left - rect.width / 2;
        const y = event.clientY - rect.top - rect.height / 2;

        button.style.transform = `translate(${x * 0.08}px, ${y * 0.08}px)`;
    });

    button.addEventListener("mouseleave", () => {
        button.style.transform = "translate(0, 0)";
    });
});