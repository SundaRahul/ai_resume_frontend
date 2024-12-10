import { ResumeInfoContext } from '@/Context/ResumeInfoContext'
import React, { useContext } from 'react'

function PersonalDetailsPreview() {
    const {resumeInfo}=useContext(ResumeInfoContext);
  return (
    <div>
        <h2 style={{color:resumeInfo?.themeColor}} className='font-bold text-xl text-center'>{resumeInfo?.firstName} {resumeInfo?.lastName}</h2>
        <h2 className='text-center text-sm font-medium'>{resumeInfo?.jobTitle}</h2>
        <h2 className='text-center text-xs font-normal'>{resumeInfo?.address}</h2>

        <div style={{color:resumeInfo?.themeColor}} className='flex justify-between'>
            <h2 className='font-normal text-xs'>{resumeInfo?.phone}</h2>
            <h2 className='font-normal text-xs'>{resumeInfo?.email}</h2>
        </div>
        <hr className='border-[1.5px] my-2' style={{borderColor:resumeInfo?.themeColor}} />
    </div>
  )
}

export default PersonalDetailsPreview