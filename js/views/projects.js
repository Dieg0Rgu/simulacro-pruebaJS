

import { getSession } from "../modules/auth";


const API_URL = 'http://localhost:3000/';

export async function renderProjects(app) {
    const session = getSession();

    app.innerHTML = 
}