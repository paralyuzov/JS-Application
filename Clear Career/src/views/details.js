import { html } from "../../node_modules/lit-html/lit-html.js";
import { applyOffer, deleteItem, getDetails, getMyOffers, getTotalOffers, getUserData } from "../api/util.js";

const detailsTemplate = (data, isOwner, showButton, totalApplys) => html`
<section id="details">
          <div id="details-wrapper">
            <img id="details-img" src="${data.imageUrl}" alt="example1" />
            <p id="details-title">${data.title}</p>
            <p id="details-category">
              Category: <span id="categories">${data.category}</span>
            </p>
            <p id="details-salary">
              Salary: <span id="salary-number">${data.salary}</span>
            </p>
            <div id="info-wrapper">
              <div id="details-description">
                <h4>Description</h4>
                <span>${data.description}</span>
              </div>
              <div id="details-requirements">
                <h4>Requirements</h4>
                <span>${data.requirements}</span>
              </div>
            </div>
            <p>Applications: <strong id="applications">${totalApplys}</strong></p>

            <!--Edit and Delete are only for creator-->
            <div id="action-buttons">
              ${isOwner ? html`<a href="/dashboard/${data._id}/edit" id="edit-btn">Edit</a>
              <a href="javascript:void(0)" id="delete-btn" @click=${onDelete}>Delete</a>` : ""}

              <!--Bonus - Only for logged-in users ( not authors )-->
             ${showButton ? html`<a href="javascript:void(0)" id="apply-btn" @click=${onApply}>Apply</a>` : ""} 
            </div>
          </div>
        </section>
`
let context = null;
export async function detailsView(ctx) {
    context = ctx;
    const id = ctx.params.id;
    const userData = getUserData();
    const data = await getDetails(id);
    console.log(data);
    debugger
    let isOwner = false;
    if (userData && userData._id === data._ownerId) {
        isOwner = true;
    }

    const totalOffers = await getTotalOffers(id);
    let showApplyButton = false;
    if (userData) {
        const myOffers = await getMyOffers(id, userData._id);
        if (!isOwner && myOffers == 0) {
            showApplyButton = true;
        }
    }


    ctx.render(detailsTemplate(data, isOwner, showApplyButton, totalOffers))
}

async function onDelete(e) {
    e.preventDefault();
    if (confirm("Are you sure?")) {
        const id = context.params.id;
        await deleteItem(id);
        context.page.redirect("/dashboard")
    }
}

async function onApply(e) {
    e.preventDefault();
    const id = context.params.id;
    await applyOffer(id);
    context.page.redirect(`/dashboard/${id}`);
}