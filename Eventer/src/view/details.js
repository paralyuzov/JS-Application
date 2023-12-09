import { html } from "../../node_modules/lit-html/lit-html.js";
import { post } from "../api/api.js";
import { addEventPeople, deleteItem, getDetails, getTotalGoing, getUserData } from "../api/util.js";

const detailsTemplate = (id, info, canEdit, canGo) => html`
<section id="details">
        <div id="details-wrapper">
          <img id="details-img" src="${info.imageUrl}" alt="example1" />
          <p id="details-title">${info.name}</p>
          <p id="details-category">
            Category: <span id="categories">${info.category}</span>
          </p>
          <p id="details-date">
            Date:<span id="date">${info.date}</span></p>
          <div id="info-wrapper">
            <div id="details-description">
              <span>${info.description}</span>
            </div>

          </div>

          <h3>Going: <span id="go">0</span> times.</h3>

          <!--Edit and Delete are only for creator-->
          <div id="action-buttons">
            ${canEdit ? html`<a href="/dashboard/${info._id}/edit" id="edit-btn">Edit</a>
            <a href="javascript:void(0)" id="delete-btn" @click=${onDelete}>Delete</a>`

        : ""}
            ${canGo ? html`<a href="javascript:void(0)" id="go-btn" @click=${onClick}>Going</a>` : ""}
          </div>
        </div>
      </section>
`
let context = null;
export async function detailsView(ctx) {
    context = ctx;
    const id = ctx.params.id;
    const user = getUserData();
    const info = await getDetails(id);
    console.log(info)
    let canEdit = false;
    if (user && user._id == info._ownerId) {
        canEdit = true;
    }


    let canGo = false;
    if (user && user._id !== info._ownerId) {
        canGo = true;
    }

    ctx.render(detailsTemplate(id, info, canEdit, canGo));
}

async function onDelete(e) {
    e.preventDefault()
    const id = context.params.id;
    if (confirm("Are you sure?")) {
        await deleteItem(id);
        context.page.redirect("/dashboard");
    }

}
let counter = 0;
async function onClick(e) {
    counter++;
    e.preventDefault();
    e.target.style.display = "none";
    const spanElement = document.getElementById("go");
    spanElement.textContent = counter


    const eventId = context.params.id;
    debugger
    await addEventPeople({ eventId });
    const result = await getTotalGoing(eventId);



}