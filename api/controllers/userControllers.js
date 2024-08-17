// const User = require("../models/User");

// //get all users
// const getAllUsers = async(req, res) => {
//     try {
//         const users = await User.find({});
//         res.status(200).json(users);
//     } catch (error) {
//         res.status(500).json({message: error.message});
//     }
// }

// //post a new user
// const createUsers = async(req, res) => {
//     const user = req.body;
//     const query = {email: user.email};
//     try {
//         const existingUser = await User.findOne(query);
//         if(existingUser) {
//             return res.status(300).json({message: "User already exists!"});
//         }
//         const result = await User.create(user);
//         res.status(200).json(result);

//     } catch (error) {
//         res.status(500).json({message: error.message});
//     }
// }

// //delete a user
// const deleteUser = async(req, res) => {
//     const userId = req.params.id;
//     try {
//         const deletedUser = await User.findByIdAndDelete(userId);

//         if(!deletedUser) {
//             return res.status(404).json({message: "User not found!"});
//         }
//         res.status(200).json({message: "User deleted successfully!"})
//     } catch (error) {
//         res.status(500).json({message: error.message});
//     }
// }

// //get admin
// const getAdmin = async(req, res) => {
//     const email = req.params.email;
//     const query = {email: email};
//     try {
//         const user = await User.findOne(query);
//         if(email !== req.decoded.email) {
//             res.status(403).send({message: "Forbidden Access!"})
//         }
//         let admin = false;
//         if(user) {
//             admin = user?.role === "admin";
//         }
//         res.status(200).json({admin});
//     } catch (error) {
//         res.status(500).json({message: error.message});
//     }
// }

// //make admin
// const makeAdmin = async (req, res) => {
//     const userId = req.params.id;
//     const {name, email, photoURL, role} = req.body;
//     try {
//         const updatedUser = await User.findByIdAndUpdate(
//             userId, {role: "admin"}, {new: true, runValidators: true}
//         )
//         if(!updatedUser) {
//             return res.status(404).json({message: "User not found!"})
//         }
//         res.status(200).json(updatedUser);
//     } catch (error) {
//         res.status(500).json({message: error.message});
//     }
// }

// module.exports = {
//     getAllUsers,
//     createUsers,
//     deleteUser,
//     getAdmin,
//     makeAdmin
// }

const User = require("../models/User");

// Get all users
const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({});
        return res.status(200).json(users); // Use return to prevent further code execution
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// Post a new user
const createUsers = async (req, res) => {
    const user = req.body;
    const query = { email: user.email };
    try {
        const existingUser = await User.findOne(query);
        if (existingUser) {
            return res.status(300).json({ message: "User already exists!" });
        }
        const result = await User.create(user);
        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// Delete a user
const deleteUser = async (req, res) => {
    const userId = req.params.id;
    try {
        const deletedUser = await User.findByIdAndDelete(userId);

        if (!deletedUser) {
            return res.status(404).json({ message: "User not found!" });
        }
        return res.status(200).json({ message: "User deleted successfully!" });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// Get admin
const getAdmin = async (req, res) => {
    const email = req.params.email;
    const query = { email: email };

    try {
        const user = await User.findOne(query);

        // First, check if the request is authorized
        if (email !== req.decoded.email) {
            return res.status(403).send({ message: "Forbidden Access!" });
        }

        let admin = false;
        if (user) {
            admin = user?.role === "admin";
        }
        return res.status(200).json({ admin });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// Make admin
const makeAdmin = async (req, res) => {
    const userId = req.params.id;

    try {
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { role: "admin" },
            { new: true, runValidators: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ message: "User not found!" });
        }
        return res.status(200).json(updatedUser);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getAllUsers,
    createUsers,
    deleteUser,
    getAdmin,
    makeAdmin,
};
