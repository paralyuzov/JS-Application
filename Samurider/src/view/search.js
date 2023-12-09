import { html } from "../../node_modules/lit-html/lit-html.js";
import { searchItem } from "../api/util.js";

const searchTemplate = (data, noResult) => html`
<section id="search">

<div class="form">
  <h4>Search</h4>
  <form class="search-form" @submit=${onSearch}>
    <input
      type="text"
      name="search"
      id="search-input"
    />
    <button class="button-list">Search</button>
  </form>
</div>
<h4 id="result-heading">Results:</h4>
  <div class="search-result">
    ${noResult ? html`<h2 class="no-avaliable">No result.</h2>` : ""}
    ${data ? html`${data.map(searchCard)}` : ""}
  </div>
        </section>
`

let context = null;
export async function searchView(ctx) {
    context = ctx;
    ctx.render(searchTemplate())
}

const searchCard = (item) => html`
  <div class="motorcycle">
  <img src="${item.imageUrl}" alt="example1" />
  <h3 class="model">${item.model}</h3>
    <a class="details-btn" href="/dashboard/${item._id}">More Info</a>
</div>`


async function onSearch(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const { search } = Object.fromEntries(formData);
    if (search == "") {
        return alert("Field must be not empty!")
    }

    const result = await searchItem(search);
    if (result.length > 0) {
        context.render(searchTemplate(result));
    } else {
        const noResult = true;
        context.render(searchTemplate(null, noResult));
    }
}