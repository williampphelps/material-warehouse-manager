import User from '/utility/models/Building';
import dbConnect from '/utility/dbConnect';

dbConnect();

export default async function handler(req, res) {
    const { method } = req;

    switch(method) {
        case 'GET':
            try {
                let building = await Building.find({});
                res.status(200).json({ data: building });
            } catch (error) {
                res.status(400).json({ data: error });
            }
        break;
        case 'POST':
            try {
                let newBuilding = await Building.create(req.body);
                res.status(200).json({ success: true, data: newBuilding });
            } catch (error) {
                res.status(400).json({ success: false, data: error });
            }
        break;
    }
}
