let profilesPerPage = 10;
let currentPage = 1;
let allProfiles = [];
let currentFilteredProfiles = [];

let profilesPerPageSetting = 10;

// Function to handle profile per page selection change
function updateProfilesPerPage() {
    const profilesPerPageSelect = document.getElementById("profiles-per-page");
    const selectedValue = profilesPerPageSelect.value;

    // Update profilesPerPage based on selection
    if (selectedValue === "all") {
        profilesPerPage = currentFilteredProfiles.length; // Show all profiles
    } else {
        profilesPerPage = parseInt(selectedValue, 10); // Convert to integer for other values
    }

    // Redisplay the profiles based on new profilesPerPage
    displayPage(1, currentFilteredProfiles);
}

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
  
    const isBookmarked = bookmarks.includes(profile.id);
    const bookmarkIcon = isBookmarked ? "★" : "☆";
  
    // Build the inner profile details
    card.innerHTML = `
      <h3>${profile.first_name} ${profile.last_name}</h3>
      <p><strong>Email:</strong> ${profile.email}</p>
      <p><strong>Gender:</strong> ${profile.gender || "N/A"}</p>
      <p><strong>Classification:</strong> ${profile.degree_classification}</p>
      <p><strong>Degree Program:</strong> ${profile.degree_program}</p>
      <p><strong>Degree:</strong> ${profile.degree}</p>
      <p><strong>Employer:</strong> ${profile.employer}</p>
      <p><strong>Graduation Year:</strong> ${profile.graduation_year || "N/A"}</p>
      <p><strong>Location:</strong> ${profile.location || "N/A"}</p>
      <p><strong>Certifications:</strong> ${(profile.certifications || []).join(", ")}</p>
      <p><strong>Organizations:</strong> ${(profile.organizations || []).join(", ")}</p>
      <p><strong>GPA:</strong> ${profile.gpa}</p>
      <p><strong>Skills:</strong> ${(profile.skills || []).join(", ")}</p>
    `;
  
    // Create Bookmark Button
    const bookmarkBtn = document.createElement("button");
    bookmarkBtn.classList.add("bookmark-btn");
    bookmarkBtn.innerHTML = `${bookmarkIcon} Bookmark`;
    bookmarkBtn.onclick = () => toggleBookmark(profile.id);
    card.insertBefore(bookmarkBtn, card.children[1]); // insert before email
  
    // Create Fullscreen Button
    const viewBtn = document.createElement("button");
    viewBtn.textContent = "View Fullscreen";
    viewBtn.onclick = () => openFullscreen(profile);
    card.appendChild(viewBtn);
  
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
    const clearFiltersBtn = document.getElementById("clear-filters");
    filterSection.classList.toggle("hidden");

    if (filterSection.classList.contains("hidden")) {
      clearFiltersBtn.classList.add("hidden");
  } else {
      clearFiltersBtn.classList.remove("hidden");
  }

});

// Apply filters when "Apply Filters" button is clicked
document.getElementById("apply-filters").addEventListener("click", () => {
  document.getElementById("clear-filters").addEventListener("click", () => {
    document.getElementById("degree-filter").value = "";
    document.getElementById("gpa-filter").value = "";
    document.getElementById("grad-year-filter").value = "";
    document.getElementById("certification-filter").value = "";
    document.getElementById("location-filter").value = "";
    document.getElementById("organization-filter").value = "";
    document.getElementById("searchInput").value = "";

    // Reset filters and show all profiles
    currentFilteredProfiles = allProfiles;
    updateProfilesPerPage();
    displayPage(1, currentFilteredProfiles);
});
    const degreeFilter = document.getElementById("degree-filter").value;
    const gpaFilter = parseFloat(document.getElementById("gpa-filter").value);
    const gradYearFilter = document.getElementById("grad-year-filter").value;
    const certFilter = document.getElementById("certification-filter").value;
    const locationFilter = document.getElementById("location-filter").value;
    const orgFilter = document.getElementById("organization-filter").value;

    const filteredProfiles = allProfiles.filter(profile => {
        const matchesDegree = degreeFilter === "" || profile.degree_program === degreeFilter;
        const matchesGPA = isNaN(gpaFilter) || parseFloat(profile.gpa || 0) === gpaFilter;
        
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

window.addEventListener("scroll", () => {
    const navbar = document.querySelector(".navbar");
    const pageTitle = document.getElementById("page-title");
  
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
      pageTitle.style.opacity = "0";
      pageTitle.style.transform = "translateY(-20px)";
    } else {
      navbar.classList.remove("scrolled");
      pageTitle.style.opacity = "1";
      pageTitle.style.transform = "translateY(0)";
    }
  });

  function goToPage(page) {
    window.location.href = `${page}.html`;
  }

let bookmarks = JSON.parse(localStorage.getItem("bookmarks")) || [];

function toggleBookmark(id) {
  if (bookmarks.includes(id)) {
    bookmarks = bookmarks.filter(b => b !== id);
  } else {
    bookmarks.push(id);
  }
  localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  displayPage(currentPage, currentFilteredProfiles);
}
function openFullscreen(profile) {
  const container = document.getElementById("fullscreen-profile");
  const content = document.getElementById("fullscreen-content");

  content.innerHTML = `
    <h2>${profile.first_name} ${profile.last_name}</h2>
    <p><strong>Email:</strong> ${profile.email}</p>
    <p><strong>Gender:</strong> ${profile.gender || "N/A"}</p>
    <p><strong>Classification:</strong> ${profile.degree_classification}</p>
    <p><strong>Program:</strong> ${profile.degree_program}</p>
    <p><strong>Degree:</strong> ${profile.degree}</p>
    <p><strong>Employer:</strong> ${profile.employer}</p>
    <p><strong>Graduation Year:</strong> ${profile.graduation_year || "N/A"}</p>
    <p><strong>Location:</strong> ${profile.location || "N/A"}</p>
    <p><strong>Certifications:</strong> ${(profile.certifications || []).join(", ")}</p>
    <p><strong>Organizations:</strong> ${(profile.organizations || []).join(", ")}</p>
    <p><strong>GPA:</strong> ${profile.gpa}</p>
    <p><strong>Skills:</strong> ${(profile.skills || []).join(", ")}</p>
  `;

  container.classList.remove("hidden");
}

function closeFullscreen() {
  document.getElementById("fullscreen-profile").classList.add("hidden");
}



