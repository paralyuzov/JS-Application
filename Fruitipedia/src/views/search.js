import { html } from "../../node_modules/lit-html/lit-html.js";
import { searchItem } from "../api/util.js";

const searchTemplate = (data, isResult) => html`
  <section id="search">

<div class="form">
  <h2>Search</h2>
  <form class="search-form" @submit=${onSearch}>
    <input
      type="text"
      name="search"
      id="search-input"
    />
    <button class="button-list">Search</button>
  </form>
</div>
<h4>Results:</h4>
<div class="search-result">
    ${isResult ? html`<p class="no-result">No result.</p>` : ""}
${data ? html`${data.map(searchCard)}` : ""}
</div>
  </div>
        </section>
`
let context = null;
export async function searchView(ctx) {
    context = ctx;
    ctx.render(searchTemplate())
}

const searchCard = (item) => html`
  <div class="fruit">
  <img src=${item.imageUrl} alt="example1" />
  <h3 class="title">${item.name}</h3>
  <p class="description">${item.description}</p>
  <a class="details-btn" href="/dashboard/${item._id}">More Info</a>`


async function onSearch(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const { search } = Object.fromEntries(formData);

    const result = await searchItem(search);
    if (result.length > 0) {
        context.render(searchTemplate(result));
    } else {
        const noResult = true;
        context.render(searchTemplate(null, noResult));
    }




}
