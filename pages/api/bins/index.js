import Bin from '/utility/models/Bin';
import dbConnect from '/utility/dbConnect';
dbConnect();

export default async function handler(req, res) {
    const { method } = req;

    switch(method) {
        case 'GET':
            try {
                const { binName } = req.query;
                if (binName) {
                    let bin = await Bin.findOne({ name: { $regex: binName, $options: 'i' } });
                    res.status(200).json({ success: true, data: bin });
                } else {
                    let bins = await Bin.find({}).sort({ name: 1 });
                    res.status(200).json({ success: true, data: bins });
                }

            } catch (error) {
                res.status(400).json({ success: false, data: error });
            }
        break;
        case 'POST':
            try {
                let newBin = await Bin.create(req.body);
                res.status(200).json({ success: true, data: newBin });
            } catch (error) {
                res.status(400).json({ success: false, data: error });
            }
        break;
    }

}
