

let searchKey="dc53c7da5e9449ebbc2172219250105";
let today_div=document.querySelector(".day");
let todayDate_div=document.querySelector(".date");
let tomorrow_div=document.querySelector(".tomorrow")
let afterTomorrow_div=document.querySelector(".afterTomorrow");

let cityName=document.querySelector(".cityName");
let todayDegree=document.querySelector(".todayDegree");

// ^ Search Input
let searchInput=document.querySelector("#searchInput");

// ^ forecast Icons
let todayIcon=document.querySelector(".todayForecastIcon");
let tomorrowIcon=document.querySelector(".tomorrowforecastIcon");
let afterTomorrowIcon=document.querySelector(".afterTomorrowforecastIcon");

//^ Forecast states
let todayState=document.querySelector(".todayState");
let tomorrowState=document.querySelector(".tomorrowState");
let afterTomorrowState=document.querySelector(".afterTomorrowState");

//^ Mesurement
let humidity=document.querySelector(".humidity .value");
let wind=document.querySelector(".wind .value");
let windDirection=document.querySelector(".windDirection .value");

// ^ min and max degrees for tomorrow
let tomorrowMaxDegree=document.querySelector(".tomorrowMaxDegree");
let tomorrowMinDegree=document.querySelector(".tomorrowMinDegree");

// ^ min and max degrees for next tomorrow
let nextTomorrowMaxDegree=document.querySelector(".nextTomorrowMaxDegree");
let nextTomorrowMinDegree=document.querySelector(".nextTomorrowMinDegree");


// ^ Display data
async function getData(city="cairo"){
    var response=await fetch(`http://api.weatherapi.com/v1/forecast.json?key=${searchKey}&q=${city}&days=3`);
    var result=await response.json();
    return result;
}


async function display(city){
    var result=await getData(city);
    var todayDate=result.forecast.forecastday[0].date;
    var tomorrowDate=result.forecast.forecastday[1].date;
    var afterTomorrowDate=result.forecast.forecastday[2].date;

    let todayObj=new Date(todayDate);
    let todayName = new Intl.DateTimeFormat('en-US', { weekday:'long'}).format(todayObj);
    let day= new Date(todayObj).getDate();
    let monthDay = new Intl.DateTimeFormat('en-US', { month: 'long' }).format(todayObj);

    let tomorrowName = new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(new Date(tomorrowDate));
    let afterTomorrowName = new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(new Date(afterTomorrowDate));

    
    // ^Get the date of today in format day month

    today_div.textContent=todayName;
    todayDate_div.textContent=`${day} ${monthDay}`;

    tomorrow_div.textContent=tomorrowName;

    afterTomorrow_div.textContent=afterTomorrowName;

    // ^ set city name
    cityName.textContent=result.location.name;

    // ^ Get the  today tempreture degree
    todayDegree.innerHTML = `${result.current.temp_c}<sup>o</sup>C`;

    // ^ Get icons
    todayIcon.innerHTML = `<img src="https:${result.current.condition.icon}" alt="weather icon">`;
    tomorrowIcon.innerHTML = `<img src="https:${result.forecast.forecastday[1].day.condition.icon}" alt="weather icon">`;
    afterTomorrowIcon.innerHTML = `<img src="https:${result.forecast.forecastday[2].day.condition.icon}" alt="weather icon">`;

    // ^ Get states
    todayState.textContent =result.current.condition.text;
    tomorrowState.textContent =result.forecast.forecastday[1].day.condition.text;
    afterTomorrowState.textContent =result.forecast.forecastday[2].day.condition.text;

    humidity.textContent=`${result.current.humidity}%`;
    wind.textContent=`${result.current.wind_kph}km/h`;

    const windDirections = {
        N: "North",
        NNE: "North-Northeast",
        NE: "Northeast",
        ENE: "East-Northeast",
        E: "East",
        ESE: "East-Southeast",
        SE: "Southeast",
        SSE: "South-Southeast",
        S: "South",
        SSW: "South-Southwest",
        SW: "Southwest",
        WSW: "West-Southwest",
        W: "West",
        WNW: "West-Northwest",
        NW: "Northwest",
        NNW: "North-Northwest"
      };
    
    let dirCode = result.current.wind_dir;
    let dirFull = windDirections[dirCode];
    windDirection.textContent = dirFull;

    // ^set the min and max degrees for tomorrow
    tomorrowMaxDegree.innerHTML=`${result.forecast.forecastday[1].day.maxtemp_c}<sup>o</sup>C`;
    tomorrowMinDegree.innerHTML=`${result.forecast.forecastday[1].day.mintemp_c}<sup>o</sup>`;

    // ^set the min and max degrees for next tomorrow
    nextTomorrowMaxDegree.innerHTML=`${result.forecast.forecastday[2].day.maxtemp_c}<sup>o</sup>C`;
    nextTomorrowMinDegree.innerHTML=`${result.forecast.forecastday[2].day.mintemp_c}<sup>o</sup>`;
    
}

display();
searchInput.addEventListener("input", function () {
    const city = searchInput.value.trim();
    if (city.length > 2) {
      display(city);
    }else{
        display("cairo")
    }
});

