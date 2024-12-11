import Header from './../../../components/Custom/Header';
import { Button } from './../../../components/ui/button';
import { ResumeInfoContext } from './../../../Context/ResumeInfoContext';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import GlobalApi from './../../../../service/GlobalApi';
import { RWebShare } from 'react-web-share';
import PreviewSection from './../../../Dashboard/Resume/components/PreviewSection';

function ViewResume() {
    const [resumeInfo, setResumeInfo] = useState(null);
    const { Resume_id } = useParams();

    useEffect(() => {
        GetResumeInfo();
    }, [Resume_id]);

    const GetResumeInfo = () => {
        GlobalApi.GetResumeById(Resume_id)
            .then((resp) => {
                console.log(resp.data.data);
                setResumeInfo(resp.data.data);
            })
            .catch((error) => {
                console.error("Error fetching resume data:", error);
            });
    };

    const HandleDownload = () => {
        const printContents = document.getElementById("print-area").innerHTML;
        const originalContents = document.body.innerHTML;

        document.body.innerHTML = printContents;
        window.print();
        document.body.innerHTML = originalContents;
    };

    return (
        <ResumeInfoContext.Provider value={{ resumeInfo, setResumeInfo }}>
            <div id="no-print">
                <Header />

                <div className="my-10 mx-10 md:mx-20 lg:mx-36">
                    <h2 className="text-center text-2xl font-medium">
                        Congrats! Your Ultimate AI generated Resume is ready!
                    </h2>
                    <p className="text-center text-gray-400">
                        Now you are ready to download your resume and you can share the unique resume URL with your friends and family.
                    </p>
                    <div className="flex justify-between px-44 my-10">
                        <Button onClick={HandleDownload}>Download</Button>

                        {resumeInfo && (
                            <RWebShare
                                data={{
                                    text: "Hello Everyone, This is my resume please open URL to see it",
                                    url: `${import.meta.env.VITE_BASE_URL}/api/my-resume/${Resume_id}/view`,
                                    title: `${resumeInfo?.firstName} ${resumeInfo?.lastName} resume`,
                                }}
                                onClick={() => console.log("shared successfully!")}
                            >
                                <Button>Share</Button>
                            </RWebShare>
                        )}
                    </div>
                </div>

                <div className="my-10 mx-10 md:mx-20 lg:mx-36">
                    <div id="print-area">
                        <PreviewSection />
                    </div>
                </div>
            </div>
        </ResumeInfoContext.Provider>
    );
}

export default ViewResume;





// import Header from './../../../components/Custom/Header'
// import {Button}  from './../../../components/ui/button'
// import  {ResumeInfoContext} from './../../../Context/ResumeInfoContext'
// import React, { useEffect, useState } from 'react'
// import { useParams } from 'react-router-dom'
// import GlobalApi from './../../../../service/GlobalApi'
// import {RWebShare} from 'react-web-share'
// import PreviewSection from './../../../Dashboard/Resume/components/PreviewSection'

// function ViewResume() {

//     const [resumeInfo,setResumeInfo]=useState(null);
//     const { Resume_id } = useParams();

//     useEffect(()=>{
//         GetResumeInfo();
//     },[Resume_id])
//     const GetResumeInfo=()=>{
//         GlobalApi.GetResumeById(Resume_id).then(resp=>{
//             console.log(resp.data.data);
//             setResumeInfo(resp.data.data);
//         })
//     }

//     const HandleDownload = () => {
//         const printContents = document.getElementById("print-area").innerHTML;
//         const originalContents = document.body.innerHTML;
      
//         document.body.innerHTML = printContents;
//         window.print();
//         document.body.innerHTML = originalContents;
//       };
      

//   return (
//     <ResumeInfoContext.Provider value={{resumeInfo,setResumeInfo}} >
//         <div id="no-print">
//         <Header/>

//         <div className='my-10 mx-10 md:mx-20 lg:mx-36'>
//             <h2 className='text-center text-2xl font-medium'>
//                 Congrats! Your Ultimate AI generates Resume is ready ! </h2>
//                 <p className='text-center text-gray-400'>Now you are ready to download your resume and you can share unique 
//                     resume url with your friends and family </p>
//             <div className='flex justify-between px-44 my-10'>
//                 <Button onClick={HandleDownload}>Download</Button>
               
//                 <RWebShare
//         data={{
//           text: "Hello Everyone, This is my resume please open url to see it",
//           url: import.meta.env.VITE_BASE_URL+"/api/my-resume/"+Resume_id+"/view",
//           title: resumeInfo?.firstName+" "+resumeInfo?.lastName+" resume",
//         }}
//         onClick={() => console.log("shared successfully!")}
//       > <Button>Share</Button>
//       </RWebShare>
//             </div>
//         </div>
            
//         </div>
//         <div className='my-10 mx-10 md:mx-20 lg:mx-36'>
//         <div id="print-area" >
//                 <PreviewSection/>
//             </div>
//             </div>
//     </ResumeInfoContext.Provider>
//   )
// }

// export default ViewResume