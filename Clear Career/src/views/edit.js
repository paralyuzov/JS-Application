import { html } from "../../node_modules/lit-html/lit-html.js";
import { editItem, getDetails } from "../api/util.js";

const editTemplate = (data) => html`
<section id="edit">
          <div class="form">
            <h2>Edit Offer</h2>
            <form class="edit-form" @submit=${onSubmit}>
              <input
                type="text"
                name="title"
                .value=${data.title}
                id="job-title"
                placeholder="Title"
              />
              <input
                type="text"
                name="imageUrl"
                .value=${data.imageUrl}
                id="job-logo"
                placeholder="Company logo url"
              />
              <input
                type="text"
                name="category"
                .value=${data.category}
                id="job-category"
                placeholder="Category"
              />
              <textarea
                id="job-description"
                name="description"
                .value=${data.description}
                placeholder="Description"
                rows="4"
                cols="50"
              ></textarea>
              <textarea
                id="job-requirements"
                name="requirements"
                .value=${data.requirements}
                placeholder="Requirements"
                rows="4"
                cols="50"
              ></textarea>
              <input
                type="text"
                name="salary"
                .value=${data.salary}
                id="job-salary"
                placeholder="Salary"
              />

              <button type="submit">post</button>
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
    const formData = new FormData(e.target);
    const { title, imageUrl, category, description, requirements, salary } = Object.fromEntries(formData);
    if (!title || !imageUrl || !category || !description || !requirements || !salary) {
        return alert("All fields are required!");
    }

    const id = context.params.id;
    await editItem(id, { title, imageUrl, category, description, requirements, salary });
    context.page.redirect(`/dashboard/${id}`);
}