function attachEvents() {
    const postURL = "http://localhost:3030/jsonstore/blog/posts";
    const commentsURL = "http://localhost:3030/jsonstore/blog/comments";
    const buttonloadPost = document.getElementById("btnLoadPosts");
    const postId = document.getElementById("posts");
    const viewButton = document.getElementById("btnViewPost");
    const postTitle = document.getElementById("post-title");
    const postBody = document.getElementById("post-body");
    const postComments = document.getElementById("post-comments");


    viewButton.addEventListener("click", onView);
    buttonloadPost.addEventListener("click", onPost);

    const info = {};

    function onPost(e) {
        fetch(postURL)
            .then((response) => response.json())
            .then(data => {
                Object.values(data).forEach(x => {
                    const { body, id, title } = x;
                    const optionEl = createEl("option", id, title);
                    info[id] = {
                        body,
                        title
                    };
                    postId.appendChild(optionEl);
                })
            })
    }

    function onView(e) {
        const key = e.target.parentElement.querySelector("select[id=posts]").value
        postTitle.textContent = info[key].title;
        postBody.textContent = info[key].body;
        postComments.innerHTML = ""
        fetch(commentsURL)
            .then((res) => res.json())
            .then(data => {
                const values = Object.values(data);
                const filterComments = values.filter(x => x.postId == key);
                filterComments.forEach(x => {
                    const li = createEl("li", x.id, x.text);
                    postComments.appendChild(li);
                })
            })
    }

    function createEl(el, value, title) {
        const element = document.createElement(el);
        if (el == "option") {
            element.value = value;
            element.textContent = title;
        } else if (el == "li") {
            element.id = value;
            element.textContent = title;
        }

        return element
    }

}
attachEvents()