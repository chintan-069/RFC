/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { object, string } from 'yup';
import * as yup from 'yup';

export const userSchema = object().shape({
    fullName: string().required("fullName is required").trim(),
    address: string().required("address is required").trim(),
    city: string().required("city is required").trim(),
    state: string().required("state is required").trim(),
    emrContactname: string().required("emrContactname is required").trim(),
    relationship: string().required("relationship is required").trim(),
    zip: string().required("zip is required").max(6),
    primaryPhone: string().required("primary phone is required").max(10),
    altPhone: string().required("alt phone is required").max(10),
    socSec: string().required("soc Sec is required").max(10),
    dependents: string().required("dependents is required").max(100),
    emrContact: string().required("emergency Contact is required").max(10),
    local: string().required("local is required").max(6),
    wage: string().required("wage is required").max(6),
    term: string().required("term is required").max(6),
    number: string().required("number is required").max(10),
    emailAddress: string().email().required('email is required').matches(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/, 'invalid email address').trim(),
    dateOfBirth: string().required("dateOfBirth is required"),
    MorS: string().required(),
    dateofHire: string().required(),
    eVarifyDate: string().required()
});

// const user = await userSchema.validate(data);
export const validateData = async (data: any) => {
    try {
        await userSchema.validate(data, { abortEarly: false });
        // SubmitData(formData);
        // console.log(true);

        return { data: data, success: true };

    } catch (error) {
        const errors: Record<string, string> = {};

        (error.inner as yup.ValidationError[]).forEach((error: yup.ValidationError) => {
            const fieldName = error.path as keyof Record<string, string>;
            const errorMessage = error.message;

            errors[fieldName] = errorMessage;
        });
        // setErrors(errors);
        return { data: errors, success: false };

    }
}