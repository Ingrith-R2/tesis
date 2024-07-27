const { Router } = require('express')
// Importar el método isAuthenticated
const {isAuthenticated} = require('../helpers/validate-auth')
const { 
    renderAllCategorias,
    renderCategorieForm,
    createNewCategorie,
    renderEditCategorieForm,
    updateCategorie,
    deleteCategorie
 } = require('../controllers/categorie.controller')

// creación de la instancia 
const router = Router()

// RUTA PARA PRESENTAR TODAS LAS CATEGORIAS
router.get('/categories', isAuthenticated, renderAllCategorias)

// RUTA PARA PRESENTAR EL FORMULARIO PARA CREAR UNA CATEGORIA
router.get('/categorie/add', isAuthenticated, renderCategorieForm)
// RUTA PARA GUARDAR LA NUEVA CATEGORIA
router.post('/categorie/add', isAuthenticated, createNewCategorie)

// RUTA PARA CARGAR LA VISTA DEL FORMULARIO PARA EDITAR
router.get('/categorie/editCategorie/:id', isAuthenticated, renderEditCategorieForm)
// RUTA PARA CAPTURAR LOS DATOS DEL FORM Y GUARDAR (ACTUALIZAR) EN BDD
router.put('/categorie/editCategorie/:id', isAuthenticated, updateCategorie)

// RUTA PARA ELIMINAR LA CATEGORIA
router.delete('/categorie/deleteCategorie/:id', isAuthenticated, deleteCategorie)

// Exportar la variable router
module.exports = router