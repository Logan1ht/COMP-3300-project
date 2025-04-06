const profilesPerPage = 5;
let currentPage = 1;
let allProfiles = []; // <--- Added: To store the original full list
let currentFilteredProfiles = []; // This will hold the list currently being displayed/paginated

// --- NEW or MODIFIED parts ---

// Fetch student profiles from the server
async function fetchProfiles() {
  try {
    const response = await fetch("http://localhost:3000/students");
    if (!response.ok) { // Check if response status is OK (200-299)
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    allProfiles = data; // Store the master list
    currentFilteredProfiles = [...allProfiles]; // Initially, display all profiles
    displayPage(1, currentFilteredProfiles);
  } catch (error) {
    console.error("Error fetching student data:", error);
    document.getElementById("profile-container").innerHTML =
      `<p>Unable to load profiles. Error: ${error.message}</p>`; // Show error message
  }
}

// Apply filters when "Apply Filters" button is clicked
document.getElementById("apply-filters").addEventListener("click", () => {
  const degreeFilter = document.getElementById("degree-filter").value;
  const gpaFilterInput = document.getElementById("gpa-filter").value;
  // Important: Parse GPA only if input is not empty, otherwise treat as no filter
  const gpaFilter = gpaFilterInput === "" ? NaN : parseFloat(gpaFilterInput);

  // Optional: Clear the main search bar when applying filters
  // document.getElementById("searchInput").value = "";

  // Start filtering from the MASTER list (allProfiles)
  currentFilteredProfiles = allProfiles.filter(profile => {
    // Check degree match (true if filter is "All" or matches profile)
    const matchesDegree = degreeFilter === "" || profile.degree_program === degreeFilter;

    // Check GPA match (true if filter is not a number OR profile GPA is >= filter)
    // Also, ensure profile.gpa is a valid number before comparing
    const profileGPA = parseFloat(profile.gpa); // Convert profile's GPA
    const matchesGPA = isNaN(gpaFilter) || (!isNaN(profileGPA) && profileGPA >= gpaFilter);

    return matchesDegree && matchesGPA;
  });

  // Display filtered results, resetting to page 1
  displayPage(1, currentFilteredProfiles);

  // Optional: Hide the filter section again
  // document.getElementById("filter-section").classList.add("hidden");
});

// Live search functionality
document.getElementById("searchInput").addEventListener("input", () => {
  const query = document.getElementById("searchInput").value.toLowerCase().trim();

  // Optional: Reset the filter section inputs when using main search
  // document.getElementById("degree-filter").value = "";
  // document.getElementById("gpa-filter").value = "";

  // Start filtering from the MASTER list (allProfiles)
  currentFilteredProfiles = allProfiles.filter(profile => {
    // If search query is empty, show all profiles
    if (query === "") return true;

    // Combine searchable fields, handling potential null/undefined values
    const fullName = `${profile.first_name || ''} ${profile.last_name || ''}`.toLowerCase();
    const degreeProgram = (profile.degree_program || '').toLowerCase();
    const classification = (profile.degree_classification || '').toLowerCase();
    const employer = (profile.employer || '').toLowerCase();
    const skills = (profile.skills || []).map(skill => (skill || '').toLowerCase());

    // Check if query matches any field
    return fullName.includes(query) ||
           degreeProgram.includes(query) ||
           classification.includes(query) ||
           employer.includes(query) ||
           skills.some(skill => skill.includes(query));
  });

  // Display filtered results, resetting to page 1
  displayPage(1, currentFilteredProfiles);
});


// --- Functions that likely don't need changes (generateProfiles, displayPage, updatePaginationControls, filters-button listener) ---

// Generate and display student profile cards
function generateProfiles(profilesToDisplay) {
  const container = document.getElementById("profile-container");
  container.innerHTML = "";

  if (!profilesToDisplay || profilesToDisplay.length === 0) { // Added check for null/undefined
    container.innerHTML = "<p>No profiles match the criteria.</p>";
    return;
  }

  profilesToDisplay.forEach(profile => {
    if (!profile) return; // Skip if profile data is somehow null/undefined

    const card = document.createElement("div");
    card.classList.add("profile-card");

    // Use empty strings as fallback for potentially missing data
    const firstName = profile.first_name || '';
    const lastName = profile.last_name || '';
    const email = profile.email || 'N/A';
    const degreeProgram = profile.degree_program || 'N/A';
    const classification = profile.degree_classification || 'N/A';
    const employer = profile.employer || 'N/A';
    const gpa = profile.gpa !== undefined && profile.gpa !== null ? profile.gpa : 'N/A'; // Handle 0 GPA correctly
    const skillsList = profile.skills && profile.skills.length
      ? profile.skills.map(s => s || 'N/A').join(", ") // Handle null skills in array
      : "N/A";

    const fullName = `${firstName} ${lastName}`.trim(); // Trim in case one name is missing

    card.innerHTML = `
      <h3>${fullName || 'N/A'}</h3>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Degree Program:</strong> ${degreeProgram}</p>
      <p><strong>Classification:</strong> ${classification}</p>
      <p><strong>Employer:</strong> ${employer}</p>
      <p><strong>GPA:</strong> ${gpa}</p>
      <p><strong>Skills:</strong> ${skillsList}</p>
    `;

    container.appendChild(card);
  });
}

// Display profiles for the current page
function displayPage(page, profilesToPaginate) { // Removed default value to rely on explicit passing
  // Ensure profilesToPaginate is always an array
  const profilesList = Array.isArray(profilesToPaginate) ? profilesToPaginate : [];

  currentPage = page;
  const start = (page - 1) * profilesPerPage;
  const end = start + profilesPerPage;
  // Slice the validated list
  const slice = profilesList.slice(start, end);
  generateProfiles(slice);
  // Pass the validated list to pagination controls
  updatePaginationControls(currentPage, profilesList);
}

// Update pagination controls
function updatePaginationControls(currentPage, profilesToPaginate) {
    const container = document.getElementById("pagination-container");
    container.innerHTML = ""; // Clear existing controls

    // Ensure profilesToPaginate is an array before getting length
    const totalProfiles = Array.isArray(profilesToPaginate) ? profilesToPaginate.length : 0;
    const totalPages = Math.ceil(totalProfiles / profilesPerPage);

    // Only show controls if there's more than one page
    if (totalPages <= 1) {
        // console.log("Pagination hidden: totalPages <= 1"); // Debug log
        return;
    }
    // console.log(`Updating pagination: currentPage=${currentPage}, totalPages=${totalPages}`); // Debug log

    // --- Previous Button ---
    const prev = document.createElement("button");
    prev.innerText = "Previous";
    prev.classList.add("pagination-button"); // Add class for styling
    prev.disabled = currentPage === 1;
    if(prev.disabled) prev.classList.add("disabled"); // Add disabled class for styling
    // Ensure we pass the *correct* list (the one we used to calculate totalPages)
    prev.onclick = () => displayPage(currentPage - 1, profilesToPaginate);
    container.appendChild(prev);

    // --- Numbered Page Buttons ---
    for (let i = 1; i <= totalPages; i++) {
        const btn = document.createElement("button");
        btn.innerText = i;
        btn.classList.add("pagination-button"); // Add class for styling
        if (i === currentPage) {
            btn.classList.add("active"); // Highlight current page
        }
        // Ensure we pass the *correct* list
        btn.onclick = () => displayPage(i, profilesToPaginate);
        container.appendChild(btn);
    }

    // --- Next Button ---
    const next = document.createElement("button");
    next.innerText = "Next";
    next.classList.add("pagination-button"); // Add class for styling
    next.disabled = currentPage === totalPages;
    if(next.disabled) next.classList.add("disabled"); // Add disabled class for styling
     // Ensure we pass the *correct* list
    next.onclick = () => displayPage(currentPage + 1, profilesToPaginate);
    container.appendChild(next);
}


// Handle "Filters" button toggle
document.getElementById("filters-button").addEventListener("click", () => {
  const filterSection = document.getElementById("filter-section");
  filterSection.classList.toggle("hidden");
});


// Fetch profiles on page load
window.onload = fetchProfiles;