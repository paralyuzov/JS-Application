import { html } from "../../node_modules/lit-html/lit-html.js"
import { addItem } from "../api/util.js";

const addTemplate = () => html`
<section id="create">
        <div class="form">
          <h2>Add Event</h2>
          <form class="create-form" @submit=${onSubmit}>
            <input type="text" name="name" id="name" placeholder="Event" />
            <input type="text" name="imageUrl" id="event-image" placeholder="Event Image URL" />
            <input type="text" name="category" id="event-category" placeholder="Category" />


            <textarea id="event-description" name="description" placeholder="Description" rows="5" cols="50"></textarea>

            <input type="text" name="date" id="date" placeholder="When?" />

            <button type="submit">Add</button>
          </form>
        </div>
      </section>
`
let context = null;
export async function addView(ctx) {
    context = ctx;

    ctx.render(addTemplate());
}

async function onSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const { name, imageUrl, category, description, date } = Object.fromEntries(formData);
    if (!name || !imageUrl || !category || !description || !date) {
        return alert("All fields are required!");
    }

    await addItem({ name, imageUrl, category, description, date });
    context.page.redirect("/dashboard");
}