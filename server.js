var express = require("express");
var app = express();
var request = require("request");
var axios = require("axios");
var cheerio = require("cheerio");
var db = require("quick.db");
var cors = require('cors')

app.use(cors());

app.use('/', express.static('www'));

var getall = setInterval(async () => {
  let response;
  try {
    response = await axios.get("https://www.worldometers.info/coronavirus/");
    if (response.status !== 200) {
      console.log("ERROR");
    }
  } catch (err) {
    return null;
  }

  // to store parsed data
  const result = {};

  // get HTML and parse death rates
  const html = cheerio.load(response.data);
  html(".maincounter-number").filter((i, el) => {
    let count = el.children[0].next.children[0].data || "0";
    count = parseInt(count.replace(/,/g, "") || "0", 10);
    // first one is
    if (i === 0) {
      result.cases = count;
    } else if (i === 1) {
      result.deaths = count;
    } else {
      result.recovered = count;
    }
  });

  db.set("all", result);
  console.log("Global data refreshed", result);
}, 150000);

var getcountries = setInterval(async () => {
  let response;
  try {
    response = await axios.get("https://www.worldometers.info/coronavirus/");
    if (response.status !== 200) {
      console.log("Error", response.status);
    }
  } catch (err) {
    return null;
  }

  // to store parsed data
  const result = [];

  // get HTML and parse death rates
  const html = cheerio.load(response.data);
  const countriesTable = html("table#main_table_countries_today");
  const countriesTableCells = countriesTable
    .children("tbody")
    .children("tr")
    .children("td");

  // NOTE: this will change when table format change in website
  const totalColumns = 10;
  const countryColIndex = 0;
  const casesColIndex = 1;
  const todayCasesColIndex = 2;
  const deathsColIndex = 3;
  const todayDeathsColIndex = 4;
  const curedColIndex = 5;
  const activeColIndex = 6;
  const criticalColIndex = 7;
  const casesPerOneMillionColIndex = 8;
  const deathsPerOneMillionColIndex = 9;

  // minus totalColumns to skip last row, which is total
  for (let i = 0; i < countriesTableCells.length - totalColumns; i += 1) {
    const cell = countriesTableCells[i];

    // get country
    if (i % totalColumns === countryColIndex) {
      let country =
        cell.children[0].data ||
        cell.children[0].children[0].data ||
        // country name with link has another level
        cell.children[0].children[0].children[0].data ||
        cell.children[0].children[0].children[0].children[0].data ||
        "";
      country = country.trim();
      if (country.length === 0) {
        // parse with hyperlink
        country = cell.children[0].next.children[0].data || "";
      }
      result.push({ country: country.trim() || "" });
    }
    // get cases
    if (i % totalColumns === casesColIndex) {
      let cases = cell.children.length != 0 ? cell.children[0].data : "";
      result[result.length - 1].cases = parseInt(
        cases.trim().replace(/,/g, "") || "0",
        10
      );
    }
    // get today cases
    if (i % totalColumns === todayCasesColIndex) {
      let cases = cell.children.length != 0 ? cell.children[0].data : "";
      result[result.length - 1].todayCases = parseInt(
        cases.trim().replace(/,/g, "") || "0",
        10
      );
    }
    // get deaths
    if (i % totalColumns === deathsColIndex) {
      let deaths = cell.children.length != 0 ? cell.children[0].data : "";
      result[result.length - 1].deaths = parseInt(
        deaths.trim().replace(/,/g, "") || "0",
        10
      );
    }
    // get today deaths
    if (i % totalColumns === todayDeathsColIndex) {
      let deaths = cell.children.length != 0 ? cell.children[0].data : "";
      result[result.length - 1].todayDeaths = parseInt(
        deaths.trim().replace(/,/g, "") || "0",
        10
      );
    }
    // get cured
    if (i % totalColumns === curedColIndex) {
      let cured = cell.children.length != 0 ? cell.children[0].data : "";
      result[result.length - 1].recovered = parseInt(
        cured.trim().replace(/,/g, "") || "0",
        10
      );
    }
    // get active
    if (i % totalColumns === activeColIndex) {
      let cured = cell.children.length != 0 ? cell.children[0].data : "";
      result[result.length - 1].active = parseInt(
        cured.trim().replace(/,/g, "") || "0",
        10
      );
    }
    // get critical
    if (i % totalColumns === criticalColIndex) {
      let critical = cell.children.length != 0 ? cell.children[0].data : "";
      result[result.length - 1].critical = parseInt(
        critical.trim().replace(/,/g, "") || "0",
        10
      );
    }
    // get total cases per one million population
    if (i % totalColumns === casesPerOneMillionColIndex) {
      let casesPerOneMillion = cell.children.length != 0 ? cell.children[0].data : "";
      result[result.length - 1].casesPerOneMillion = parseInt(
        casesPerOneMillion.trim().replace(/,/g, "") || "0",
        10
      );
    }
    // get total deaths per one million population
    if (i % totalColumns === deathsPerOneMillionColIndex) {
      let deathsPerOneMillion = cell.children.length != 0 ? cell.children[0].data : "";
      result[result.length - 1].deathsPerOneMillion = parseInt(
        deathsPerOneMillion.trim().replace(/,/g, "") || "0",
        10
      );
    }
  }

  db.set("countries", result);
  console.log("Countries data refreshed", result);
}, 150000);

// var getRegionsIt = setInterval(async () => {
//   var today = new Date().toJSON().slice(0, 10).replace(/-/g, '');
//   let response;
//   try {
//     response = await axios.get("https://github.com/pcm-dpc/COVID-19/blob/master/dati-json/dpc-covid19-ita-regioni.json");
//     if (response.status !== 200) {
//       console.log("ERROR");
//     }
//   } catch (err) {
//     return null;
//   }

//   // to store parsed data
//   const result = [];
//   console.log(response.data);

//   for (var i = 0; i < responseData.length; i++) {
//     let area = { "area": responseData[i].location, "cases": responseData[i].number || 0};

//     result.push(area);
//   }

//   db.set("gb", result);
//   console.log("GB data refreshed", result);
// }, 15000);


var getRegionsGb = setInterval(async () => {
  var today = new Date().toJSON().slice(0, 10).replace(/-/g, '');
  let response;
  try {
    response = await axios.get("https://api.covid19uk.live/");
    if (response.status !== 200) {
      console.log("ERROR");
    }
  } catch (err) {
    return null;
  }

  // to store parsed data
  const result = [];
  let responseData = JSON.parse(response.data.data[0].area);

  for (var i = 0; i < responseData.length; i++) {
    let area = { "area": responseData[i].location, "cases": responseData[i].number || 0};

    result.push(area);
  }

  db.set("gb", result);
  console.log("GB data refreshed", result);
}, 150000);

var getRegionsUsa = setInterval(async () => {
  var today = new Date().toJSON().slice(0, 10).replace(/-/g, '');
  let response, responseOne, responseTwo;
  try {
    const requestOne = axios.get("https://covidtracking.com/api/states");
    const requestTwo = axios.get("https://covidtracking.com/api/states/daily?date=" + today);

    response = await axios.all([requestOne, requestTwo]);
    if (response.status !== 200) {
      console.log("ERROR");
    }
    responseOne = response[0].data.sort(function (a, b) {
      var stateA = a.state.toLowerCase(), stateB = b.state.toLowerCase()
      if (stateA < stateB) //sort string ascending
        return -1
      if (stateA > stateB)
        return 1
      return 0 //default return value (no sorting)
    });
    responseTwo = response[1].data.sort(function (a, b) {
      var stateA = a.state.toLowerCase(), stateB = b.state.toLowerCase()
      if (stateA < stateB) //sort string ascending
        return -1
      if (stateA > stateB)
        return 1
      return 0 //default return value (no sorting)
    });
  } catch (err) {
    return null;
  }

  // to store parsed data
  const result = [];

  for (var i = 0; i < responseOne.length; i++) {
    let area = { "area": responseOne[i].state, "cases": responseOne[i].positive || 0, "todayCases": (responseTwo[i] || {}).positive || 0, "deaths": responseOne[i].death || 0, "todayDeaths": (responseTwo[i] || {}).death || 0 };

    result.push(area);
  }

  db.set("us", result);
  console.log("US data refreshed", result);
}, 15000);

app.get("/", async function (request, response) {
  let a = await db.fetch("all");
  response.send(
    `${a.cases} cases are reported of the COVID-19 Novel Coronavirus strain<br> ${a.deaths} have died from it <br>\n${a.recovered} have recovered from it <br> Get the endpoint /all to get information for all cases <br> get the endpoint /countries for getting the data sorted country wise`
  );
});

var listener = app.listen(process.env.PORT, function () {
  console.log("Your app is listening on port " + listener.address().port);
});

app.get("/all/", async function (req, res) {
  let all = await db.fetch("all");
  res.send(all);
});

app.get("/countries/", async function (req, res) {
  let countries = await db.fetch("countries");
  res.send(countries);
});

app.get("/countries/:country/", async function (req, res) {
  let countries = await db.fetch("countries");
  res.send(countries);
});

app.get("/area/us/", async function (req, res) {
  let regions = await db.fetch("us");
  res.send(regions);
});

app.get("/area/it/", async function (req, res) {
  let regions = await db.fetch("it");
  res.send(regions);
});

app.get("/area/gb/", async function (req, res) {
  let regions = await db.fetch("gb");
  res.send(regions);
});