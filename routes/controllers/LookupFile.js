const fs = require("fs");

exports.lookupNetworkAndCountry = (req, res) => {
  try {
    const jsonString = fs.readFileSync("./data.json");

    const data = JSON.parse(jsonString);
    const { mcc, mnc } = req.query;

    if (!mnc || !mcc) {
      return res.status(400).json({ status: "failed", message: "Missing mnc or mcc in req query" });
    }

    let result = data.filter((obj) => {
      return obj.MCC === mcc && obj.MNC == mnc;
    });
    result = result.map((each) => {
      return { network: each.Network, country: each.Country };
    });

    return res.status(200).json({ status: "success", data: result[0] });
  } catch (err) {
    return res.status(500).json({ status: "failed", message: "Server Error" });
  }
};

exports.lookupNetworks = (req, res) => {
  try {
    const jsonString = fs.readFileSync("./data.json");

    const data = JSON.parse(jsonString);
    const { mcc, country } = req.query;

    if (!mcc && !country) {
      return res.status(400).json({ status: "failed", message: "Missing mcc or country in req query" });
    }
    let result = [];
    if (mcc && country) {
      result = data.filter((obj) => {
        return obj.MCC == mcc || obj.Country == country;
      });
    } else if (country) {
      result = data.filter((obj) => {
        return obj.Country == country;
      });
    } else {
      result = data.filter((obj) => {
        return obj.MCC == mcc;
      });
    }

    result = result.map((each) => {
      return each.Network;
    });

    return res.status(200).json({ status: "success", data: [...new Set(result)] });
  } catch (err) {
    // console.log(err);
    return res.status(500).json({ status: "failed", message: "Server Error" });
  }
};
