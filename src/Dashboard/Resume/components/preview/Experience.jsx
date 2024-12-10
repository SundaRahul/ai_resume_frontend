import React from 'react';

function Experience({ resumeInfo }) {
  const experienceList = resumeInfo?.experience || []; // Fallback to an empty array
  const themeColor = resumeInfo?.themeColor || '#000'; // Default color if themeColor is not defined

  return (
    <div className='my-5'>
      <h2 className='text-center font-bold text-sm mb-2' style={{ color: themeColor }}>
        Professional Experience
      </h2>

      <hr style={{ borderColor: themeColor }} />

      {experienceList.length > 0 ? (
        experienceList.map((experience, index) => (
          <div key={index} className='my-5'>
            <h2 style={{ color: themeColor }} className='text-sm font-bold'>
              {experience?.title || 'Job Title'}
            </h2>
            <h2 className='flex text-xs justify-between'>
              {experience?.companyName || 'Company Name'}, {experience?.city || 'City'}, {experience?.state || 'State'}
              <span>
                {experience?.startDate || 'Start Date'} to{' '}
                {experience?.currentlyWorking ? 'Present' : experience?.endDate || 'End Date'}
              </span>
            </h2>
            <div
              className='text-xs my-2'
              dangerouslySetInnerHTML={{
                __html: experience?.workSummery || '<p>No work summary provided.</p>',
              }}
            />
          </div>
        ))
      ) : (
        <p className='text-center text-gray-500'>No professional experience details added yet.</p>
      )}
    </div>
  );
}

export default Experience;






// import React from 'react'

// function Experience({resumeInfo}) {
//   return (
//     <div className='my-5'>
//         <h2 className='text-center font-bold text-sm mb-2' style={{color:resumeInfo?.themeColor
//         }}>Professional Experience</h2>

//         <hr style={{borderColor:resumeInfo?.themeColor}}/>

//         {resumeInfo?.experience.map((experience,index)=>(
//             <div key={index} className='my-5'>
//                 <h2 style={{color:resumeInfo?.themeColor}} className='text-sm font-bold'>{experience?.title}</h2>
//                 <h2 className='flex text-xs justify-between' >{experience?.companyName},
//                     {experience?.city}
//                     ,{experience?.state}
//                     <span>{experience?.startDate} To {experience?.currentlyWorking?'Present':experience?.endDate}</span></h2>

//                     {/* <p className='text-xs my-2'>
//                         {experience?.workSummery}
//                     </p> */}

//                     <div dangerouslySetInnerHTML={{__html:experience?.workSummery}}/>
//             </div>
//         ))}
//     </div>
//   )
// }

// export default Experience