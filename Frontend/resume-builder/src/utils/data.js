import TEMPLATE_ONE_IMG from '../assets/template-one.png'
import TEMPLATE_TWO_IMG from '../assets/template-two.png'
import TEMPLATE_THREE_IMG from '../assets/template-three.png'

export const themeColorPallete = {
themeOne: [
  
    // Blue
  ["#ECFEFF", "#A5F3FC", "#67E8F9", "#06B6D4", "#083344"],
  ["#F0FDFA", "#99F6E4", "#5EEAD4", "#14B8A6", "#134E4A"],
  ["#F0F9FF", "#E0F2FE", "#7DD3FC", "#0284C7", "#0F172A"],
  
  // Purple
  ["#F9F5FF", "#E9D5FF", "#C4B5FD", "#8B5CF6", "#4C1D95"],
  //Black
  ["#F8FAFC", "#CBD5E1", "#94A3B8", "#475569", "#020617"],

  
  // Brown
  ["#FFFBF7", "#F3E8D8", "#D6B98C", "#8B5E34", "#3E2723"],

  // Yellow
  ["#FFFBEB", "#FEF3C7", "#FDE68A", "#F59E0B", "#78350F"],

  // Red
  ["#FFF5F5", "#FED7D7", "#FEB2B2", "#E53E3E", "#742A2A"],

],

themeTwo: [
 
    // Blue
  ["#ECFEFF", "#A5F3FC", "#67E8F9", "#06B6D4", "#083344"],
  ["#F0FDFA", "#99F6E4", "#5EEAD4", "#14B8A6", "#134E4A"],
  ["#F0F9FF", "#E0F2FE", "#7DD3FC", "#0284C7", "#0F172A"],
  
  // Purple
  ["#F9F5FF", "#E9D5FF", "#C4B5FD", "#8B5CF6", "#4C1D95"],
  //Black
  ["#F8FAFC", "#CBD5E1", "#94A3B8", "#475569", "#020617"],

  
  // Brown
  ["#FFFBF7", "#F3E8D8", "#D6B98C", "#8B5E34", "#3E2723"],

  // Yellow
  ["#FFFBEB", "#FEF3C7", "#FDE68A", "#F59E0B", "#78350F"],

  // Red
  ["#FFF5F5", "#FED7D7", "#FEB2B2", "#E53E3E", "#742A2A"],
],
themeThree: [
 
    // Blue
  ["#ECFEFF", "#A5F3FC", "#67E8F9", "#06B6D4", "#083344"],
  ["#F0FDFA", "#99F6E4", "#5EEAD4", "#14B8A6", "#134E4A"],
  ["#F0F9FF", "#E0F2FE", "#7DD3FC", "#0284C7", "#0F172A"],
  
  // Purple
  ["#F9F5FF", "#E9D5FF", "#C4B5FD", "#8B5CF6", "#4C1D95"],
  //Black
  ["#F8FAFC", "#CBD5E1", "#94A3B8", "#475569", "#020617"],

  
  // Brown
  ["#FFFBF7", "#F3E8D8", "#D6B98C", "#8B5E34", "#3E2723"],

  // Yellow
  ["#FFFBEB", "#FEF3C7", "#FDE68A", "#F59E0B", "#78350F"],

  // Red
  ["#FFF5F5", "#FED7D7", "#FEB2B2", "#E53E3E", "#742A2A"],
],


};

/* ================================
   RESUME TEMPLATES
================================ */

export const resumeTemplates = [
  {
    id: "01",
    thumbnailImg:TEMPLATE_ONE_IMG,
    themeColorPallete:'themeOne'
  },
  {
    id: "02",
    thumbnailImg:TEMPLATE_TWO_IMG,
    themeColorPallete:'themeTwo'
  },
  {
    id: "03",
    thumbnailImg:TEMPLATE_THREE_IMG,
    themeColorPallete:'themeThree'
  },
];

/* ================================
   DUMMY RESUME DATA
================================ */

export const DUMMY_RESUME_DATA = {
  title: "Software Developer Resume",

  thumbnailLink: "",

  profileInfo: {
    profileImg: null,
    profilePreviewUrl: "",
    fullName: "John Doe",
    designation: "Senior Software Engineer",
    summary:
      "Passionate and results-driven software engineer with 6+ years of experience building scalable web applications and clean user interfaces.",
  },

  contactInfo: {
    email: "john.doe@example.com",
    phone: "+1 234 567 890",
    location: "Any City, Any Country",
    linkedin: "https://linkedin.com/in/johndoe",
    github: "https://github.com/johndoe",
    website: "https://johndoe.dev",
  },

  workExperience: [
    {
      company: "Tech Solutions Inc.",
      role: "Senior Frontend Engineer",
      startDate: "2021-01",
      endDate: "2024-01",
      description:
        "Led frontend development using React, improved performance by 30%, and collaborated closely with designers and backend teams.",
    },
    {
      company: "Startup Labs",
      role: "Software Engineer",
      startDate: "2018-06",
      endDate: "2020-12",
      description:
        "Built full-stack features using MERN stack and contributed to product scaling and deployment.",
    },
  ],

  education: [
    {
      institution: "ABC University",
      degree: "B.Tech in Computer Science",
      startYear: "2014",
      endYear: "2018",
    },
  ],

  skills: [
    "JavaScript",
    "React",
    "Node.js",
    "Express",
    "MongoDB",
    "HTML",
    "CSS",
    "Git",
  ],

  projects: [
    {
      title: "Resume Builder",
      description:
        "A full-stack resume builder that allows users to create, preview, and download professional resumes.",
      techStack: ["React", "Node.js", "MongoDB"],
    },
  ],

  certifications: [
    {
      title: "Full Stack Web Development",
      issuer: "Coursera",
      year: "2022",
    },
  ],

  languages: ["English", "Spanish"],

  template: {
    id: "templateOne",
    name: "Template One",
  },

  theme: {
    paletteIndex: 0,
  },

  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};
