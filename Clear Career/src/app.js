import page from "../node_modules/page/page.mjs";
import { render } from "../node_modules/lit-html/lit-html.js";
import { getUserData } from "./api/util.js";
import { navTemplate } from "./views/nav.js";
import { homeView } from "./views/home.js";
import { loginView } from "./views/login.js";
import { registerView } from "./views/register.js";
import { dashboardView } from "./views/dashboard.js";
import { addView } from "./views/add.js";
import { logOut } from "./api/auth.js";
import { detailsView } from "./views/details.js";
import { editView } from "./views/edit.js";

const root = document.getElementById("wrapper");
page(decorateContext);
page("/", homeView);
page("/login", loginView);
page("/register", registerView);
page("/logout", onLogOut)
page("/dashboard", dashboardView);
page("/dashboard/:id", detailsView)
page("/add", addView);
page("/dashboard/:id/edit", editView)

page.start();

function decorateContext(ctx, next) {
    ctx.render = renderView;
    next();
}

function renderView(content) {
    const userData = getUserData();
    render(navTemplate(userData, content), root);
}

async function onLogOut(ctx) {
    await logOut();
    ctx.page.redirect("/dashboard")
}