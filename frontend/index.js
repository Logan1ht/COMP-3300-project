document.getElementById("filters-button").addEventListener("click", function () {
  const filterSection = document.getElementById("filter-section");
  filterSection.classList.toggle("hidden"); // Toggle 'hidden' class
});

// Sample profile data (you can replace this with actual data or API)
const profiles = [
  { name: "John Doe", email: "john.doe@example.com", degree: "CS", gpa: 3.8, skills: "JavaScript, Python" },
  { name: "Jane Smith", email: "jane.smith@example.com", degree: "EE", gpa: 3.5, skills: "C++, MATLAB" },
  // Add more profiles as needed
];

// Function to generate profiles in the profile container
function generateProfiles() {
  const container = document.getElementById("profile-container");
  container.innerHTML = ""; // Clear existing profiles

  profiles.forEach(profile => {
    const profileCard = document.createElement("div");
    profileCard.classList.add("profile-card");
    profileCard.setAttribute("data-name", profile.name);
    
    profileCard.innerHTML = `
      <h2>${profile.name}</h2>
      <p><strong>Email:</strong> ${profile.email}</p>
      <p><strong>Degree:</strong> ${profile.degree}</p>
      <p><strong>GPA:</strong> ${profile.gpa}</p>
      <p><strong>Skills:</strong> ${profile.skills}</p>
    `;

    container.appendChild(profileCard);
  });
}

// Initialize profiles on page load
window.onload = function() {
  generateProfiles();
};