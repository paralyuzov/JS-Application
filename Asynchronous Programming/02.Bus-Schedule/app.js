function solve() {
    const infoId = document.querySelector(".info");
    const departButton = document.getElementById("depart");
    const arriveButton = document.getElementById("arrive");

    let stop = {
        next: "depot",

    }


    async function depart() {
        try {
            departButton.disabled = true;
            const url = `http://localhost:3030/jsonstore/bus/schedule/${stop.next}`;
            const res = await fetch(url);
            stop = await res.json();
            infoId.textContent = `Next stop ${stop.name}`;
            arriveButton.disabled = false;
        } catch (error) {
            infoId.textContent = "Error";

            arriveButton.disabled = true;
        }


    }

    function arrive() {
        infoId.textContent = `Arriving at ${stop.name}`;
        departButton.disabled = false;
        arriveButton.disabled = true;

    }

    return {
        depart,
        arrive
    };
}

let result = solve();