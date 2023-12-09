import { html } from "../../node_modules/lit-html/lit-html.js";
import { addItem } from "../api/util.js";

const addItemTemplate = () => html`
<section id="create">
          <div class="form">
            <h2>Add Fruit</h2>
            <form class="create-form" @submit=${onSubmit}>
              <input
                type="text"
                name="name"
                id="name"
                placeholder="Fruit Name"
              />
              <input
                type="text"
                name="imageUrl"
                id="Fruit-image"
                placeholder="Fruit Image"
              />
              <textarea
              id="fruit-description"
              name="description"
              placeholder="Description"
              rows="10"
              cols="50"
            ></textarea>
            <textarea
              id="fruit-nutrition"
              name="nutrition"
              placeholder="Nutrition"
              rows="10"
              cols="50"
            ></textarea>
              <button type="submit">Add Fruit</button>
            </form>
          </div>
        </section>

`
let context = null;
export function addView(ctx) {
    context = ctx;
    ctx.render(addItemTemplate());

}

async function onSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const { name, imageUrl, description, nutrition } = Object.fromEntries(formData);
    if (!name || !imageUrl || !description || !nutrition) {
        return alert("All fields are required!");
    }

    await addItem({ name, imageUrl, description, nutrition });
    context.page.redirect("/dashboard");
}