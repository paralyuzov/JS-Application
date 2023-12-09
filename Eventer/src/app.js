import { default as page } from "../node_modules/page/page.mjs";
import { render } from "../node_modules/lit-html/lit-html.js"
import { getUserData } from "../src/api/util.js"
import { homeView } from "./view/home.js";
import { navTemplate } from "./view/nav.js";
import { loginView } from "./view/login.js";
import { registerView } from "./view/register.js";
import { logOut } from "./api/auth.js";
import { dashboardView } from "./view/dashboard.js";
import { addView } from "./view/add.js";
import { detailsView } from "./view/details.js";
import { editView } from "./view/edit.js";




const root = document.getElementById('wrapper');

page(decorateContext);
page("/", homeView);
page("index.html", homeView);
page("/login", loginView);
page("/register", registerView);
page("/logout", onLogOut);
page("/dashboard", dashboardView);
page("/add", addView);
page("/dashboard/:id", detailsView);
page("/dashboard/:id/edit", editView)






page.start()


function decorateContext(ctx, next) {
    ctx.render = renderView;
    next();
}

function renderView(template) {
    const userData = getUserData();
    render(navTemplate(userData, template), root)

}

async function onLogOut(ctx) {
    await logOut()
    ctx.page.redirect("/")
}