getAllProductsStatic = async (req, res) => {
    res.status(200).json({ msg: 'test products static route' })
}
getAllProducts = async (req, res) => {
    res.status(200).json({ msg: 'test products route' })
}
module.exports = {
    getAllProducts, getAllProductsStatic
}