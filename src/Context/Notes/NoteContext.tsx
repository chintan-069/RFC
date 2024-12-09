// import * as React from "react";
// import { createContext, useState } from "react";

// // const defaultvalue = {}

// const formContext = createContext();

// interface FormProviderProps{
//     children:React.ReactNode
// }

// export const FormProvider:React.FC<FormProviderProps> = ({ children }) => {
//     const [formData, setFormData] = useState({
//       firstPage: { name: '', email: '', typeOfFunctions: '' },
//       secondPage: { numberOfPeople: '', guestBreakdown: '', nonDrinkers: '', averageAge: '', typeOfEvent: '' },
//       thirdPage: { timeOfDate: '', eventLength: '', calendar: '', expenditureRange: '' },
//     });
    
//     return (
//         <formContext.Provider value={{ formData, setFormData }}>
//           {children}
//         </formContext.Provider>
//       );
//     }
    
        
        
      
// // export default formContext

  // export const useformContext = ()=>React.useContext(formContext)
  import * as React from  'react'
  import  { createContext, ReactNode, useContext, useState, Dispatch, SetStateAction } from 'react';
  // import Thankyou from '../../../lib/webparts/helloworld/child comeponent/Thankyou';

  // Define types for the form data
  export interface FirstPageData {
    name: string;
    email: string;
    // typeOfFunctions: string;
    calendar: string;
  }

  export interface WI4 {
    getimageWI4: string 

  }

  export interface I_9 {
    getimageI_9: string
  }
  export interface Policy {
    getimagePolicy: string
  }
  export interface registration{
    fullName: string,
    address: string,
    city: string,
    state: string,
    zip: string,
    emailAddress: string,
    primaryPhone: string,
    altPhone: string,
    dateOfBirth: string | Date,
    socSec: string,
    MorS: string,
    dependents: string,
    emrContactname: string,
    emrContact: string,
    relationship: string,
    local: string,
    wage: string,
    term: string,
    dateofHire: string,
    eVarifyDate: string,
    number: string
  }
  export interface ThankyouPageData {
    total: number;
  }

  // Define FormData as a combination of FirstPageData, SecondPageData, and I_9
  export interface FormData {
    WI4: WI4;
    I_9: I_9;
    Policy: Policy;
    registration : registration
  }

  // Define the context type
  export default interface FormContextType {
    formData: FormData;
    setFormData: Dispatch<SetStateAction<FormData>>;
  }

  // Create the context with an initial value of undefined
  const FormContext = createContext<FormContextType | undefined>(undefined);

  // Define props for the FormProvider component
  interface FormProviderProps {
    children: ReactNode;    
  }

  // FormProvider component to provide FormContext to its children
  export const FormProvider: React.FC<FormProviderProps> = ({ children }) => {
    // State to manage form data
    const [formData, setFormData] = useState<FormData>({
      // firstPage: { name: '', email: '', calendar: ''}, // typeOfFunctions: '' },
      WI4: {getimageWI4: '' },
      // secondPage: { numberOfPeople: '', guestBreakdown: '', nonDrinkers: '', averageAge: '', typeOfEvent: '', },
      I_9: {getimageI_9: '' },
      Policy:{getimagePolicy:''},
      registration:{
        fullName: "",
        address: "",
        city: "",
        state: "",
        zip: "",
        emailAddress: "",
        primaryPhone: "",
        altPhone: "",
        dateOfBirth: "",
        socSec: "",
        MorS: "",
        dependents: "",
        emrContactname: "",
        emrContact: "",
        relationship: "",
        local: "",
        wage: "",
        term: "",
        dateofHire: "",
        eVarifyDate: "",
        number: ""
      }
    });

       


//  console.log(formData.firstPage.name,"name is");
 

    






    // Provide formData and setFormData through the FormContext.Provider
    return (
      <FormContext.Provider value={{ formData, setFormData }}>
        {children}
      </FormContext.Provider>
    );
  };

  // Custom hook to use FormContext
  export const useFormContext = (): FormContextType => {
    const context = useContext(FormContext);
    if (!context) {
      throw new Error('useFormContext must be used within a FormProvider');
    }
    return context;
  };


