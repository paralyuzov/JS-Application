function solution() {
    const mainId = document.getElementById("main");
    const URI = "http://localhost:3030/jsonstore/advanced/articles/list";

    fetch(URI)
        .then((res) => res.json())
        .then(data => {
            data.forEach(x => {
                const { _id, title } = x;
                const accordionDiv = document.createElement("div");
                accordionDiv.className = "accordion";

                const headDiv = document.createElement("div");
                headDiv.className = "head";

                const spanElement = document.createElement("span");
                spanElement.textContent = title;

                const buttonMore = document.createElement("button");
                buttonMore.className = "button";
                buttonMore.textContent = "More";
                buttonMore.id = _id;

                buttonMore.addEventListener("click", onChange);

                headDiv.appendChild(spanElement);
                headDiv.appendChild(buttonMore);
                accordionDiv.appendChild(headDiv);

                const detailsURI = `http://localhost:3030/jsonstore/advanced/articles/details/${_id}`
                fetch(detailsURI)
                    .then((res) => res.json())
                    .then(data => {
                        const content = data.content;
                        const extraDiv = document.createElement("div");
                        extraDiv.className = "extra";

                        const paragraph = document.createElement("p");
                        paragraph.textContent = content;

                        extraDiv.appendChild(paragraph);
                        extraDiv.style.display = "none";
                        accordionDiv.appendChild(extraDiv);
                    })
                mainId.appendChild(accordionDiv);
            });

        }).catch((e) => console.log(e));

    function onChange(e) {
        const parentDiv = e.target.parentElement.parentElement.querySelector("div[class=extra]");
        parentDiv.style.display = parentDiv.style.display == "none" ? "block" : "none"
        e.target.textContent = e.target.textContent == "Less" ? "More" : "Less"
    }

}
solution()

