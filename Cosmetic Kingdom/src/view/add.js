import { html } from "../../node_modules/lit-html/lit-html.js";
import { addItem } from "../api/util.js";

const addTemplate = () => html`
<section id="create">
          <div class="form">
            <h2>Add Product</h2>
            <form class="create-form" @submit=${onSubmit}>
              <input
                type="text"
                name="name"
                id="name"
                placeholder="Product Name"
              />
              <input
                type="text"
                name="imageUrl"
                id="product-image"
                placeholder="Product Image"
              />
              <input
                type="text"
                name="category"
                id="product-category"
                placeholder="Category"
              />
              <textarea
                id="product-description"
                name="description"
                placeholder="Description"
                rows="5"
                cols="50"
              ></textarea>
              
              <input
                type="text"
                name="price"
                id="product-price"
                placeholder="Price"
              />

              <button type="submit">Add</button>
            </form>
          </div>
        </section>
`
let context = null;
export async function addView(ctx) {
    context = ctx;
    ctx.render(addTemplate())
}

async function onSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const { name, imageUrl, category, description, price } = Object.fromEntries(formData);
    if (!name || !imageUrl || !category || !description || !price) {
        return alert("Are fields are required!");
    }

    await addItem({ name, imageUrl, category, description, price });
    context.page.redirect("/dashboard");

}