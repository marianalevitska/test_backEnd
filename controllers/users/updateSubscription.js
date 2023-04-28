const { User } = require('../../models/user');

const updateSubscription = async (req, res, next) => {
    const user = await User.findByIdAndUpdate(req.user._id, req.body, {
        new:true,
    });
    res.status(200).json({ message:'Subscription updated'});
};

module.exports = updateSubscription;