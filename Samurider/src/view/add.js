import { html } from "../../node_modules/lit-html/lit-html.js";
import { addItem } from "../api/util.js";

const addTemplate = () => html`
<section id="create">
          <h2>Add Motorcycle</h2>
          <div class="form">
            <h2>Add Motorcycle</h2>
            <form class="create-form" @submit=${onSubmit}>
              <input
                type="text"
                name="model"
                id="model"
                placeholder="Model"
              />
              <input
                type="text"
                name="imageUrl"
                id="moto-image"
                placeholder="Moto Image"
              />
              <input
              type="number"
              name="year"
              id="year"
              placeholder="Year"
            />
            <input
            type="number"
            name="mileage"
            id="mileage"
            placeholder="mileage"
          />
          <input
            type="text"
            name="contact"
            id="contact"
            placeholder="contact"
          />
            <textarea
              id="about"
              name="about"
              placeholder="about"
              rows="10"
              cols="50"
            ></textarea>
              <button type="submit">Add Motorcycle</button>
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
    const { model, imageUrl, year, mileage, contact, about } = Object.fromEntries(formData);
    debugger
    if (!model || !imageUrl || !year || !mileage || !contact || !about) {
        return alert("All fields required!");
    }

    await addItem({ model, imageUrl, year, mileage, contact, about })
    context.page.redirect("/dashboard");
}