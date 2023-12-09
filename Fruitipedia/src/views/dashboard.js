import { html } from "../../node_modules/lit-html/lit-html.js";
import { getItems } from "../api/util.js";

const dashboardTemplate = (items) => html`
<h2>Fruits</h2>
        <section id="dashboard">
         ${items.length > 0 ? html`${items.map(itemTemplate)}` : html` <h2>No fruit info yet.</h2>`}
        </section>
            
`
const itemTemplate = (item) => html`
<div class="fruit">
            <img src="${item.imageUrl}" alt="example1" />
            <h3 class="title">${item.name}</h3>
            <p class="description">${item.description}</p>
            <a class="details-btn" href="/dashboard/${item._id}">More Info</a>
          </div>
`

export async function dashboardView(ctx) {
  const items = await getItems();
  ctx.render(dashboardTemplate(items));
}

