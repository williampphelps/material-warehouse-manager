import Product from '/utility/models/Product';
import dbConnect from '/utility/dbConnect';
dbConnect();

export default async function handler(req, res) {
    const { method } = req;
    const { productId } = req.query;
    switch(method) {
        case 'GET':
            try {
                let product = await Product.findById(productId);
                res.status(200).json({ data: product });
            } catch (error) {
                res.status(400).json({ data: error });
            }
        break;
        case 'PATCH':
            try {
                let updatedProduct = await Product.findByIdAndUpdate(productId, { $set: req.body }, { new: true }).then((docs) => res.status(200).json({ data: docs})).catch((err) => res.status(400).json({ data: err }));
            } catch (error) {
                res.status(400).json({ data: error });
            }
        break;
        case 'DELETE':
            try {
                await Product.findByIdAndDelete(productId);
                res.status(200).json({ data: "PRODUCT DELETED" });
            } catch (error) {
                res.status(400).json({ data: error });
            }
    }

}
