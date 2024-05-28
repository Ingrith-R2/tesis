
// Crear un método para validar la protección de rutas y a la vez exportar la función
module.exports.isAuthenticated = (req,res,next)=>{
    
    // Validar si existe una autenticación
    if(req.isAuthenticated()){
        // Proceso de continuar
        return next()
    }
    // Proceso de redireccionar al login
    res.redirect('/user/login')
}


// Crear un método para validar lo siguiente: 
// Si el usuario ya está autenticado, redirige a otra página” , caso contrario se presenta la página del login.
module.exports.redirectIfAuthenticated = (req, res, next)=>{

    if (req.isAuthenticated()) {
        return res.redirect('/portafolios')
    }
        return next();
}