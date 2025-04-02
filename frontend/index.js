document.getElementById("filters-button").addEventListener("click", function () {
  const filterSection = document.getElementById("filter-section");
  
  // Check if the filter section is hidden
  if (filterSection.classList.contains("hidden")) {
      // Remove the hidden class and show filter items dynamically
      filterSection.classList.remove("hidden");
      
      // Dynamically populate filter section (ensure this runs only once or as needed)
      if (!filterSection.hasChildNodes()) {
          filterSection.innerHTML = `
              <div class="filter-item">
                  <label for="degree-filter">Degree:</label>
                  <select id="degree-filter">
                      <option value="">All</option>
                      <option value="CS">Computer Science</option>
                      <option value="EE">Electrical Engineering</option>
                  </select>
              </div>
              <div class="filter-item">
                  <label for="gpa-filter">GPA Range:</label>
                  <input type="number" id="gpa-filter" placeholder="Min GPA" step="0.1">
              </div>
              <div class="filter-item">
                  <label for="search-bar">Search:</label>
                  <input type="text" id="search-bar" placeholder="Search by name">
              </div>
              <button id="apply-filters">Apply Filters</button>
          `;
          
          // Attach new event listeners to dynamically created elements
          document.getElementById("apply-filters").addEventListener("click", function () {
              filterProfiles();
          });
      }
  } else {
      // Add the hidden class and remove the filters
      filterSection.classList.add("hidden");
      filterSection.innerHTML = "";  // Optionally clear filters dynamically
  }
});