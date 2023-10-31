function attachEvents() {
    const inputLocation = document.getElementById("location");
    const submitButton = document.getElementById("submit");
    const currentConditionId = document.getElementById("current");
    const upcomingForecastId = document.getElementById("upcoming");
    const forecastDivFirst = document.getElementById("forecast");

    const getWeatherURL = "http://localhost:3030/jsonstore/forecaster/locations";

    const symbols = {
        Sunny: '&#x2600;',
        "Partly sunny": '&#x26C5;',
        Overcast: '&#x2601;',
        Rain: '&#x2614;',
        Degrees: '&#176;'
    }



    submitButton.addEventListener("click", () => {
        currentConditionId.innerHTML = `<div class="label">Current conditions</div>`;
        upcomingForecastId.innerHTML = `<div class="label">Three-day forecast</div>`;
        fetch(getWeatherURL)
            .then((res) => res.json())
            .then(data => {
                const findCity = data.find(x => x.name == inputLocation.value);
                forecastDivFirst.style.display = "block";
                const currentConditionURL = `http://localhost:3030/jsonstore/forecaster/today/${findCity.code}`;
                fetch(currentConditionURL)
                    .then((res) => res.json())
                    .then(data => {
                        const forecastDiv = document.createElement("div");
                        forecastDiv.className = "forecasts";
                        const condition = data.forecast.condition;

                        const span = document.createElement("span");
                        span.className = "condition";

                        const spanSymbol = document.createElement("span");
                        spanSymbol.className = "condition symbol";
                        spanSymbol.innerHTML = `${symbols[condition]}`;

                        const spanCondition = document.createElement("span");
                        spanCondition.className = "forecast-data";
                        spanCondition.textContent = data.name;

                        const spanDegree = document.createElement("span");
                        spanDegree.className = "forecast-data";
                        spanDegree.innerHTML = `${data.forecast.low}${symbols.Degrees}/${data.forecast.high}${symbols.Degrees}`;

                        const spanConditionWeather = document.createElement("span");
                        spanConditionWeather.className = "forecast-data";
                        spanConditionWeather.textContent = data.forecast.condition;

                        span.appendChild(spanCondition);
                        span.appendChild(spanDegree)
                        span.appendChild(spanConditionWeather);

                        forecastDiv.appendChild(spanSymbol);
                        forecastDiv.appendChild(span);
                        currentConditionId.appendChild(forecastDiv);
                    })

                const upcomingURL = `http://localhost:3030/jsonstore/forecaster/upcoming/${findCity.code}`;
                fetch(upcomingURL)
                    .then(response => response.json())
                    .then(data => {
                        const forecastArray = Array.from(data.forecast);
                        const forecastInfo = document.createElement("div");
                        forecastInfo.className = "forecast-info";
                        forecastArray.forEach(x => {
                            const { condition, high, low } = x;

                            const spanUpcoming = document.createElement("span");
                            spanUpcoming.className = "upcoming";

                            const spanUpcomingSymbol = document.createElement("span");
                            spanUpcomingSymbol.className = "symbol";
                            spanUpcomingSymbol.innerHTML = symbols[condition];

                            const spanUpcomingDegrees = document.createElement("span");
                            spanUpcomingDegrees.className = "forecast-data";
                            spanUpcomingDegrees.innerHTML = `${low}${symbols.Degrees}/${high}${symbols.Degrees}`;

                            const spanUpcomingCondition = document.createElement("span");
                            spanUpcomingCondition.className = "forecast-data";
                            spanUpcomingCondition.textContent = condition;

                            spanUpcoming.appendChild(spanUpcomingSymbol);
                            spanUpcoming.appendChild(spanUpcomingDegrees);
                            spanUpcoming.appendChild(spanUpcomingCondition);
                            forecastInfo.appendChild(spanUpcoming);

                        })
                        upcomingForecastId.appendChild(forecastInfo);
                    })

            })
            .catch((error) => {
                forecastDivFirst.style.display = "block";
                forecastDivFirst.textContent = "Error";

            })

    })

}


attachEvents();
