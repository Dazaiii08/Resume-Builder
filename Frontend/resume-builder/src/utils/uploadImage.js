import {API_PATHS} from './apiPaths';
import axiosInstance from './axiosInstance';

const uploadImage = async(imageFile)=>{
    const formData = new fromData();
    //append image to form data
    formData.append('image',imageFile);

    try{
        const response = await axiosInstance.post(API_PATHS.IMAGE.UPLOAD_IMAGE, formData, {
            headers:{
                'Content-Type':'multipart/form-data', //set header for file upload
            },
        });
        return response.data;
    } catch(errpr){
        console.error('error uploading image',error);
        throw error;
    }
}

export default uploadImage;