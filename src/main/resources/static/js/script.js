const pageLoader = document.querySelector("#page-loader");

document.body.classList.add("loading");

window.addEventListener("load", () => {
    window.setTimeout(() => {
        pageLoader?.classList.add("hidden");
        document.body.classList.remove("loading");
    }, 900);
});

/* REVEAL */

const revealElements = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                revealObserver.unobserve(entry.target);
            }
        });
    },
    {
        threshold: 0.15
    }
);

revealElements.forEach((element) => {
    revealObserver.observe(element);
});

/* MOUSE GLOW */

const glow = document.createElement("div");
glow.classList.add("mouse-glow");
document.body.appendChild(glow);

window.addEventListener("mousemove", (event) => {
    glow.style.left = `${event.clientX}px`;
    glow.style.top = `${event.clientY}px`;
});

/* CODE CARD */

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

    document.addEventListener("mouseleave", () => {
        codeCard.style.transform = "rotate(1.5deg)";
    });
}

/* MAGNETIC BUTTONS */

const buttons = document.querySelectorAll(".button");

buttons.forEach((button) => {
    button.addEventListener("mousemove", (event) => {
        const rect = button.getBoundingClientRect();
        const x = event.clientX - rect.left - rect.width / 2;
        const y = event.clientY - rect.top - rect.height / 2;

        button.style.transform =
            `translate(${x * 0.08}px, ${y * 0.08}px)`;
    });

    button.addEventListener("mouseleave", () => {
        button.style.transform = "translate(0, 0)";
    });
});

/* COUNTERS */

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
                const easedProgress = 1 - Math.pow(1 - progress, 3);

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

/* TECHNOLOGY GLOW */

const technologyGroups =
    document.querySelectorAll(".technology-group");

technologyGroups.forEach((group) => {
    group.addEventListener("mousemove", (event) => {
        const rect = group.getBoundingClientRect();

        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        group.style.setProperty("--mouse-x", `${x}px`);
        group.style.setProperty("--mouse-y", `${y}px`);
    });
});

/* NAVBAR */

const header = document.querySelector(".header");
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-links a");

function updateNavbar() {
    if (window.scrollY > 40) {
        header?.classList.add("scrolled");
    } else {
        header?.classList.remove("scrolled");
    }

    let currentSection = "";

    sections.forEach((section) => {
        const sectionTop = section.offsetTop - 160;
        const sectionBottom =
            sectionTop + section.offsetHeight;

        if (
            window.scrollY >= sectionTop &&
            window.scrollY < sectionBottom
        ) {
            currentSection = section.id;
        }
    });

    navLinks.forEach((link) => {
        const target = link.getAttribute("href");

        link.classList.toggle(
            "active",
            target === `#${currentSection}`
        );
    });
}

window.addEventListener("scroll", updateNavbar);
window.addEventListener("load", updateNavbar);

/* ANIMATED CODE EDITOR */

const animatedCode = document.querySelector("#animated-code");
const codeFileName = document.querySelector("#code-file-name");

const codeExamples = [
    {
        fileName: "Portfolio.java",
        content: `public class Kayque {

    private final String language = "Java";
    private final String mindset = "Always learning";

    public void buildPortfolio() {
        createProfessionalSoftware();
        deploy();
    }
}`
    },
    {
        fileName: "SecurityConfig.java",
        content: `@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    SecurityFilterChain security(HttpSecurity http) {
        return http.build();
    }
}`
    },
    {
        fileName: "ProjectController.java",
        content: `@Controller
public class ProjectController {

    @GetMapping("/projects")
    public String projects(Model model) {
        model.addAttribute("projects", projectService.findAll());

        return "projects";
    }
}`
    },
    {
        fileName: "Terminal",
        content: `$ git add .

$ git commit -m "feat: improve portfolio"

[main] feat: improve portfolio

3 files changed
142 insertions(+)`
    },
    {
        fileName: "Developer.java",
        content: `while (true) {
    learn();
    build();
    improve();
}`
    }
];

let exampleIndex = 0;
let characterIndex = 0;
let isDeleting = false;

const typingSpeed = 28;
const deletingSpeed = 12;
const pauseAfterTyping = 1800;
const pauseAfterDeleting = 450;

function typeCode() {
    if (!animatedCode || !codeFileName) {
        return;
    }

    const currentExample = codeExamples[exampleIndex];
    const completeText = currentExample.content;

    codeFileName.textContent = currentExample.fileName;

    if (!isDeleting) {
        characterIndex++;

        animatedCode.textContent = completeText.substring(
            0,
            characterIndex
        );

        if (characterIndex >= completeText.length) {
            isDeleting = true;

            window.setTimeout(typeCode, pauseAfterTyping);
            return;
        }

        const currentCharacter =
            completeText.charAt(characterIndex - 1);

        const delay =
            currentCharacter === "\n"
                ? typingSpeed * 3
                : typingSpeed + Math.random() * 24;

        window.setTimeout(typeCode, delay);
        return;
    }

    characterIndex--;

    animatedCode.textContent = completeText.substring(
        0,
        characterIndex
    );

    if (characterIndex <= 0) {
        isDeleting = false;

        exampleIndex =
            (exampleIndex + 1) % codeExamples.length;

        window.setTimeout(typeCode, pauseAfterDeleting);
        return;
    }

    window.setTimeout(typeCode, deletingSpeed);
}

typeCode();

/* ===========================
   PROJECT CARD 3D
=========================== */

const projectCards = document.querySelectorAll(".project-card");

projectCards.forEach(card => {

    card.addEventListener("mousemove", e => {

        const rect = card.getBoundingClientRect();

        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const rotateX = -(y - rect.height / 2) / 120;
        const rotateY = (x - rect.width / 2) / 120;

        card.style.transform = `
        perspective(1400px)
        rotateX(${rotateX}deg)
        rotateY(${rotateY}deg)
        translateY(-3px)
        scale(1.005)
        `;

    });

    card.addEventListener("mouseleave",()=>{

        card.style.transform = `
        perspective(1400px)
        rotateX(0deg)
        rotateY(0deg)
        translateY(0)
        scale(1)
        `;

    });

});

/* SCROLL PROGRESS AND BACK TO TOP */

const scrollProgressBar =
    document.querySelector("#scroll-progress-bar");

const floatingBackToTop =
    document.querySelector("#floating-back-to-top");

function updateScrollExperience() {
    const scrollTop =
        window.scrollY ||
        document.documentElement.scrollTop;

    const documentHeight =
        document.documentElement.scrollHeight -
        window.innerHeight;

    const scrollPercentage =
        documentHeight > 0
            ? (scrollTop / documentHeight) * 100
            : 0;

    if (scrollProgressBar) {
        scrollProgressBar.style.width =
            `${Math.min(scrollPercentage, 100)}%`;
    }

    floatingBackToTop?.classList.toggle(
        "visible",
        scrollTop > 650
    );
}

floatingBackToTop?.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});

window.addEventListener(
    "scroll",
    updateScrollExperience,
    {
        passive: true
    }
);

window.addEventListener(
    "load",
    updateScrollExperience
);