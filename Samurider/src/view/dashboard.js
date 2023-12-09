import { html } from "../../node_modules/lit-html/lit-html.js";
import { getItems } from "../api/util.js";

const dashboardTemplate = (items) => html`
<h2>Available Motorcycles</h2>
        ${items.length > 0 ? html`<section id="dashboard">${items.map(motorCard)}</section>` :
        html`<h2 class="no-avaliable">No avaliable motorcycles yet.</h2>`}
        
         
`

const motorCard = (item) => html`
<div class="motorcycle">
            <img src="${item.imageUrl}" alt="example1" />
            <h3 class="model">${item.model}</h3>
            <p class="year">Year: ${item.year}</p>
            <p class="mileage">Mileage: ${item.mileage} km.</p>
            <p class="contact">Contact Number: ${item.contact}</p>
            <a class="details-btn" href="/dashboard/${item._id}">More Info</a>
          </div>
`

export async function dashboardView(ctx) {
    const data = await getItems();
    ctx.render(dashboardTemplate(data))
}