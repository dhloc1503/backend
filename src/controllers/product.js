class ProductController {
    static async get(req, res) {
        console.log(123123123)
        return res.status(200).send('Product');
    }
}

export default ProductController;