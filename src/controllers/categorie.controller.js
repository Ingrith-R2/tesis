// Importar el modelo Category
const Category = require('../models/Category')

// MÉTODO PARA LISTAR LAS CATEGORIAS
const renderAllCategorias = async (req, res) => {
    const categories = await Category.find().lean();
    // Invoocar a la vista y mandar la variable 
    res.render("categorie/allCategories", { categories })
}

// MÉTODO PARA MOSTRAR EL FORMULARIO 
const renderCategorieForm = async (req, res) => {
    const error = req.query.error;
    // INVOCACIÓN DE LA VISTA
    res.render('categorie/newFormCategorie', { error })
}

const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
};

// MÉTODO PARA GUARDAR EN LA BDD LO CAPTURADO EN EL FORM 
const createNewCategorie = async (req, res) => {
    const { name, imageUrl } = req.body;
    const formattedName = capitalizeFirstLetter(name);// Primera letra en mayuscula las demas en minuscula

    // Comprobar si la categoría ya existe (comparar en minúsculas)
    const categoryExists = await Category.findOne({ name: new RegExp(`^${formattedName}$`, 'i') });
    if (categoryExists) {
        return res.redirect('/categorie/add?error=Nombre de la categoría ya existe');
    }

    const newCategory = new Category({ name, imageUrl });
    await newCategory.save();
    res.redirect('/categories')
}

// MÉTODO PARA MOSTRAR EL FORMULARIO PARA ACTUALIZAR LA CATEGORIA
const renderEditCategorieForm = async (req, res) => {
    // Cargar la información de las categorias
    const category = await Category.findById(req.params.id).lean();
    // Invocar la vista y pasar la variable
    res.render('categorie/editCategorie', { category })
}

// MÉTODO PARA ACTUALIZAR EN LA BDD LO CAPTURADO EN EL FORM 
const updateCategorie = async (req, res) => {
    const categoryId = req.params.id;
    const { name, imageUrl } = req.body;

    const formattedName = capitalizeFirstLetter(name);

    const existingCategory = await Category.findOne({ _id: { $ne: categoryId }, name: formattedName });

    if (existingCategory) {
        // Si existe otra categoría con el mismo nombre, mostrar mensaje de error
        return res.render('categorie/editCategorie', {
            category: { _id: categoryId, name, imageUrl },
            errorMessage: 'Ya existe una categoría con ese nombre. Por favor, elige otro nombre.'
        });
    }

    await Category.findByIdAndUpdate(categoryId, { name: formattedName, imageUrl }, { new: true });

    res.redirect('/categories')
}

// MÉTODO PARA ELIMINAR EN LA BDD 
const deleteCategorie = async (req, res) => {

    // Utilizar el método findByIdAndDelete
    await Category.findByIdAndDelete(req.params.id)
    res.redirect('/categories')
}

// EXPORTAR LAS FUNCIONES
module.exports = {
    renderAllCategorias,
    renderCategorieForm,
    createNewCategorie,
    renderEditCategorieForm,
    updateCategorie,
    deleteCategorie
}