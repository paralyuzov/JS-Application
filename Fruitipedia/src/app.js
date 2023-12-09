import page from "../node_modules/page/page.mjs";
import { render } from "../node_modules/lit-html/lit-html.js";
import { getUserData } from "./api/util.js";
import { homeView } from "./views/home.js";
import { navTemplate } from "./views/nav.js"
import { loginView } from "./views/login.js";
import { registerView } from "./views/register.js";
import { dashboardView } from "./views/dashboard.js";
import { addView } from "./views/addItems.js";
import { detailsView } from "./views/details.js";
import { edinView } from "./views/edit.js";
import { logOut } from "./api/auth.js";
import { searchView } from "./views/search.js";

const root = document.getElementById("wrapper");

page(decorateContex);
page("/index.html", homeView);
page("/", homeView);
page("/login", loginView);
page("/register", registerView);
page("/logout", onLogOut)
page("/add", addView);
page("/dashboard", dashboardView);
page("/dashboard/:id", detailsView);
page("/dashboard/:id/edit", edinView);
page("/search", searchView)


page.start()


function decorateContex(ctx, next) {
    ctx.render = renderView;
    next();
}

function renderView(template) {
    const userData = getUserData();
    render(navTemplate(userData, template), root)

}

async function onLogOut(ctx) {
    logOut();
    ctx.page.redirect("/");

}