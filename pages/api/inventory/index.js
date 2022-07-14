import Inventory from '/utility/models/Inventory';
import dbConnect from '/utility/dbConnect';
dbConnect();

export default async function handler(req, res) {
    const { method } = req;

    switch(method) {
        case 'GET':
            try {
                const { binId, productId, binName, productUPC, search } = req.query;
                if (binId && productId) {
                    let inventories = await Inventory.find({ bin: binId, product: productId, });
                    res.status(200).json({ success: true, data: inventories });
                } else if (productId && !binId && productId != "undefined") {
                    let inventories = await Inventory.find({ product: productId });
                    res.status(200).json({ success: true, data: inventories });
                } else if (binId && !productId) {
                    let inventories = await Inventory.find({ bin: binId });
                    res.status(200).json({ success: true, data: inventories });
                } else if (binName && productUPC) {
                    let inventories = await Inventory.find({ binName: binName, productUPC: productUPC });
                    res.status(200).json({ success: true, data: inventories });
                } else if (binName && !productUPC) {
                    let inventories = await Inventory.find({ binName: { $regex: binName, $options: 'i' } });
                    res.status(200).json({ success: true, data: inventories });
                } else if (!binName && productUPC) {
                    let inventories = await Inventory.find({ productUPC: productUPC });
                    res.status(200).json({ success: true, data: inventories });
                } else if (search) {
                    let inventories = await Inventory.find({ $text : { $search : { $regex: search, $options: 'i' } } } );
                    res.status(200).json({ success: true, data: inventories });
                } else {
                    let inventories = await Inventory.find({});
                    res.status(200).json({ success: true, data: inventories });
                }
            } catch (error) {
                res.status(400).json({ success: false, data: error });
            }
        break;
        case 'POST':
            try {
                let existingInventoryCount = await Inventory.findOne({ product: req.body.product, bin: req.body.bin }).count();
                console.log(existingInventoryCount);
                if (existingInventoryCount == 0) {
                    console.log("CREATING NEW RECORD")
                    let newInventory = await Inventory.create(req.body);
                    res.status(200).json({ success: true, data: newInventory });
                } else {
                    let existingInventory = await Inventory.findOne({ product: req.body.product, bin: req.body.bin });
                    let qtyIndex = existingInventory.quantity.findIndex(x => x.unit === req.body.quantity.unit);
                    console.log(qtyIndex);
                    if (qtyIndex == -1) {
                        existingInventory.quantity.push(req.body.quantity);
                    } else {
                        existingInventory.quantity[qtyIndex].quantity += Number(req.body.quantity.quantity);
                    }
                    let newQty = existingInventory.quantity;
                    let newInventory = await Inventory.findByIdAndUpdate(existingInventory._id, { $set: { quantity: newQty }});
                    res.status(200).json({ success: true, data: newInventory });
                }

            } catch (error) {
                res.status(400).json({ success: false, data: error });
            }
        break;
    }

}
