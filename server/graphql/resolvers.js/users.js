const User = require("../../models/User");

module.exports = {
    Query: {
        getUsers: async () => {
            try {
                const users = await User.find();
                return users;
            } catch (err) {
                throw new Error(err);
            }
        },
    },
};
