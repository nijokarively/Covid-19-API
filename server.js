var express = require("express");
var app = express();
var request = require("request");
var axios = require("axios");
var cheerio = require("cheerio");
var db = require("quick.db");
var cors = require('cors')

app.use(cors());

app.use('/', express.static('www'));

const countryIso2Dic = {
  "AFGHANISTAN": "AF",
  "ALAND ISLANDS": "AX",
  "ALBANIA": "AL",
  "ALGERIA": "DZ",
  "AMERICAN SAMOA": "AS",
  "ANDORRA": "AD",
  "ANGOLA": "AO",
  "ANGUILLA": "AI",
  "ANTARCTICA": "AQ",
  "ANTIGUA AND BARBUDA": "AG",
  "ARGENTINA": "AR",
  "ARMENIA": "AM",
  "ARUBA": "AW",
  "AUSTRALIA": "AU",
  "AUSTRIA": "AT",
  "AZERBAIJAN": "AZ",
  "BAHAMAS": "BS",
  "BAHRAIN": "BH",
  "BANGLADESH": "BD",
  "BARBADOS": "BB",
  "BELARUS": "BY",
  "BELGIUM": "BE",
  "BELIZE": "BZ",
  "BENIN": "BJ",
  "BERMUDA": "BM",
  "BHUTAN": "BT",
  "BOLIVIA": "BO",
  "CARIBBEAN NETHERLANDS": "BQ",
  "BOSNIA AND HERZEGOVINA": "BA",
  "BOTSWANA": "BW",
  "BOUVET ISLAND": "BV",
  "BRAZIL": "BR",
  "BRITISH INDIAN OCEAN TERRITORY": "IO",
  "BRUNEI": "BN",
  "BULGARIA": "BG",
  "BURKINA FASO": "BF",
  "BURUNDI": "BI",
  "CAMBODIA": "KH",
  "CAMEROON": "CM",
  "CANADA": "CA",
  "CABO VERDE": "CV",
  "CAYMAN ISLANDS": "KY",
  "CAR": "CF",
  "CHAD": "TD",
  "CHILE": "CL",
  "CHINA": "CN",
  "CHRISTMAS ISLAND": "CX",
  "COCOS ISLANDS": "CC",
  "COLOMBIA": "CO",
  "COMOROS": "KM",
  "CONGO": "CG",
  "DRC": "CD",
  "COOK ISLANDS": "CK",
  "COSTA RICA": "CR",
  "IVORY COAST": "CI",
  "CROATIA": "HR",
  "CUBA": "CU",
  "CURAÇAO": "CW",
  "CYPRUS": "CY",
  "CZECHIA": "CZ",
  "DENMARK": "DK",
  "DJIBOUTI": "DJ",
  "DOMINICA": "DM",
  "DOMINICAN REPUBLIC": "DO",
  "ECUADOR": "EC",
  "EGYPT": "EG",
  "EL SALVADOR": "SV",
  "EQUATORIAL GUINEA": "GQ",
  "ERITREA": "ER",
  "ESTONIA": "EE",
  "ETHIOPIA": "ET",
  "FALKLAND ISLANDS": "FK",
  "FAEROE ISLANDS": "FO",
  "FIJI": "FJ",
  "FINLAND": "FI",
  "FRANCE": "FR",
  "FRENCH GUIANA": "GF",
  "FRENCH POLYNESIA": "PF",
  "FRENCH SOUTHERN TERRITORIES": "TF",
  "GABON": "GA",
  "GAMBIA": "GM",
  "GEORGIA": "GE",
  "GERMANY": "DE",
  "GHANA": "GH",
  "GIBRALTAR": "GI",
  "GREECE": "GR",
  "GREENLAND": "GL",
  "GRENADA": "GD",
  "GUADELOUPE": "GP",
  "GUAM": "GU",
  "GUATEMALA": "GT",
  "GUERNSEY": "GG",
  "GUINEA": "GN",
  "GUINEA-BISSAU": "GW",
  "GUYANA": "GY",
  "HAITI": "HT",
  "HEARD ISLAND AND MCDONALD ISLANDS": "HM",
  "VATICAN CITY": "VA",
  "HONDURAS": "HN",
  "HONG KONG": "HK",
  "HUNGARY": "HU",
  "ICELAND": "IS",
  "INDIA": "IN",
  "INDONESIA": "ID",
  "IRAN": "IR",
  "IRAQ": "IQ",
  "IRELAND": "IE",
  "ISLE OF MAN": "IM",
  "ISRAEL": "IL",
  "ITALY": "IT",
  "JAMAICA": "JM",
  "JAPAN": "JP",
  "JERSEY": "JE",
  "JORDAN": "JO",
  "KAZAKHSTAN": "KZ",
  "KENYA": "KE",
  "KIRIBATI": "KI",
  "N. KOREA": "KP",
  "S. KOREA": "KR",
  "KUWAIT": "KW",
  "KYRGYZSTAN": "KG",
  "LAOS": "LA",
  "LATVIA": "LV",
  "LEBANON": "LB",
  "LESOTHO": "LS",
  "LIBERIA": "LR",
  "LIBYA": "LY",
  "LIECHTENSTEIN": "LI",
  "LITHUANIA": "LT",
  "LUXEMBOURG": "LU",
  "MACAO": "MO",
  "NORTH MACEDONIA": "MK",
  "MADAGASCAR": "MG",
  "MALAWI": "MW",
  "MALAYSIA": "MY",
  "MALDIVES": "MV",
  "MALI": "ML",
  "MALTA": "MT",
  "MARSHALL ISLANDS": "MH",
  "MARTINIQUE": "MQ",
  "MAURITANIA": "MR",
  "MAURITIUS": "MU",
  "MAYOTTE": "YT",
  "MEXICO": "MX",
  "MICRONESIA": "FM",
  "MOLDOVA": "MD",
  "MONACO": "MC",
  "MONGOLIA": "MN",
  "MONTENEGRO": "ME",
  "MONTSERRAT": "MS",
  "MOROCCO": "MA",
  "MOZAMBIQUE": "MZ",
  "MYANMAR": "MM",
  "NAMIBIA": "NA",
  "NAURU": "NR",
  "NEPAL": "NP",
  "NETHERLANDS": "NL",
  "NEW CALEDONIA": "NC",
  "NEW ZEALAND": "NZ",
  "NICARAGUA": "NI",
  "NIGER": "NE",
  "NIGERIA": "NG",
  "NIUE": "NU",
  "NORFOLK ISLAND": "NF",
  "NORTHERN MARIANA ISLANDS": "MP",
  "NORWAY": "NO",
  "OMAN": "OM",
  "PAKISTAN": "PK",
  "PALAU": "PW",
  "PALESTINE": "PS",
  "PANAMA": "PA",
  "PAPUA NEW GUINEA": "PG",
  "PARAGUAY": "PY",
  "PERU": "PE",
  "PHILIPPINES": "PH",
  "PITCAIRN": "PN",
  "POLAND": "PL",
  "PORTUGAL": "PT",
  "PUERTO RICO": "PR",
  "QATAR": "QA",
  "RÉUNION": "RE",
  "ROMANIA": "RO",
  "RUSSIA": "RU",
  "RWANDA": "RW",
  "ST. BARTH": "BL",
  "SAINT HELENA": "SH",
  "SAINT KITTS AND NEVIS": "KN",
  "SAINT LUCIA": "LC",
  "SAINT MARTIN": "MF",
  "SAINT PIERRE AND MIQUELON": "PM",
  "ST. VINCENT GRENADINES": "VC",
  "SAMOA": "WS",
  "SAN MARINO": "SM",
  "SAO TOME AND PRINCIPE": "ST",
  "SAUDI ARABIA": "SA",
  "SENEGAL": "SN",
  "SERBIA": "RS",
  "SEYCHELLES": "SC",
  "SIERRA LEONE": "SL",
  "SINGAPORE": "SG",
  "SINT MAARTEN": "SX",
  "SLOVAKIA": "SK",
  "SLOVENIA": "SI",
  "SOLOMON ISLANDS": "SB",
  "SOMALIA": "SO",
  "SOUTH AFRICA": "ZA",
  "SOUTH GEORGIA AND THE SOUTH SANDWICH ISLANDS": "GS",
  "SOUTH SUDAN": "SS",
  "SPAIN": "ES",
  "SRI LANKA": "LK",
  "SUDAN": "SD",
  "SURINAME": "SR",
  "SVALBARD AND JAN MAYEN": "SJ",
  "ESWATINI": "SZ",
  "SWEDEN": "SE",
  "SWITZERLAND": "CH",
  "SYRIA": "SY",
  "TAIWAN": "TW",
  "TAJIKISTAN": "TJ",
  "TANZANIA": "TZ",
  "THAILAND": "TH",
  "TIMOR-LESTE": "TL",
  "TOGO": "TG",
  "TOKELAU": "TK",
  "TONGA": "TO",
  "TRINIDAD AND TOBAGO": "TT",
  "TUNISIA": "TN",
  "TURKEY": "TR",
  "TURKMENISTAN": "TM",
  "TURKS AND CAICOS": "TC",
  "TUVALU": "TV",
  "UGANDA": "UG",
  "UKRAINE": "UA",
  "UAE": "AE",
  "UK": "GB",
  "USA": "US",
  "UNITED STATES MINOR OUTLYING ISLANDS": "UM",
  "URUGUAY": "UY",
  "UZBEKISTAN": "UZ",
  "VANUATU": "VU",
  "VENEZUELA": "VE",
  "VIETNAM": "VN",
  "BRITISH VIRGIN ISLANDS": "VG",
  "U.S. VIRGIN ISLANDS": "VI",
  "WALLIS AND FUTUNA": "WF",
  "WESTERN SAHARA": "EH",
  "YEMEN": "YE",
  "ZAMBIA": "ZM",
  "ZIMBABWE": "ZW",
  "DIAMOND PRINCESS": "DP",
  "CHANNEL ISLANDS": "GB",
  "MS ZAANDAM": "MSZ",
  "KOSOVO": "RKS",
};

const countryNameFix = {
  "US": "USA",
  "United Kingdom": "UK",
  "Korea, South": "S. Korea",
  "United Arab Emirates": "UAE",
  "Taiwan*": "Taiwan",
  "Cote d'Ivoire": "Ivory Coast",
  "Congo (Kinshasa)": "DRC",
  "Congo (Brazzaville)": "Congo",
  "Central African Republic" : "CAR",
  "Holy See" : "Vatican City",
  "Saint Vincent and the Grenadines" : "St. Vincent Grenadines",
  "West Bank and Gaza" : "Palestine",
  "Burma" : "Myanmar",
};

const usStatesDic = {
  "AL": "Alabama",
  "AK": "Alaska",
  "AS": "American Samoa",
  "AZ": "Arizona",
  "AR": "Arkansas",
  "CA": "California",
  "CO": "Colorado",
  "CT": "Connecticut",
  "DE": "Delaware",
  "DC": "District Of Columbia",
  "FM": "Federated States Of Micronesia",
  "FL": "Florida",
  "GA": "Georgia",
  "GU": "Guam",
  "HI": "Hawaii",
  "ID": "Idaho",
  "IL": "Illinois",
  "IN": "Indiana",
  "IA": "Iowa",
  "KS": "Kansas",
  "KY": "Kentucky",
  "LA": "Louisiana",
  "ME": "Maine",
  "MH": "Marshall Islands",
  "MD": "Maryland",
  "MA": "Massachusetts",
  "MI": "Michigan",
  "MN": "Minnesota",
  "MS": "Mississippi",
  "MO": "Missouri",
  "MT": "Montana",
  "NE": "Nebraska",
  "NV": "Nevada",
  "NH": "New Hampshire",
  "NJ": "New Jersey",
  "NM": "New Mexico",
  "NY": "New York",
  "NC": "North Carolina",
  "ND": "North Dakota",
  "MP": "Northern Mariana Islands",
  "OH": "Ohio",
  "OK": "Oklahoma",
  "OR": "Oregon",
  "PW": "Palau",
  "PA": "Pennsylvania",
  "PR": "Puerto Rico",
  "RI": "Rhode Island",
  "SC": "South Carolina",
  "SD": "South Dakota",
  "TN": "Tennessee",
  "TX": "Texas",
  "UT": "Utah",
  "VT": "Vermont",
  "VI": "Virgin Islands",
  "VA": "Virginia",
  "WA": "Washington",
  "WV": "West Virginia",
  "WI": "Wisconsin",
  "WY": "Wyoming",
};

const itRegionsDic = {
  "ABRUZZO": "AB",
  "BASILICATA": "BA",
  "CALABRIA": "CB",
  "CAMPANIA": "CA",
  "EMILIA-ROMAGNA": "ER",
  "FRIULI VENEZIA GIULIA": "FG",
  "LAZIO": "LA",
  "LIGURIA": "LI",
  "LOMBARDIA": "LO",
  "MARCHE": "MA",
  "MOLISE": "MO",
  "PIEMONTE": "PI",
  "PUGLIA": "PU",
  "SARDEGNA": "SA",
  "SICILIA": "SI",
  "TOSCANA": "TO",
  "UMBRIA": "UM",
  "VALLE D'AOSTA": "AO",
  "VENETO": "VE",
  "P.A. TRENTO": "TR",
  "P.A. BOLZANO": "TR",
};

const deRegionsDic = {
  "Baden-Württem­berg": "bw",
  "Bayern": "ba",
  "Berlin": "be",
  "Brandenburg": "bb",
  "Bremen": "br",
  "Hamburg": "ha",
  "Hessen": "he",
  "Mecklenburg-Vor­pommern": "mv",
  "Niedersachsen": "ns",
  "Nordrhein-West­falen": "nw",
  "Rhein­land-Pfalz": "rp",
  "Saarland": "sa",
  "Sachsen": "sn",
  "Sachsen-Anhalt": "st",
  "Schles­wig-Holstein": "sh",
  "Thüringen": "th",
};

const EsRegionsDic = {
  "andalucia": ["Andalucia"],
  "aragon": ["Aragon"],
  "asturias": ["Asturias"],
  "baleares": ["Baleares"],
  "canarias": ["Canarias"],
  "cantabria": ["Cantabria"],
  "castilla-la-mancha": ["Castilla la Mancha"],
  "castilla-y-leon": ["Castilla y Leon"],
  "cataluna": ["Cataluna"],
  "ceuta": ["Ceuta"],
  "c-valenciana": ["Comunidad Valenciana"],
  "extremadura": ["Extremadura"],
  "galicia": ["Galicia"],
  "madrid": ["Madrid"],
  "melilla": ["Melilla"],
  "murcia": ["Murcia"],
  "navarra": ["Navarra"],
  "pais-vasco": ["Pais Vasco"],
  "la-rioja": ["La Rioja"],
};

const detailCountries = ["Germany", "India", "Italy", "UK", "USA", "China", "Spain", "Austria", "Canada", "Australia", "Denmark"];

var getall = setInterval(async () => {
  let response;
  try {
    response = await axios.get("https://www.worldometers.info/coronavirus/");
    if (response.status !== 200) {
      console.log("ERROR: getall()");
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
  console.log("Global data refreshed");
}, 150000);

var getCountries = setInterval(async () => {
  let response;
  try {
    response = await axios.get("https://www.worldometers.info/coronavirus/");
    if (response.status !== 200) {
      console.log("ERROR getCountries(): ", response.status);
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
  const totalColumns = 11;
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
  const firstCaseColIndex = 10;

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
      let isoCode = countryIso2Dic[country.trim().toUpperCase()] || "";
      result[result.length - 1].flag = 'flag-' + isoCode.toLowerCase();
      result[result.length - 1].isoCode = isoCode.toLowerCase();
      result[result.length - 1].hasRegionalData = detailCountries.includes(country.trim());
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
    // get first case
    if (i % totalColumns === firstCaseColIndex) {
      let firstCase = cell.children.length != 0 ? cell.children[0].data : "";
      result[result.length - 1].firstCase = firstCase.trim().replace(/,/g, "") || "";
    }
  }

  let sortedResult = result.sort(function (a, b) {
    var countryA = a.cases, countryB = b.cases;
    return countryB - countryA;
  });

  db.set("countries", sortedResult);
  console.log("Countries data refreshed");
}, 150000);

var getGlobalTimeSeries = setInterval(async () => {
  let response;
  try {
    response = await axios.get("https://pomber.github.io/covid19/timeseries.json");
    if (response.status !== 200) {
      console.log("ERROR getGlobalTimeSeries()");
    }
  } catch (err) {
    return null;
  }

  // to store parsed data
  const entries = Object.entries(response.data);
  let result = {};
  let countryList = {};
  for (const [country, data] of entries) {
    let countryName = countryNameFix[country] || country;
    let isoCodeUpper = countryIso2Dic[countryName.toUpperCase()];
    let isoCode = isoCodeUpper.toLowerCase();
    result[isoCode] = data;
    countryList[isoCode] = countryName;
  }

  db.set("timeseries", result);
  db.set("timeseries-country-list", countryList);
  console.log("Time-Series data refreshed");
}, 150000);

var getRegionsEs = setInterval(async () => {
  let response;
  try {
    response = await axios.get("https://covid-19-spain-api.herokuapp.com/reports");
    if (response.status !== 200) {
      console.log("ERROR: getRegionsEs()");
    }
  } catch (err) {
    return null;
  }

  // to store parsed data
  const result = [];
  let responseData = response.data.data[response.data.data.length - 1].data;

  for (var i = 0; i < responseData.length; i++) {
    let regionName = EsRegionsDic[responseData[i].autonomousCommunity][0];
    // let flag = "flag-de-" + deRegionsDic[regionName];
    let region = { "region": regionName, "cases": responseData[i].values.cases || 0, "deaths": responseData[i].values.deaths || 0 };

    result.push(region);
  }

  db.set("es", result);
  console.log("ES data refreshed");
}, 150000);


var getRegionsCn = setInterval(async () => {
  let response;
  try {
    response = await axios.get("https://covid-api.com/api/reports?iso=chn");
    if (response.status !== 200) {
      console.log("ERROR: getRegionsCn()");
    }
  } catch (err) {
    return null;
  }

  // to store parsed data
  const result = [];
  let responseData = response.data.data;

  for (var i = 0; i < responseData.length; i++) {
    let regionName = responseData[i].region.province;
    // let flag = "flag-de-" + deRegionsDic[regionName];
    let region = { "region": regionName, "cases": responseData[i].confirmed || 0, "deaths": responseData[i].deaths || 0, "recovered": responseData[i].recovered || 0, "active": responseData[i].active || 0 };

    result.push(region);
  }

  db.set("cn", result);
  console.log("CN data refreshed");
}, 150000);


var getRegionsCa = setInterval(async () => {
  let response;
  try {
    response = await axios.get("https://covid-api.com/api/reports?iso=can");
    if (response.status !== 200) {
      console.log("ERROR: getRegionsCa()");
    }
  } catch (err) {
    return null;
  }

  // to store parsed data
  const result = [];
  let responseData = response.data.data;

  let exclusionList = ["Recovered", "Diamond Princess", "Grand Princess"];

  for (var i = 0; i < responseData.length; i++) {
    let regionName = responseData[i].region.province;
    // let flag = "flag-de-" + deRegionsDic[regionName];

    if (!exclusionList.includes(regionName)) {
      let region = { "region": regionName, "cases": responseData[i].confirmed || 0, "deaths": responseData[i].deaths || 0, "recovered": responseData[i].recovered || 0, "active": responseData[i].active || 0 };
      result.push(region);
    }
  }

  db.set("ca", result);
  console.log("CA data refreshed");
}, 150000);

var getRegionsAu = setInterval(async () => {
  let response;
  try {
    response = await axios.get("https://covid-api.com/api/reports?iso=aus");
    if (response.status !== 200) {
      console.log("ERROR: getRegionsAu()");
    }
  } catch (err) {
    return null;
  }

  // to store parsed data
  const result = [];
  let responseData = response.data.data;


  for (var i = 0; i < responseData.length; i++) {
    let regionName = responseData[i].region.province;
    // let flag = "flag-de-" + deRegionsDic[regionName];

    let region = { "region": regionName, "cases": responseData[i].confirmed || 0, "deaths": responseData[i].deaths || 0, "recovered": responseData[i].recovered || 0, "active": responseData[i].active || 0 };
    result.push(region);

  }

  db.set("au", result);
  console.log("AU data refreshed");
}, 150000);


var getRegionsAt = setInterval(async () => {
  let response;
  try {
    response = await axios.get("https://covid19.spiessknafl.at/covid19/api/bundesland");
    if (response.status !== 200) {
      console.log("ERROR: getRegionsAt()");
    }
  } catch (err) {
    return null;
  }

  // to store parsed data
  const result = [];
  let responseData = response.data;

  for (var i = 0; i < responseData.length; i++) {
    let regionName = responseData[i].Name;
    // let flag = "flag-de-" + deRegionsDic[regionName];
    let region = { "region": regionName, "cases": responseData[i].Infected || 0, "deaths": responseData[i].Dead || 0 };

    result.push(region);
  }

  db.set("at", result);
  console.log("AT data refreshed");
}, 150000);

var getRegionsDk = setInterval(async () => {
  let response;
  try {
    response = await axios.get("https://covid-api.com/api/reports?iso=dnk");
    if (response.status !== 200) {
      console.log("ERROR: getRegionsDk()");
    }
  } catch (err) {
    return null;
  }

  // to store parsed data
  const result = [];
  let responseData = response.data.data;


  for (var i = 0; i < responseData.length; i++) {
    let regionName = responseData[i].region.province || "Denmark";
    // let flag = "flag-de-" + deRegionsDic[regionName];
    let region = { "region": regionName, "cases": responseData[i].confirmed || 0, "deaths": responseData[i].deaths || 0, "recovered": responseData[i].recovered || 0, "active": responseData[i].active || 0 };
    result.push(region);
  }

  db.set("dk", result);
  console.log("DK data refreshed");
}, 150000);

var getRegionsDe = setInterval(async () => {
  let response;
  try {
    response = await axios.get("https://rki-covid-api.now.sh/api/states");
    if (response.status !== 200) {
      console.log("ERROR: getRegionsDe()");
    }
  } catch (err) {
    return null;
  }

  // to store parsed data
  const result = [];
  let responseData = response.data.states;

  for (var i = 0; i < responseData.length; i++) {
    let regionName = responseData[i].name;
    let flag = "flag-de-" + deRegionsDic[regionName];
    let region = { "region": regionName, "flag": flag, "cases": responseData[i].count || 0, "deaths": responseData[i].deaths || 0 };

    result.push(region);
  }

  db.set("de", result);
  console.log("DE data refreshed");
}, 150000);

var getRegionsIn = setInterval(async () => {
  let response;
  try {
    response = await axios.get("https://api.rootnet.in/covid19-in/stats/latest");
    if (response.status !== 200) {
      console.log("ERROR: getRegionsIn()");
    }
  } catch (err) {
    return null;
  }

  // to store parsed data
  const result = [];
  let responseData = response.data.data.regional;

  for (var i = 0; i < responseData.length; i++) {
    let region = { "region": responseData[i].loc, "cases": responseData[i].confirmedCasesIndian + responseData[i].confirmedCasesForeign || 0, "deaths": responseData[i].deaths || 0 };

    result.push(region);
  }

  db.set("in", result);
  console.log("IN data refreshed");
}, 150000);

var getRegionsIt = setInterval(async () => {
  let response;
  try {
    response = await axios.get("https://raw.githubusercontent.com/pcm-dpc/COVID-19/master/dati-json/dpc-covid19-ita-regioni-latest.json");
    if (response.status !== 200) {
      console.log("ERROR: getRegionsIt()");
    }
  } catch (err) {
    return null;
  }

  // to store parsed data
  const result = [];

  for (var i = 0; i < response.data.length; i++) {
    let regionName = response.data[i].denominazione_regione;
    let regionCode = itRegionsDic[regionName.toUpperCase()];
     let flag = "flag-it-" + regionCode.toLowerCase();
    let region = { "region": response.data[i].denominazione_regione, "flag": flag, "cases": response.data[i].totale_casi || 0, "todayCases": response.data[i].nuovi_attualmente_positivi || 0, "deaths": response.data[i].deceduti || 0, "active": response.data[i].totale_attualmente_positivi || 0 };

    result.push(region);
  }

  db.set("it", result);
  console.log("IT data refreshed");
}, 150000);


var getRegionsGb = setInterval(async () => {
  let response;
  try {
    response = await axios.get("https://api.covid19uk.live/");
    if (response.status !== 200) {
      console.log("ERROR: getRegionsGb()");
    }
  } catch (err) {
    return null;
  }

  // to store parsed data
  const result = [];
  let responseData = JSON.parse(response.data.data[0].area);

  for (var i = 0; i < responseData.length; i++) {
    let region = { "region": responseData[i].location.trim(), "cases": parseInt(responseData[i].number) || 0 };

    result.push(region);
  }

  let sortedResult = result.sort(function(a, b){
    if(a.region < b.region) { return -1; }
    if(a.region > b.region) { return 1; }
    return 0;
  });

  db.set("gb", sortedResult);
  console.log("GB data refreshed");
}, 150000);

var getRegionsUsa = setInterval(async () => {
  var today = new Date().toJSON().slice(0, 10).replace(/-/g, '');
  var yesterday = new Date(new Date().setDate(new Date().getDate() - 1)).toJSON().slice(0, 10).replace(/-/g, '');
  let response, responseOne, responseTwo;
  try {
    const requestOne = axios.get("https://covidtracking.com/api/states");
    let requestTwo = axios.get("https://covidtracking.com/api/states/daily?date=" + today);

    response = await axios.all([requestOne, requestTwo]);
    if (response.status !== 200) {
      requestTwo = axios.get("https://covidtracking.com/api/states/daily?date=" + yesterday);
      response = await axios.all([requestOne, requestTwo]);
      if (response.status !== 200) {
        console.log("ERROR: getRegionsUsa()");
      }
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
    let region = { "region": usStatesDic[responseOne[i].state], "flag": "flag-us-" + responseOne[i].state.toLowerCase(), "cases": responseOne[i].positive || 0, "todayCases": (responseTwo[i] || {}).positive || 0, "deaths": responseOne[i].death || 0, "todayDeaths": (responseTwo[i] || {}).death || 0 };

    result.push(region);
  }

  db.set("us", result);
  console.log("US data refreshed");
}, 150000);

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

app.get("/timeseries/", async function (req, res) {
  let timeSeriesCountryList = await db.fetch("timeseries-country-list");
  res.send(timeSeriesCountryList);
});

app.get("/timeseries/all/", async function (req, res) {
  let timeSeries = await db.fetch("timeseriest");
  res.send(timeSeries);
});

app.get("/timeseries/:countryIso", async function (req, res) {
  let timeSeries = await db.fetch("timeseries");
  res.send(timeSeries[req.params.countryIso]);
});

app.get("/countries/", async function (req, res) {
  let countries = await db.fetch("countries");
  res.send(countries);
});

app.get("/countries/:countryIso/", async function (req, res) {
  let countries = await db.fetch("countries");
  res.send(countries[req.params.countryIso]);
});

app.get("/regions/us/", async function (req, res) {
  let regions = await db.fetch("us");
  res.send(regions);
});

app.get("/regions/it/", async function (req, res) {
  let regions = await db.fetch("it");
  res.send(regions);
});

app.get("/regions/gb/", async function (req, res) {
  let regions = await db.fetch("gb");
  res.send(regions);
});

app.get("/regions/de/", async function (req, res) {
  let regions = await db.fetch("de");
  res.send(regions);
});

app.get("/regions/in/", async function (req, res) {
  let regions = await db.fetch("in");
  res.send(regions);
});

app.get("/regions/at/", async function (req, res) {
  let regions = await db.fetch("at");
  res.send(regions);
});

app.get("/regions/es/", async function (req, res) {
  let regions = await db.fetch("es");
  res.send(regions);
});

app.get("/regions/cn/", async function (req, res) {
  let regions = await db.fetch("cn");
  res.send(regions);
});

app.get("/regions/ca/", async function (req, res) {
  let regions = await db.fetch("ca");
  res.send(regions);
});

app.get("/regions/au/", async function (req, res) {
  let regions = await db.fetch("au");
  res.send(regions);
});

app.get("/regions/dk/", async function (req, res) {
  let regions = await db.fetch("dk");
  res.send(regions);
});