const service = require("./service");

// production config
const table = "survivorpoolv2";
const env = "prod";

var season = {
               "name": "Game Changers",
               "contestants": [
                 {
                   "name": "Andrea",
                   "pic": "http://wwwimage2.cbsstatic.com/thumbnails/photos/w170-h215/cast/e6d2eb4eb5d95142_surv34_cast_andreaboehlke.jpg",
                   "status": "active"
                 },
                 {
                   "name": "Aubry",
                   "pic": "http://wwwimage2.cbsstatic.com/thumbnails/photos/w170-h215/cast/0b95d73be577fbef_surv34_cast_aubrybracco.jpg",
                   "status": "active"
                 },
                 {
                   "name": "Michaela",
                   "pic": "http://wwwimage1.cbsstatic.com/thumbnails/photos/w170-h215/cast/51bbd0fe1f97ff2d_surv34_cast_michaelabradshaw.jpg",
                   "status": "active"
                 },
                 {
                   "name": "Brad",
                   "pic": "http://wwwimage4.cbsstatic.com/thumbnails/photos/w170-h215/cast/29edc775b97943ac_surv34_cast_bradculpepper.jpg",
                   "status": "active"
                 },
                 {
                   "name": "Sandra",
                   "pic": "http://wwwimage1.cbsstatic.com/thumbnails/photos/w170-h215/cast/dfa572d47c9f9e8c_surv34_cast_sandradiaztwine.jpg",
                   "status": "active"
                 },
                 {
                   "name": "Ciera",
                   "pic": "http://wwwimage2.cbsstatic.com/thumbnails/photos/w170-h215/cast/f4ed3109e4e8e9ee_surv34_cast_cieraeastin.jpg",
                   "status": "active"
                 },
                 {
                   "name": "Cirie",
                   "pic": "http://wwwimage3.cbsstatic.com/thumbnails/photos/w170-h215/cast/39a9586198d74f27_surv34_cast_ciriefields.jpg",
                   "status": "active"
                 },
                 {
                   "name": "Hali",
                   "pic": "http://wwwimage5.cbsstatic.com/thumbnails/photos/w170-h215/cast/d0b525f1a042fdba_surv34_cast_haliford.jpg",
                   "status": "active"
                 },
                 {
                   "name": "Malcolm",
                   "pic": "http://wwwimage2.cbsstatic.com/thumbnails/photos/w170-h215/cast/cce2a6386df56186_surv34_cast_malcolmfreberg.jpg",
                   "status": "active"
                 },
                 {
                   "name": "Sarah",
                   "pic": "http://wwwimage3.cbsstatic.com/thumbnails/photos/w170-h215/cast/82008e013eb53b7e_surv34_cast_sarahlacina.jpg",
                   "status": "active"
                 },
                 {
                   "name": "Ozzy",
                   "pic": "http://wwwimage5.cbsstatic.com/thumbnails/photos/w170-h215/cast/782a7bb3369065aa_surv34_cast_ozzylusth.jpg",
                   "status": "active"
                 },
                 {
                   "name": "Caleb",
                   "pic": "http://wwwimage2.cbsstatic.com/thumbnails/photos/w170-h215/cast/7f56db5789380b85_surv34_cast_calebreynolds.jpg",
                   "status": "active"
                 },
                 {
                   "name": "Troyzan",
                   "pic": "http://wwwimage5.cbsstatic.com/thumbnails/photos/w170-h215/cast/5aa735330e5e65b6_surv34_cast_troyrobertson.jpg",
                   "status": "active"
                 },
                 {
                   "name": "Zeke",
                   "pic": "http://wwwimage5.cbsstatic.com/thumbnails/photos/w170-h215/cast/b24c9eba482e2e00_surv34_cast_zekesmith.jpg",
                   "status": "active"
                 },
                 {
                   "name": "Sierra",
                   "pic": "http://wwwimage2.cbsstatic.com/thumbnails/photos/w170-h215/cast/db1aed062e1fe3b5_surv34_cast_sierradawnthomas.jpg",
                   "status": "active"
                 },
                 {
                   "name": "JT",
                   "pic": "http://wwwimage3.cbsstatic.com/thumbnails/photos/w170-h215/cast/e92cc6920795e7fa_surv34_cast_jamesthomas.jpg",
                   "status": "active"
                 },
                 {
                   "name": "Tai",
                   "pic": "http://wwwimage1.cbsstatic.com/thumbnails/photos/w170-h215/cast/5072087da2f0a8c9_surv34_cast_taitrang.jpg",
                   "status": "active"
                 },
                 {
                   "name": "Jeff",
                   "pic": "http://wwwimage2.cbsstatic.com/thumbnails/photos/w170-h215/cast/b41ee8a15c717bb2_surv34_cast_jeffvarner.jpg",
                   "status": "active"
                 },
                 {
                   "name": "Tony",
                   "pic": "http://wwwimage2.cbsstatic.com/thumbnails/photos/w170-h215/cast/520510d9980da36f_surv34_cast_tonyvlachos.jpg",
                   "status": "active"
                 },
                 {
                   "name": "Debby",
                   "pic": "http://wwwimage5.cbsstatic.com/thumbnails/photos/w170-h215/cast/ebffc46661b14150_surv34_cast_debbiewanner.jpg",
                   "status": "active"
                 }
               ]
             };

service.execute(table, env, season, function(err, data) {
  if (err) {
    console.log("Failed to create season.");
    console.log(JSON.stringify(err));
  }
  else {
    console.log("Successfully created new season.");
  }
});