import User from '/utility/models/User';
import dbConnect from '/utility/dbConnect';

dbConnect();

export default async function handler(req, res) {
    const { method } = req;
    const { id } = req.query;

    switch(method) {
        case 'GET':
            try {
                let user = await User.findById(id);
                res.status(200).json({ data: user });
            } catch (error) {
                res.status(400).json({ data: error });
            }
        break;
    }
}
