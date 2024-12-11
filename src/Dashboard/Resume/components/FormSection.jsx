import React, { useState } from 'react'
import PersonalForm from './forms/PersonalForm'
import ExperienceForm from './forms/ExperienceForm'
import EducationForm from './forms/EducationForm'
import SkillsForm from './forms/SkillsForm'
import { ArrowLeft, ArrowRight, Home, LayoutGrid } from 'lucide-react'
import { Button } from './../../../components/ui/button'
import Summery from './forms/SummeryForms'
import { Link, Navigate, useParams } from 'react-router-dom'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "./../../../components/ui/popover"
import ThemeColor from './ThemeColor'


export default function FormSection() {
    const [activeFormIndex,setActiveFormIndex]=useState(1);
    const [enableNext,setEnableNext]=useState(true);
    const {Resume_id}=useParams();
    console.log("this is" +Resume_id);
  return (
    <div>

        <div className='flex justify-between items-center' >
            <div className='flex gap-2'> 
              <Link to={"/dashboard"}><Button><Home/></Button></Link>      
            {/* <Button varient='outline'size="sm" ><LayoutGrid/> Theme</Button> */}
            <ThemeColor/>

            </div>
            
            <div className='flex gap-2'>
                {activeFormIndex>1&&<Button size="sm"
                onClick={()=>setActiveFormIndex(activeFormIndex-1)}><ArrowLeft/></Button>}
                <Button disabled={!enableNext} className='flex gap-2' size="sm" onClick={()=>setActiveFormIndex(activeFormIndex+1)}>Next<ArrowRight/></Button>
            </div>
        </div>

        
        {/* personal */}
        {activeFormIndex==1?<PersonalForm enableNext={(v)=>setEnableNext(v)}/>
        :activeFormIndex===2?<Summery enableNext={(v)=>setEnableNext(v)}/>
        :activeFormIndex===3?<ExperienceForm enableNext={(v)=>setEnableNext(v)}/>
        :activeFormIndex===4?<EducationForm enableNext={(v)=>setEnableNext(v)}/>
        :activeFormIndex===5?<SkillsForm enableNext={(v)=>setEnableNext(v)} />
        // :activeFormIndex===6?<ViewForm/>
        :activeFormIndex===6?<Navigate to={`/my-resume/${Resume_id}/view`} />
        :null}
        
        {/* summary  */}

        {/* experience */}
        
        {/* education */}
        
        {/* skills */}
        
    </div>
  )
}

