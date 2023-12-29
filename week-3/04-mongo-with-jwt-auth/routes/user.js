const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const {JWT_SECRETKEY} = require("../config.js")
const {User,Course} = require("../db/index.js")
const jwt =  require("jsonwebtoken");
// User Routes
router.post('/signup', async (req, res) => {
    // Implement user signup logic
    const username  =  req.body.username;
    const password  =  req.body.password;
    await User.create({
        username,
        password
    })

    res.json({
        msg: "User Saved Successfully"
    })
    
});

router.post('/signin', async (req, res) => {
    // Implement admin signup logic
    const username  = req.body.username;  
    const password  = req.body.password;  

    const user = await User.findOne({username : username});

    if(user){
        const token  = jwt.sign({username: username },JWT_SECRETKEY);
        res.json({
            token: token
        })
    }else{
        res.json({
            msg: "Authentication Failed"
        })
    }
});

router.get('/courses', async (req, res) => {
    // Implement listing all courses logic
    const courses = await Course.find({});
    res.json({
        course:courses
    })

});

router.post('/courses/:courseId', userMiddleware, async (req, res) => {
    // Implement course purchase logic
    const courseId = req.params.courseId;
    // we modified the username field of the req parameter;
    const username = req.username;
    await User.updateOne({
        username : username 
    },{
        "$push":{
            purchasedCourse : courseId
        }
    })

    res.json({
        msg: "Purchase Complete"
    })
});

router.get('/purchasedCourses', userMiddleware, async (req, res) => {
    // Implement fetching purchased courses logic
    const username = req.username;

    const user   = User.findOne({
        username : username 
    })

    const coursePurchased = Course.find({
        _id:{
            "$in": user.purchasedCourse
        }
    })

    res.json({
        course: coursePurchased
    })
});



module.exports = router