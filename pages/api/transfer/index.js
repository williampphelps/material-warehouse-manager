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
                    let inventories = await Inventory.find({ bin: binId, product: productId });
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
                    let inventories = await Inventory.find({ binName: binName });
                    res.status(200).json({ success: true, data: inventories });
                } else if (!binName && productUPC) {
                    let inventories = await Inventory.find({ productUPC: productUPC });
                    res.status(200).json({ success: true, data: inventories });
                } else if (search) {
                    let inventories = await Inventory.find({ $text : { $search : search } } );
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
                if (req.body.toInventory) {
                    let toInventory = await Inventory.findById(req.body.toInventory);
                    let qtyIndex = toInventory.quantity.findIndex(x => x.unit === req.body.quantity.unit);
                    console.log(qtyIndex);
                    if (qtyIndex == -1) {
                        toInventory.quantity.push(req.body.quantity);
                    } else {
                        toInventory.quantity[qtyIndex].quantity += Number(req.body.quantity.quantity);
                    }
                    let newQty = toInventory.quantity;
                    let newToInventory = await Inventory.findByIdAndUpdate(toInventory._id, { $set: { quantity: newQty }});

                    let fromInventory = await Inventory.findById(req.body.fromInventory);
                    qtyIndex = fromInventory.quantity.findIndex(x => x.unit === req.body.quantity.unit);
                    if (qtyIndex == -1) {
                        fromInventory.quantity.push(req.body.quantity);
                    } else {
                        fromInventory.quantity[qtyIndex].quantity -= Number(req.body.quantity.quantity);
                        if (fromInventory.quantity[qtyIndex].quantity <= 0) {
                            fromInventory.quantity.splice(qtyIndex, 1);
                        }
                    }
                    newQty = fromInventory.quantity;
                    let newFromInventory = await Inventory.findByIdAndUpdate(fromInventory._id, { $set: { quantity: newQty }});
                    if (fromInventory.quantity.length == 0) {
                        newFromInventory = await Inventory.findByIdAndDelete(fromInventory._id);
                    }
                    let maxQty = 0;
                    newFromInventory.quantity.map((value, index) => {
                        if (value.quantity > maxQty) {
                            maxQty = Number(value.quantity);
                        }
                    });

                    if (maxQty == "0") {
                        test = await Inventory.findByIdAndDelete(fromInventory._id);
                    }
                    res.status(200).json({ success: true, data: {newToInventory, newFromInventory} });
                } else {
                    let toInventory = await Inventory.create(req.body.newInventory);
                    let fromInventory = await Inventory.findById(req.body.fromInventory);
                    let qtyIndex = fromInventory.quantity.findIndex(x => x.unit === req.body.quantity.unit);
                    if (qtyIndex == -1) {
                        fromInventory.quantity.push(req.body.quantity);
                    } else {
                        fromInventory.quantity[qtyIndex].quantity -= Number(req.body.quantity.quantity);
                    }
                    let newQty = fromInventory.quantity;
                    let newFromInventory = await Inventory.findByIdAndUpdate(fromInventory._id, { $set: { quantity: newQty }});
                    let maxQty = 0;
                    fromInventory.quantity.map((value, index) => {
                        if (value.quantity > maxQty) {
                            maxQty = Number(value.quantity);
                        }
                    });

                    if (maxQty == "0") {
                        test = await Inventory.findByIdAndDelete(fromInventory._id);
                    }
                    res.status(200).json({ success: true, data: {newToInventory, newFromInventory} });
                }



            } catch (error) {
                res.status(400).json({ success: false, data: error });
            }
        break;
    }

}
