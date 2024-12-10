import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import FormSection from '../../components/FormSection'
import PreviewSection from './../../components/PreviewSection'
import { ResumeInfoContext } from './../../../../Context/ResumeInfoContext'
import dummy from './../../../../data/dummy';
import { useEffect } from 'react';
import GlobalApi from './../../../../../service/GlobalApi'

function EditResume() {
  const {Resume_id}=useParams();
  const [resumeInfo,setResumeInfo]=useState();
  useEffect(()=>{     
      GetResumeInfo();
  },[])


  const GetResumeInfo = () => {
    console.log(Resume_id);
    GlobalApi.GetResumeById(Resume_id)
      .then(resp => {
        console.log(resp);
        setResumeInfo(resp.data.data);
      })
      .catch(error => {
        console.error("Error fetching resume info:", error);
        if (error.response?.status === 404) {
          alert("Resume not found!");
        }
      });
  };
  

return (
  <ResumeInfoContext.Provider value={{resumeInfo,setResumeInfo}}>
  <div className='grid grid-cols-1 md:grid-cols-2 p-10 gap-10'>
      {/* Form Section  */}
        <FormSection/>
      {/* Preview Section  */}
       <PreviewSection/>
  </div>
  </ResumeInfoContext.Provider>
)
}

export default EditResume
