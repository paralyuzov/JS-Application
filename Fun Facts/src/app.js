import { default as page } from "../node_modules/page/page.mjs";
import { render } from "../node_modules/lit-html/lit-html.js";
import { getUserData } from "./api/util.js";
import { navTemplate } from "./view/nav.js";
import { homeView } from "./view/home.js";
import { loginView } from "./view/login.js";
import { registerView } from "./view/register.js";
import { logOut } from "./api/auth.js";
import { dashboardView } from "./view/dashboard.js";
import { addView } from "./view/add.js";
import { detailsView } from "./view/details.js";
import { edinView } from "./view/edit.js";

const root = document.getElementById("wrapper");

page(decorateContex);
page("/", homeView)
page("index.html", homeView);
page("/login", loginView);
page("/register", registerView);
page("/logout", onLogout);
page("/dashboard", dashboardView)
page("/add", addView)
page("/dashboard/:id", detailsView)
page("/dashboard/:id/edit", edinView)




page.start();


function decorateContex(ctx, next) {
    ctx.render = renderView;
    next();
}

function renderView(template) {
    const userData = getUserData();
    render(navTemplate(userData, template), root)

}

async function onLogout(ctx) {
    logOut();
    ctx.page.redirect("/");
}