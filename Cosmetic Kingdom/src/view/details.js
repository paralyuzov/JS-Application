import { html } from "../../node_modules/lit-html/lit-html.js";
import { addBuys, deleteItem, getDetails, getMyBuys, getTotalBuys, getUserData } from "../api/util.js";

const detailsTemplate = (item, canEdit, showBuyButton, allBuys) => html`
 <section id="details">
          <div id="details-wrapper">
            <img id="details-img" src="${item.imageUrl}" alt="example1" />
            <p id="details-title">${item.name}</p>
            <p id="details-category">
              Category: <span id="categories">${item.category}</span>
            </p>
            <p id="details-price">
              Price: <span id="price-number">${item.price}</span>$</p>
            <div id="info-wrapper">
              <div id="details-description">
                <h4>Bought: <span id="buys">${allBuys}</span> times.</h4>
                <span>${item.description}</span>
              </div>
            </div>
            <div id="action-buttons">
              ${canEdit ? html`<a href="/dashboard/${item._id}/edit" id="edit-btn">Edit</a>
              <a href="javascript:void(0)" id="delete-btn" @click=${onDelete}>Delete</a>` : ""}
              ${showBuyButton ? html`<a href="javascript:void(0)" id="buy-btn" @click=${onBuy}>Buy</a>` : ""}

            </div>
          </div>
        </section>
`
let context = null;
export async function detailsView(ctx) {
  context = ctx;
  const id = ctx.params.id;
  const data = await getDetails(id);
  const user = getUserData();
  let isOwner = false;
  if (user && data._ownerId === user._id) {
    isOwner = true;
  }
  const allBuys = await getTotalBuys(id);
  let showBuyButton = false;
  if (user) {
    const myBuys = await getMyBuys(id, user._id);
    if (!isOwner && myBuys == 0) {
      showBuyButton = true;
    }


  }

  debugger

  ctx.render(detailsTemplate(data, isOwner, showBuyButton, allBuys))
}

async function onDelete(e) {
  e.preventDefault();
  if (confirm("Are you sure?")) {
    const id = context.params.id;
    await deleteItem(id);
    context.page.redirect("/dashboard")
  }

}

async function onBuy(e) {
  e.preventDefault();
  const id = context.params.id;
  await addBuys(id)
  context.page.redirect(`/dashboard/${id}`);
}

