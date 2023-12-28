const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const router = Router();
const {Admin, Course} = require("../db/index")
const jwt =  require("jsonwebtoken");
const { JWT_SECRETKEY } = require("../config");
// Admin Routes
router.post('/signup', async (req, res) => {
    // Implement admin signup logic
    const username  =  req.body.username;
    const password  =  req.body.password;

    await Admin.create({
        username : username ,
        password : password
    })
    res.json({
        msg:"Admin Created Successfully"
    })

});

router.post('/signin', async (req, res) => {
    // Implement admin signup logic
    const username  =  req.body.username;
    const password  =  req.body.password;

    const admin = await Admin.findOne({username:username , password: password});

    if(admin){
        const token  = jwt.sign({username:username},JWT_SECRETKEY);
        res.json({
            token:token
        })
    }else{
        res.json({
            msg:"Authentication error"
        })
    }

    

});

router.post('/courses', adminMiddleware, async (req, res) => {
    // Implement course creation logic
    const title = req.body.title;
    const description = req.body.description;
    const price = req.body.price;
    const imageLink = req.body.imageLink;

    const newCourse = await Course.create({
        title,
        description,
        price,
        imageLink
    })

    res.json({
        msg:"Course Added Successfully", 
        course: newCourse._id
    })

});

router.get('/courses', adminMiddleware, async (req, res) => {
    // Implement fetching all courses logic
    const courses = await Course.find({});
    res.json({
        courses:courses
    })
});

module.exports = router;