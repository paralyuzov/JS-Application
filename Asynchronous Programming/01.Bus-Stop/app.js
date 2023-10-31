async function getInfo() {

    const stopID = document.getElementById("stopId");
    const stopNameID = document.getElementById("stopName");
    const bussesID = document.getElementById("buses");
    const stopValue = stopID.value
    let url = `http://localhost:3030/jsonstore/bus/businfo/${stopValue}`;
    bussesID.innerHTML = "";
    stopID.value = "";


    try {
        const response = await fetch(url);
        if (response.status !== 200) {
            throw new Error("Stop ID not found!");
        }
        const info = await response.json();

        stopNameID.textContent = info.name;
        const data = Object.entries(info)
        Object.entries(info.buses).forEach(([bus, time]) => {
            const li = document.createElement("li");
            li.textContent = `Bus ${bus} arrives in ${time} minutes`;
            bussesID.appendChild(li)
        })
    } catch (error) {
        stopNameID.textContent = "Error";
    }

}