import User from '/utility/models/Department';
import dbConnect from '/utility/dbConnect';

dbConnect();

export default async function handler(req, res) {
    const { method } = req;

    switch(method) {
        case 'GET':
            try {
                let department = await Department.find({});
                res.status(200).json({ data: department });
            } catch (error) {
                res.status(400).json({ data: error });
            }
        break;
        case 'POST':
            try {
                let newDepartment = await Department.create(req.body);
                res.status(200).json({ success: true, data: newDepartment });
            } catch (error) {
                res.status(400).json({ success: false, data: error });
            }
        break;
    }
}
