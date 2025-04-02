// Function to toggle the filter section visibility
document.getElementById("filters-button").addEventListener("click", function () {
    const filterSection = document.getElementById("filter-section");
    filterSection.classList.toggle("hidden");
  });
  
  // Function to apply filters
  document.getElementById("apply-filters").addEventListener("click", function () {
    let degree = document.getElementById("degree-filter").value;
    let gpa = parseFloat(document.getElementById("gpa-filter").value);
    let searchQuery = document.getElementById("search-bar").value.toLowerCase();
  
    let profiles = document.querySelectorAll(".profile-card");
  
    profiles.forEach(profile => {
      let profileDegree = profile.getAttribute("data-degree");
      let profileGPA = parseFloat(profile.getAttribute("data-gpa"));
      let profileName = profile.getAttribute("data-name").toLowerCase();
  
      let matchesDegree = degree === "" || profileDegree === degree;
      let matchesGPA = isNaN(gpa) || profileGPA >= gpa;
      let matchesSearch = profileName.includes(searchQuery);
  
      if (matchesDegree && matchesGPA && matchesSearch) {
        profile.style.display = "block";
      } else {
        profile.style.display = "none";
      }
    });
  });
  
  // Sample profile data (replace with real data or fetch from API)
  const profiles = [
    {
      name: "John Doe",
      email: "john@example.com",
      degree: "CS",
      educationLevel: "Undergraduate",
      employer: "Google",
      gpa: 3.8,
      skills: "JavaScript, Python",
    },
    {
      name: "Jane Smith",
      email: "jane@example.com",
      degree: "EE",
      educationLevel: "Master's",
      employer: "Tesla",
      gpa: 3.9,
      skills: "C++, MATLAB",
    },
  ];
  
  // Function to generate profiles
  function generateProfiles(profilesToShow) {
    const container = document.getElementById("profile-container");
    container.innerHTML = ""; // Clear the container
  
    if (profilesToShow.length === 0) {
      const query = document.getElementById("searchInput").value.trim();
      container.innerHTML = query === "" ? "<p>Start typing to search for students!</p>" : "<p>No matching profiles found.</p>";
      return;
    }
  
    profilesToShow.forEach(profile => {
      const profileCard = document.createElement("div");
      profileCard.classList.add("profile-card");
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
  
  // Initial profiles load
  window.onload = function () {
    generateProfiles(profiles);
  };