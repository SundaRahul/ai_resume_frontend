import React, { useEffect, useState } from 'react'
import { useUser } from '@clerk/clerk-react'
import GlobalApi from './../../service/GlobalApi';
import ResumeCardItem from './Components/ResumeCardItem';
import AddResume from './Components/AddResume';
import { useParams } from 'react-router-dom';

function Dashboard() {

  const {user}=useUser();
  const [resumeList,setResumeList]=useState([]);
  useEffect(()=>{
    user&&GetResumesList()
  },[user])

  const {Resume_id}=useParams();

  /**
   * Used to Get Users Resume List
   */
  const GetResumesList=()=>{
    GlobalApi.GetUserResumes(user?.primaryEmailAddress?.emailAddress)
    .then(resp=>{
      console.log(resp.data.data)
      setResumeList(resp.data.data);
    })
  }
  return (
    <div className='p-10 md:px-20 lg:px-32'>
      <h2 className='font-bold text-3xl'>My Resume</h2>
      <p>Start Creating AI resume to your next Job role</p>
      <div className='grid grid-cols-2 
        md:grid-cols-3 lg:grid-cols-5 gap-5
        mt-10
        '>
        <AddResume />
        {resumeList.length > 0 ? resumeList.map((resume) => (
          <ResumeCardItem
            resume={resume}
            key={resume.documentId} // Use a unique identifier
            refreshData={GetResumesList}
          />
        )) : [1, 2, 3, 4].map((item) => (
          <div
            key={item} // Add a key to placeholders
            className='h-[280px] rounded-lg bg-slate-200 animate-pulse'
          ></div>
        ))}
      </div>
    </div>
  );

}

export default Dashboard







// import React, { useState } from 'react'
// import AddResume from './Components/AddResume'
// import { useUser } from '@clerk/clerk-react'
// import GlobalApi from './../../service/GlobalApi'
// import ResumeCardItem from './Components/ResumeCardItem';
// import { useEffect } from 'react';

// function Dashboard() {

//   const {user}=useUser();
//   const [resumeList,setResumeList]=useState([]);

//   useEffect(()=>{
//     user&&GetResumesList()
//   },[user])

//   const GetResumesList=()=>{
//     GlobalApi.GetUserResumes(user?.primaryEmailAddress?.emailAddress).then(
//       resp=>{
//         setResumeList(resp.data.data);
//       }
//     )
//   }
  
//   return (
//     <div className='p-10 md:px-20 lg:px-32'>
//           <h2 className='font-bold text-3xl'>My Resume</h2>
//           <p>Start Creating AI resume for your next Job role</p>
//           <div className='mt-5 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5'>
//             <AddResume/>
//             {resumeList.length>0&&resumeList.map((resume,index)=>(
//               <ResumeCardItem resume={resume} key={index} />
//             ))}
//           </div>

//     </div>
//   )
// }

// export default Dashboard