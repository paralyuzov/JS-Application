import { html } from "../../node_modules/lit-html/lit-html.js"
import { addItem } from "../api/util.js";

const addTemplate = () => html`
<section id="create">
          <div class="form">
            <h2>Add Fact</h2>
            <form class="create-form" @submit=${onSubmit}>
              <input
                type="text"
                name="category"
                id="category"
                placeholder="Category"
              />
              <input
                type="text"
                name="image-url"
                id="image-url"
                placeholder="Image URL"
              />
              <textarea
              id="description"
              name="description"
              placeholder="Description"
              rows="10"
              cols="50"
            ></textarea>
            <textarea
              id="additional-info"
              name="additional-info"
              placeholder="Additional Info"
              rows="10"
              cols="50"
            ></textarea>
              <button type="submit">Add Fact</button>
            </form>
          </div>
        </section>

`
let context = null;
export function addView(ctx) {
    context = ctx;
    ctx.render(addTemplate());
}

async function onSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    const category = data.category;
    const imageUrl = data["image-url"];
    const description = data.description;
    const moreInfo = data["additional-info"];

    if (!category || !imageUrl || !description || !moreInfo) {
        return alert("All fields are required!");
    }

    await addItem({ category, imageUrl, description, moreInfo })
    context.page.redirect("/dashboard");
}