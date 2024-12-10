import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { ResumeInfoContext } from '@/context/ResumeInfoContext';
import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import GlobalApi from './../../../../../service/GlobalApi';
import { Brain, LoaderCircle } from 'lucide-react';
import { toast } from 'sonner';
import { AIChatSession } from './../../../../../service/AIModel';

const prompt = "Job Title: {jobTitle} , Based on job title give me a list of three summaries for experience levels: Mid-Level and Fresher in 3-4 lines in array format, with fields `summary` and `experience_level` in JSON format.";

function Summery({ enableNext }) {
    const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
    const [summery, setSummery] = useState(resumeInfo?.summery || '');
    const [loading, setLoading] = useState(false);
    const params = useParams();
    const [aiGeneratedSummeryList, setAiGenerateSummeryList] = useState([]);

    useEffect(() => {
        if (summery) {
            setResumeInfo((prev) => ({
                ...prev,
                summery,
            }));
        }
    }, [summery]);

    const GenerateSummeryFromAI = async () => {
        setLoading(true);
        const PROMPT = prompt.replace('{jobTitle}', resumeInfo?.jobTitle || 'Unknown');

        try {
            const result = await AIChatSession.sendMessage(PROMPT);
            const responseText = await result.response.text(); // Await the promise
            const parsedData = JSON.parse(responseText);

            if (Array.isArray(parsedData)) {
                setAiGenerateSummeryList(parsedData);
            } else {
                throw new Error("Unexpected AI response format");
            }
        } catch (error) {
            console.error("Error generating summary from AI:", error);
            toast.error("Failed to generate summaries. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const onSave = async (e) => {
        e.preventDefault();
        setLoading(true);

        const payload = {
            data: {
                summery,
            },
        };

        try {
            const response = await GlobalApi.UpdateResumeDetail(params?.Resume_id, payload);
            console.log("Resume updated successfully:", response);
            enableNext(true);
            toast.success("Details updated successfully!");
        } catch (error) {
            console.error("Error updating resume:", error);
            toast.error("Failed to save details. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <div className="p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10">
                <h2 className="font-bold text-lg">Summary</h2>
                <p>Add a summary for your job title.</p>

                <form className="mt-7" onSubmit={onSave}>
                    <div className="flex justify-between items-end">
                        <label>Add Summary</label>
                        <Button
                            variant="outline"
                            onClick={GenerateSummeryFromAI}
                            type="button"
                            size="sm"
                            className="border-primary text-primary flex gap-2"
                        >
                            <Brain className="h-4 w-4" /> Generate from AI
                        </Button>
                    </div>
                    <Textarea
                        className="mt-5"
                        required
                        value={summery}
                        onChange={(e) => setSummery(e.target.value)}
                    />
                    <div className="mt-2 flex justify-end">
                        <Button type="submit" disabled={loading}>
                            {loading ? <LoaderCircle className="animate-spin" /> : 'Save'}
                        </Button>
                    </div>
                </form>
            </div>

            {aiGeneratedSummeryList.length > 0 && (
                <div className="my-5">
                    <h2 className="font-bold text-lg">Suggestions</h2>
                    {aiGeneratedSummeryList.map((item, index) => (
                        <div
                            key={index}
                            onClick={() => setSummery(item?.summary)}
                            className="p-5 shadow-lg my-4 rounded-lg cursor-pointer"
                        >
                            <h2 className="font-bold my-1 text-primary">Level: {item?.experience_level}</h2>
                            <p>{item?.summary}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default Summery;


















// import { Button } from '@/components/ui/button';
// import { Textarea } from '@/components/ui/textarea';
// import { ResumeInfoContext } from '@/context/ResumeInfoContext';
// import React, { useContext, useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import GlobalApi from './../../../../../service/GlobalApi';
// import { Brain, LoaderCircle } from 'lucide-react';
// import { toast } from 'sonner';
// import { AIChatSession } from '././../../../../../service/AIModel';

// const prompt = "Job Title: {jobTitle} , Depends on job title give me list of three summery for experience level, Mid Level and Fresher level in 3 -4 lines in array format, With summery and experience_level Field in JSON Format";

// function Summery({enabledNext}) {
//     const {resumeInfo,setResumeInfo}=useContext(ResumeInfoContext);
//     const [summery,setSummery]=useState();
//     const [loading,setLoading]=useState(false);
//     const params=useParams();
//     const [aiGeneratedSummeryList,setAiGenerateSummeryList]=useState();
//     useEffect(()=>{
//         summery&&setResumeInfo({
//             ...resumeInfo,
//             summery:summery
//         })
//     },[summery])

//     const GenerateSummeryFromAI=async()=>{
//         setLoading(true)
//         const PROMPT=prompt.replace('{jobTitle}',resumeInfo?.jobTitle);
//         console.log(PROMPT);
//         const result=await AIChatSession.sendMessage(PROMPT);
//         console.log(JSON.parse(result.response.text()))
       
//         setAiGenerateSummeryList(JSON.parse(result.response.text()))
//         setLoading(false);
//     }

//     const onSave=(e)=>{
//         e.preventDefault();
       
//         setLoading(true)
//         const data={
//             data:{
//                 summery:summery
//             }
//         }
//         GlobalApi.UpdateResumeDetail(params?.Resume_id,data).then(resp=>{
//             console.log(resp);
//             enabledNext(true);
//             setLoading(false);
//             toast("Details updated")
//         },(error)=>{
//             setLoading(false);
//         })
//     }
//     return (
//     <div>
//          <div className='p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10'>
//         <h2 className='font-bold text-lg'>Summery</h2>
//         <p>Add Summery for your job title</p>

//         <form className='mt-7' onSubmit={onSave}>
//             <div className='flex justify-between items-end'>
//                 <label>Add Summery</label>
//                 <Button variant="outline" onClick={()=>GenerateSummeryFromAI()} 
//                 type="button" size="sm" className="border-primary text-primary flex gap-2"> 
//                 <Brain className='h-4 w-4' />  Generate from AI</Button>
//             </div>
//             <Textarea className="mt-5" required
//             value={summery}
//                 defaultValue={summery?summery:resumeInfo?.summery}
//             onChange={(e)=>setSummery(e.target.value)}
//             />
//             <div className='mt-2 flex justify-end'>
//             <Button type="submit"
//                 disabled={loading}>
//                     {loading?<LoaderCircle className='animate-spin' />:'Save'}
//                     </Button>
//             </div>
//         </form>
//         </div>

        
//        {aiGeneratedSummeryList&& <div className='my-5'>
//             <h2 className='font-bold text-lg'>Suggestions</h2>
//             {aiGeneratedSummeryList?.map((item,index)=>(
//                 <div key={index} 
//                 onClick={()=>setSummery(item?.summary)}
//                 className='p-5 shadow-lg my-4 rounded-lg cursor-pointer'>
//                     <h2 className='font-bold my-1 text-primary'>Level: {item?.experience_level}</h2>
//                     <p>{item?.summary}</p>
//                 </div>
//             ))}
//         </div>}

//     </div>
//   )
// }

// export default Summery