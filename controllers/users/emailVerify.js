const {User}=require('../../models/user')

const emailVerify = async (req, res, next) => {
  try {
    const { verificationToken } = req.params;
    const user = await User.findOne({ verificationToken });
    if (!user) {
      throw createError("User not found", 404);
    }
    await User.findByIdAndUpdate(user._id, {
      verificationToken: "",
      verify: true,
    });

    res.status(200).json({ message: "User verified" });
  } catch (error) {
    next(error);
  }
}

module.exports = emailVerify;