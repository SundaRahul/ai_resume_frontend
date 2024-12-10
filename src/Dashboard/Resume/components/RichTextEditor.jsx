import { Button } from '@/components/ui/button';
import { ResumeInfoContext } from '@/context/ResumeInfoContext';
import { Brain, LoaderCircle } from 'lucide-react';
import React, { useContext, useState } from 'react';
import { BtnBold, BtnBulletList, BtnItalic, BtnLink, BtnNumberedList, BtnStrikeThrough, BtnUnderline, Editor, EditorProvider, Separator, Toolbar } from 'react-simple-wysiwyg';
import { AIChatSession } from './../../../../service/AIModel';
import { toast } from 'sonner';

const PROMPT = `
Position title: {positionTitle}, 
Based on this position title, provide a brief summary of 3-5 sentences for professional experience in plain text format (no bullet points or lists).
`;

function RichTextEditor({ onRichTextEditorChange, index, defaultValue }) {
  const [value, setValue] = useState(defaultValue);
  const { resumeInfo } = useContext(ResumeInfoContext);
  const [loading, setLoading] = useState(false);

  const GenerateSummaryFromAI = async () => {
    if (!resumeInfo?.experience[index]?.title) {
      toast('Please Add Position Title');
      return;
    }
    setLoading(true);

    try {
      const prompt = PROMPT.replace('{positionTitle}', resumeInfo.experience[index].title);
      const result = await AIChatSession.sendMessage(prompt);
      const responseText = await result.response.text();

      console.log('AI Response:', responseText);

      // Format the response as plain text
      const summary = responseText.replace(/<\/?[^>]+(>|$)/g, '').trim(); // Remove HTML tags
      setValue(summary);
      onRichTextEditorChange({ target: { value: summary } }); // Update parent component
    } catch (error) {
      console.error('Error generating summary:', error);
      toast('Failed to generate summary. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="flex justify-between my-2">
        <label className="text-xs">Summary</label>
        <Button
          variant="outline"
          size="sm"
          onClick={GenerateSummaryFromAI}
          disabled={loading}
          className="flex gap-2 border-primary text-primary"
        >
          {loading ? (
            <LoaderCircle className="animate-spin" />
          ) : (
            <>
              <Brain className="h-4 w-4" /> Generate from AI
            </>
          )}
        </Button>
      </div>
      <EditorProvider>
        <Editor
          value={value}
          onChange={(e) => {
            setValue(e.target.value); // Update local state
            onRichTextEditorChange(e); // Notify parent of changes
          }}
        >
          <Toolbar>
            <BtnBold />
            <BtnItalic />
            <BtnUnderline />
            <BtnStrikeThrough />
            <Separator />
            <BtnNumberedList />
            <BtnBulletList />
            <Separator />
            <BtnLink />
          </Toolbar>
        </Editor>
      </EditorProvider>
    </div>
  );
}

export default RichTextEditor;


















// import { Button } from '@/components/ui/button';
// import { ResumeInfoContext } from '@/context/ResumeInfoContext';
// import { Brain, LoaderCircle } from 'lucide-react';
// import React, { useContext, useState } from 'react'
// import { BtnBold, BtnBulletList, BtnClearFormatting, BtnItalic, BtnLink, BtnNumberedList, BtnStrikeThrough, BtnStyles, BtnUnderline, Editor, EditorProvider, HtmlButton, Separator, Toolbar } from 'react-simple-wysiwyg'
// import { AIChatSession } from './../../../../service/AIModel';
// import { toast } from 'sonner';
// const PROMPT='position titile: {positionTitle} , Depends on position title give me 5-7 bullet points for my experience in resume (Please do not add experince level and No JSON array) , give me result in HTML tags'
// function RichTextEditor({onRichTextEditorChange,index,defaultValue}) {
//     const [value,setValue]=useState(defaultValue);
//     const {resumeInfo,setResumeInfo}=useContext(ResumeInfoContext)
//     const [loading,setLoading]=useState(false);
//     const GenerateSummeryFromAI=async()=>{
     
//       if(!resumeInfo?.experience[index]?.title)
//       {
//         toast('Please Add Position Title');
//         return ;
//       }
//       setLoading(true)
//       const prompt=PROMPT.replace('{positionTitle}',resumeInfo.experience[index].title);
      
//       const result=await AIChatSession.sendMessage(prompt);
//       console.log(result.response.text());
//       const resp=result.response.text()
//       setValue(resp.replace('[','').replace(']',''));
//       setLoading(false);
//     }
  
//     return (
//     <div>
//       <div className='flex justify-between my-2'>
//         <label className='text-xs'>Summery</label>
//         <Button variant="outline" size="sm" 
//         onClick={GenerateSummeryFromAI}
//         disabled={loading}
//         className="flex gap-2 border-primary text-primary">
//           {loading?
//           <LoaderCircle className='animate-spin'/>:  
//           <>
//            <Brain className='h-4 w-4'/> Generate from AI 
//            </>
//         }
//          </Button>
//       </div>
//     <EditorProvider>
//       <Editor value={value} onChange={(e)=>{
//         setValue(e.target.value);
//         onRichTextEditorChange(e)
//       }}>
//          <Toolbar>
//           <BtnBold />
//           <BtnItalic />
//           <BtnUnderline />
//           <BtnStrikeThrough />
//           <Separator />
//           <BtnNumberedList />
//           <BtnBulletList />
//           <Separator />
//           <BtnLink />
         
         
//         </Toolbar>
//       </Editor>
//       </EditorProvider>
//     </div>
//   )
// }

// export default RichTextEditor