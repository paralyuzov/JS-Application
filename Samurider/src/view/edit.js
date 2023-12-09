import { html } from "../../node_modules/lit-html/lit-html.js";
import { editItem, getDetails } from "../api/util.js";

const editTemplate = (item) => html`
<section id="edit">
            <h2>Edit Motorcycle</h2>
            <div class="form">
              <h2>Edit Motorcycle</h2>
              <form class="edit-form" @submit=${onSubmit}>
                <input
                  type="text"
                  name="model"
                  .value=${item.model}
                  id="model"
                  placeholder="Model"
                />
                <input
                  type="text"
                  name="imageUrl"
                  .value=${item.imageUrl}
                  id="moto-image"
                  placeholder="Moto Image"
                />
                <input
                type="number"
                name="year"
                .value=${item.year}
                id="year"
                placeholder="Year"
              />
              <input
              type="number"
              name="mileage"
              .value=${item.mileage}
              id="mileage"
              placeholder="mileage"
            />
            <input
              type="number"
              name="contact"
              .value=${item.contact}
              id="contact"
              placeholder="contact"
            />
              <textarea
                id="about"
                name="about"
                .value=${item.about}
                placeholder="about"
                rows="10"
                cols="50"
              ></textarea>
                <button type="submit">Edit Motorcycle</button>
              </form>
          </div>
        </section>

`
let context = null;
export async function editView(ctx) {
    context = ctx;
    const id = ctx.params.id;
    const data = await getDetails(id);
    ctx.render(editTemplate(data))
}

async function onSubmit(e) {
    e.preventDefault();
    const id = context.params.id;
    const formData = new FormData(e.target);
    const { model, imageUrl, year, mileage, contact, about } = Object.fromEntries(formData);
    if (!model || !imageUrl || !year || !mileage || !contact || !about) {
        return alert("All fields required!");
    }

    await editItem(id, { model, imageUrl, year, mileage, contact, about });
    context.page.redirect(`/dashboard/${id}`)
}