const revealElements = document.querySelectorAll(".reveal");

const observer = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                observer.unobserve(entry.target);
            }
        });
    },
    {
        threshold: 0.15
    }
);

revealElements.forEach((element) => {
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

    const counters = document.querySelectorAll(".counter");

    const counterObserver = new IntersectionObserver(
        (entries, observer) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) {
                    return;
                }

                const counter = entry.target;
                const target = Number(counter.dataset.target);
                const duration = 1400;
                const startTime = performance.now();

                const updateCounter = (currentTime) => {
                    const elapsed = currentTime - startTime;
                    const progress = Math.min(elapsed / duration, 1);

                    const easedProgress =
                        1 - Math.pow(1 - progress, 3);

                    counter.textContent = Math.floor(
                        target * easedProgress
                    );

                    if (progress < 1) {
                        requestAnimationFrame(updateCounter);
                    } else {
                        counter.textContent = target;
                    }
                };

                requestAnimationFrame(updateCounter);
                observer.unobserve(counter);
            });
        },
        {
            threshold: 0.7
        }
    );

    counters.forEach((counter) => {
        counterObserver.observe(counter);
    });

    const technologyGroups = document.querySelectorAll(".technology-group");

    technologyGroups.forEach((group) => {
        group.addEventListener("mousemove", (event) => {
            const rect = group.getBoundingClientRect();

            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;

            group.style.setProperty("--mouse-x", `${x}px`);
            group.style.setProperty("--mouse-y", `${y}px`);
        });
    });

});