const path = require("path");
const fs = require("fs");

const {User} = require("../../models/user");

const avatarDir = path.join(__dirname, "../../", "public", "avatars");

const avatar=async (req, res, next) => {
    try {
      const { _id } = req.user;
      const { path: tempDir, originalname } = req.file;

      const [ext] = originalname.split(".").reverse();
      const avatarName = `${_id}.${ext}`;
      const avatarPath = path.join(avatarDir, avatarName);

      await fs.rename(tempDir, avatarPath);
      const avatarURL = path.join("/avatars", avatarName);
      await User.findByIdAndUpdate(_id, { avatarURL });

      res.json({ avatarURL });
    } catch (error) {
      await fs.unlink(req.file.path);
      throw error;
    }
}
  
module.exports = avatar;
