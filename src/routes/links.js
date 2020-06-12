const express = require('express');
const router = express.Router();

const pool = require('../database');
const {isLoggedIn} = require('../lib/auth')

router.get('/add',isLoggedIn, (req, res) => {
    res.render('links/add')
});

router.post('/add',isLoggedIn, async(req, res) => {
    const { title, url, description } = req.body;
    const newLink = {
        title,
        url,
        description,
        user_id: req.user.id
    };
    await pool.query('INSERT INTO links set ?', [newLink]);
    req.flash('success', 'link saved successfully');    
    res.redirect('/links');
});

router.get("/",isLoggedIn, async(req, res) => {
    const links = await pool.query('SELECT * FROM links WHERE user_id = ?', [req.user.id]);
    console.log(links);
    res.render('links/list',{links});
});

 router.get("/delete/:id",isLoggedIn, async (req, res) => {
    const { id } = req.params;
    await pool.query('DELETE FROM links WHERE ID = ?',[id]);
    req.flash('success','ink deleted!')
    res.redirect("/links");
 });

 router.get("/edit/:id",isLoggedIn, async (req, res) => { //aca me trae el boton edit y luego redirecciona a links/edit
     const { id } = req.params;
     const links = await pool.query('SELECT * FROM links WHERE id = ?', [id]);
     console.log(links)
     req.flash('success','links updated')
    res.render('links/edit', {link: links[0]});
 });

 router.post("/edit/:id",isLoggedIn, async (req, res) => {
     const { id } = req.params;//este id es para que lo encuentre en la tabla de la BD
     const { title, description, url } = req.body;//los datos nuevos a actualizar
     const newLink = {
         title,
         description,
         url
     };
     await pool.query('UPDATE links set ? WHERE id = ?',[newLink, id]);
     res.redirect("/links")
 });

module.exports = router;