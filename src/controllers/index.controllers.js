const Portfolio = require('../models/Portfolio')
const Category = require('../models/Category')


// Método para listar todos los productos
const renderIndex = async (req, res) => {
    try {
        // Consultar todos los productos y categorías
        const portfolios = await Portfolio.find().lean();
        const categories = await Category.find().lean();

        // Agrupando los productos por categoría
        const portfoliosByCategory = categories.map(category => ({
            ...category,
            portfolios: portfolios.filter(portfolio => portfolio.category === category.name)
        }));
        // Renderizar
        res.render('index', { portfoliosByCategory });
    } catch (err) {
        console.error('Error al obtener los datos:', err);
        res.status(500).send('Error al obtener los datos');
    }
};

// Exportación de la función 
module.exports = {
    renderIndex
}