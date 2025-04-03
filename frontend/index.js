const profilesPerPage = 5;
let currentPage = 1;
let currentFilteredProfiles = [];

async function fetchProfiles() {
  try {
    const response = await fetch("http://localhost:3000/students");
    const data = await response.json();
    currentFilteredProfiles = data;
    displayPage(1, currentFilteredProfiles);
  } catch (error) {
    console.error("Error fetching student data:", error);
    document.getElementById("profile-container").innerHTML = "<p>Unable to load profiles.</p>";
  }
}

function generateProfiles(profilesToDisplay) {
  const container = document.getElementById("profile-container");
  container.innerHTML = "";

  if (profilesToDisplay.length === 0) {
    container.innerHTML = "<p>No profiles match the criteria.</p>";
    return;
  }

  profilesToDisplay.forEach(profile => {
    const card = document.createElement("div");
    card.classList.add("profile-card");

    const fullName = `${profile.first_name} ${profile.last_name}`;
    const skillsList = profile.skills && profile.skills.length
      ? profile.skills.join(", ")
      : "N/A";

    card.innerHTML = `
      <h3>${fullName}</h3>
      <p><strong>Email:</strong> ${profile.email}</p>
      <p><strong>Degree Program:</strong> ${profile.degree_program}</p>
      <p><strong>Classification:</strong> ${profile.degree_classification}</p>
      <p><strong>Employer:</strong> ${profile.employer}</p>
      <p><strong>GPA:</strong> ${profile.gpa}</p>
      <p><strong>Skills:</strong> ${skillsList}</p>
    `;

    container.appendChild(card);
  });
}

function displayPage(page, profilesToPaginate = currentFilteredProfiles) {
  currentPage = page;
  const start = (page - 1) * profilesPerPage;
  const end = start + profilesPerPage;
  const slice = profilesToPaginate.slice(start, end);
  generateProfiles(slice);
  updatePaginationControls(currentPage, profilesToPaginate);
}

function updatePaginationControls(currentPage, profilesToPaginate) {
  const container = document.getElementById("pagination-container");
  container.innerHTML = "";
  const totalPages = Math.ceil(profilesToPaginate.length / profilesPerPage);
  if (totalPages <= 1) return;

  const prev = document.createElement("button");
  prev.innerText = "Previous";
  prev.disabled = currentPage === 1;
  prev.onclick = () => displayPage(currentPage - 1, profilesToPaginate);
  container.appendChild(prev);

  for (let i = 1; i <= totalPages; i++) {
    const btn = document.createElement("button");
    btn.innerText = i;
    if (i === currentPage) btn.classList.add("active");
    btn.onclick = () => displayPage(i, profilesToPaginate);
    container.appendChild(btn);
  }

  const next = document.createElement("button");
  next.innerText = "Next";
  next.disabled = currentPage === totalPages;
  next.onclick = () => displayPage(currentPage + 1, profilesToPaginate);
  container.appendChild(next);
}

document.getElementById("searchInput").addEventListener("input", () => {
  const query = document.getElementById("searchInput").value.toLowerCase();
  const filtered = currentFilteredProfiles.filter(profile =>
    `${profile.first_name} ${profile.last_name}`.toLowerCase().includes(query) ||
    profile.degree_program.toLowerCase().includes(query) ||
    profile.degree_classification.toLowerCase().includes(query) ||
    profile.employer.toLowerCase().includes(query) ||
    (profile.skills || []).some(skill => skill.toLowerCase().includes(query))
  );
  displayPage(1, filtered);
});

window.onload = fetchProfiles;
