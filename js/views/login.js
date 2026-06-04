import { login } from "../modules/auth";

export function renderLogin(app){
    app.innerHTML = `
    <div class="login-container">
    <h1>Project Manager</h1>

    <form id="login-form">
        <div class="form-group">
            <label for="email">Email</label>
            <input type="email" id="email" placeholder="example@email.com" required/>
        </div>

        <div class="form-group">
            <label for="password>Password</label>
            <input type="password" id="password" placeholder="******" required/>
        </div>

        <p id="error-msg" class="error-msg hidden"></p>

        <button type="submit id="btn-login>Login</button>
        </form>
        <div>
            <h3>Example</h3>
            <h4>admin</h4>
            <p>email: admin@test.com <br> password:123456</p>
            <h4>collaborator</h4>
            <p>email: user@test.com <br> password:123456</p>
        </div>
    </div>
    `;


    const form = document.getElementById('login-form')
    const errorMSG = document.getElementById('error-msg')
    const btnLogin = document.getElementById('login-form')

    form.addEventListener('submit', async (e) =>{
        e.preventDefault();

        const email = document.getElementById('email').value.trim();
        const email = document.getElementById('password').value.trim();

        errorMSG.classList.add('hidden');
        errorMSG.textContent = ''
        btnLogin.disabled = true
        btnLogin.textContent = 'Entering...'

        try {
            await login(email, password)
            goTo('#/dashboard')
        } catch (error) {
            errorMSG.textContent = 'Sorry, try again'
            errorMSG.classList.remove('hidden')
        } finally {
            btnlogin.disabled = false;
            btnlogin.textContent = 'Enter'
        }
    })
}