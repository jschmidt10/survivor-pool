const request = require("request");
const cheerio = require("cheerio");

let season = {
  name: "Winners at War",
  current: true,
  contestants: []
};

function onComplete() {
  console.log(JSON.stringify(season, null, 4));
}

function parseContestantPage(url, callback) {
  request(url, {}, (err, resp, data) => {
    let $ = cheerio.load(data);

    $("img[class='thumb lazy']").each((index, element) => {
      var fullName = element.attribs['alt'];
      var pic = element.attribs['data-src'];
      var firstName = fullName.split(' ')[0];

      if (firstName != "Jeff") {
        season.contestants.push({status: "active", name: firstName, pic});
      }
    });

    callback();
  });
}

parseContestantPage("https://www.cbs.com/shows/survivor/cast/", onComplete);
