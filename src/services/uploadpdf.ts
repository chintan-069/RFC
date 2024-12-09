// // /* eslint-disable @typescript-eslint/explicit-function-return-type */
// // /* eslint-disable @typescript-eslint/no-explicit-any */

// // import { SPHttpClient } from '@microsoft/sp-http';
// import { SPHttpClient } from '@microsoft/sp-http';
// import { Context } from 'react';

// // const fetchPdf = async (libname:any, context : any, filename : any) => {
// //     console.log(libname);
// //             const spopts = {
// //                 headers: {
// //                     "Accept": "application/json",
// //                     "Content-Type":"application/json"
// //                 },
// //                 body: libname
// //               }
  
// //           const url = `${context.pageContext.web.absoluteUrl}/_api/Web/Lists/getByTitle('${libname}')/RootFolder/Files/Add(url='${filename}.pdf',overwrite=true)`;
// //           // root folder ma folder banain karva..
// //           // cons url = `${context.pageContext.web.absoluteUrl}/_api/Web/Lists/getByTitle('Documents')/RootFolder/Folders('WI4')/Files/Add(url='Abcsd.pdf',overwrite=true)`;

// //           try {
// //               const response = await context.spHttpClient.post(url, SPHttpClient.configurations.v1, spopts);
// //               const responseJSON = await response.json();
// //               console.log(responseJSON.Name);
// //           } catch (err) {
// //               console.error("Error uploading file: ", err);
// //             //   setUploadError('Error uploading file. Check console for details.');
// //           }

// //         }

// // export default fetchPdf;

// const uploadFile = async (e:any,context:any,id:string) => {
//   e.preventDefault();
//       const files = (document.getElementById(`${id}`) as HTMLInputElement).files;
      
//       if (!files || files.length === 0) {
//           window.alert('No file selected for upload.');
//           return;
//       }
  
//       for (let i = 0; i < files.length; i++) {
//           const file = files[i];
//           const spopts = {
//               headers: {
//                   "Accept": "application/json",
//                   "Content-Type": "application/json"
//               },
//               body: file
//           };
  
//           const url = `${context.pageContext.web.absoluteUrl}/_api/Web/Lists/getByTitle('${formData.registration.fullName}')/RootFolder/Files/Add(url='WI4.pdf',overwrite=true)`;
          
  
  
//           try {
//               const response = await context.spHttpClient.post(url, SPHttpClient.configurations.v1, spopts);
//               const responseJSON = await response.json();
//               console.log(responseJSON.Name);
//               onNext();
//           } catch (err) {
//               console.error("Error uploading file: ", err);
//               setUploadError('Error uploading file. Check console for details.');
//           }
//       }
//     }