
import axios from "axios";

const API_KEY = import.meta.env.VITE_STRAPI_API_KEY;

const axiosClient = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL+"/api/",
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`,
    },
});

const CreateNewResume = async (data) => {
    console.log(data);
    try {
        const response = await axiosClient.post('/user-resumes/', data);
        return response.data;
    } catch (error) {
        console.error('Error creating new resume:', error);
        throw error;
    }
};

const UpdateResumeDetail=(id,data)=>axiosClient.put('/user-resumes/'+id,data)



const GetUserResumes=(User_email)=>axiosClient.get('/user-resumes?filters[User_email][$eq]='+User_email);


const GetResumeById=(id)=>axiosClient.get('/user-resumes/'+id+"?populate=*")

const DeleteResumeById=(id)=>axiosClient.delete('/user-resumes/'+id)

export default {
    CreateNewResume, 
    GetUserResumes,
    UpdateResumeDetail,
    GetResumeById,
    DeleteResumeById
};
