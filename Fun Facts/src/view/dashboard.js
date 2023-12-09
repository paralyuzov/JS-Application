import { html } from "../../node_modules/lit-html/lit-html.js"
import { getItems } from "../api/util.js";

const dashboardTemplate = (items) => html`
        ${items.length > 0 ? html`<h2>Fun Facts</h2>
        <section id="dashboard">${items.map(dashboardCard)}</section>` : html`<h2>No Fun Facts yet.</h2>`}
`

const dashboardCard = (item) => html`
<div class="fact">
            <img src=${item.imageUrl} alt="example1" />
            <h3 class="category">${item.category}</h3>
            <p class="description">${item.description}</p>
            <a class="details-btn" href="/dashboard/${item._id}">More Info</a>
          </div>

`

export async function dashboardView(ctx) {
    const items = await getItems();
    ctx.render(dashboardTemplate(items));
}