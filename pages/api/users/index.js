import User from '/utility/models/User';
import dbConnect from '/utility/dbConnect';

dbConnect();

export default async function handler(req, res) {
    const { method } = req;

    switch(method) {
        case 'GET':
            try {
                const { username, fname, lname } = req.query;
                let user = await User.find({});
                res.status(200).json({ data: user });
            } catch (error) {
                res.status(400).json({ data: error });
            }
        break;
        case 'POST':
            try {
                let newUser = await User.create(req.body);
                res.status(200).json({ success: true, data: newUser });
            } catch (error) {
                res.status(400).json({ success: false, data: error });
            }
        break;
    }
}
