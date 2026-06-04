const API_URL = "http://localhost:3000"
const KEY_SESSION = 'session'

export async function login(email,password){
    try{
        const url = `${API_URL}/users`;
        console.log("User consultation in:", url);

        const reply = await fetch(url);
        const users = await reply.json();

        console.log("All users in DB:", users);

        const user = users.find(u => u.email === email && u.password === password);

        if(!user){
            throw new Error('incorrect credentials')
        }

         const sessionData = {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role
        }

        localStorage.setItem(KEY_SESSION, JSON.stringify(sessionData))
        return sessionData;
    } catch (error){
        console.error("Login Error: ", error);
        throw error;
    }
}

export function getSession(){
    const session = localStorage.getItem(KEY_SESSION);
    return session ? JSON.parse(session) : null
}

export function logout(){
    localStorage.removeItem(KEY_SESSION)
}

export function isAdmin(){
    const session = getSession();
    return session?.role === 'admin'
}

export function isCollaborator(){
    const session = getSession();
    return session?.role === 'collaborator'
}