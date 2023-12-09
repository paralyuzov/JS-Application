import { html } from "../../node_modules/lit-html/lit-html.js";
import { addItem } from "../api/util.js";

const addTemplate = () => html`
<section id="create">
          <div class="form">
            <h2>Create Offer</h2>
            <form class="create-form" @submit=${onSubmit}>
              <input
                type="text"
                name="title"
                id="job-title"
                placeholder="Title"
              />
              <input
                type="text"
                name="imageUrl"
                id="job-logo"
                placeholder="Company logo url"
              />
              <input
                type="text"
                name="category"
                id="job-category"
                placeholder="Category"
              />
              <textarea
                id="job-description"
                name="description"
                placeholder="Description"
                rows="4"
                cols="50"
              ></textarea>
              <textarea
                id="job-requirements"
                name="requirements"
                placeholder="Requirements"
                rows="4"
                cols="50"
              ></textarea>
              <input
                type="text"
                name="salary"
                id="job-salary"
                placeholder="Salary"
              />

              <button type="submit">post</button>
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
    const { title, imageUrl, category, description, requirements, salary } = Object.fromEntries(formData);
    if (!title || !imageUrl || !category || !description || !requirements || !salary) {
        return alert("All fields are required!");
    }

    await addItem({ title, imageUrl, category, description, requirements, salary });
    context.page.redirect("/dashboard")
}

