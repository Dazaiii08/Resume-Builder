const fs = require("node:fs");
const path = require("node:path");
const Resume = require("../models/Resume");


//@desc Create a new resume
//@route POST/api/resumes
//@access Private

const createResume = async(req,res)=>{
    
    try{

        const {title} = req.body;

        //Default template
        const defaultResumeData = {
            profileInfo:{
                profileImg:null,
                previewUrl:"",
                fullName:"",
                designation:"",
                summary:""
            },
            contactInfo:{
                email:"",
                phone:"",
                location:"",
                linkedin:"",
                github:"",
                website:""
            },
            workExperience:[{
                company:"",
                role:"",
                startDate:"",
                endDate:"",
                description:""
            }],
            education:[{
                degree:"",
                institution:"",
                startDate:"",
                endDate:""
            }],
            skills:[{
                name:"",
                progress:0
            }],
            projects:[{
                title:"",
                description:"",
                github:"",
                liveDemo:"",
            }],
            certifications:[{
                title:"",
                issuer:"",
                year:""
            }],
            languages:[{
                name:"",
                progress:0
            }],
            interests:[]
        };

        const newResume=await Resume.create({
            userId: req.user._id,
            title,
            ...defaultResumeData
        });

        res.status(201).json(newResume)

    } catch(error){
        res
            .status(500)
            .json({message:"Failed to create resume", error:error.message});
    }
};

//@desc Get all resumes for logged in user
//@route GET/api/resumes
//@access Private
const getUserResumes = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "User not authenticated" });
    }

    const resumes = await Resume
      .find({ userId: req.user._id })
      .sort({ updatedAt: -1 }); // 👈 Mongo sort (better)

    res.status(200).json(resumes);
  } catch (error) {
    res.status(500).json({
      message: "Failed to get resumes",
      error: error.message
    });
  }
};


//@desc Get a single resume by id
//@route GET/api/resumes/:id
//@access Private
const getResumeById = async(req,res)=>{

     try {
    
        const resume = await Resume.findOne({_id: req.params.id, userId:req.user._id});
        if(!resume){
            return res.status(404).json({message:"Resume not found"})
        }
        res.json(resume)

  } catch (error) {
    res.status(500).json({
      message: "Failed to get resumes",
      error: error.message
    });
  }

};

//@desc Update a resume
//@route PUT/api/resumes/:id
//@access Private
const updateResume = async(req,res)=>{

        try {
    
        const resume = await Resume.findOne({
            _id:req.params.id,
            userId:req.user._id
        });
        if(!resume){
            return res.status(404).json({messsage:"Resume not found or unauthorized"});
        }

        //Merge uupdates from req.body to existingg resume
        Object.assign(resume,req.body);

        //Save updates resume
        const savedResume = await resume.save();

        res.json(savedResume);


  } catch (error) {
    res.status(500).json({
      message: "Failed to get resumes",
      error: error.message
    });
  }

};

//@desc Delete a resume
//@route DELETE/api/resumes/:id
//@access Private
const deleteResume = async(req,res)=>{

    try{

          const resume = await Resume.findOne({
            _id:req.params.id,
            userId:req.user._id
        });
        if(!resume){
            return res.status(404).json({messsage:"Resume not found or unauthorized"});
        }
        //Delete thumbnail link and previewurl images from uploads folder
        const uploadsFolder = path.join(__dirname,"..",'uploads');
        const baseUrl = `${req.protocol}://${req.get("host")}`;

        if(resume.thumbnailLink){
            const oldThumbnail = path.join(uploadsFolder, path.basename(resume.thumbnailLink));
            if(fs.existsSync(oldThumbnail)) fs.unlinkSync(oldThumbnail) 
        }
        if(resume.profileInfo?.profilePreviewUrl){
             const oldProfile = path.join(uploadsFolder, path.basename(resume.profileInfo.profilePreviewUrl));
            if(fs.existsSync(oldProfile)) fs.unlinkSync(oldProfile) 
        }
    const deleted = await Resume.findOneAndDelete({
        _id:req.params.id,
        userId:req.user._id
    });
    if(!deleted){ return res.status(404).json({message:"Resume Not Found or Unauthorized"});}
    res.json({message:"Resume Deleted Successfully"});

    } catch (error) {
    res.status(500).json({
      message: "Failed to get resumes",
      error: error.message
    });
  }

};

module.exports = {
    createResume,
    getUserResumes,
    getResumeById,
    updateResume,
    deleteResume
};