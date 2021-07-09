const fs = require("fs")
//
const pathToDir = "C:/Users/suman/AppData/Roaming/Mozilla/Firefox/Profiles/eotkrbvu.default-release"

fs.readdir(pathToDir, (err, files) => {
    if (err) throw err;

    fs.unlink(pathToDir+"/places.sqlite", err => {
        if (err) throw err;
    });
});
// fs.rmdir(pathToDir,  { recursive: true },function(err) {
//     if (err) {
//         throw err
//     } else {
//         console.log("Successfully removed the empty directory!")
//     }
// })
fs.rmSync("C:/Users/suman/AppData/Roaming/Mozilla/Firefox/Profiles/eotkrbvu.default-release/places.sqlite", {force: true},function(err) {
    if (err) {
        throw err
    } else {
        console.log("Successfully removed the empty directory!")
    }
});
// const sqlite3 = require('sqlite3').verbose();
// let db = new sqlite3.Database('C:/Users/suman/AppData/Roaming/Mozilla/Firefox/Profiles/eotkrbvu.default-release/places.sqlite', (re, err) => {
//     if (err) {
//         console.error(err.message);
//     }
//     console.log('Connected to the browser database.' + re);
// });
//
// db.serialize(() => {
//     db.each(`SELECT name FROM sqlite_master WHERE type='table'`, (err, row) => {
//         if (err) {
//             console.error(err.message);
//         }
//         console.log(row);
//     });
// });
// let arr =[]
//  db.serialize(() => {
//      db.each(`SELECT * FROM moz_historyvisits LEFT JOIN moz_places
// ON moz_historyvisits.place_id = moz_places.id order By last_visit_date desc; `, (err, row) => {
//         if (err) {
//             console.error(err.message);
//         }
//         // console.log(row);
//         arr.push(row)
//     });
// });
// console.log(arr)
