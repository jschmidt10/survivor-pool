"use strict";

const DynamoFactory = require("survivorpool-core/aws-dynamo-factory");
const AWSConfig = require("survivorpool-core/aws-config");

let config = new AWSConfig();
let dynamo = DynamoFactory.newInstance();
let season = {
               "name": "Ghost Island",
               "current": true,
               "contestants": [
                 {
                   "name": "Brendan",
                   "pic": "http://wwwimage4.cbsstatic.com/thumbnails/photos/770xh/88b824f0cf448fab_brendan-shapiro_survivor_bs.jpg",
                   "status": "active"
                 },
                 {
                   "name": "Donathan",
                   "pic": "http://wwwimage5.cbsstatic.com/thumbnails/photos/770xh/c52cdc451e1c4ce7_donathan-hurley_survivor_bs.jpg",
                   "status": "active"
                 },
                 {
                   "name": "Jacob",
                   "pic": "http://wwwimage3.cbsstatic.com/thumbnails/photos/770xh/dcccc84c2f12afdb_jacob-derwin_survivor_bs.jpg",
                   "status": "active"
                 },
                 {
                   "name": "James",
                   "pic": "http://wwwimage2.cbsstatic.com/thumbnails/photos/770xh/65b92f68a5fa811b_james-lim_survivor_bs.jpg",
                   "status": "active"
                 },
                 {
                   "name": "Jenna",
                   "pic": "http://wwwimage5.cbsstatic.com/thumbnails/photos/770xh/b756abf71e96d106_jenna-bowman_survivor_bs.jpg",
                   "status": "active"
                 },
                 {
                   "name": "Laurel",
                   "pic": "http://wwwimage5.cbsstatic.com/thumbnails/photos/770xh/028b930f96820b93_laurel-johnson_survivor_bs.jpg",
                   "status": "active"
                 },
                 {
                   "name": "Libby",
                   "pic": "http://wwwimage3.cbsstatic.com/thumbnails/photos/770xh/9659fc5e68c08532_libby-vincek-_survivor_bs.jpg",
                   "status": "active"
                 },
                 {
                   "name": "Michael",
                   "pic": "http://wwwimage1.cbsstatic.com/thumbnails/photos/770xh/029abf62788fb46f_michael-yerger_survivor_bs.jpg",
                   "status": "active"
                 },
                 {
                   "name": "Stephanie G",
                   "pic": "http://wwwimage4.cbsstatic.com/thumbnails/photos/770xh/2b5fe3b0b41f2ded_stephanie-gonzalez_survivor_bs.jpg",
                   "status": "active"
                 },
                 {
                   "name": "Stephanie J",
                   "pic": "http://wwwimage4.cbsstatic.com/thumbnails/photos/770xh/f3c0e43287303c95_stephanie-johnson_survivor_bs.jpg",
                   "status": "active"
                 },
                 {
                   "name": "Angela",
                   "pic": "http://wwwimage4.cbsstatic.com/thumbnails/photos/770xh/63a732159c21705a_angela-perkins_survivor_bs.jpg",
                   "status": "active"
                 },
                 {
                   "name": "Bradley",
                   "pic": "http://wwwimage2.cbsstatic.com/thumbnails/photos/770xh/4168c9336a762f6e_bradley-kleihege_survivor_bs.jpg",
                   "status": "active"
                 },
                 {
                   "name": "Chelsea",
                   "pic": "http://wwwimage2.cbsstatic.com/thumbnails/photos/770xh/5ed97be6975b45de_chelsea-townsend_survivor_bs.jpg",
                   "status": "active"
                 },
                 {
                   "name": "Chris",
                   "pic": "http://wwwimage1.cbsstatic.com/thumbnails/photos/770xh/a73d63e815ed360d_chris-noble_surivor_bs.jpg",
                   "status": "active"
                 },
                 {
                   "name": "Desiree",
                   "pic": "http://wwwimage3.cbsstatic.com/thumbnails/photos/770xh/6b06194f39847059_desiree-afuye_survivor_bs.jpg",
                   "status": "active"
                 },
                 {
                   "name": "Domenick",
                   "pic": "http://wwwimage3.cbsstatic.com/thumbnails/photos/770xh/7a418d31807cceaf_domenick-abbate_survivor_bs.jpg",
                   "status": "active"
                 },
                 {
                   "name": "Kellyn",
                   "pic": "http://wwwimage3.cbsstatic.com/thumbnails/photos/770xh/9aa53bf4dedd174c_kellyn-bechtold_survivor_bs.jpg",
                   "status": "active"
                 },
                 {
                   "name": "Morgan",
                   "pic": "http://wwwimage1.cbsstatic.com/thumbnails/photos/770xh/7a5c499b85561f0d_morgan-ricke_survivor_bs.jpg",
                   "status": "active"
                 },
                 {
                   "name": "Sebastian",
                   "pic": "http://wwwimage5.cbsstatic.com/thumbnails/photos/770xh/9591c13931513973_sebastian-noel_survivor_bs.jpg",
                   "status": "active"
                 },
                 {
                   "name": "Wendell",
                   "pic": "http://wwwimage2.cbsstatic.com/thumbnails/photos/770xh/075c63ac414e1697_wendell-holland_survivor_bs.jpg",
                   "status": "active"
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
  .then((res) => console.log("Created season successfully!"))
  .catch((err) => {
    console.log("Failed to create season.");
    console.log(JSON.stringify(err, null, 2));
  });