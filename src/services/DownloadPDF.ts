/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-explicit-any */
// import { WebPartContext } from '@microsoft/sp-webpart-base';
// import { SPHttpClient, SPHttpClientResponse, SPHttpClientConfiguration } from '@microsoft/sp-http';

// import { WebPartContext } from '@microsoft/sp-webpart-base';
import { SPFI } from "@pnp/sp";
import "@pnp/sp/files";
import "@pnp/sp/folders";
// import { WebPartContext } from "@microsoft/sp-webpart-base";


// import { SPHttpClientResponse, SPHttpClient } from "@microsoft/sp-http";

// const DownloadFileFromSharepointLibrary = async (fileName: string,context:any, libraryname:string) => {
//     const url = `${context.pageContext.web.absoluteUrl}/_api/web/getfolderbyserverrelativeurl('/${libraryname}/${fileName}')/$value`;
//     console.log(url);


//     try {
//       const response: SPHttpClientResponse = await context.spHttpClient.get(url, SPHttpClient.configurations.v1);

//       if (!response.ok) {
//         throw new Error(`Error fetching file: ${response.statusText}`);
//       }

//       const blob = await response.blob();
//       const downloadUrl = window.URL.createObjectURL(blob);
//       const a = document.createElement('a');
//       a.href = downloadUrl;
//       a.download = fileName;
//       document.body.appendChild(a);
//       a.click();
//       a.remove();
//       window.URL.revokeObjectURL(downloadUrl);
//     } catch (err) {
//       console.error("Error downloading file: ", err);
//     //   setDownloadError('Error downloading file. Check console for details.');
//     }
//   };

//   export default DownloadFileFromSharepointLibrary

//  const getListData = async(): Promise < SPList > {

//     const response = await this.context.spHttpClient.get(this.context.pageContext.web.absoluteUrl +

//     "/_api/web/Lists/GetByTitle('docs')/Items?$select-priority, File/Name, FieldValuesAsText/FileRef&$expand=FieldValuesAsText, File", SPHttpClient.configurations.v1);

//     return response.json();
//     }





// const response = await context.spHttpClient.get(context.pageContext.web.absoluteUrl + "/_api/web/Lists/GetByTitle('docs')/Items?$select-priority, File/Name, FieldValuesAsText/FileRef&$expand=FieldValuesAsText, File", SPHttpClient.configurations.v1);

// return response.json();

// export async function DownloadFileFromSharepointLibrary(fileName: string, context: any, libraryName: string) {
//     try {
//       const file = await context.web.getFolderByServerRelativeUrl(`/${libraryName}`).files.getByName(fileName).getBlob();


//       // Create a link element
//       const link = document.createElement("a");
//       link.href = window.URL.createObjectURL(file);
//       link.download = fileName;

//       // Append to the document and trigger the download
//       document.body.appendChild(link);
//       link.click();

//       // Clean up and remove the link
//       link.parentNode?.removeChild(link);
//     } catch (error) {
//       console.error("Error downloading file:", error);
//     }
//   }

// export interface IType{
//     context: WebPartContext
// }



const DownloadFileFromSharepointLibrary = async (sp: SPFI, context: any, libraryName: string, fileName: string) => {
  // const DownloadFileFromSharepointLibrary = async () => {
  // try {
  //   const file = sp.web
  //     .getFolderByServerRelativePath(`${context.pageContext.web.serverRelativeUrl}/${libraryName}`)
  //     .files.getByUrl(`${context.pageContext.web.serverRelativeUrl}/${libraryName}/${fileName}`);

  //   const fileBlob = await file.getBlob();

  //   const url = window.URL.createObjectURL(fileBlob);
  //   const a = document.createElement("a");
  //   a.style.display = "none";
  //   a.href = url;
  //   a.download = `${fileName}`;
  //   document.body.appendChild(a);
  //   a.click();
  //   window.URL.revokeObjectURL(url);
  // } catch (error) {
  //   console.error("Error downloading file: ", error);
  // }
  const arrayBufferToBase64 = (buffer: ArrayBuffer): string => {
    let binary = '';
    const bytes = new Uint8Array(buffer);
    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
  };

  try {
    // Construct the server-relative URL for the file
    // const fileUrl = `${context.pageContext.web.serverRelativeUrl}/${libraryName}/${fileName}`;
    const fileUrl = `${context.pageContext.web.serverRelativeUrl}/${libraryName}/${fileName}`;
    console.log("Constructed File URL: ", fileUrl);

    // Fetch the file as an array buffer
    const file = await sp.web.getFileByServerRelativePath(fileUrl).getBuffer();

    // Convert the array buffer to a base64 string
    const base64String = arrayBufferToBase64(file);

    // Create a data URL for the base64 string
    const dataUrl = `data:application/octet-stream;base64,${base64String}`;
    console.log("Data URL: ", dataUrl);

    // Create an anchor element and trigger the download
    const a = document.createElement("a");
    a.style.display = "none";
    a.href = dataUrl;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();

    // Cleanup
    document.body.removeChild(a);  // Clean up the DOM
  } catch (error) {
    console.error("Error downloading file: ", error);
  }
};

// Helper function to convert an ArrayBuffer to a Base64 string

export default DownloadFileFromSharepointLibrary;



// const getPDFFile = async (libraryName: string, context: WebPartContext, fileName: string) => {
//   try {
//     const response: SPHttpClientResponse = await context.spHttpClient.get(
//         `${context.pageContext.web.absoluteUrl}/_api/web/getfilebyserverrelativeurl('/${libraryName}/${fileName}')/$value`,
//         SPHttpClient.configurations.v1,
//         { headers: { 'Accept': 'application/pdf' } }
//       );
//     if (response.ok) {
//       const blob = await response.blob();
//       const downloadUrl = window.URL.createObjectURL(blob);
//       const a = document.createElement('a');
//       a.href = downloadUrl;
//       a.download = fileName;
//       document.body.appendChild(a);
//       a.click();
//       window.URL.revokeObjectURL(downloadUrl);
//     } else {
//       console.error('Error fetching file:', response.statusText);
//     }
//   } catch (err) {
//     console.error('Error:', err);
//   }
// };

// export default getPDFFile;
