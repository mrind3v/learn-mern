const getProduct = (req,res) => {
    const id = req.params.id; 
    res.json({productId: id});
}

module.exports = getProduct