const request = require("request");
const cheerio = require("cheerio");

let season = {
  name: "Edge of Extinction",
  current: true,
  contestants: []
};

function parseContestantPage(url, callback) {
  request(url, {}, (err, resp, data) => {
    let $ = cheerio.load(data);
    let imgNode = $("img[id=galleryDetailImage]");
    let name = imgNode.attr("alt");
    let pic = imgNode.attr("src");

    // All the actual contestants end with (XXX Tribe)
    if (name && name.endsWith("Tribe)")) {
      callback(name, pic);
    }

    try {
      let nextLink = $("div[class=photoGalleryButtons]").children("a").get(1).attribs.href;
      parseContestantPage(`https://www.cbs.com${nextLink}`, callback);
    }
    catch(e) {
      // done
      console.log(JSON.stringify(season, null, 4));
    }
  });  
}

function onContestant(name, pic) {
  let shortName = name.split(' ')[0];
  season.contestants.push({status: "active", name: shortName, pic});
}

parseContestantPage("https://www.cbs.com/shows/survivor/photos/1008636/who-s-in-the-cast-of-survivor-season-38-edge-of-extinction-/133095/dan-the-wardog-dasilva-manu-tribe-/", onContestant);
