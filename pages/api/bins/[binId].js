import Bin from '/utility/models/Bin';
import dbConnect from '/utility/dbConnect';
dbConnect();

export default async function handler(req, res) {
    const { method } = req;
    const { binId } = req.query;
    switch(method) {
        case 'GET':
            try {
                let bin = await Bin.findById(binId);
                res.status(200).json({ success: true, data: bin });
            } catch (error) {
                res.status(400).json({ success: false, data: error });
            }
        break;
        case 'PATCH':
            try {
                let updatedBin = await Bin.findByIdAndUpdate(binId, { $set: req.body });
                res.status(200).json({ success: true, data: updatedBin });
            } catch (error) {
                res.status(400).json({ success: false, data: error });
            }
        break;
        case 'DELETE':
            try {
                await Bin.findByIdAndDelete(binId);
                res.status(200).json({ success: true, data: "Bin DELETED" });
            } catch (error) {
                res.status(400).json({ success: false, data: error });
            }
        break;
        case 'PUT':
            console.log("PUT");
            try {
                let bin = await Bin.findByIdAndUpdate(binId, { $push: { items: req.body }});
                console.log(bin);
                res.status(200).json({ success: true, data: bin });
            } catch (error) {
                res.status(400).json({ success: false, data: error });
            }
        break;
    }

}
