import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Input from '../../components/Inputs/Input';
import { validateEmail } from '../../utils/helper';
import ProfilePhotoSelector from '../../components/Inputs/ProfilePhotoSelector';
import { useContext } from 'react';
import { UserContext } from '../../context/UserContext';
import uploadImage from '../../utils/uploadImage';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';

const SignUp = ({setCurrentPage}) => {
  const [profilePic, setProfilePic]= useState(null);
  const [fullName, SetFullName] = useState("");
  const [email, SetEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error,setError] = useState(null);

  const {updateUser}=useContext(UserContext)
  const navigate = useNavigate();

  //Handle SignUp Form Submit
  const handleSignUp = async(e)=>{
    e.preventDefault();
    let profileImageURL = "";

    if(!fullName){
      setError("Please enter full name");
      return;
    }
     if(!validateEmail(email)){
      setError("Please enter a valid email address");
      return;
    }
     if(!password){
      setError("Please enter password");
      return;
    }

    //SignUp API call
    try{

      //Upload Image if present
      if(profilePic){
        const imgUploadRes = await uploadImage(profilePic);
        profileImageURL = imgUploadRes.imageUrl || "";
      }

        const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER, {
    name: fullName,
    email,
    password,
    profileImageUrl:profileImageURL,
  });

  const { token } = response.data;

  if (token) {
    localStorage.setItem("token", token);
    updateUser(response.data);
    navigate("/dashboard");
  }
    }
    catch(error){
      if (error.response?.data?.message) {
        setError(error.response.data.message);
      } else {
        setError("Something went wrong. Please try again");
      }
    }

  }

  return (
    <div className='w-[90vw] md:w-[33vw] p-7 flex flex-col justify-center'>
       <h3 className='text-lg font-semibold text-black'>Create an Account</h3>
       <p className='text-slate-700 mt-[5px] mb-6'>Join us by entering your details below</p>

       <form onSubmit={handleSignUp}>

        <ProfilePhotoSelector image={profilePic} setImage={setProfilePic}/>

       <div className='grid grid-cols-1 md:grid-1 gap-2'>
        <Input
        value={fullName}
        onChange={({target})=> SetFullName(target.value)}
        label="Full Name"
        placeholder="John"
        type="text"
        />

          <Input
        value={email}
        onChange={({target})=> SetEmail(target.value)}
        label="Email Address"
        placeholder="John@male.com"
        type="text"
        />

          <Input
        value={password}
        onChange={({target})=> setPassword(target.value)}
        label="Password"
        placeholder="Atleast 8 charecters"
        type="password"
        />
       </div>

       {error && <p className='text-red-500 text-xs pb-2.5'>{error}</p>}

       <button className='btn-primary'>SIGN UP</button>

       <p className='text-[14px] text-slate-800 mt-3'>Already have an Account? {" "}
        <button type='button' className='font-medium text-violet-600 underline cursor-pointer' onClick={()=>{setCurrentPage("login");}}>
          Login
        </button>
       </p>
       </form>
    </div>
  )
}

export default SignUp