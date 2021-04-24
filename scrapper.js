const axios = require("axios"),
  cheerio = require("cheerio"),
  fs = require("fs");

const loadData = async () => {
  try {
    axios.get("https://www.mcc-mnc.com/").then((response) => {
      const $ = cheerio.load(response.data);

      let allData = [];

      $("tbody tr").each(function () {
        const rowData = $(this).find("td");

        allData.push({
          MCC: rowData[0] ? $(rowData[0]).text() : " ",
          MNC: rowData[1] ? $(rowData[1]).text() : " ",
          ISO: rowData[2] ? $(rowData[2]).text() : " ",
          Country: rowData[3] ? $(rowData[3]).text() : " ",
          CountryCode: rowData[4] ? $(rowData[4]).text() : " ",
          Network: rowData[5] ? $(rowData[5]).text() : " ",
        });
      });
      //   Save data to json file
      fs.writeFile("data.json", JSON.stringify(allData), (err, result) => {
        if (err) throw new Error(err);
      });
    });
  } catch (err) {
    throw new Error(err);
  }
};

loadData();
