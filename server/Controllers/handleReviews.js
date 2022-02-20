const {Review} = require("../models/Reviews")

const handleReview =  (req, res) => {
    Review.create({
      review: req.body.review,
    });
    return res.status(200).json({ msg: "Successfull..." });
}

module.exports = handleReview