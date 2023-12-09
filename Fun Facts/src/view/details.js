import { html } from "../../node_modules/lit-html/lit-html.js"
import { deleteItem, getDetails } from "../api/util.js";

const detailTemplate = (item, id, canEdit) => html`
    <section id="details">
          <div id="details-wrapper">
            <img id="details-img" src="${item.imageUrl}" alt="example1" />
            <p id="details-category">${item.category}</p>
            <div id="info-wrapper">
              <div id="details-description">
                <p id="description">
                  ${item.description}
                  </p>
                   <p id ="more-info">
                    ${item.moreInfo}
                        </p>
              </div>

              <h3>Likes:<span id="likes">0</span></h3>

              
          <div id="action-buttons">
          ${canEdit ? html`<a href="/dashboard/${id}/edit" id="edit-btn">Edit</a>
            <a href="javascript:void(0)" @click=${onDelete} id="delete-btn">Delete</a>` : ""}

             <!--Bonus - Only for logged-in users ( not authors )-->
            <!-- <a href="" id="like-btn">Like</a> -->

          </div>
            </div>
        </div>
      </section>


`

let context = null;
export async function detailsView(ctx) {
    context = ctx;
    getInfo()
}

async function getInfo() {
    const id = context.params.id;
    const data = await getDetails(id);
    const userId = JSON.parse(localStorage.getItem("userData"));
    let canEdit = false;
    if (userId && userId._id == data._ownerId) {
        canEdit = true;
    }

    context.render(detailTemplate(data, id, canEdit))

}

async function onDelete() {
    if (confirm("Are you sure?")) {
        debugger
        await deleteItem(context.params.id);
        context.page.redirect("/dashboard")
    }

}