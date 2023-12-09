import { html } from "../../node_modules/lit-html/lit-html.js";
import { getItems } from "../api/util.js";

const dashboardTemplate = (items) => html`
<section id="dashboard">
          <h2>Job Offers</h2>

          <!-- Display a div with information about every post (if any)-->
         ${items.length > 0 ? html`${items.map(cardTemplate)}` : html`<h2>No offers yet.</h2>`}

          <!-- Display an h2 if there are no posts -->
          
        </section>
`

const cardTemplate = (item) => html`
<div class="offer">
            <img src="${item.imageUrl}" alt="example1" />
            <p>
              <strong>Title: </strong><span class="title">${item.title}</span>
            </p>
            <p><strong>Salary:</strong><span class="salary">${item.salary}</span></p>
            <a class="details-btn" href="/dashboard/${item._id}">Details</a>
          </div>
`

export async function dashboardView(ctx) {
    const data = await getItems();
    ctx.render(dashboardTemplate(data))
}