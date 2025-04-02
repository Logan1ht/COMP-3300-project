// --- Fetch profiles from the backend (db.json) ---
async function fetchProfiles() {
    try {
        const response = await fetch("http://localhost:3000/students"); // Adjust URL if needed
        const data = await response.json();

        // Transform fetched data to match existing profile structure
        currentFilteredProfiles = data.map(student => ({
            name: `${student.first_name} ${student.last_name}`,
            degree: student.degree_program,
            gpa: student.gpa,
            details: `Works at ${student.employer}. Skills: ${student.skills.join(", ")}`
        }));

        // Display the first page with fetched data
        displayPage(1, currentFilteredProfiles);
    } catch (error) {
        console.error("Error fetching profiles:", error);
    }
}

// --- State Variables ---
const profilesPerPage = 5; // Number of profiles per page
let currentPage = 1; // Initial page
let currentFilteredProfiles = []; // Hold profiles dynamically fetched

// --- Generate Profiles Function ---
function generateProfiles(profilesToDisplay) {
    const profileContainer = document.getElementById("profile-container");
    profileContainer.innerHTML = ""; // Clear previous profiles

    if (profilesToDisplay.length === 0) {
        profileContainer.innerHTML = "<p>No profiles match the criteria.</p>";
        return;
    }

    profilesToDisplay.forEach(profile => {
        const card = document.createElement("div");
        card.classList.add("profile-card");
        card.innerHTML = `
            <h3>${profile.name}</h3>
            <p>Degree: ${profile.degree}</p>
            <p>GPA: ${profile.gpa !== undefined ? profile.gpa : 'N/A'}</p>
            <p>${profile.details || 'No additional details.'}</p>
        `;
        profileContainer.appendChild(card);
    });
}

// --- Display Page Function ---
function displayPage(page, profilesToPaginate = currentFilteredProfiles) {
    currentPage = page;
    const startIndex = (page - 1) * profilesPerPage;
    const endIndex = startIndex + profilesPerPage;
    const profilesToShow = profilesToPaginate.slice(startIndex, endIndex);
    generateProfiles(profilesToShow);
    updatePaginationControls(currentPage, profilesToPaginate);
}

// --- Update Pagination Controls ---
function updatePaginationControls(currentPage, profilesToPaginate) {
    const paginationContainer = document.getElementById("pagination-container");
    paginationContainer.innerHTML = "";
    const totalPages = Math.ceil(profilesToPaginate.length / profilesPerPage);
    if (totalPages <= 1) return;

    const createButton = (text, disabled, onClick) => {
        const button = document.createElement("button");
        button.innerText = text;
        button.classList.add("pagination-button");
        if (disabled) {
            button.classList.add("disabled");
            button.disabled = true;
        } else {
            button.addEventListener("click", onClick);
        }
        return button;
    };

    paginationContainer.appendChild(createButton("Previous", currentPage === 1, () => displayPage(currentPage - 1, profilesToPaginate)));
    for (let i = 1; i <= totalPages; i++) {
        paginationContainer.appendChild(createButton(i, i === currentPage, () => displayPage(i, profilesToPaginate)));
    }
    paginationContainer.appendChild(createButton("Next", currentPage === totalPages, () => displayPage(currentPage + 1, profilesToPaginate)));
}

// --- Filter Logic ---
const filtersButton = document.getElementById('filters-button');
const filterSection = document.getElementById('filter-section');
const applyFiltersButton = document.getElementById('apply-filters');

filtersButton.addEventListener('click', () => {
    filterSection.classList.toggle('hidden');
});

applyFiltersButton.addEventListener('click', () => {
    const degreeValue = document.getElementById('degree-filter').value;
    const gpaValue = parseFloat(document.getElementById('gpa-filter').value) || 0;

    currentFilteredProfiles = currentFilteredProfiles.filter(profile => {
        const matchesDegree = !degreeValue || profile.degree === degreeValue;
        const matchesGpa = !gpaValue || (profile.gpa && profile.gpa >= gpaValue);
        return matchesDegree && matchesGpa;
    });

    displayPage(1, currentFilteredProfiles);
    filterSection.classList.add('hidden');
});

// --- Initial Load ---
window.onload = function () {
    fetchProfiles();
};
