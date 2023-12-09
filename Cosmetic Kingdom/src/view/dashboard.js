import { html } from "../../node_modules/lit-html/lit-html.js";
import { getItems } from "../api/util.js";

const dashboardTemplate = (items) => html`
<h2>Products</h2>
<section id="dashboard">
       ${items.length > 0 ? html`${items.map(cardTemplate)}` : html`<h2>No products yet.</h2>`}; 
       </section>
`

const cardTemplate = (item) => html`
<div class="product">
            <img src="${item.imageUrl}" alt="example1" />
            <p class="title">${item.name}</p>
            <p><strong>Price:</strong><span class="price">${item.price}</span>$</p>
            <a class="details-btn" href="/dashboard/${item._id}">Details</a>
          </div>
`

export async function dashboardView(ctx) {
  const data = await getItems();
  ctx.render(dashboardTemplate(data));
}