import { html } from "../../node_modules/lit-html/lit-html.js";
import { editItem, getDetails } from "../api/util.js";

const editTemplate = (data) => html`
<section id="edit">
          <div class="form">
            <h2>Edit Product</h2>
            <form class="edit-form" @submit=${onSubmit}>
              <input
                type="text"
                name="name"
                .value=${data.name}
                id="name"
                placeholder="Product Name"
              />
              <input
                type="text"
                name="imageUrl"
                .value=${data.imageUrl}
                id="product-image"
                placeholder="Product Image"
              />
              <input
                type="text"
                name="category"
                .value=${data.category}
                id="product-category"
                placeholder="Category"
              />
              <textarea
                id="product-description"
                name="description"
                .value=${data.description}
                placeholder="Description"
                rows="5"
                cols="50"
              ></textarea>
              
              <input
                type="text"
                name="price"
                .value=${data.price}
                id="product-price"
                placeholder="Price"
              />
              <button type="submit">post</button>
            </form>
          </div>
        </section>`

let context = null;
export async function editView(ctx) {
    context = ctx;
    getInfo()

}

async function getInfo() {
    const id = context.params.id;
    const data = await getDetails(id);
    context.render(editTemplate(data))
}

async function onSubmit(e) {
    const id = context.params.id;
    e.preventDefault();
    const formData = new FormData(e.target);
    const { name, imageUrl, category, description, price } = Object.fromEntries(formData);
    if (!name || !imageUrl || !category || !description || !price) {
        return alert("All fields are required!");
    }

    await editItem(id, { name, imageUrl, category, description, price });
    context.page.redirect(`/dashboard/${id}`);
}