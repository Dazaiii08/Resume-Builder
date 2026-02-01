import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Input from '../../components/Inputs/Input'
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';


const CreateResumeForm = () => {
  const[title,setTitle]=useState("");
  const[error,setError]=useState(null);

  const navigate = useNavigate();

  //Handle Create Resume
  const handleCreateResume = async(e)=>{
    e.preventDefault();

    if(!title){
      setError("Please resume title");
      return;
    }
    setError();

    //create resume api call
    try{

      const response = await axiosInstance.post(API_PATHS.RESUME.CREATE, {
        title,
      });
      if(response.data._id){
        navigate(`/resume/${response.data?._id}`)
      }

    }catch(error){
      if(error.response && error.response.data.message){
        setError(error.response.data.message)
      }else{
        setError("Something Went Wrong");
      }
    }
  }

  return (
    <div className='w-[90vw] md:w-[70vh] p-7 flex flex-col justify-center'>
      <h3 className='text-lg font-semibold text-black'>Create New Resume</h3>
      <p className='text-xs text-slate-700 mt-[5px] mb-3'>
        Give your resume a title to get started. You can edit all details later
      </p>

      <form onSubmit={handleCreateResume}>
        <Input
        value={title}
        onChange={({target})=>setTitle(target.value)}
        label="Resume Title"
        placeholder="Eg. Mv's Resume"
        type="text"
        />

      {error && <p className='text-red-600 text-xs pb-2.5 '>{error}</p>}
      <button type='submit' className='btn-primary'>
        Create Resume
      </button>

      </form>
    </div>
  )
}

export default CreateResumeForm