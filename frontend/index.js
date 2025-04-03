// --- 1. Add Sample Profile Data ---
// You should replace this with your actual data source (e.g., fetching from an API)
const profiles = [
    { name: "Alice Smith", degree: "CS", gpa: 3.8, details: "Loves coding challenges." },
    { name: "Bob Johnson", degree: "EE", gpa: 3.5, details: "Interested in robotics." },
    { name: "Charl ie Brown", degree: "CS", gpa: 3.9, details: "AI enthusiast." },
    { name: "Diana Prince", degree: "EE", gpa: 3.7, details: "Focuses on power systems." },
    { name: "Ethan Hunt", degree: "CS", gpa: 3.2, details: "Cybersecurity expert." },
    { name: "Fiona Glenanne", degree: "EE", gpa: 3.6, details: "Works with signal processing." },
    { name: "George Lucas", degree: "CS", gpa: 4.0, details: "Game development lead." },
    { name: "Hannah Abbott", degree: "EE", gpa: 3.1, details: "Hardware design." },
    { name: "Ian Malcolm", degree: "CS", gpa: 3.4, details: "Data scientist." },
    { name: "Jane Doe", degree: "EE", gpa: 3.9, details: "Specializes in communications." },
    { name: "Kevin McCallister", degree: "CS", gpa: 3.0, details: "Home automation expert." },
    { name: "Luna Lovegood", degree: "EE", gpa: 3.8, details: "Explores theoretical circuits." }
  ];
  
  // --- State Variables ---
  const profilesPerPage = 5; // Number of profiles per page
  let currentPage = 1; // Initial page
  // This variable will hold the profiles currently being displayed (all or filtered)
  let currentFilteredProfiles = [...profiles]; // Start with all profiles
  
  // --- 2. Implement generateProfiles Function ---
  function generateProfiles(profilesToDisplay) {
    const profileContainer = document.getElementById("profile-container");
    profileContainer.innerHTML = ""; // Clear previous profiles before adding new ones
  
    if (profilesToDisplay.length === 0) {
        profileContainer.innerHTML = "<p>No profiles match the criteria.</p>"; // Message for no results
        return;
    }
  
    profilesToDisplay.forEach(profile => {
        const card = document.createElement("div");
        card.classList.add("profile-card");
        // Populate the card with profile data
        // Adjust the properties (name, degree, gpa, details) based on your actual data structure
        card.innerHTML = `
            <h3>${profile.name}</h3>
            <p>Degree: ${profile.degree}</p>
            <p>GPA: ${profile.gpa !== undefined ? profile.gpa : 'N/A'}</p>
            <p>${profile.details || 'No additional details.'}</p>
        `;
        profileContainer.appendChild(card);
    });
  }
  
  // --- Modified displayPage Function ---
  // Takes the page number and the list of profiles to paginate
  function displayPage(page, profilesToPaginate = currentFilteredProfiles) {
    currentPage = page; // Update the global current page number
  
    const startIndex = (page - 1) * profilesPerPage;
    const endIndex = startIndex + profilesPerPage;
    const profilesToShow = profilesToPaginate.slice(startIndex, endIndex);
  
    generateProfiles(profilesToShow); // Generate cards for the selected slice
    // Update pagination controls based on the *current set* of profiles
    updatePaginationControls(currentPage, profilesToPaginate);
  }
  
  // --- Modified updatePaginationControls Function ---
  function updatePaginationControls(currentPage, profilesToPaginate) {
    console.log("Updating Pagination Controls...");
  
    const paginationContainer = document.getElementById("pagination-container");
    paginationContainer.innerHTML = ""; // Clear existing controls
  
    const totalProfiles = profilesToPaginate.length;
    const totalPages = Math.ceil(totalProfiles / profilesPerPage);
  
    // Don't show pagination if there's only one page or less
    if (totalPages <= 1) {
        return;
    }
  
    // --- Create "Previous" button ---
    const prevButton = document.createElement("button");
    prevButton.innerText = "Previous";
    prevButton.classList.add("pagination-button");
    if (currentPage === 1) {
        prevButton.classList.add("disabled"); // Disable if on the first page
        prevButton.disabled = true; // Also disable the button functionally
    } else {
        // Pass the same list of profiles for consistency when navigating
        prevButton.addEventListener("click", () => displayPage(currentPage - 1, profilesToPaginate));
    }
    paginationContainer.appendChild(prevButton); // Add Previous button
  
    // --- Create numbered page buttons ---
    for (let i = 1; i <= totalPages; i++) {
        const pageButton = document.createElement("button");
        pageButton.innerText = i;
        pageButton.classList.add("pagination-button");
  
        if (i === currentPage) {
            pageButton.classList.add("active"); // Highlight the current page
        } else {
            // Pass the same list of profiles for consistency when navigating
            pageButton.addEventListener("click", () => displayPage(i, profilesToPaginate));
        }
        paginationContainer.appendChild(pageButton); // Add numbered button
    }
  
    // --- Create "Next" button ---
    const nextButton = document.createElement("button");
    nextButton.innerText = "Next";
    nextButton.classList.add("pagination-button");
    if (currentPage === totalPages) {
        nextButton.classList.add("disabled"); // Disable if on the last page
        nextButton.disabled = true; // Also disable the button functionally
    } else {
        // Pass the same list of profiles for consistency when navigating
        nextButton.addEventListener("click", () => displayPage(currentPage + 1, profilesToPaginate));
    }
    // --- 3. Append the Next Button (This was missing) ---
    paginationContainer.appendChild(nextButton); // Add Next button
  }
  
  
  // --- Filter Logic Placeholder (You'll expand this) ---
  // Example setup for the filter button and apply button
  const filtersButton = document.getElementById('filters-button');
  const filterSection = document.getElementById('filter-section');
  const applyFiltersButton = document.getElementById('apply-filters');
  const searchInput = document.getElementById('searchInput'); // Assuming this is the main search
  
  filtersButton.addEventListener('click', () => {
    filterSection.classList.toggle('hidden'); // Toggle visibility
  });
  
  // Basic apply filters functionality
  applyFiltersButton.addEventListener('click', () => {
    // Get filter values (example)
    const degreeValue = document.getElementById('degree-filter').value;
    const gpaValue = parseFloat(document.getElementById('gpa-filter').value) || 0; // Default to 0 if empty/invalid
    const searchValue = document.getElementById('search-bar').value.toLowerCase();
  
    // Filter the original 'profiles' array
    currentFilteredProfiles = profiles.filter(profile => {
        const matchesDegree = !degreeValue || profile.degree === degreeValue;
        const matchesGpa = !gpaValue || (profile.gpa && profile.gpa >= gpaValue);
        const matchesSearch = !searchValue || profile.name.toLowerCase().includes(searchValue);
        return matchesDegree && matchesGpa && matchesSearch;
    });
  
    // Display the first page of the filtered results
    displayPage(1, currentFilteredProfiles);
    filterSection.classList.add('hidden'); // Hide filters after applying
  });
  
  // Add listener for the main search input as well (optional, depending on desired behavior)
  searchInput.addEventListener('input', () => {
     const mainSearchValue = searchInput.value.toLowerCase();
     currentFilteredProfiles = profiles.filter(profile => {
        return profile.name.toLowerCase().includes(mainSearchValue);
        // You might want to search other fields too:
        // || profile.degree.toLowerCase().includes(mainSearchValue)
        // || profile.details.toLowerCase().includes(mainSearchValue)
     });
     displayPage(1, currentFilteredProfiles); // Reset to page 1 for new search
  });
  
  
  // --- Initial Load ---
  window.onload = function () {
    // Initially display the first page using the full 'profiles' list
    displayPage(currentPage, currentFilteredProfiles);
    console.log("Initial Page Display!");
  };