const express = require('express');
const axios = require('axios');
const app = express();
const port = 3000;

// Funktio lähettämään HTTP GET -pyyntöjä aikavälien mukaisesti
async function makeRequests(url, intervals) {
    for (const interval of intervals) {
        await new Promise(resolve => setTimeout(resolve, interval * 1000));
        try {
            const response = await axios.get(url);
            console.log(`Request made at ${interval}s: Status Code ${response.status}`);
        } catch (error) {
            console.error(`Error at ${interval}s: ${error.message}`);
        }
    }
}

// Reitti pyyntöjen ajoittamiseksi
app.get('/schedule', (req, res) => {
    const url = req.query.url;
    const intervals = req.query.intervals.split(',').map(Number);

    makeRequests(url, intervals);

    res.send(`Scheduled requests to ${url} at intervals ${intervals.join(', ')} seconds.`);
});

// Palvelin käynnistetään
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
