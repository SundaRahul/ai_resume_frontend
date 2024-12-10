import { Button } from './../../../../components/ui/button'
import { Input } from './../../../../components/ui/input'
import { ResumeInfoContext } from './../../../../Context/ResumeInfoContext'
import { LoaderCircle } from 'lucide-react';
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import GlobalApi from './../../../../../service/GlobalApi';
import { toast } from 'sonner';

function PersonalForm({enableNext}) {

    const params=useParams();
    const {resumeInfo,setResumeInfo}=useContext(ResumeInfoContext)

    const [formData,setFormData]=useState();
    const [loading,setLoading]=useState(false);
    useEffect(()=>{
        console.log("---",resumeInfo)
    },[])

    const handleInputChange=(e)=>{
        enableNext(false)
        const {name,value}=e.target;

        setFormData({
            ...formData,
            [name]:value
        })
        setResumeInfo({
            ...resumeInfo,
            [name]:value
        })
    }

    const onSave=(e)=>{
        e.preventDefault();
        setLoading(true)
        const data={
            data:formData
        }
        console.log(params)
        GlobalApi.UpdateResumeDetail(params.Resume_id,data).then(resp=>{
            console.log(resp);
            enableNext(true);
            setLoading(false);
            toast("Details updated")
        },(error)=>{
            setLoading(false);
        })
        
    }
  return (
    <div className='p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10'>
        <h2 className='font-bold text-lg'>Personal Detail</h2>
        <p>Get Started with the basic information</p>

        <form onSubmit={onSave}>
            <div className='grid grid-cols-2 mt-5 gap-3'>
                <div>
                    <label className='text-sm'>First Name</label>
                    <Input name="firstName" defaultValue={resumeInfo?.firstName} required onChange={handleInputChange}  />
                </div>
                <div>
                    <label className='text-sm'>Last Name</label>
                    <Input name="lastName" required onChange={handleInputChange} 
                    defaultValue={resumeInfo?.lastName} />
                </div>
                <div className='col-span-2'>
                    <label className='text-sm'>Job Title</label>
                    <Input name="jobTitle" required 
                    defaultValue={resumeInfo?.jobTitle}
                    onChange={handleInputChange}  />
                </div>
                <div className='col-span-2'>
                    <label className='text-sm'>Address</label>
                    <Input name="address" required 
                    defaultValue={resumeInfo?.address}
                    onChange={handleInputChange}  />
                </div>
                <div>
                    <label className='text-sm'>Phone</label>
                    <Input name="phone" required 
                    defaultValue={resumeInfo?.phone}
                    onChange={handleInputChange}  />
                </div>
                <div>
                    <label className='text-sm'>Email</label>
                    <Input name="email" required 
                    defaultValue={resumeInfo?.email}
                    onChange={handleInputChange}  />
                </div>
            </div>
            <div className='mt-3 flex justify-end'>
                <Button type="submit"
                disabled={loading}>
                    {loading?<LoaderCircle className='animate-spin' />:'Save'}
                    </Button>
            </div>
        </form>
    </div>
  )
}

export default PersonalForm










// import { Input } from '@/components/ui/input';
// import { ResumeInfoContext } from '@/Context/ResumeInfoContext'
// import React, { useContext, useEffect, useState } from 'react'
// import { Button } from '@/components/ui/button';
// import { useParams } from 'react-router-dom';
// import GlobalApi from './../../../../../service/GlobalApi'
// import { LoaderCircle } from 'lucide-react';
// import { toast } from 'sonner';

// function PersonalForm({enableNext}) {
//     const params=useParams();
//     const [formData,setFormData]=useState();
//     const [loading,setLoading]=useState(false);

//     useEffect(()=>{
//         console.log(params)
//     },[])
//     const {resumeInfo,setResumeInfo}=useContext(ResumeInfoContext);
//     const handleInputChange=(e)=>{
//         enableNext(false);
//          const {name,value}=e.target;
        
//         setFormData({
//             ...formData,
//             [name]:value
//         })

//         setResumeInfo({
//             ...resumeInfo,
//             [name]:value
//         })
//     } ;

//     const onSave=(e)=>{
//         e.preventDefault();
//         setLoading(true);
//         const data={
//             data:formData
//         }
//         GlobalApi.UpdateResumeDetail(params?.Resume_id,data).then(
//             resp=>{
//                 console.log(resp);
//                 enableNext(true);
//                 setLoading(false);
//                 toast("Details Updated")

//             },(error)=>{
//                 setLoading(false);
//             }
//         )
        
//     }
//   return (
//     <div className='p-5 shadow-lg rounded-lg border-t-primary mt-8'>
//         <h2 className='font-bold text-lg'>Personal Detail</h2>
//         <p className=''>Get Started with the basic Information</p>

//         <form onSubmit={onSave}>
//             <div className='grid grid-cols-2 mt-5 gap-3'>
//                 <div>
//                     <label className='text-sm' >First Name</label>                
//                     <Input name="firstName" defaultValue={resumeInfo?.firstName} required onChange={handleInputChange} ></Input>
//                 </div>
                
//                 <div>
//                     <label className='text-sm' >Last Name</label>                
//                     <Input name="lastName" defaultValue={resumeInfo?.lastName}  required onChange={handleInputChange} ></Input>
//                 </div>

//                 <div className='col-span-2'>
//                     <label className='text-sm' >Job Title</label>                
//                     <Input name="jobTitle" defaultValue={resumeInfo?.jobTitle} required onChange={handleInputChange} ></Input>
//                 </div>

//                 <div className='col-span-2'>
//                     <label className='text-sm' >Address</label>                
//                     <Input name="address" defaultValue={resumeInfo?.address} required onChange={handleInputChange} ></Input>
//                 </div>

//                 <div>
//                     <label className='text-sm' >Phone</label>                
//                     <Input name="phone" defaultValue={resumeInfo?.phone} required onChange={handleInputChange} ></Input>
//                 </div>

//                 <div>
//                     <label className='text-sm' >Email</label>                
//                     <Input name="email" defaultValue={resumeInfo?.email} required onChange={handleInputChange} ></Input>
//                 </div>

//                 <div className='mt-3 flex justify-end'>
//                     <Button type="submit" disabled={loading}>{loading?<LoaderCircle className='animate-spin'/>:'Save'}</Button>
//                 </div>
                
//             </div>
//         </form>
//     </div>

    
//   )
// }

// export default PersonalForm