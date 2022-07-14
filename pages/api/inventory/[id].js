import Inventory from '/utility/models/Inventory';
import dbConnect from '/utility/dbConnect';
dbConnect();

export default async function handler(req, res) {
    const { method } = req;
    const { id } = req.query;
    console.log(id);
    switch(method) {
        case 'GET':
            try {
                let inventories = await Inventory.findById(id);
                res.status(200).json({ success: true, data: inventories });
            } catch (error) {
                res.status(400).json({ success: false, data: error });
            }
        break;
    }

}
