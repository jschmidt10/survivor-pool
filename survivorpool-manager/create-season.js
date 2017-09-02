"use strict";

const DynamoFactory = require("survivorpool-core/aws-dynamo-factory");
const AWSConfig = require("survivorpool-core/aws-config");

let config = new AWSConfig();
let dynamo = DynamoFactory.newInstance();
let season = {
               "name": "Heroes vs Healers vs Hustlers",
               "current": true,
               "contestants": [
                 {
                   "name": "Alan",
                   "pic": "http://wwwimage3.cbsstatic.com/thumbnails/photos/w170-h215/cast/f9fb5d5293ee1ace_svr_alan_ball_800x1000.jpg",
                   "status": "active"
                 },
                 {
                   "name": "Patrick",
                   "pic": "http://wwwimage2.cbsstatic.com/thumbnails/photos/w170-h215/cast/6d6a5ae79b498bbd_svr_patrick_bolton_800x1000.jpg",
                   "status": "active"
                 },
                 {
                   "name": "Ben",
                   "pic": "http://wwwimage1.cbsstatic.com/thumbnails/photos/w170-h215/cast/be2fd335f762c7d9_svr_ben_driebergen_800x1000.jpg",
                   "status": "active"
                 },
                 {
                   "name": "Ali",
                   "pic": "http://wwwimage2.cbsstatic.com/thumbnails/photos/w170-h215/cast/ad4291d3f40147fc_svr_ali_elliot_800x1000.jpg",
                   "status": "active"
                 },
                 {
                   "name": "JP",
                   "pic": "http://wwwimage2.cbsstatic.com/thumbnails/photos/w170-h215/cast/48abff7c0ea3bd52_svr_john_jp_800x1000.jpg",
                   "status": "active"
                 },
                 {
                   "name": "Chrissy",
                   "pic": "http://wwwimage3.cbsstatic.com/thumbnails/photos/w170-h215/cast/603d42364f0a0821_svr_chrissy_hofbeck_800x1000.jpg",
                   "status": "active"
                 },
                 {
                   "name": "Jessica",
                   "pic": "http://wwwimage2.cbsstatic.com/thumbnails/photos/w170-h215/cast/ddf4cac9df0b6014_svr_jessica_johnston_800x1000.jpg",
                   "status": "active"
                 },
                 {
                   "name": "Roark",
                   "pic": "http://wwwimage2.cbsstatic.com/thumbnails/photos/w170-h215/cast/c0a2b466e9acffd2_svr_roark_luskin_800x1000.jpg",
                   "status": "active"
                 },
                 {
                   "name": "Cole",
                   "pic": "http://wwwimage5.cbsstatic.com/thumbnails/photos/w170-h215/cast/872af08205864cdd_svr_cole_medders_800x1000.jpg",
                   "status": "active"
                 },
                 {
                   "name": "Joe",
                   "pic": "http://wwwimage1.cbsstatic.com/thumbnails/photos/w170-h215/cast/5abc8b2c330393c5_svr_joe_mena_800x1000.jpg",
                   "status": "active"
                 },
                 {
                   "name": "Simone",
                   "pic": "http://wwwimage2.cbsstatic.com/thumbnails/photos/w170-h215/cast/990b1cd14655b38f_svr_simone_nguyen_800x1000.jpg",
                   "status": "active"
                 },
                 {
                   "name": "Ashley",
                   "pic": "http://wwwimage5.cbsstatic.com/thumbnails/photos/w170-h215/cast/144b030eddc97cff_svr_ashely_nolan_800x1000.jpg",
                   "status": "active"
                 },
                 {
                   "name": "Devon",
                   "pic": "http://wwwimage5.cbsstatic.com/thumbnails/photos/w170-h215/cast/9aef71e6d5e3c30e_svr_devon_pinto_800x1000.jpg",
                   "status": "active"
                 },
                 {
                   "name": "Katrina",
                   "pic": "http://wwwimage5.cbsstatic.com/thumbnails/photos/w170-h215/cast/28bfa4f203556622_svr_katrina_radke_800x1000.jpg",
                   "status": "active"
                 },
                 {
                   "name": "Lauren",
                   "pic": "http://wwwimage5.cbsstatic.com/thumbnails/photos/w170-h215/cast/2646b6ddbcc25ee0_svr_lauren_rimmer_800x1000.jpg",
                   "status": "active"
                 },
                 {
                   "name": "Ryan",
                   "pic": "http://wwwimage4.cbsstatic.com/thumbnails/photos/w170-h215/cast/a2933688cdfd585a_svr_ryan_urich_800x1000.jpg",
                   "status": "active"
                 },
                 {
                   "name": "Desi",
                   "pic": "http://wwwimage4.cbsstatic.com/thumbnails/photos/w170-h215/cast/45d20643cbabea14_svr_desiree_williams_800x1000.jpg",
                   "status": "active"
                 },
                 {
                   "name": "Mike",
                   "pic": "http://wwwimage5.cbsstatic.com/thumbnails/photos/w170-h215/cast/9389f05347cb2e42_svr_mike_zahalsky_800x1000.jpg",
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