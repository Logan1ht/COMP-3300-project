const profilesPerPage = 10;
let currentPage = 1;
let allProfiles = [];
let currentFilteredProfiles = [];

// Fetch student profiles from the server
async function fetchProfiles() {
    try {
        const response = await fetch("http://localhost:3000/students");
        const data = await response.json();
        allProfiles = data;
        currentFilteredProfiles = data;
        displayPage(1, currentFilteredProfiles);
    } catch (error) {
        console.error("Error fetching student data:", error);
        document.getElementById("profile-container").innerHTML = "<p>Unable to load profiles.</p>";
    }
}

// Generate and display student profile cards
function generateProfiles(profilesToDisplay) {
    const container = document.getElementById("profile-container");
    container.innerHTML = "";

    if (profilesToDisplay.length === 0) {
        container.innerHTML = "<p>No profiles match the criteria.</p>";
        return;
    }

    profilesToDisplay.forEach(profile => {
        const card = document.createElement("div");
        card.classList.add("profile-card");

        const fullName = `${profile.first_name} ${profile.last_name}`;
        const skillsList = profile.skills && profile.skills.length ? profile.skills.join(", ") : "N/A";

        card.innerHTML = `
            <h3>${fullName}</h3>
            <p><strong>Email:</strong> ${profile.email}</p>
            <p><strong>Degree Program:</strong> ${profile.degree_program}</p>
            <p><strong>Classification:</strong> ${profile.degree_classification}</p>
            <p><strong>Employer:</strong> ${profile.employer}</p>
            <p><strong>GPA:</strong> ${profile.gpa}</p>
            <p><strong>Skills:</strong> ${skillsList}</p>
        `;

        container.appendChild(card);
    });
}

// Display profiles for the current page
function displayPage(page, profilesToPaginate = currentFilteredProfiles) {
    currentPage = page;
    const start = (page - 1) * profilesPerPage;
    const end = start + profilesPerPage;
    const slice = profilesToPaginate.slice(start, end);
    generateProfiles(slice);
    updatePaginationControls(currentPage, profilesToPaginate);
}

// Update pagination controls
function updatePaginationControls(currentPage, profilesToPaginate) {
    const container = document.getElementById("pagination-container");
    container.innerHTML = "";

    const totalPages = Math.ceil(profilesToPaginate.length / profilesPerPage);
    if (totalPages <= 1) return;

    const prev = document.createElement("button");
    prev.innerText = "Previous";
    prev.disabled = currentPage === 1;
    prev.onclick = () => displayPage(currentPage - 1, profilesToPaginate);
    container.appendChild(prev);

    for (let i = 1; i <= totalPages; i++) {
        const btn = document.createElement("button");
        btn.innerText = i;
        if (i === currentPage) btn.classList.add("active");
        btn.onclick = () => displayPage(i, profilesToPaginate);
        container.appendChild(btn);
    }

    const next = document.createElement("button");
    next.innerText = "Next";
    next.disabled = currentPage === totalPages;
    next.onclick = () => displayPage(currentPage + 1, profilesToPaginate);
    container.appendChild(next);
}

// Handle "Filters" button toggle
document.getElementById("filters-button").addEventListener("click", () => {
    const filterSection = document.getElementById("filter-section");
    filterSection.classList.toggle("hidden");
});

// Apply filters when "Apply Filters" button is clicked
document.getElementById("apply-filters").addEventListener("click", () => {
    const degreeFilter = document.getElementById("degree-filter").value;
    const gpaFilter = parseFloat(document.getElementById("gpa-filter").value);
    const gradYearFilter = document.getElementById("grad-year-filter").value;
    const certFilter = document.getElementById("certification-filter").value;
    const locationFilter = document.getElementById("location-filter").value;
    const orgFilter = document.getElementById("organization-filter").value;

    const filteredProfiles = allProfiles.filter(profile => {
        const matchesDegree = degreeFilter === "" || profile.degree_program === degreeFilter;
        const matchesGPA = isNaN(gpaFilter) || profile.gpa >= gpaFilter;
        const matchesGradYear = gradYearFilter === "" || String(profile.graduation_year) === gradYearFilter;
        const matchesCert = certFilter === "" || (profile.certifications || []).includes(certFilter);
        const matchesLocation = locationFilter === "" || profile.location === locationFilter;
        const matchesOrg = orgFilter === "" || (profile.organizations || []).includes(orgFilter);

        return (
            matchesDegree &&
            matchesGPA &&
            matchesGradYear &&
            matchesCert &&
            matchesLocation &&
            matchesOrg
        );
    });

    currentFilteredProfiles = filteredProfiles;
    displayPage(1, filteredProfiles);
});

// Live search functionality
document.getElementById("searchInput").addEventListener("input", () => {
    const query = document.getElementById("searchInput").value.toLowerCase();
    const filtered = currentFilteredProfiles.filter(profile => 
        `${profile.first_name} ${profile.last_name}`.toLowerCase().includes(query) ||
        profile.degree_program.toLowerCase().includes(query) ||
        profile.degree_classification.toLowerCase().includes(query) ||
        profile.employer.toLowerCase().includes(query) ||
        (profile.skills || []).some(skill => skill.toLowerCase().includes(query))
    );
    displayPage(1, filtered);
});

// Fetch profiles on page load
window.onload = fetchProfiles;