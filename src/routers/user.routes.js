// Importación de la Clase Router
const{Router} = require('express')
const { renderRegisterForm, registerNewUser, renderLoginForm, loginUser, logoutUser, confirmEmail, renderForgotPassword, newPassword, forgotPassword, checkTokenPasswordRender } = require('../controllers/user.controller')
const { redirectIfAuthenticated } = require('../helpers/validate-auth')


// creación de la instancia 
const router = Router()


// Ruta para mostrar el fomulario de registro
router.get('/user/register',renderRegisterForm)
// Ruta para capturar la información del formulario y almacenar en bdd
router.post('/user/register',registerNewUser)



// Ruta para mostrar el fomrulario de login
router.get('/user/login', redirectIfAuthenticated, renderLoginForm)

// Ruta para mostrar el formulario de recupero de contraseña
router.get('/user/forgot_password', renderForgotPassword)

// Ruta para mostrar el formulario de completar el perfil
router.get('/user/login',loginUser );
//----------------------------------------------------
// Ruta para manejar la actualización del perfil
//router.post('/user/login', updateProfile);

// Ruta para realizar en inicio de sesión con los datos del form
router.post('/user/login',loginUser);


// Ruta para realizar el cierre de sesión
router.post('/user/logout',logoutUser)


// Ruta para confirmar la cuenta del usuario
router.get('/user/confirmar/:token',confirmEmail)

router.post('/user/recover-password', forgotPassword)

// Ruta para verificar token
router.get('/user/forgot_password/:token', checkTokenPasswordRender)

router.post('/user/new-password/:token', newPassword)

// Exportar la variable router
module.exports = router