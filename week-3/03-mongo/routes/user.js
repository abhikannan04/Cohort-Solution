const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const { User , Course} = require("../db");

// User Routes
router.post('/signup', (req, res) => {
    // Implement user signup logic
    const  username =  req.body.username;
    const password = req.body.password;

    User.create({
        username:username,
        password:password
    })

    res.json({
        message:"Succesfully created User"
    })

});

router.get('/courses', async (req, res) => {
    // Implement listing all courses logic
    const response   = await Course.find({});
  res.json({
    courses:response
  })
});

router.post('/courses/:courseId', userMiddleware, async (req, res) => {
    // Implement course purchase logic
    const courseId = req.params.courseId;
    const username = req.headers.username;
    await User.updateOne({
        username:username
    },{
        "$push": {
            purchasedCourse : courseId
        }
    })

    res.json({msg:"Purchase complete"});
});

router.get('/purchasedCourses', userMiddleware, async (req, res) => {
    // Implement fetching purchased courses logic
    const username  =  req.headers.username;
    const user  = await User.findOne(
        {username : username},
    )

    const Coursepurchased = await Course.find({
        _id:{
            "$in": user.purchasedCourse
        }
    })
    res.json({courses : Coursepurchased});
});


module.exports = router