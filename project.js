async function loadProjects() {
  try {
    const response = await fetch("https://api.github.com/users/Tkaekae/repos");
    const repos = await response.json();
    console.log("Fetched repos:", repos); // Debug log

    const container = document.getElementById("projects");

    if (!repos || repos.length === 0) {
      container.innerHTML = "<p>No public projects found. Add repos to GitHub and they’ll show here!</p>";
      return;
    }

    // 🔑 Filter: only show repos with 'portfolio' in the description
    const filteredRepos = repos.filter(repo => repo.description && repo.description.toLowerCase().includes("portfolio"));

    if (filteredRepos.length === 0) {
      container.innerHTML = "<p>No portfolio projects found. Tag your repos with 'portfolio' in the description!</p>";
      return;
    }

    filteredRepos.forEach(repo => {
      const projectBox = document.createElement("div");
      projectBox.className = "project-box";
      projectBox.innerHTML = `
        <h3>${repo.name}</h3>
        <p>${repo.description}</p>
        <a href="${repo.html_url}" target="_blank">View on GitHub</a>
      `;
      container.appendChild(projectBox);
    });
  } catch (error) {
    console.error("Error loading projects:", error);
    document.getElementById("projects").innerHTML = "<p>Failed to load projects.</p>";
  }
}

loadProjects();
