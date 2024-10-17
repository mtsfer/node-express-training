const User = require('../models/user');
const { hashPassword } = require("../utils/helpers");
const HttpError = require("../utils/http-error")

const getUserById = async (id) => {
    const user = await User.findById(id);
    if (!user) {
        throw new HttpError(404, 'User not found');
    }
    return user;
};

const createUser = async (body) => {
    if (await User.exists({ username: body.username })) {
        throw new HttpError(409, 'Username already taken');
    }
    body.password = await hashPassword(body.password);
    const user = new User(body);
    return await user.save();
};

const updateUser = async (id, body) => {
    const user = await User.findById(id);
    if (!user) {
        throw new HttpError(404, 'User not found');
    }
    user.displayName = body.displayName;
    user.username = body.username;
    user.password = await hashPassword(body.password);
    return await user.save();
};

const deleteUser = async (id) => {
    await User.deleteOne({ _id: id });
}

module.exports = { getUserById, createUser, updateUser, deleteUser };
