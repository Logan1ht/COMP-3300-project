const profilesPerPage = 5; // Number of profiles per page
let currentPage = 1; // Initial page

function displayPage(page, filteredProfiles = profiles) {
  const startIndex = (page - 1) * profilesPerPage;
  const endIndex = startIndex + profilesPerPage;
  const profilesToShow = filteredProfiles.slice(startIndex, endIndex);

  generateProfiles(profilesToShow);
  updatePaginationControls(page, filteredProfiles.length);
}

function updatePaginationControls(currentPage, totalProfiles) {
  console.log("Updating Pagination Controls..."); // Log when updating pagination controls
  
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

  const nextButton = document.createElement("button");
  nextButton.innerText = "Next";
  nextButton.classList.add("pagination-button");
  if (currentPage === totalPages) {
    nextButton.classList.add("disabled"); // Disable if on the last page
  } else {
    nextButton.addEventListener("click", () => displayPage(currentPage + 1));
  }

  paginationContainer.appendChild(prevButton);

  // Create numbered page buttons
  for (let i = 1; i <= totalPages; i++) {
    const pageButton = document.createElement("button");
    pageButton.innerText = i;
    pageButton.classList.add("pagination-button");
    
    // Add the active class to the current page
    if (i === currentPage) {
      pageButton.classList.add("active"); // Add the active class
    } else {
      pageButton.addEventListener("click", () => displayPage(i)); // Add event listener for other pages
    }
    
    paginationContainer.appendChild(pageButton); // Append the button to the container
  }

window.onload = function () {
  displayPage(currentPage); // Display the first page initially
  console.log("First Page Display!"); // Log when the first page is displayed
};