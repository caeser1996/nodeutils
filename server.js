const express = require('express')
const {exec} = require("child_process");
const fs = require("fs")
const open = require('open');
const app = express()
const port = 3000
let process_id;
const sqlite3 = require('sqlite3').verbose();
let data = [], records = [];

let url = 'https://google.com'
app.get('/startBrowser', async (req, res) => {
    let process = await open(url, {app: {name: 'firefox'}});

    process_id = process.pid
    res.send("Url Opened Successfully")
})

app.get('/stopBrowser', async (req, res) => {
    const appName = 'firefox.exe'
    exec(`taskkill /im ${appName} /t`, (err, stdout, stderr) => {
        if (err) {
            throw err
        }
        res.send("Browser Closed")
    })

})
app.get('/getLatestURL', async (req, res) => {

    try {
        records = await getRecords();
        res.send(records[records.length - 1])
    } catch (e) {
        res.send(e)
    }

})
app.get('/deleteAllHistory', (req, res) => {
    let file_path = "C:/Users/suman/AppData/Roaming/Mozilla/Firefox/Profiles/eotkrbvu.default-release/places.sqlite"
    if (fs.existsSync(file_path)) {
        // fs.unlinkSync(file_path)
        fs.rmSync(file_path, {force: true}, function (err) {
            if (err) {
                console.log("here")
                res.send(err)
            }
            res.send("deleted")
        });
    } else {
        res.send("Dosent Exist")
    }
})

function getRecords() {
    data = [];
    records = [];
    return new Promise((resolve, reject) => {
        let db = new sqlite3.Database('C:/Users/suman/AppData/Roaming/Mozilla/Firefox/Profiles/eotkrbvu.default-release/places.sqlite', (re, err) => {
            if (err) {
                reject(err.message)
            }
            console.log('Connected to the browser database.');
        });
        db.all('SELECT  url FROM moz_historyvisits LEFT JOIN moz_places ON moz_historyvisits.place_id = moz_places.id ;', [], (err, rows) => {
            if (err) {
                reject(err.message)
            } else {
                rows.forEach((row) => {
                    data.push(row);
                });
                db.close()
                resolve(data);

            }

        })

    })
}


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
