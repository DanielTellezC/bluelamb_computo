const express = require("express");
const router = express.Router();
const passport = require('passport');
const Task = require('../models/Tasks');
const user = require("../models/user");
const articulo = require('../models/articulo');

// Ruta raíz
router.get('/', async(req, res, next) => {
    Articulo = await articulo.find();
    res.render('index', { Articulo });
});

// Signup registro de usuarios
router.get('/signup', (req, res, next)=>{
    res.render('signup');
});

router.post('/signup', passport.authenticate('local-signup',{
    successRedirect: '/profile',
    failureRedirect: '/signup',
    passReqToCallback: true
}));

// Signin ingreso de usuarios
router.get('/signin', (req, res, next)=>{
    res.render('signin');
});

router.post('/signin', passport.authenticate('local-signin',{
    successRedirect: '/profile',
    failureRedirect: '/signin',
    passReqToCallback: true
}));

// Cerrar sesion
/*
router.get('/logout', (req,res,next) =>{
    req.logOut();
    res.redirect('/');
});
*/
router.get('/logout', function(req, res, next){
    req.logout(function(err){
        if(err) { return next(err); }
        res.redirect('/');
    });
});

// Perfil
router.get('/profile', isAuthenticated, (req,res, next) =>{
    res.render('profile');
});

/* Editar la información del usuario */
router.get("/edit_profile/:id", async(req, res, next) =>{
    const User = await user.findById(req.params.id).lean();
    res.render("edit_profile", { User });
    
});
router.post("/edit_profile/:id", async(req, res, next) =>{
    const { id } = req.params;
    console.log('Esta es lo que arroja', req.body);
    await user.findByIdAndUpdate(id, req.body);
    res.redirect('/profile');
});

/* Administracion de usuarios enndonde se va poder hacer un CRUD */
router.get('/administrar_usuarios', async(req, res, next) =>{
    const User = await user.find();
    res.render('administrar_usuarios', { User });
});

router.get('/administrar_usuario/:id', async(req, res, next) =>{
    const User = await user.findById(req.params.id).lean();
    res.render("administrar_usuario", { User });
});
router.post('/administrar_usuario/:id', async(req, res, next) =>{
    const { id } = req.params;
    console.log('Esta es lo que arroja', req.body);
    await user.findByIdAndUpdate(id, req.body);
    res.redirect('/administrar_usuarios');
});

router.get('/agregar_articulo', isAuthenticated, async(req, res, next) =>{
    const Articulo = await articulo.find({ cuenta:req.user.id });
    res.render("agregar_articulo", { Articulo });
});

router.post('/agregar_articulo', isAuthenticated, async(req, res, next) =>{
    const articulonuevo = articulo(req.body);
    const user = req.user.id;
    articulonuevo.cuenta = user;
    const save_articulo = await articulonuevo.save();
    res.redirect('agregar_articulo');
});

router.get('/delete_articulo/:id', async(req, res, next) =>{
    const { id } = req.params;
    console.log('Este es el que se borra:', req.body);
    await articulo.findByIdAndDelete(id, req.body);
    res.redirect('/agregar_articulo');
});

router.get('/editar_articulo/:id', async(req, res, next) =>{
    const Articulo = await articulo.findById(req.params.id).lean();
    res.render('editar_articulo', { Articulo });
});
router.post('/editar_articulo/:id', isAuthenticated, async(req, res, next) =>{
    const { id } = req.params;
    console.log('Esta es lo que arroja', req.body);
    await articulo.findByIdAndUpdate(id, req.body);
    res.redirect('/agregar_articulo');
});

//// Carrito de compras
router.get('/carrito', async(req, res, next) =>{
    res.render('carrito');
});


////// ejemplo
router.post('/tasks/add', async (req, res, next) => {
    const task = Task(req.body);
    const user = req.user.id;
    task.cuenta = user;
    const save_task = await task.save();
    console.log(save_task);
    res.redirect('/tasks');
});
//////

router.get('/delete/:id', async(req, res, next) => {
    const { id } = req.params;
    console.log('Este es el que se borra:', req.body);
    await user.findByIdAndDelete(id, req.body);
    res.redirect('/administrar_usuarios');
});
/* Funciones de autenticación */ 
function isAuthenticated(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect('/');
};


// Tareas
router.get('/tasks', isAuthenticated, lectura_task , async(req, res, next) =>{
});

router.post('/tasks/add', async (req, res, next) => {
    const task = Task(req.body);
    const user = req.user.id;
    task.cuenta = user;
    const save_task = await task.save();
    console.log(save_task);
    res.redirect('/tasks');
});

async function lectura_task(req, res, next){
    const task = await Task.find({ cuenta:req.user.id });
    res.render('tasks', { task });
};
module.exports = router;