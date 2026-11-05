/*** Project Database ***/
const projects = [
    {
        id: 1,
        name: "Forma Identity",
        category: "branding",
        year: 2026,
        description: "A bold visual identity for a modern creative studio.",
        image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=85",
        featured: 1
    },
    {
        id: 2,
        name: "Nexus Digital",
        category: "websites",
        year: 2025,
        description: "A digital experience built around clarity and interaction.",
        image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=900&q=85",
        featured: 2
    },
    {
        id: 3,
        name: "Silent Horizons",
        category: "photography",
        year: 2026,
        description: "A visual exploration of natural landscapes.",
        image: "https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?auto=format&fit=crop&w=900&q=85",
        featured: 3
    },
    {
        id: 4,
        name: "Urban Lines",
        category: "architecture",
        year: 2024,
        description: "Architectural forms and modern city structures.",
        image: "https://images.unsplash.com/photo-1511818966892-d7d671e672a2?auto=format&fit=crop&w=900&q=85",
        featured: 4
    },
    {
        id: 5,
        name: "Studio North",
        category: "branding",
        year: 2025,
        description: "A distinctive identity for an independent design studio.",
        image: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=900&q=85",
        featured: 5
    },
    {
        id: 6,
        name: "Coastal Stories",
        category: "photography",
        year: 2024,
        description: "A collection inspired by coastal environments.",
        image: "https://images.unsplash.com/photo-1518837695005-2083093ee35b?auto=format&fit=crop&w=900&q=85",
        featured: 6
    },
    {
        id: 7,
        name: "Monument",
        category: "architecture",
        year: 2026,
        description: "An exploration of scale, structure and space.",
        image: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&w=900&q=85",
        featured: 7
    },
    {
        id: 8,
        name: "Pixel Commerce",
        category: "websites",
        year: 2024,
        description: "A clean e-commerce experience for digital shoppers.",
        image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=900&q=85",
        featured: 8
    }
];

/*** DOM Elements ***/
const projectGrid = document.querySelector("#projectGrid");
const searchInput = document.querySelector("#searchInput");
const sortSelect = document.querySelector("#sortSelect");
const filterList = document.querySelector("#filterList");
const resultsCount = document.querySelector("#resultsCount");
const emptyState = document.querySelector("#emptyState");
const clearFilters = document.querySelector("#clearFilters");
const emptyReset = document.querySelector("#emptyReset");

/*** Current Filter State ***/
let activeCategory = "all";

/*** Display Projects ***/
function displayProjects(projectList) {
    projectGrid.innerHTML = projectList.map((project) => `
        <article class="project-card">

            <div class="project-image">
                <img
                    src="${project.image}"
                    alt="${project.name}"
                    loading="lazy"
                >

                <span class="project-category">
                    ${project.category}
                </span>
            </div>

            <div class="project-details">

                <div class="project-meta">
                    <span>PROJECT / ${String(project.id).padStart(2, "0")}</span>
                    <span>${project.year}</span>
                </div>

                <h3>${project.name}</h3>

                <p>${project.description}</p>

            </div>

        </article>
    `).join("");

    resultsCount.textContent =
        `Showing ${projectList.length} of ${projects.length} projects`;

    emptyState.hidden = projectList.length !== 0;
    projectGrid.hidden = projectList.length === 0;
}

/*** Filter and Search Projects ***/
function filterProjects() {
    const searchTerm = searchInput.value.trim().toLowerCase();

    let filteredProjects = projects.filter((project) => {

        const matchesCategory =
            activeCategory === "all" ||
            project.category === activeCategory;

        const matchesSearch =
            project.name.toLowerCase().includes(searchTerm) ||
            project.category.toLowerCase().includes(searchTerm) ||
            project.description.toLowerCase().includes(searchTerm) ||
            String(project.year).includes(searchTerm);

        return matchesCategory && matchesSearch;
    });

    /*** Sort Filtered Projects ***/
    const sortValue = sortSelect.value;

    if (sortValue === "name-asc") {
        filteredProjects.sort((a, b) =>
            a.name.localeCompare(b.name)
        );
    }

    if (sortValue === "name-desc") {
        filteredProjects.sort((a, b) =>
            b.name.localeCompare(a.name)
        );
    }

    if (sortValue === "year-desc") {
        filteredProjects.sort((a, b) =>
            b.year - a.year
        );
    }

    if (sortValue === "year-asc") {
        filteredProjects.sort((a, b) =>
            a.year - b.year
        );
    }

    if (sortValue === "featured") {
        filteredProjects.sort((a, b) =>
            a.featured - b.featured
        );
    }

    displayProjects(filteredProjects);
}

/*** Category Filter Buttons ***/
filterList.addEventListener("click", (event) => {
    const button = event.target.closest(".filter-button");

    if (!button) return;

    activeCategory = button.dataset.category;

    document.querySelectorAll(".filter-button").forEach((item) => {
        const isActive = item === button;

        item.classList.toggle("active", isActive);
        item.setAttribute("aria-pressed", isActive);
    });

    filterProjects();
});

/*** Search Input ***/
searchInput.addEventListener("input", filterProjects);

/*** Sorting ***/
sortSelect.addEventListener("change", filterProjects);

/*** Reset All Filters ***/
function resetFilters() {
    activeCategory = "all";

    searchInput.value = "";
    sortSelect.value = "featured";

    document.querySelectorAll(".filter-button").forEach((button) => {
        const isActive = button.dataset.category === "all";

        button.classList.toggle("active", isActive);
        button.setAttribute("aria-pressed", isActive);
    });

    filterProjects();
}

clearFilters.addEventListener("click", resetFilters);
emptyReset.addEventListener("click", resetFilters);

/*** Initial Display ***/
filterProjects();