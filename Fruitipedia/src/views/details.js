import { html } from "../../node_modules/lit-html/lit-html.js";
import { deleteItem, getDetails } from "../api/util.js";

const detailsTemplate = (item, id, canEdit) => html`
 <section id="details">
          <div id="details-wrapper">
            <img id="details-img" src=${item.imageUrl} alt="example1" />
            <p id="details-title">${item.name}</p>
            <div id="info-wrapper">
              <div id="details-description">
                <p>${item.description}</p>
                    <p id="nutrition">Nutrition</p>
                   <p id = "details-nutrition">${item.nutrition}</p>
              </div>
               <!--Edit and Delete are only for creator-->
          <div id="action-buttons">
            ${canEdit ? html` <a href="/dashboard/${id}/edit" id="edit-btn">Edit</a>
            <a href="javascript:void(0)" @click=${onDelete} id="delete-btn">Delete</a>` : ""}
          </div>
            </div>
        </div>
      </section>
`

let context = null
export async function detailsView(ctx) {
  context = ctx;
  getInfo();

}

async function getInfo() {
  const id = context.params.id;
  const data = await getDetails(id);
  const userId = JSON.parse(localStorage.getItem("userData"));
  let canEdit = false;
  if (userId && userId._id == data._ownerId) {
    canEdit = true;
  }

  context.render(detailsTemplate(data, id, canEdit))
}

async function onDelete() {
  await deleteItem(context.params.id)
  context.page.redirect("/dashboard");
}