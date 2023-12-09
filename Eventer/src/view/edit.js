import { html } from "../../node_modules/lit-html/lit-html.js";
import { editItem, getDetails } from "../api/util.js";

const editTemplate = (info) => html`
<section id="edit">
        <div class="form">
          <h2>Edit Event</h2>
          <form class="edit-form" @submit=${onSubmit}>
            <input type="text" name="name" .value=${info.name} id="name" placeholder="Event" />
            <input type="text" name="imageUrl" .value=${info.imageUrl} id="event-image" placeholder="Event Image" />
            <input type="text" name="category" .value=${info.category} id="event-category" placeholder="Category" />


            <textarea id="event-description" name="description" .value=${info.description} placeholder="Description" rows="5" cols="50"></textarea>

            <label for="date-and-time">Event Time:</label>
            <input type="text" name="date" .value=${info.date} id="date" placeholder="When?" />

            <button type="submit">Edit</button>
          </form>
        </div>
      </section>
`
let context = null;
export async function editView(ctx) {
    context = ctx;
    getInfo()

}

async function getInfo() {
    const id = context.params.id;
    const data = await getDetails(id);
    context.render(editTemplate(data));
}

async function onSubmit(e) {
    const id = context.params.id;
    e.preventDefault();
    const formData = new FormData(e.target);
    const { name, imageUrl, category, description, date } = Object.fromEntries(formData);
    if (!name || !imageUrl || !category || !description || !date) {
        return alert("All fields are required!");
    }

    await editItem(id, { name, imageUrl, category, description, date });
    context.page.redirect(`/dashboard/${id}`);

}