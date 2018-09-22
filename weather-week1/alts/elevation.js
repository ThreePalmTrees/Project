const axios = require("axios");
const cities = require("./top-1000-cities");
const sleep = require("sleep");
const fs = require("fs");

let final = [];
let top10Cities = cities.filter((city, i) => i < 10 && city);
cities.map(async (city, i) => {
  let result = [];
  const { lat, lng } = city;
  const currentCityAPI = `https://elevation-api.io/api/elevation?points=(${lat},${lng})`;
  try {
    const response = await axios(currentCityAPI);
    const data = response.data;
    const alt = data.elevations[0].elevation;
    result.push({ ...city, alt });
    storeAlt({ ...city, alt });
    sleep.sleep(2);
  } catch (e) {
    console.log(e);
  }
  // console.log(result);
});

const storeAlt = val => {
  final.push(val);
  return fs.writeFileSync(
    "myCities2.json",
    JSON.stringify(final, null, "\t"),
    "utf8"
  );
};
