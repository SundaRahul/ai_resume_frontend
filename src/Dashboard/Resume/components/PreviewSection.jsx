import { ResumeInfoContext } from './../../../Context/ResumeInfoContext'
import React, { useContext } from 'react'
import PersonalDetailsPreview from './preview/PersonalDetailsPreview'
import Summary from './preview/Summary'
import Experience from './preview/Experience'
import Education from './preview/Education'
import Skills from './preview/Skills'

function PreviewSection() {

    const {resumeInfo,setResumeInfo}=useContext(ResumeInfoContext)
  return (
    <div  className='shadow-lg h-full p-14 border-t-8 '  style={{borderColor:resumeInfo?.themeColor}} >
        {/* personal details */}

        <PersonalDetailsPreview resumeInfo={resumeInfo}/>

        {/* summary  */}
         <Summary resumeInfo={resumeInfo}/>
        {/* experience  */}
         <Experience resumeInfo={resumeInfo}/>
        {/* education  */}
         <Education resumeInfo={resumeInfo} />

        {/* skills  */}
        <Skills resumeInfo={resumeInfo}/>



    </div>
  )
}

export default PreviewSection