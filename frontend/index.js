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
    if (i === currentPage) {
      pageButton.style.fontWeight = "bold"; // Highlight the current page
    } else {
      pageButton.addEventListener("click", () => displayPage(i));
    }
    paginationContainer.appendChild(pageButton);
  }

  paginationContainer.appendChild(nextButton);
}

window.onload = function () {
  displayPage(currentPage); // Display the first page initially
  console,log("First Page Display!");
};