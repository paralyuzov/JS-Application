import { html } from "../../node_modules/lit-html/lit-html.js";
import { login } from "../api/auth.js";

const loginTemplate = () => html`
<section id="login">
        <div class="form">
          <h2>Login</h2>
          <form class="login-form" @submit=${onSubmit}>
            <input type="text" name="email" id="email" placeholder="email" />
            <input type="password" name="password" id="password" placeholder="password" />
            <button type="submit">login</button>
            <p class="message">
              Not registered? <a href="/register">Create an account</a>
            </p>
          </form>
        </div>
      </section>
`
let context = null;
export function loginView(ctx) {
    context = ctx;
    ctx.render(loginTemplate());
}

async function onSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const { email, password } = Object.fromEntries(formData);
    if (!email || !password) {
        return alert("All fields are required!");
    }

    await login(email, password);
    context.page.redirect("/")
}