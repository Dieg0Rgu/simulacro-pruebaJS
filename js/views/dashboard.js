

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
        
    })
}