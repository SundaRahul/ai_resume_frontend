import { useState } from 'react'
import React from 'react'
import { Loader2, Navigation, PlusSquare } from 'lucide-react'
import { Button } from './../../components/ui/button'
import { Input } from "./../../components/ui/input"
import { v4 as uuidv4 } from 'uuid';
import GlobalApi from './../../../service/GlobalApi'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "./../../components/ui/dialog"
import { useUser } from '@clerk/clerk-react'
import { useNavigate } from 'react-router-dom'


const AddResume = () => {
  const {user}=useUser();
    const [OpenDialog,setOpenDialog]=useState(false);
    const [resumeTitle,setResumeTitle]=useState();
    const [Loading,setLoading]=useState(false);
    const navigate=useNavigate();

    const onCreate=()=>{
      const uuid=uuidv4();
      const data={
        data:{
          title:resumeTitle,
          Resume_id:uuid,
          User_email:user?.primaryEmailAddress?.emailAddress,
          User_name:user?.fullName
        }
      }
      console.log(data);
      GlobalApi.CreateNewResume(data).then(
        (resp) => {
          console.log('API Response:', resp);  // Log the full API response
          
          // Make sure resp.data and resp.data.data are valid
          if (resp ) {
            navigate('/dashboard/resume/' + resp.data.documentId + "/edit");
          } else {
            console.error("Document ID is missing or API response structure is incorrect");
          }
          
          setLoading(false); // Don't forget to stop the loading state
        },
        (error) => {
          console.error('Error from API:', error);
          setLoading(false);
        }
      );
      
    }
  return (
    <div>
        <div className='p-14 py-24 border items-center flex justify-center
        bg-secondary rounded-lg h-[280px]
        hover:scale-105 transition-all hover:shadow-md cursor-pointer
        border-dashed'
        onClick={()=>setOpenDialog(true)}>
            <PlusSquare/>
        </div>
        <Dialog open={OpenDialog}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New Resume</DialogTitle>
                <DialogDescription>
                    Add a title for your new Resume
                  <Input  className="mt-2 my-2" placeholder="Ex. Full Stack Resume" 
                  onChange={(e)=>setResumeTitle(e.target.value)} />
                </DialogDescription>
                <div className='flex justify-end gap-5'>
                    <Button onClick={()=>{setOpenDialog(false)}} >Cancel</Button>
                    <Button disabled={!resumeTitle||Loading} onClick={()=>onCreate() }>
                      {
                      Loading?<Loader2 className='animate-spin' />:'Create'
                      }                       
                    </Button>
                </div>
              </DialogHeader>
            </DialogContent>
          </Dialog>
    </div>
  )
}

export default AddResume

