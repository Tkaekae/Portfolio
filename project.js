async function loadProjects() {
  try {
    const response = await fetch("https://api.github.com/users/Tkaekae/repos");
    const repos = await response.json();
    const container = document.getElementById("projects");

    container.innerHTML = ""; 

    if (!repos || repos.length === 0) {
      container.innerHTML = "<p>No public projects found.</p>";
      return;
    }

    const filteredRepos = repos.filter(repo =>
      repo.description &&
      repo.description.toLowerCase().includes("portfolio")
    ).slice(0, 2); 

    if (filteredRepos.length === 0) {
      container.innerHTML = "<p>No portfolio projects found.</p>";
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
