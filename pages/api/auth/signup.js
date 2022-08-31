import dbConnect from '/utility/dbConnect';
import User from '/utility/models/User';
import bcrypt from 'bcrypt';

dbConnect();

export default async function handler(req, res) {
    const { method } = req;
    switch (method) {
        case 'POST':
            try {
                let password = req.body.password;

                bcrypt.genSalt(10, function(err, salt) {
                  bcrypt.hash(password, salt, function(err, hash) {
                  // returns hash
                  const userOBJ = {
                      fname: req.body.fname,
                      lname: req.body.lname,
                      username: req.body.username,
                      password: hash,
                      type: req.body.type,
                  }
                        const user = User.create(userOBJ);
                        res.status(201).json({ data: userOBJ });
                    });
                });

            } catch (error) {
                res.status(400).json({ success: false, data: error });
            }
            break;
    }
}
