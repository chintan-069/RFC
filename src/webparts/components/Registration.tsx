/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import * as React from 'react';
import styles from '../rfc/components/Rfc.module.scss';
import { Button, Field, Input, Radio, RadioGroup, useId } from '@fluentui/react-components';
import { DatePicker, Label, Stack } from '@fluentui/react';
import { userSchema, validateData } from '../../Validation/ResgistrationSchema';
import { useFormContext } from '../../Context/Notes/NoteContext';
import { SPFI } from '@pnp/sp';
// import { sp } from './pnpconfig';
// import { useFormContext } from '../../../context';
// import { registration } from '../../../lib/Context/Notes/NoteContext';

// jarurat nathi .. context ma use karie to

interface errorprops {
    fullName?: string,
    address?: string,
    city?: string,
    state?: string,
    zip?: string,
    emailAddress?: string,
    primaryPhone?: string,
    altPhone?: string,
    dateOfBirth?: string,
    socSec?: string,
    MorS?: string,
    dependents?: string,
    emrContactname?: string,
    emrContact?: string,
    relationship?: string,
    local?: string,
    wage?: string,
    term?: string,
    dateofHire?: string,
    eVarifyDate?: string,
    number?: string
}
const Registration = ({ onNext, _sp, sp, listname }: { onNext: () => void, _sp: SPFI, sp: SPFI ,listname:string }) => {
    const { formData, setFormData } = useFormContext();
    const inputId = useId("input");
    const [errors, setErrors] = React.useState<errorprops>({
    });
    const createLibrary = async () => {
        // eslint-disable-next-line no-void
        await _sp.web.lists.add(`${formData.registration.fullName}`, '', 101)
            .then((_result: any) => {
                console.log(`Library created with name: ${formData.registration.fullName}`);
            });

    }


    const postData = async () => {
        // setIsPopupVisible(true);
        console.log("post");
        // setTimeout(async () => {
        // const checkin = (data.checkIn).toString();
        const iar = await sp.web.lists.getByTitle(`${listname}`).items.add({
            Title: "data",
            fullName: formData.registration.fullName,
            address: formData.registration.address,
            city: formData.registration.city,
            state: formData.registration.state,
            zip: formData.registration.zip,
            emailAddress: formData.registration.emailAddress,
            primaryPhone: formData.registration.primaryPhone,
            altPhone: formData.registration.altPhone,
            dateOfBirth: formData.registration.dateOfBirth,
            socSec: formData.registration.socSec,
            MorS: formData.registration.MorS,
            dependents: formData.registration.dependents,
            emrContactname: formData.registration.emrContactname,
            emrContact: formData.registration.emrContact,
            realtionship: formData.registration.relationship,
            local: formData.registration.local,
            wage: formData.registration.wage,
            term: formData.registration.term,
            dateofHire: formData.registration.dateofHire,
            eVarifyDate: formData.registration.eVarifyDate,
            number: formData.registration.number
        });
        console.log(iar);
        // setTimeout(() => {
        //   <PopupBasicExample toggleIsPopupVisible={toggleIsPopupVisible}/>
        // }, 2000);
        // }, 5000);

    }


    const handleSubmit = async (e: React.FormEvent) => {

        e.preventDefault();
        await validateData(formData.registration).then((res) =>
        (res.success ? (onNext(),
            createLibrary(),
            console.log("submit"),
            setTimeout(async () => {

                await postData()
            }, 2000))
            : setErrors(res.data)
        )).catch((err: React.SetStateAction<errorprops>) => setErrors(err))
        // console.log(result);
        // (result === true ? postData(formData) : setErrors(result));
        //   await validateData(formData).then((res) => (res.success ? postData(res.data) : setErrors(res.data))
        // ).catch(err => setErrors(err))
        // setErrors(result);

    }
    // console.log(handleSubmit());



    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        // setInputValue(prevState => ({ ...prevState, [name]: value }));
        // console.log(name, value);

        setFormData(prevState => ({
            ...prevState,
            // ...prevState.eventPlanning,  //cnotext state..
            registration: {
                ...prevState.registration,
                [name]: value
            }
        }));
        setErrors(prevError => ({ ...prevError, [name]: '' })); // Clear error for the current field

    };
    const _onDateChanged = (date: Date | null | undefined, text: string): void => {
        setFormData(prevState => ({
            ...prevState,
            // ...prevState.eventPlanning,  //cnotext state..
            registration: {
                ...prevState.registration,
                [text]: date
            }
        }));
    }

    const handleError = async (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        // console.log(name, value);
        try {

            await userSchema.validateAt(name, { [name]: value }, { strict: true })

            setErrors((previousError) => ({ ...previousError, [name]: undefined }))

        } catch (error) {
            // console.log(error);
            setErrors(previouError => ({ ...previouError, [name]: error.errors[0] }))

        }
        // setErrors({...errors, [name] : })
    }
    // for get items.

    // React.useEffect(() => {
    //     getlibrry().catch((er: any) => console.log(er)
    //     );
    // }, []);



    return (
        <>


            <form action="" onSubmit={handleSubmit}>
                <div>
                    <Label>
                        FULLNAME
                    </Label>
                    <Field validationMessage={errors && errors.fullName}>
                        <Input id={inputId} type='text' value={formData.registration.fullName} name='fullName' onChange={handleChange} onBlur={handleError} />
                    </Field>

                </div>
                {/* use address controll */}
                <div>
                    <Label>
                        ADDRESS
                    </Label>
                    <Field validationMessage={errors && errors.address}>
                        <Input id={inputId} type='text' value={formData.registration.address} name='address' onChange={handleChange} onBlur={handleError} />
                    </Field>
                </div>
                <div className={styles.officeUse}>
                    <div className={`${styles.edate} ${styles.margin20}`}>
                        <Label>
                            CITY
                        </Label>
                        <Field validationMessage={errors && errors.city}>
                            <Input id={inputId} type='text' value={formData.registration.city} name='city' onChange={handleChange} onBlur={handleError} />
                        </Field>
                    </div>
                    <div className={`${styles.edate} ${styles.margin20}`}>
                        <Label>STATE
                        </Label>
                        <Field validationMessage={errors && errors.state}>
                            <Input id={inputId} value={formData.registration.state} name='state' onChange={handleChange} onBlur={handleError} />
                        </Field>
                    </div>
                    <div className={styles.width100}>
                        <Label>
                            ZIP
                        </Label>
                        <Field validationMessage={errors && errors.zip}>
                            <Input id={inputId} type='text' onKeyDown={(e) => {
                                const isbackspace = e.key === 'Backspace';
                                const isNumber = /^[0-9]$/;
                                if (!isNumber.test(e.key) && !isbackspace) {
                                    e.preventDefault();
                                }
                            }} value={formData.registration.zip.toString()} name='zip' onChange={handleChange} onBlur={handleError} />
                        </Field>
                    </div>
                </div >
                <div>
                    <Label>EMAIL ADDRESS:
                    </Label>
                    <Field validationMessage={errors && errors.emailAddress}>
                        <Input id={inputId} type='text' value={formData.registration.emailAddress} name='emailAddress' onChange={handleChange} onBlur={handleError} />
                    </Field>
                </div>
                <div className={styles.officeUse}>
                    <div className={`${styles.margin20} ${styles.edate}`}>
                        <Label>
                            PRIMARY PHONE:
                        </Label>
                        <Field validationMessage={errors && errors.primaryPhone}>
                            <Input id={inputId} type='text' onKeyDown={(e) => {
                                const isbackspace = e.key === 'Backspace';
                                const isNumber = /^[0-9]$/;
                                if (!isNumber.test(e.key) && !isbackspace) {
                                    e.preventDefault();
                                }
                            }} value={formData.registration.primaryPhone.toString()} name='primaryPhone' onChange={handleChange} onBlur={handleError} />
                        </Field>
                    </div>
                    <div className={styles.edate}>
                        <Label>
                            ALT. PHONE:
                        </Label>
                        <Field validationMessage={errors && errors.altPhone}>
                            <Input id={inputId} type='text' onKeyDown={(e) => {
                                const isbackspace = e.key === 'Backspace';
                                const isNumber = /^[0-9]$/;
                                if (!isNumber.test(e.key) && !isbackspace) {
                                    e.preventDefault();
                                }
                            }} value={formData.registration.altPhone.toString()} name='altPhone' onChange={handleChange} onBlur={handleError} />
                        </Field>
                    </div>
                </div >
                {/* use date controll */}
                <div className={styles.officeUse} >
                    <div className={`${styles.edate} ${styles.margin20}`}>
                        <Label>
                            DATE OF BIRTH:
                        </Label>
                        <Field validationMessage={errors && errors.dateOfBirth}>
                            <DatePicker
                                allowTextInput
                                placeholder="Select a date..."
                                // className={styles.control}
                                onSelectDate={(date) => _onDateChanged(date, "dateOfBirth")}
                            />
                        </Field>
                    </div>
                    <div className={styles.edate}>
                        <Label>
                            SOC. SEC.#
                        </Label>
                        <Field validationMessage={errors && errors.socSec}>
                            <Input id={inputId} type='text' onKeyDown={(e) => {
                                const isbackspace = e.key === 'Backspace';
                                const isNumber = /^[0-9]$/;
                                if (!isNumber.test(e.key) && !isbackspace) {
                                    e.preventDefault();
                                }
                            }} value={formData.registration.socSec.toString()} name='socSec' onChange={handleChange} onBlur={handleError} />
                        </Field>
                    </div>
                </div>
                <div className={styles.officeUse}>
                    {/* // RADIO BUTTON */}
                    <div className={`${styles.margin20}`}>
                        <Label>
                            M OR S
                        </Label>
                        {/* <Input id={inputId} value={formData.registration.organization} name='MorS'  onChange={handleChange} onBlur={handleError} /> */}
                        <Field validationMessage={errors && errors.MorS}>
                            <RadioGroup layout="horizontal">
                                <Radio value="M" name='MorS' label="M" onChange={handleChange} />
                                <Radio value="S" name='MorS' label="S" onChange={handleChange} />
                            </RadioGroup>
                        </Field>
                    </div>
                    <div className={styles.edate}>
                        <Label>
                            #OF DEPENDENTS:
                        </Label>
                        <Field validationMessage={errors && errors.dependents}>
                            <Input id={inputId} type='text' onKeyDown={(e) => {
                                const isbackspace = e.key === 'Backspace';
                                const isNumber = /^[0-9]$/;
                                if (!isNumber.test(e.key) && !isbackspace) {
                                    e.preventDefault();
                                }
                            }} value={formData.registration.dependents.toString()} name='dependents' onChange={handleChange} onBlur={handleError} />
                        </Field>
                    </div>
                </div >
                <div>
                    <Label>
                        EMERGENCY CONTACT NAME:
                    </Label>
                    <Field validationMessage={errors && errors.emrContactname}>
                        <Input id={inputId} type='text' value={formData.registration.emrContactname} name='emrContactname' onChange={handleChange} onBlur={handleError} />
                    </Field>
                </div>
                <div className={styles.officeUse}>
                    <div className={`${styles.margin20} ${styles.edate}`}>
                        <Label>
                            EMERGENCY CONTACT#:
                        </Label>
                        <Field validationMessage={errors && errors.emrContact}>
                            <Input id={inputId} type='text' onKeyDown={(e) => {
                                const isbackspace = e.key === 'Backspace';
                                const isNumber = /^[0-9]$/;
                                if (!isNumber.test(e.key) && !isbackspace) {
                                    e.preventDefault();
                                }
                            }} value={formData.registration.emrContact.toString()} name='emrContact' onChange={handleChange} onBlur={handleError} />
                        </Field>
                    </div>
                    <div className={styles.edate}>
                        <Label>
                            RELATIONSHIP:
                        </Label>
                        <Field validationMessage={errors && errors.relationship}>
                            <Input id={inputId} type='text' value={formData.registration.relationship} name='relationship' onChange={handleChange} onBlur={handleError} />
                        </Field>
                    </div>
                </div >
                {/* date controll use */}
                <div>
                    <Label>
                        DATE OF HIRE:
                    </Label>
                    <Field validationMessage={errors && errors.dateofHire}>
                        <DatePicker
                            allowTextInput
                            placeholder="Select a date..."
                            // className={styles.control}
                            onSelectDate={(date) => _onDateChanged(date, "dateofHire")}
                        />
                    </Field>
                </div>
                <div className={styles.officeUse}>
                    <div className={`${styles.margin20} ${styles.edate}`}>
                        <Label>
                            LOCAL#:
                        </Label>
                        <Field validationMessage={errors && errors.local}>
                            <Input id={inputId} type='text' onKeyDown={(e) => {
                                const isbackspace = e.key === 'Backspace';
                                const isNumber = /^[0-9]$/;
                                if (!isNumber.test(e.key) && !isbackspace) {
                                    e.preventDefault();
                                }
                            }} value={formData.registration.local.toString()} name='local' onChange={handleChange} onBlur={handleError} />
                        </Field>
                    </div>
                    <div className={`${styles.margin20} ${styles.edate}`}>
                        <Label>
                            WAGE/$:
                        </Label>
                        <Field validationMessage={errors && errors.wage}>
                            <Input id={inputId} type='text' onKeyDown={(e) => {
                                const isbackspace = e.key === 'Backspace';
                                const isNumber = /^[0-9]$/;
                                if (!isNumber.test(e.key) && !isbackspace) {
                                    e.preventDefault();
                                }
                            }} value={formData.registration.wage.toString()} name='wage' onChange={handleChange} onBlur={handleError} />
                        </Field>
                    </div>
                    <div className={styles.width100}>
                        <Label>
                            TERM/% :
                        </Label>
                        <Field validationMessage={errors && errors.term}>
                            <Input id={inputId} type='text' onKeyDown={(e) => {
                                const isbackspace = e.key === 'Backspace';
                                const isNumber = /^[0-9]$/;
                                if (!isNumber.test(e.key) && !isbackspace) {
                                    e.preventDefault();
                                }
                            }} value={formData.registration.term.toString()} name='term' onChange={handleChange} onBlur={handleError} />
                        </Field>
                    </div>
                </div >
                <hr className={styles.breeaklines} />
                <div>
                    <h4 className={styles.red}>REQUIRED FOR RELEASE OF PAYCHECK:</h4>
                    <h4>COPY OF DRIVERS LICENSE</h4>
                    <h4>COPY OF SOCIAL SECURITY CARD</h4>
                    <h4>COPY OF OSHA CARD</h4>
                    <h4>MAKE SURE EMPLOYEE IS CLEARED TO WORK/IS IN GOOD STANDING WITH UNION IF ALREADY A MEMBER</h4>
                    <h4>W-4 FILLED OUT, SIGNED</h4>
                    <h4>1-9 FILLED OUT, SIGNED</h4>
                </div>
                <hr className={styles.breeakline} />
                {/* add labels for instruction. */}
                {/* date use karna he.. */}
                <div className={styles.officeUse}>
                    <div className={`${styles.edate} ${styles.margin20} `}>
                        <Label>E-VERIFY DATE:
                        </Label>
                        <Field validationMessage={errors && errors.eVarifyDate}>
                            <DatePicker
                                allowTextInput
                                placeholder="Select a date..."
                                // className={styles.control}
                                // onSelect={handleChange}
                                onSelectDate={(date) => _onDateChanged(date, "eVarifyDate")}
                            />
                        </Field>
                    </div>
                    <div className={styles.edate}>
                        <Label>
                            NUMBER :
                        </Label>
                        <Field validationMessage={errors && errors.number}>
                            <Input id={inputId} type='text' value={formData.registration.number.toString()} name='number' onChange={handleChange} onBlur={handleError} onKeyDown={(e) => {
                                const isbackspace = e.key === 'Backspace';
                                const isNumber = /^[0-9]$/;
                                if (!isNumber.test(e.key) && !isbackspace) {
                                    e.preventDefault();
                                }
                            }} />
                        </Field>
                    </div>
                </div >
                <Stack style={{display:'flex',alignItems: 'flex-end',justifyContent:'flex-end',padding:10}}>

                    <Button onClick={handleSubmit}>Next</Button>
                </Stack>
            </form >



        </>
    );
}

export default Registration;