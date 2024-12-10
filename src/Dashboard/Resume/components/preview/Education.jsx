import React from 'react';

function Education({ resumeInfo }) {
  const educationList = resumeInfo?.education || []; // Fallback to an empty array if education is undefined
  const themeColor = resumeInfo?.themeColor || '#000'; // Default to black if themeColor is undefined

  return (
    <div className='my-5'>
      <h2 className='text-center font-bold text-sm mb-2' style={{ color: themeColor }}>
        Education
      </h2>

      <hr style={{ borderColor: themeColor }} />

      {educationList.length > 0 ? (
        educationList.map((education, index) => (
          <div key={index} className='my-5'>
            <h2 style={{ color: themeColor }} className='text-sm font-bold'>
              {education?.universityName || 'University Name'}
            </h2>
            <h2 className='text-xs flex justify-between'>
              {education?.degree || 'Degree'} in {education?.major || 'Major'}
              <span>
                {education?.startDate || 'Start Date'} - {education?.endDate || 'End Date'}
              </span>
            </h2>
            <p>{education?.description || 'No description provided.'}</p>
          </div>
        ))
      ) : (
        <p className='text-center text-gray-500'>No education details added yet.</p>
      )}
    </div>
  );
}

export default Education;






// import React from 'react'

// function Education({resumeInfo}) {
//   return (
//     <div className='my-5'>
//         <h2 className='text-center font-bold text-sm mb-2' style={{color:resumeInfo?.themeColor}}>Education</h2>

//         <hr style={{borderColor:resumeInfo?.themeColor}}/>

//         {resumeInfo?.education.map((education,index)=>(
//             <div key={index} className='my-5'>
//                 <h2 style={{color:resumeInfo?.themeColor}} className='text-sm font-bold'>{education.universityName}</h2>
//                 <h2 className='text-xs flex justify-between'>{education?.degee} in {education?.major}
//                 <span>{education?.startDate}-{education?.endDate}</span>
//                 </h2>
//                 <p>{education?.description}</p>
//             </div>
//         ))}

       
//     </div>
//   )
// }

// export default Education