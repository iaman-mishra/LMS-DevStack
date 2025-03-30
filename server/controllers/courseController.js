import Course from "../models/Course.js";

// Get all courses
export const getAllCourses = async (req, res)=>{
    try {
        const courses = await Course.find({isPublished:true}).select(['-courseContent' , '-enrolledStudents']).populate({path:'educator'})
        res.json({sucess:true, courses});

    } catch (error) {
        res.json({sucess:false, message:error.message});
    }
}