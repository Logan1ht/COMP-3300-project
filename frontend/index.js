const profiles = [
  {
      name: "John Doe",
      email: "john.doe@example.com",
      degree: "B.S. in Health Science",
      educationLevel: "Graduate",
      employer: "Pharma Tech",
      gpa: "3.6",
      skills: "Proficient in knowledge of health systems."
  },
  {
      name: "Mason Watson",
      email: "WatsonCarrer@gmail.com",
      degree: "M.S. in Computer Science",
      educationLevel: "Undergraduate",
      employer: "TSU Tech",
      gpa: "1.8",
      skills: "Proficient in Java, html, javascript, and SQL."
  }
];

// Function to generate profile cards dynamically
function generateProfiles() {
  const container = document.getElementById('profile-container');
  
  profiles.forEach(profile => {
      const profileCard = document.createElement('div');
      profileCard.classList.add('profile-card');

      profileCard.innerHTML = `
          <h2>${profile.name}</h2>
          <p><strong>Email:</strong> ${profile.email}</p>
          <p><strong>Degree:</strong> ${profile.degree}</p>
          <p><strong>Education Level:</strong> ${profile.educationLevel}</p>
          <p><strong>Employer:</strong> ${profile.employer}</p>
          <p><strong>GPA:</strong> ${profile.gpa}</p>
          <p class="skills"><strong>Skills/Summary:</strong> ${profile.skills}</p>
      `;
      
      container.appendChild(profileCard);
  });
}

// Call the function to generate the profiles when the page loads
generateProfiles();