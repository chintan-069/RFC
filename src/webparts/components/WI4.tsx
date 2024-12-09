// import * as React from 'react'

// const WI4 = () => {
//   return (
//     <div>WI4</div>
//   )
// }

// export default WI4
/* eslint-disable @typescript-eslint/no-explicit-any */
// import * as React from 'react'

// const I_9 = () => {
//   return (
//     <div>I_9</div>
//   )
// }

// export default I_9


// /* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { IconButton, PrimaryButton, Stack } from '@fluentui/react';
import * as React from 'react';
import { useFormContext } from '../../Context/Notes/NoteContext';
// import fetchPdf from '../../services/uploadpdf';
import DownloadFileFromSharepointLibrary from '../../services/DownloadPDF';
import { SPHttpClient } from '@microsoft/sp-http';
// import styles from '../../../lib/webparts/tabindex/components/Tabindex.module.scss';
// import { userSchema } from '../../library';

// import { SPFI } from "@pnp/sp/presets/all";
// import { useEffect } from 'react';
// import { SPHttpClient } from '@microsoft/sp-http';
interface SecondPageProps {
  onNext: () => void;
  onPrevious: () => void;
  context: any;
  _sp :any;
}


const WI4: React.FC<SecondPageProps> = ({ onNext, onPrevious, context,_sp }) => {

  const { formData} = useFormContext();
 const [UploadError, setUploadError] = React.useState("")
  // console.log(typeof(sp));
  

  // const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {

  //   const file = e.target.files?.[0];
  //   const reader = new FileReader();
  //  console.log(file, "file", reader,"reader");
   
  //   reader.onload = () => {

  //     if (reader.result) {
  //       // setimages(reader.result);
  //       setFormData((preve: any) => ({
  //         ...preve,
  //         WI4: { getimageWI4: reader.result as string }
  //       }))
        
  //       // console.log(reader.result);        
  //     }
  //     else{
  //       setUploadError("Please select an PDF")
  //     }
  //   };

  //   if (file) {
  //     reader.readAsDataURL(file);
  //   }
  //   else{
  //     setUploadError("Select valid PDF")
  //   }
  //   return 
  // };


  const uploadFile = async (e: React.FormEvent) => {
    e.preventDefault();
        const files = (document.getElementById('Uploadfile') as HTMLInputElement).files;
        
        if (!files || files.length === 0) {
            setUploadError('No file selected for upload.');
            return;
        }
    
        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            const spopts = {
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                body: file
            };
    
            const url = `${context.pageContext.web.absoluteUrl}/_api/Web/Lists/getByTitle('${formData.registration.fullName}')/RootFolder/Files/Add(url='WI4.pdf',overwrite=true)`;
            
    
    
            try {
                const response = await context.spHttpClient.post(url, SPHttpClient.configurations.v1, spopts);
                const responseJSON = await response.json();
                console.log(responseJSON.Name);
                onNext();
            } catch (err) {
                console.error("Error uploading file: ", err);
                setUploadError('Error uploading file. Check console for details.');
            }
        }
      }
            // const validation =
            
            // const onAddItem = async (e: React.FormEvent<HTMLFormElement>) => {
            //  e.preventDefault()
            //   // Proceed with form submission or API call
            //   if(formData.WI4.getimageWI4){
            //   fetchPdf(formData.registration.fullName, context, "WI4")
            //     .then()
            //     .catch((err: any) => setUploadError(err));
            //      onNext()
            //   }
            //   else{
            //     setUploadError("please select an image")
            //   }
            //   };
            console.log(formData, "image data");


  return (
    <>
    <form onSubmit={uploadFile}>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        {/* <form onClick={onAddItem} >
        <h1>Second page</h1>
      </form> */}
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 39 }}>
        <Stack verticalFill style={{display:'flex',gap:5, alignItems :'flex-start'}}>
        <PrimaryButton onClick={async() => {
          await DownloadFileFromSharepointLibrary(_sp ,context,"RFCMasterDocuments","WI4.pdf");
          // await DownloadFileFromSharepointLibrary(_sp ,context,'aman',"WI4.pdf");
        }}>Download (WI-4)Document</PrimaryButton>   
          <IconButton iconProps={{ iconName: 'Upload' }} style={{ width: "auto", backgroundColor: 'white',marginTop:"10px",border:"1px solid black" }} onClick={() => {
            const res: any = document.querySelector('input[type="file"]')
            if (res) {
              res.click()
            }
          }} > <span>Upload (WI-4)Document</span></IconButton>

          <input type="file"  id='Uploadfile' style={{ display: 'none' }} />
          {UploadError && <p style={{ color: 'red' }}>{UploadError}</p>}

          </Stack>
          <Stack verticalFill style={{display:'flex', alignItems :'center', justifyContent:"flex-end"}}>
      
            {/* <PrimaryButton type="button" onClick={onPrevious}>Previous</PrimaryButton> */}
            <PrimaryButton type="submit">Next</PrimaryButton>
          </Stack>
        </div>
      </div>
          </form>
    </>
  );

}

export default WI4;



// you can use beolow method to upload file in sharepoint library
//1) what below code is do, it get the input file threw getelementById and
//2) above uncommneted code is get the file from Context and which we stored using handlechange method 



// import * as React from 'react'
// import { SPHttpClient } from '@microsoft/sp-http';
// import { Context } from 'react';


// const Tabindex = (props:any) => {

//   const [uploadError, setUploadError] = React.useState('');

//   const uploadFile = async () => {

//     const files = (document.getElementById('Uploadfile') as HTMLInputElement).files;
    
//     if (!files || files.length === 0) {
//         setUploadError('No file selected for upload.');
//         return;
//     }

//     for (let i = 0; i < files.length; i++) {
//         const file = files[i];
//         const spopts = {
//             headers: {
//                 "Accept": "application/json",
//                 "Content-Type": "application/json"
//             },
//             body: file
//         };

//         const url = `${props.context.pageContext.web.absoluteUrl}/_api/Web/Lists/getByTitle('Documents')/RootFolder/Folders('WI4')/Files/Add(url='${file.name}',overwrite=true)`;
        
//

//         try {
//             const response = await props.context.spHttpClient.post(url, SPHttpClient.configurations.v1, spopts);
//             const responseJSON = await response.json();
//             console.log(responseJSON.Name);
//         } catch (err) {
//             console.error("Error uploading file: ", err);
//             setUploadError('Error uploading file. Check console for details.');
//         }
//     }
//   }
//   return (<>


//     <div>Tabindex</div>
//         <div>
//           <input type="file" id="Uploadfile" multiple />
//           <button onClick={uploadFile}>Upload File</button>
//           {uploadError && <p style={{ color: 'red' }}>{uploadError}</p>}
//         </div>

    
//   </>
//   )
// }

// export default Tabindex



// 
// this is the second method to upload dodument sharepoint library

// const uploadFile = async () => {

//   const files = (document.getElementById('Uploadfile') as HTMLInputElement).files;
  
//   if (!files || files.length === 0) {
//       setUploadError('No file selected for upload.');
//       return;
//   }

//   for (let i = 0; i < files.length; i++) {
//       const file = files[i];
//       const spopts = {
//         headers: {
//           "Accept": "application/json;odata=verbose", // Ensure correct headers for SharePoint
//           "Content-Length": file.size.toString()
//         },
//           body: file
//       };

//       const url = `${props.context.pageContext.web.absoluteUrl}/_api/Web/Lists/getByTitle('Documents')/RootFolder/Folders('WI')/Files/Add(url='${file.name}',overwrite=true)`;

//       try {
//         const response: SPHttpClientResponse = await props.context.spHttpClient.post(url, SPHttpClient.configurations.v1, spopts);
//         const responseJSON = await response.json();
//         console.log('Full response JSON:', responseJSON);

//         if (responseJSON && responseJSON.d && responseJSON.d.Name) {
//           console.log('Uploaded file name:', responseJSON.d.Name);
//         } else {
//           console.warn('Unexpected response structure:', responseJSON);
//         }
//       } catch (err) {
//         console.error("Error uploading file: ", err);
//         setUploadError('Error uploading file. Check console for details.');
//       }
//   }
// }