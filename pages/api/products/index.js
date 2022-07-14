import Product from '/utility/models/Product';
import dbConnect from '/utility/dbConnect';
dbConnect();

export default async function handler(req, res) {
    const { method } = req;

    switch(method) {
        case 'GET':
            try {
                const { search } = req.query;
                if (search) {
                    let product = await Product.find({ $text: { $search: search }});
                    res.status(200).json({ data: product});
                } else {
                    let products = await Product.find({});
                    res.status(200).json({ data: products });
                }
            } catch (error) {
                res.status(400).json({ data: error });
            }
        break;
        case 'POST':
            try {
                let newProduct = new Product(req.body);
                let product = await newProduct.save();
                console.log(product)
                res.status(201).json({ data: product });
            } catch (error) {
                res.status(400).json({ data: error });
            }
        break;
    }

}
