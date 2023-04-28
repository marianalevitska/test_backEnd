const current = async (req, res, next) => {
    const { email,subscription } = req.user;
    res.status(200).json({ email,subscription });
    
};

module.exports = current;