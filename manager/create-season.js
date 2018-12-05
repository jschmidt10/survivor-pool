"use strict";

const DynamoFactory = require("survivorpool-core/aws-dynamo-factory");
const AWSConfig = require("survivorpool-core/aws-config");

let config = new AWSConfig();
let dynamo = DynamoFactory.newInstance();
let season = {
  name: "David vs. Goliath",
  current: true,
  contestants: [
    {
      name: "Carl",
      pic:
        "https://wwwimage-secure.cbsstatic.com/thumbnails/photos/770xh/3e937d323181a48e_carl.jpg",
      status: "active"
    },
    {
      name: "Pat",
      pic:
        "https://wwwimage-secure.cbsstatic.com/thumbnails/photos/770xh/ea8212f12283fb20_pat.jpg",
      status: "active"
    },
    {
      name: "Christian",
      pic:
        "https://wwwimage-secure.cbsstatic.com/thumbnails/photos/770xh/christian_replace.jpg",
      status: "active"
    },
    {
      name: "Bi",
      pic:
        "https://wwwimage-secure.cbsstatic.com/thumbnails/photos/770xh/8988fd590f09dea0_bi.jpg",
      status: "active"
    },
    {
      name: "Elizabeth",
      pic:
        "https://wwwimage-secure.cbsstatic.com/thumbnails/photos/770xh/cafc2ea0475eae36_elizabeth.jpg",
      status: "active"
    },
    {
      name: "Gabby",
      pic:
        "https://wwwimage-secure.cbsstatic.com/thumbnails/photos/770xh/901008bfc105f77a_gabby.jpg",
      status: "active"
    },
    {
      name: "Jessica",
      pic:
        "https://wwwimage-secure.cbsstatic.com/thumbnails/photos/770xh/4894258ab7ec769b_jessica.jpg",
      status: "active"
    },
    {
      name: "Davie",
      pic:
        "https://wwwimage-secure.cbsstatic.com/thumbnails/photos/770xh/558d6d2fe3ae44fb_davie.jpg",
      status: "active"
    },
    {
      name: "Lyrsa",
      pic:
        "https://wwwimage-secure.cbsstatic.com/thumbnails/photos/770xh/8f935bcdb8faa8ad_lyrsa.jpg",
      status: "active"
    },
    {
      name: "Nick",
      pic:
        "https://wwwimage-secure.cbsstatic.com/thumbnails/photos/770xh/54a6ac6ed366fd74_nick.jpg",
      status: "active"
    },
    {
      name: "Natalia",
      pic:
        "https://wwwimage-secure.cbsstatic.com/thumbnails/photos/770xh/f215ceca4ef1efc4_natalia.jpg",
      status: "active"
    },
    {
      name: "Natalie",
      pic:
        "https://wwwimage-secure.cbsstatic.com/thumbnails/photos/770xh/c9c72a4c1a1b8302_natalie.jpg",
      status: "active"
    },
    {
      name: "Jeremy",
      pic:
        "https://wwwimage-secure.cbsstatic.com/thumbnails/photos/770xh/f654a84dd580fb11_jeremy.jpg",
      status: "active"
    },
    {
      name: "John",
      pic:
        "https://wwwimage-secure.cbsstatic.com/thumbnails/photos/770xh/94ad3513bc85064b_john.jpg",
      status: "active"
    },
    {
      name: "Kara",
      pic:
        "https://wwwimage-secure.cbsstatic.com/thumbnails/photos/770xh/a91dd09255ca7063_kara.jpg",
      status: "active"
    },
    {
      name: "Angelina",
      pic:
        "https://wwwimage-secure.cbsstatic.com/thumbnails/photos/770xh/e98a6b2b9c08235e_angelina.jpg",
      status: "active"
    },
    {
      name: "Alex",
      pic:
        "https://wwwimage-secure.cbsstatic.com/thumbnails/photos/770xh/c6c4b1472df4cefb_alec.jpg",
      status: "active"
    },
    {
      name: "Alison",
      pic:
        "https://wwwimage-secure.cbsstatic.com/thumbnails/photos/770xh/ddf89fd1d386d2be_alison.jpg",
      status: "active"
    },
    {
      name: "Dan",
      pic:
        "https://wwwimage-secure.cbsstatic.com/thumbnails/photos/770xh/b01626bf152cca69_dan.jpg",
      status: "active"
    },
    {
      name: "Mike",
      pic:
        "https://wwwimage-secure.cbsstatic.com/thumbnails/photos/770xh/mikenew.jpg",
      status: "active"
    }
  ]
};

season.id = "SEASON";
season.env = config.env;

let putRequest = {
  TableName: config.table,
  Item: season
};

dynamo
  .put(putRequest)
  .promise()
  .then(res => console.log("Created season successfully!"))
  .catch(err => {
    console.log("Failed to create season.");
    console.log(JSON.stringify(err, null, 2));
  });
