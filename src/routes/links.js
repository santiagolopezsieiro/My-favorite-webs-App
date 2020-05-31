const express = require('express');
const router = express.Router();

const pool = require('../database');

router.get('/add', (req, res) => {
    res.render('links/add')
});

router.post('/add', async(req, res) => {
    console.log(req.body)
const { title, url, description } = req.body;
console.log(req.body);
const newLink = {
    title,
    url,
    description
};
await pool.query('INSERT INTO links set ?', [newLiasdank]);    
res.send('received');
});


module.exports = router;