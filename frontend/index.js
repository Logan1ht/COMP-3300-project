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

function filterProfiles() {
  const degree = document.getElementById("degree-filter").value;
  const gpa = parseFloat(document.getElementById("gpa-filter").value);
  const searchQuery = document.getElementById("search-bar").value.toLowerCase().trim();
  
  // Filter profiles based on degree, GPA, and search query
  let filteredProfiles = profiles.filter(profile => {
    let matchesDegree = degree === "" || profile.degree === degree;
    let matchesGPA = isNaN(gpa) || profile.gpa >= gpa;
    let matchesSearch = profile.name.toLowerCase().includes(searchQuery) || 
                        profile.degree.toLowerCase().includes(searchQuery) ||
                        profile.educationLevel.toLowerCase().includes(searchQuery) ||
                        profile.employer.toLowerCase().includes(searchQuery) ||
                        profile.skills.toLowerCase().includes(searchQuery);
    
    return matchesDegree && matchesGPA && matchesSearch;
  });

  generateProfiles(filteredProfiles);
}

// Event listener for applying filters when the "Apply Filters" button is clicked
document.getElementById("apply-filters").addEventListener("click", function () {
  filterProfiles();
});

// Event listener for search bar keyup (real-time search)
const searchInput = document.getElementById('searchInput');
searchInput.addEventListener('keyup', (e) => {
  filterProfiles();
});

// Event listener for "Enter" key press on search bar
searchInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    e.preventDefault();
    filterProfiles();
  }
});

// Initial load (show all profiles)
window.onload = function () {
  generateProfiles(profiles);
};
