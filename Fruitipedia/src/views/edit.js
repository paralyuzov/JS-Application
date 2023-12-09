import { html } from "../../node_modules/lit-html/lit-html.js";
import { editItem, getDetails } from "../api/util.js";

const editTemplate = (data) => html`
 <section id="edit">
          <div class="form" @submit=${onSubmit}>
            <h2>Edit Fruit</h2>
            <form class="edit-form">
              <input
                type="text"
                name="name"
                .value=${data.name}
                id="name"
                placeholder="Fruit Name"
              />
              <input
                type="text"
                name="imageUrl"
                .value=${data.imageUrl}
                id="Fruit-image"
                placeholder="Fruit Image URL"
              />
              <textarea
                id="fruit-description"
                name="description"
                .value=${data.description}
                placeholder="Description"
                rows="10"
                cols="50"
              ></textarea>
              <textarea
                id="fruit-nutrition"
                name="nutrition"
                .value=${data.nutrition}
                placeholder="Nutrition"
                rows="10"
                cols="50"
              ></textarea>
              <button type="submit">post</button>
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
  const { name, imageUrl, description, nutrition } = Object.fromEntries(formData);
  if (!name || !imageUrl || !description || !nutrition) {
    return alert("All fields are required!");
  }

  await editItem(id, { name, imageUrl, description, nutrition });
  context.page.redirect(`/dashboard/${id}`);
}

