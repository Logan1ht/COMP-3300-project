const profilesPerPage = 5; // Number of profiles per page
let currentPage = 1; // Initial page

// Function to display a specific page of profiles
function displayPage(page, filteredProfiles = profiles) {
  const startIndex = (page - 1) * profilesPerPage;
  const endIndex = startIndex + profilesPerPage;
  const profilesToShow = filteredProfiles.slice(startIndex, endIndex);

  generateProfiles(profilesToShow);
  updatePaginationControls(page, filteredProfiles.length);
}

// Function to create and update pagination controls
function updatePaginationControls(currentPage, totalProfiles) {
  const paginationContainer = document.getElementById("pagination-container");
  paginationContainer.innerHTML = ""; // Clear existing controls

  const totalPages = Math.ceil(totalProfiles / profilesPerPage);

  // Create "Previous" button
  const prevButton = document.createElement("button");
  prevButton.innerText = "Previous";
  prevButton.classList.add("pagination-button");
  if (currentPage === 1) {
    prevButton.classList.add("disabled"); // Disable if on the first page
  } else {
    prevButton.addEventListener("click", () => displayPage(currentPage - 1));
  }

  // Create "Next" button
  const nextButton = document.createElement("button");
  nextButton.innerText = "Next";
  nextButton.classList.add("pagination-button");
  if (currentPage === totalPages) {
    nextButton.classList.add("disabled"); // Disable if on the last page
  } else {
    nextButton.addEventListener("click", () => displayPage(currentPage + 1));
  }

  // Append buttons to the pagination container
  paginationContainer.appendChild(prevButton);

  // Create numbered page buttons
  for (let i = 1; i <= totalPages; i++) {
    const pageButton = document.createElement("button");
    pageButton.innerText = i;
    pageButton.classList.add("pagination-button");
    if (i === currentPage) {
      pageButton.style.fontWeight = "bold"; // Highlight the current page
    } else {
      pageButton.addEventListener("click", () => displayPage(i));
    }
    paginationContainer.appendChild(pageButton);
  }

  paginationContainer.appendChild(nextButton);
}

// Function to generate and display profiles
function generateProfiles(profilesToShow) {
  const container = document.getElementById('profile-container');
  container.innerHTML = "";

  if (profilesToShow.length === 0) {
    const query = document.getElementById('searchInput').value.trim();
    if (query === "") {
      container.innerHTML = "<p>Start typing to search for students!</p>";
    } else {
      container.innerHTML = "<p>No matching profiles found.</p>";
    }
    return;
  }

  profilesToShow.forEach(profile => {
    const profileCard = document.createElement('div');
    profileCard.classList.add('profile-card');
    profileCard.setAttribute("data-degree", profile.degree);
    profileCard.setAttribute("data-gpa", profile.gpa);
    profileCard.setAttribute("data-name", profile.name.toLowerCase());

    profileCard.innerHTML = `
      <h2>${profile.name}</h2>
      <p><strong>Email:</strong> ${profile.email}</p>
      <p><strong>Degree:</strong> ${profile.degree}</p>
      <p><strong>Education Level:</strong> ${profile.educationLevel}</p>
      <p><strong>Employer:</strong> ${profile.employer}</p>
      <p><strong>GPA:</strong> ${profile.gpa}</p>
      <p class="skills"><strong>Skills:</strong> ${profile.skills}</p>
    `;

    container.appendChild(profileCard);
  });
}

// Function to filter profiles
function filterProfiles() {
  const degree = document.getElementById("degree-filter").value;
  const gpa = parseFloat(document.getElementById("gpa-filter").value);
  const searchQuery = document.getElementById("search-bar").value.toLowerCase().trim();
  
  // Filter profiles based on degree, GPA, and search query
  const filteredProfiles = profiles.filter(profile => {
    const matchesDegree = degree === "" || profile.degree === degree;
    const matchesGPA = isNaN(gpa) || profile.gpa >= gpa;
    const matchesSearch = profile.name.toLowerCase().includes(searchQuery) || 
                          profile.degree.toLowerCase().includes(searchQuery) ||
                          profile.educationLevel.toLowerCase().includes(searchQuery) ||
                          profile.employer.toLowerCase().includes(searchQuery) ||
                          profile.skills.toLowerCase().includes(searchQuery);
    
    return matchesDegree && matchesGPA && matchesSearch;
  });

  // Reset to first page when filters are applied
  currentPage = 1;
  displayPage(currentPage, filteredProfiles);
}

// Event listener for applying filters when the "Apply Filters" button is clicked
document.getElementById("apply-filters").addEventListener("click", function () {
  filterProfiles();
});

// Event listener for filters button to toggle the filter section visibility
document.getElementById("filters-button").addEventListener("click", function () {
  const filterSection = document.getElementById("filter-section");
  filterSection.classList.toggle("hidden");  // Toggle visibility
});

// Event listener for search bar keyup (real-time search)
document.getElementById('searchInput').addEventListener('keyup', () => {
  filterProfiles();
});

// Event listener for "Enter" key press on search bar
document.getElementById('searchInput').addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    e.preventDefault();
    filterProfiles();
  }
});

// Initial load (show all profiles)
window.onload = function () {
  displayPage(currentPage); // Display the first page initially
};