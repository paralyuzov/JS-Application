import { html } from "../../node_modules/lit-html/lit-html.js";
import { register } from "../api/auth.js";

const registerTemplate = () => html`
<section id="register">
          <div class="form">
            <h2>Register</h2>
            <form class="register-form" @submit=${onSubmit}>
              <input
                type="text"
                name="email"
                id="register-email"
                placeholder="email"
              />
              <input
                type="password"
                name="password"
                id="register-password"
                placeholder="password"
              />
              <input
                type="password"
                name="re-password"
                id="repeat-password"
                placeholder="repeat password"
              />
              <button type="submit">register</button>
              <p class="message">Already registered? <a href="/login">Login</a></p>
            </form>
          </div>
        </section>

`
let context = null;
export function registerView(ctx) {
    context = ctx;
    ctx.render(registerTemplate());
}

async function onSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    const email = data.email;
    const password = data.password;
    const repass = data["re-password"];

    if (!email || !password || !repass) {
        return alert("All fields are required!");
    }

    if (password !== repass) {
        return alert("Passwords do not match!");
    }

    await register(email, password);
    context.page.redirect("/dashboard");
}