import React, { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import DashboardLayout from "../../components/layouts/DashboardLayout"
import {
  LuArrowLeft,
  LuCircleAlert,
  LuDownload,
  LuPalette,
  LuSave,
  LuTrash,
  LuTrash2
} from "react-icons/lu";

import toast from "react-hot-toast"
import TitleInput from "../../components/Inputs/TitleInput";
import {useReactToPrint} from "react-to-print"
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import StepProgress from "../../components/StepProgress";
import ProfileInfoCard from "../../components/Cards/ProfileInfoCard";
import ProfileInfoForm from "./Forms/ProfileInfoForm";
import ContactInfoForm from "./Forms/ContactInfoForm";
import WorkExperienceForm from "./Forms/WorkExperienceForm";
import EducationDetailsForm from "./Forms/EducationDetailsForm";
import SkillsInfoForm from "./Forms/SkillsInfoForm";
import ProjectsDetailForm from "./Forms/ProjectsDetailForm";
import CertificationInfoForm from "./Forms/CertificationInfoForm";
import AdditionalInfoForm from "./Forms/AdditionalInfoForm";
import RenderResume from "../../components/ResumeTemplates/RenderResume";
import { captureElementAsImage, dataURLtoFile, fixTailwindColors } from "../../utils/helper";
import Modal from "../../components/Modal";
import ThemeSelector from "./ThemeSelector";


const EditResume = () => {
  

  const { resumeId } = useParams();
  const navigate = useNavigate();

  const resumeRef = useRef(null);
  const resumeDownloadRef = useRef(null);

  const [baseWidth, setBaseWidth] = useState(800);
  const [openThemeSelector, setOpenThemeSelector] = useState(false);
  const [openPreviewModal, setOpenPreviewModal] = useState(false);

  const [currentPage, setCurrentPage] = useState("profile-info");
  const [progress, setProgress] = useState(0);

  const [resumeData, setResumeData] = useState({
    title: "",
    thumbnailLink: "",
    profileInfo: {
      profileImg: null,
      profilePreviewUrl: "",
      fullName: "",
      designation: "",
      summary: "",
    },
    template: {
      theme: "",
      colorPalette: "",
    },
    contactInfo: {
      email: "",
      phone: "",
      location: "",
      linkedin: "",
      github: "",
      website: "",
    },
    workExperience: [
      {
        company: "",
        role: "",
        startDate: "",
        endDate: "",
        description: "",
      },
    ],
    education: [
      {
        degree: "",
        institution: "",
        startDate: "",
        endDate: "",
      },
    ],
    skills: [
      {
        name: "",
        progress: 0,
      },
    ],
    projects: [
      {
        title: "",
        description: "",
        github: "",
        Livedemo: "",
      },
    ],
    certification: [
      {
        title: "",
        issues: "",
        year: "",
      },
    ],
    languages: [
      {
        name: "",
        progress: 0,
      },
    ],
    interests: [""],
  });

  const [errorMsg, setErrorMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);

   //validate inputs
      const validateAndNext=(e)=>{
        console.log("validateAndNext called");
        const errors=[];

        switch(currentPage){
          case "profile-info":
            const{fullName,designation,summary}=resumeData.profileInfo;
            if(!fullName.trim())errors.push("Full Name is required");
            if(!designation.trim())errors.push("Designation is required");
            if(!summary.trim())errors.push("Summary is required");
            break;

            case "contact-info":
              const{email,phone}=resumeData.contactInfo;
              if(!email.trim() || !/^\S+@\S+\.\S+$/.test(email))errors.push("Enter a valid email");
              if(!phone.trim())errors.push("Enter a valid Phone Number");
              break;

              case "work-experience":
                resumeData.workExperience.forEach(
                  ({company,role,startDate,endDate},index)=>{
                    if(!company.trim())errors.push(`Company is required in experience ${index+1}`);
                    if(!role.trim())errors.push(`Role is required in experience ${index+1}`);
                    if(!startDate || !endDate)errors.push(`Start and End Date is required in experience ${index+1}`)
                  }
                );
                break;

              case "education-info":
                resumeData.education.forEach(
                  ({degree,institution,startDate,endDate},index)=>{
                    if(!degree.trim())errors.push(`Degree is required in education ${index+1}`);
                    if(!institution.trim())errors.push(`Institution is required in education ${index+1}`);
                    if(!startDate || !endDate)errors.push(`Start and End Dated is required in education ${index+1}`);
                  }
                );
                break;

              case "skills":
                resumeData.skills.forEach(
                  ({name,progress},index)=>{
                    if(!name.trim())errors.push(`Skills name is requried in skill ${index+1}`);
                    if(progress<0 || progress>100)errors.push(`Skill progress should be between 1 to 100 in skills ${index+1}`);
                  }
                )
                break;

              case "projects":
                resumeData.projects.forEach(
                  ({title,description},index)=>{
                    if(!title.trim())errors.push(`Project title is required in project ${index+1}`);
                    if(!description.trim())errors.push(`Project Description is required in project ${index+1}`);
                  }
                );
                break;
              
              case "certifications":
                resumeData.certifications.forEach(
                  ({title,issuer},index)=>{
                    if(!title.trim())errors.push(`Title of certificate is required in certification ${index+1}`);
                    if(!issuer.trim())errors.push(`Issuer of the certificate is required in certificate ${index+1}`);

                  }
                );
                break;
              
              case "additionalInfo":
               if(resumeData.languages.length===0 || !resumeData.languages[0].name?.trim()){
                errors.push(`Atleast one language is required`)
               }
               if(resumeData.interests.length===0 || !resumeData.interests[0]?.trim()){
                errors.push(`At least one interest is required`)
               }
               break;

               
        }
        if(errors.length>0){
                setErrorMsg(errors.join(", "));
                return;
               }   
        //Move to next step
               setErrorMsg("");
               goToNextStep();
      }
  
  //Function to navigate to the next page
   const goToNextStep = () => {
    console.log("Next clicked, currentPage =", currentPage);

  const pages = [
    "profile-info",
          "contact-info",
          "work-experience",
          "education-info",
          "skills",
          "projects",
          "certifications",
          "additionalInfo"
  ];

  if (currentPage === "additionalInfo") {
    setOpenPreviewModal(true);
    return;
  }

  const currentIndex = pages.indexOf(currentPage);

  if (currentIndex !== -1 && currentIndex < pages.length - 1) {
    const nextIndex = currentIndex + 1;

    setCurrentPage(pages[nextIndex]);

    // Set progress in percentage
    const percent = Math.round(
      (nextIndex / (pages.length - 1)) * 100
    );
    setProgress(percent);

    window.scrollTo({ top: 0, behavior: "smooth" });
  }
};

  
      //Function to navigate to previous page
      const goBack=()=>{
          const pages= [
          "profile-info",
          "contact-info",
          "work-experience",
          "education-info",
          "skills",
          "projects",
          "certifications",
          "additionalInfo"
      ];
      if(currentPage==="profile-info") navigate("/dashboard");

      const currentIndex = pages.indexOf(currentPage);
      if(currentIndex>0){
        const prevIndex = currentIndex -1;
        setCurrentPage(pages[prevIndex]);

         //Set Progress in percentage
        const percent=Math.round((prevIndex/(pages.length-1))*100);
        setProgress(percent);
        window.scrollTo({top:0,behavior:"smooth"})
      }
      }
        
 const renderForm = () => {
          switch (currentPage) {
         case "profile-info":
  return (
   <ProfileInfoForm
  profileData={resumeData?.profileInfo}
  updateSection={(key, value) => {
    updateSection("profileInfo", key, value);
  }}
  onNext={validateAndNext}
/>

  );


      case "contact-info": return(
        <ContactInfoForm
        contactInfo={resumeData?.contactInfo}
        updateSection={(key,value)=>{
          updateSection("contactInfo",key,value);
        }}
        />
      );

     case "work-experience":
  return (
    <WorkExperienceForm
      workExperience={resumeData?.workExperience}
      updateArrayItem={(index, key, value) =>
        updateArrayItem("workExperience", index, key, value)
      }
      addArrayItem={(newItem) =>
        addArrayItem("workExperience", newItem)
      }
      removeArrayItem={(index) =>
        removeArrayItem("workExperience", index)
      }
    />
  );

  case "education-info":
  return (
    <EducationDetailsForm
    educationInfo={resumeData?.education}
    updateArrayItem={(index,key,value)=>
      updateArrayItem("education",index,key,value)
    }
    addArrayItem={(newItem)=>addArrayItem("education",newItem)}
  removeArrayItem={(index)=>removeArrayItem("education",index)}
    />
  )

  case "skills":
  return (
    <SkillsInfoForm
    skillsInfo={resumeData?.skills}
    updateArrayItem={(index,key,value)=>
      updateArrayItem("skills",index,key,value)
    }
    addArrayItem={(newItem)=>addArrayItem("skills",newItem)}
  removeArrayItem={(index)=>removeArrayItem("skills",index)}
    />
  );

  case "projects":
  return (
    <ProjectsDetailForm
    projectInfo={resumeData?.projects}
    updateArrayItem={(index,key,value)=>{
      updateArrayItem("projects",index,key,value);
    }}
    addArrayItem={(newItem)=>addArrayItem("projects",newItem)}
    removeArrayItem={(index)=>removeArrayItem("projects",index)}
    />
  )

  case "certifications":
    return (
      <CertificationInfoForm
      certifications={resumeData?.certifications}
      updateArrayItem={(index,key,value)=>{
        updateArrayItem("certifications",index,key,value)
      }}
      addArrayItem={(newItem)=>addArrayItem("certifications",newItem)}
      removeArrayItem={(index)=>removeArrayItem("certifications",index)}
      />
    );

    case "additionalInfo":
      return(
        <AdditionalInfoForm
        languages={resumeData.languages}
        interests={resumeData.interests}
        updateArrayItem={(section,index,key,value)=>updateArrayItem(section,index,key,value)}
        addArrayItem={(section,newItem)=>addArrayItem(section,newItem)}
        removeArrayItem={(section,index)=>removeArrayItem(section,index)}
        />
      );

    default:
      return null;
  } 
};

  
      //Update simple nested object(like profileInfo,contactInfo, etc)
      const updateSection = (section, key, value) => {
        
  setResumeData((prev) => ({
    ...prev,
    [section]: {
      ...prev[section],
      [key]: value,
    },
  }));
};

      //Update array like item (like workExperience[0],skills[1], etc)
const updateArrayItem = (section, index, field, value) => {
  setResumeData(prev => {
    const updated = [...prev[section]];

    if (section === "interests") {
      // ✅ interests = array of strings
      updated[index] = value;
    } else {
      // ✅ everything else = objects
      updated[index] = {
        ...updated[index],
        [field]: value,
      };
    }

    return {
      ...prev,
      [section]: updated,
    };
  });
};


// Add new item to array
const addArrayItem = (section, newItem) => {
  setResumeData((prev) => ({
    ...prev,
    [section]: [...prev[section], newItem],
  }));
};

// Remove item from array
const removeArrayItem = (section, index) => {
  setResumeData((prev) => ({
    ...prev,
    [section]: prev[section].filter((_, i) => i !== index),
  }));
};
  
      //Fetch resume info by id
      const fetchResumeDetailsById= async ()=>{
 try{
         const response = await axiosInstance.get(
          API_PATHS.RESUME.GET_BY_ID(resumeId)
         );
         if (response.data && response.data.profileInfo) {
  const resumeInfo = response.data;

  setResumeData((prevState) => ({
    ...prevState,
    title: resumeInfo?.title || "Untitled",
    template: resumeInfo?.template || prevState?.template,
    profileInfo: resumeInfo?.profileInfo || prevState?.profileInfo,
    contactInfo: resumeInfo?.contactInfo || prevState?.contactInfo,
    workExperience:
      resumeInfo?.workExperience || prevState?.workExperience,
    education: resumeInfo?.education || prevState?.education,
    skills: resumeInfo?.skills || prevState?.skills,
    projects: resumeInfo?.projects || prevState?.projects,
    certifications:
      resumeInfo?.certifications || prevState?.certifications,
    languages: resumeInfo?.languages || prevState?.languages,
    interests: resumeInfo?.interests || prevState?.interests,
  }));
}
  }catch(error){
    console.error("Error fetching resumes:",error)
  }  
      };
  
      //upload thumbnail and resume profile image
      const uploadResumeImages=async()=>{
        try{
          setIsLoading(true);

          fixTailwindColors(resumeRef.current);
          const imageDataUrl = await captureElementAsImage(resumeRef.current);

          //Convert base64 to file
          const thumbnailFile = dataURLtoFile(
            imageDataUrl,
            `resume-${resumeId}.png`
          );

          const profileImageFile = resumeData?.profileInfo?.profileImg || null;
          const formData = new FormData();
          if(profileImageFile) formData.append("profileImage",profileImageFile);
          if(thumbnailFile) formData.append("thumbnail", thumbnailFile);

          const uploadResponse = await axiosInstance.put(
            API_PATHS.RESUME.UPLOAD_IMAGES(resumeId),
            formData,{headers:{"Content-Type":"multipart/form-data"}}
          );

          const{thumbnailLink,profilePreviewUrl}=uploadResponse.data;
          console.log("RESUME_DATA__",resumeData);

          //Call the second API to update other resume data
          await updateResumeDetails(thumbnailLink,profilePreviewUrl);

          toast.success("Resume Updated Successfully!!");
          navigate("/dashboard");
        } catch(err){
          console.error("Error uploading images :", err);
          toast.error("Failed to upload images");
        } finally{
          setIsLoading(false);
        }
      };
  
      const updateResumeDetails = async (thumbnailLink, profilePreviewUrl) => {
  try {
    if (!resumeId) {
      console.error("Resume ID is undefined", resumeData);
      return;
    }

    setIsLoading(true);

    await axiosInstance.put(
      API_PATHS.RESUME.UPDATE(resumeId),
      {
        ...resumeData,
        thumbnailLink: thumbnailLink || "",
        profileInfo: {
          ...resumeData.profileInfo,
          profilePreviewUrl: profilePreviewUrl || "",
        },
      }
    );
  } catch (err) {
    console.error("Error capturing image:", err);
  } finally {
    setIsLoading(false);
  }
};

  
      //Delete Resume
      const handleDeleteResume=async()=>{
        try{
          setIsLoading(true);
          const response = await axiosInstance.delete(API_PATHS.RESUME.DELETE(resumeId));
          toast.success('Resume Deleted Successfully')
          navigate('/dashboard')
        } catch(err){
          console.error("Error capturing image:",err);
        } finally{
          setIsLoading(false);
        }
      };
  
      //Download Resume
      const reactToPrintFn= useReactToPrint({contentRef:resumeDownloadRef});
  
      //Function to update baseWidth based on resume container size
      const updateBaseWidth=()=>{
        if(resumeRef.current){
          setBaseWidth(resumeRef.current.offsetWidth);
        }
      };
  
          useEffect(()=>{
          updateBaseWidth();
          window.addEventListener("resize",updateBaseWidth);
  
          if(resumeId){
              fetchResumeDetailsById();
          }
          return ()=>{
              window.removeEventListener("resize",updateBaseWidth);
          };
      },[]);
  
//w-screen
  return <DashboardLayout>
    <div className="container mx-auto">
      <div className="flex items-center justify-between gap-5 bg-white rounded-lg border border-purple-200 py-3 px-4 mb-4">
        <TitleInput
        title={resumeData.title}
        setTitle={(value)=>{
          setResumeData((prevState)=>({
            ...prevState,
            title:value,
          }))
        }}
        />
      <div className="flex items-center gap-4">

        <button className="btn-small-light"
        onClick={()=>setOpenThemeSelector(true)}>
            <LuPalette className="text-[16px]"/>
            <span className="hidden md:block">Change Theme</span>
        </button>

        <button className="btn-small-light" onClick={handleDeleteResume}>
          <LuTrash2 className="text-[16px]"/>
          <span className="hidden md:block">Delete</span>
        </button>

        <button className="btn-small-light"
        onClick={()=>setOpenPreviewModal(true)}>
          <LuDownload className="text-[16px]"/>
          <span className="hidden md:block">Preview and Download</span>
        </button>

      </div>
        
      </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="bg-white rounded-lg border border-purple-200 overflow-hidden">
            
            <StepProgress progress={progress}/>
            
            {renderForm()}
            <div className="mx-5">
              {errorMsg && (
                <div className="flex items-center gap-2 text-[11px] font-medium text-amber-600 bg-amber-100 px-2 py-0.5 my-1 rounded">
                  <LuCircleAlert className="text-sm"/>{errorMsg}
                </div>
              )}
              <div className="flex items-end justify-end gap-3 mt-3 mb-5">

                <button className="btn-small-light"
                onClick={goBack}
                disabled={isLoading}>
                  <LuArrowLeft className="text-[16px]"/>Back
                </button>

                <button className="btn-small-light"
                onClick={uploadResumeImages}
                disabled={isLoading}>
                  <LuSave className="text-[16px]"/>{isLoading?"Updating...":"Save & Exit"}
                </button>

                <button className="btn-small"
                onClick={validateAndNext} disabled={isLoading}>
                  {currentPage === "additionalInfo" && (
                    <LuDownload className="text-[16px]"/>
                  )}
                  {currentPage ==="additionalInfo"?"Preview and Download":"Next"}
                  {currentPage !=="additionalInfo" && (
                    <LuArrowLeft className=" rotate-180"/>
                  )}
                </button>
              </div>
            </div>
            
          </div>
                  <div ref={resumeRef} className="h-fit">
                    {/*Resume Template*/}

                    <RenderResume
                    templateId={resumeData?.template?.theme || "01"}

                    resumeData={resumeData}
                    colorPalette={resumeData?.template?.colorPalette||[]}
                    containerWidth={baseWidth}
                    />
                  </div>
           </div>
    </div>

              <Modal
              isOpen={openThemeSelector}
              onClose={()=>setOpenThemeSelector(false)}
              title="Change Theme"
              >
                <div className="w-[85vw] h-[85vh] flex overflow-scroll px-14">

                  <ThemeSelector
                  selectedTheme={resumeData?.template}
                  setSelectedTheme={(value)=>{
                    setResumeData((prevState)=>({
                      ...prevState,
                      template:value||prevState.template,
                    }))
                  }}
                  resumeData={null}
                  onClose={()=>setOpenThemeSelector(false)}
                  />
                </div>
              </Modal>

              <Modal
                isOpen={openPreviewModal}
                onClose={()=>setOpenPreviewModal(false)}
                title={resumeData.title}
                showActionBtn
                actionBtnText="Download"
                actionBtnIcon={<LuDownload className="text-[16px]"/>}
                onActionClick={()=>reactToPrintFn()}>
                  <div ref={resumeDownloadRef} className="w-[98vw] h-[90vh]">
                    <RenderResume
                    templateId={resumeData?.template?.theme||""}
                    resumeData={resumeData}
                    colorPalette={resumeData?.template?.colorPalette||[]}
                    />
                  </div>
              </Modal>

  </DashboardLayout>;
};

export default EditResume;
