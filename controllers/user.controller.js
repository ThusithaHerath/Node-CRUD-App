const db = require("../config/mongo.init");
const User = require("../models/user");

exports.add = async (req, res) => {
    let { lastName, firstName, dateOfBirth, address1, address2, city, postalCode, country, phoneNumber, email, userNotes } = req.body;

    if (!lastName || !firstName || !dateOfBirth || !address1 || !city || !postalCode || !country || !phoneNumber || !email || !userNotes) {
        return res.status(400).json({ error: 'Missing required fields' });
    }
    const newUserData = new User({
        lastName,
        firstName,
        dateOfBirth,
        address1,
        address2,
        city,
        postalCode,
        country,
        phoneNumber,
        email,
        userNotes
    });
    newUserData.save().then(result => {
        res.status(200).json({
            status: "SUCCESS",
            message: "New data added successfully",
            data: result,
        })
    }).catch(err => {
        res.status(500).json({
            status: "FAILED",
            message: "An error occured while saving data !"
        })
    })
}

exports.getData = async (req, res) => {
    try {
        const _id = req.params.id;
        const user = await User.findById(_id);

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        return res.status(200).json(user);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.delete = async (req, res) => {
    try{
        const deleteData = await User.findOneAndDelete(
            {_id: req.params.id},
            {new: true}
        )
        if (deleteData) {
            return res.status(201).send({ status: true, message: 'Data deleted.' });
        } else {
            return res.status(200).send({ status: false, message: 'Data delete failed.' });
        }
    }catch(error){
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}

exports.update = async (req, res) => {
    let { lastName, firstName, dateOfBirth, address1, address2, city, postalCode, country, phoneNumber, email, userNotes } = req.body;

    try {
        const updatedData = await User.findOneAndUpdate(
            { _id: req.params.id },
            { $set: { 
                lastName: lastName,
                firstName: firstName,
                dateOfBirth: dateOfBirth,
                address1: address1,
                address2: address2,
                city: city,
                postalCode: postalCode,
                country: country,
                phoneNumber: phoneNumber,
                email: email,
                userNotes: userNotes      
            } },
            { new: true }
        );
        console.log(updatedData,'updated data')

        if (updatedData) {
            return res.status(201).send({ status: true, message: 'Data updated.' });
        } else {
            return res.status(200).send({ status: false, message: 'Data update failed.' });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.getAllData = async (req, res) => {
    try {
        const users = await User.find();

        if (!users || users.length === 0) {
            return res.status(404).json({ error: 'Data not found' });
        }

        return res.status(200).json(users);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};