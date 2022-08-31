import dbConnect from '/utility/dbConnect';
import User from '/utility/models/User';
import bcrypt from 'bcrypt';

dbConnect();

export default async function handler(req, res) {
    const { method } = req;

    switch(method) {
        case 'POST':
            try {

                const user = await User.findOne({ username: req.body.username });

                bcrypt.compare(req.body.password, user.password, function (err, result) {
                    if (result) {
                        res.status(200).json(user);
                    } else {
                        res.status(400).json( {data: "INCORRECT usernAME OR PASSWORD"} );
                    }
                });

            } catch (error) {
                res.status(400).json({ data: error });
            }
            break;

    }
}
