import { html } from "../../node_modules/lit-html/lit-html.js";
import { getDetails } from "../api/util.js";
import { deleteItem } from "../api/util.js";
import { getUserData } from "../api/util.js";

const detailsTemplate = (id, data, canEdit) => html`
<section id="details">
          <div id="details-wrapper">
            <img id="details-img" src="${data.imageUrl}" alt="example1" />
            <p id="details-title">${data.model}</p>
            <div id="info-wrapper">
              <div id="details-description">
                <p class="year">Year: ${data.year}</p>
                <p class="mileage">Mileage: ${data.mileage} km.</p>
                <p class="contact">Contact Number: ${data.contact}</p>
                   <p id = "motorcycle-description">${data.about}</p>
              </div>
               <!--Edit and Delete are only for creator-->
          <div id="action-buttons">
            ${canEdit ? html`<a href="/dashboard/${id}/edit" id="edit-btn">Edit</a>
            <a href="javascript:void(0)" id="delete-btn" @click=${onDelete}>Delete</a>` : ""}
          </div>
            </div>
        </div>
      </section>
`
let context = null;
export async function detailsView(ctx) {
    context = ctx;
    getInfo();
}

async function getInfo() {
    const id = context.params.id;
    const data = await getDetails(id);
    const userId = getUserData();
    let canEdit = false;
    if (userId && userId._id == data._ownerId) {
        canEdit = true;
    }

    context.render(detailsTemplate(id, data, canEdit))

}

async function onDelete(e) {
    e.preventDefault();
    if (confirm("Are you sure?")) {
        await deleteItem(context.params.id);
        context.page.redirect("/dashboard")
    }

}