import { html } from "../../node_modules/lit-html/lit-html.js"
import { editItem } from "../api/util.js";
import { getDetails } from "../api/util.js";


const editTemplate = (item) => html`

<section id="edit">
          <div class="form">
            <h2>Edit Fact</h2>
            <form class="edit-form" @submit=${onSubmit}>
              <input
              type="text"
              name="category"
              .value=${item.category}
              id="category"
              placeholder="Category"
            />
            <input
              type="text"
              name="image-url"
              .value=${item.imageUrl}
              id="image-url"
              placeholder="Image URL"
            />
            <textarea
            id="description"
            name="description"
            .value=${item.description}
            placeholder="Description"
            rows="10"
            cols="50"
          ></textarea>
          <textarea
            id="additional-info"
            name="additional-info"
            .value=${item.moreInfo}
            placeholder="Additional Info"
            rows="10"
            cols="50"
          ></textarea>
              <button type="submit">Post</button>
            </form>
          </div>
        </section>

`

let context = null
export async function edinView(ctx) {
    context = ctx;
    getItem();
}

async function getItem() {
    const id = context.params.id;
    const data = await getDetails(id);
    context.render(editTemplate(data))
}

async function onSubmit(e) {
    e.preventDefault();
    debugger
    const id = context.params.id;
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    const category = data.category;
    const imageUrl = data["image-url"];
    const description = data.description;
    const moreInfo = data["additional-info"]
    if (!category || !imageUrl || !description || !moreInfo) {
        return alert("All fields are required!");
    }

    await editItem(id, { category, imageUrl, description, moreInfo });
    context.page.redirect(`/dashboard/${id}`);
}