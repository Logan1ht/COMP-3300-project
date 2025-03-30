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
      name: 'Barry Allen',
      email: "Allen2fastB@hotmail.com",
      degree: "B.S. History",
      educationLevel: "Graduate",
      Employer: "MTSU Library",
      gpa: '2.1',
      Skills: "Reading, sorting, and organization"
  }
];


function generateProfiles() {
  const container = document.getElementById('profile-container');
  container.innerHTML=" ";

  
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
          <p class="skills"><strong>Skills:</strong> ${profile.skills}</p>
      `;
  
      container.appendChild(profileCard);
  });
}

function filterProfiles() {
    const query = document.getElementById('searchInput').ariaValueMax.toLoverCase();
    const container = document.getElementById('profile-container');
    container.innnerHTML = ' ';

    profiles.forEach(profile => {
      const profileText = `${profile.name} ${profile.degree} ${profile.employer} ${profile.skills}`.toLowerCase();

      if(profileText.includes(query)){
        const profiledCard = document.createElement('div');
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
            container.appenedChild(profileCard);
      }
    });
  }

  generateProfiles();
























generateProfiles()


