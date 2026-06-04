

import { getSession, logout } from "../modules/auth";


const API_URL = 'http://localhost:3000/'

export async function renderDashboard(app) {
    const session = getSession();

    // Shared navbar for both rol
    app.innerHTML = `
    <nav class="navbar">
        <span class="nav-brand">Project admin</span>
        <div class="nav-links">
            <span>Hey, ${session.name} ${session.id}</span>
            <button id="btn-projects">Projects</button>
            <button id="btn-logout">Logout session</button>
        </div>
    </nav>
    <main class="dashboard-content" id="dashboard-body">
        <p>Cargando...</p>
    </main>
    `;

    document.getElementById('btn-logout').addEventListener('click', () => {
        logout();
        
    });

    document,getElementById('btn-projects').addEventListener('click', () => {

    });

    // Load stats 
    try {
        const reply = await fetch(`${API_URL}/projects`);
        const projects = await reply.json();
        const body = document.getElementById('dashboard-body');

        if(session.role == 'admin'){
            renderadminDashboard(body, projects);
        } else {
            rendercollaboratorDashboard(body, projects, session)
        }

    } catch (error) {
        document.getElementById('dashboard-body').innerHTML = ` 
        <p class="error-msg">Error loading projects: ${error.message}</p>
        `;
    }
}

function renderadminDashboard(container, projects){
    const total = projects.length;
    const assets = projects.filter(p => p.status === 'In Progress').length;
    const finished = projects.filter(p => p.status === 'Done').length;

    container.innerHTML = `
    <h2>Dashboard — admin</h2>
    <div class="stats-grid">
      <div class="stat-card">
        <span class="stat-number">${total}</span>
        <span class="stat-label">Total projects</span>
      </div>
      <div class="stat-card">
        <span class="stat-number">${assets}</span>
        <span class="stat-label">In Progress</span>
      </div>
      <div class="stat-card">
        <span class="stat-number">${finished}</span>
        <span class="stat-label">Finished</span>
      </div>
    </div>
  `;
}

function renderCollaboratorDashboard(container, projects, session) {
  const myProjects = projects.filter(p => String(p.assignedTo) === String(session.id));

  const files = myProjects.length > 0
    ? myProjects.map(p => `
        <tr>
          <td>${p.name}</td>
          <td><span class="badge badge-${p.status.toLowerCase().replace(' ', '-')}">${p.status}</span></td>
        </tr>
      `).join('')
    : '<tr><td colspan="2">You have no assigned projects</td></tr>';

  container.innerHTML = `
    <h2>Dashboard — Collaborator</h2>
    <p class="stat-label">Assign Projects: <strong>${myProjects.length}</strong></p>
    <table class="projects-table">
      <thead>
        <tr><th>Project</th><th>Status</th></tr>
      </thead>
      <tbody>${files}</tbody>
    </table>
  `;
}