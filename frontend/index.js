const profiles = [
  {
    name: "John Doe",
    email: "john.doe@example.com",
    degree: "B.S. in Health Science",
    educationLevel: "Graduate",
    employer: "Pharma Tech",
    gpa: "3.6",
    skills: "Proficient in knowledge of health science."
  },
  {
    name: "Mason Watson",
    email: "WatsonCarrer@gmail.com",
    degree: "B.S. in Computer Science",
    educationLevel: "Graduate",
    employer: "TSU Tech",
    gpa: "3.0",
    skills: "Experienced in machine learning, java, and SQL."
  },
  {
    name: "Barry Allen",
    email: "Allen2fastB@hotmail.com",
    degree: "B.S. History",
    educationLevel: "Graduate",
    employer: "MTSU Library",
    gpa: "2.1",
    skills: "Reading, sorting, and organization"
  },
  {
    name: "John po",
    email: "john.doe@example.com",
    degree: "B.S. in Health Science",
    educationLevel: "Graduate",
    employer: "Pharma Tech",
    gpa: "3.6",
    skills: "Proficient in knowledge of health science."
  },
  {
    name: "John roe",
    email: "john.doe@example.com",
    degree: "B.S. in Health Science",
    educationLevel: "Graduate",
    employer: "Pharma Tech",
    gpa: "3.6",
    skills: "Proficient in knowledge of health science."
  }
];

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
  const query = document.getElementById('searchInput').value.toLowerCase().trim();

  if (query === "") {
    generateProfiles([]);
    return;
  }

  const filteredProfiles = profiles.filter(profile =>
    profile.name.toLowerCase().includes(query) ||
    profile.degree.toLowerCase().includes(query) ||
    profile.educationLevel.toLowerCase().includes(query) ||
    profile.employer.toLowerCase().includes(query) ||
    profile.skills.toLowerCase().includes(query)
  );

  generateProfiles(filteredProfiles);
}

// Run filter on keyup and also on Enter key press
const searchInput = document.getElementById('searchInput');

searchInput.addEventListener('keyup', (e) => {
  filterProfiles();
});

searchInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    e.preventDefault();
    filterProfiles();
  }
});

// Initial load
window.onload = function () {
  generateProfiles([]);
};
