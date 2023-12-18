"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { z } from "zod";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { FormDataSchema } from "@/lib/schema";


type Inputs = z.infer<typeof FormDataSchema>;

const stages = [
    { 
        id: "Stage 1", 
        name: "Personal Information",
        fields: ["firstName","lastName","birthdate","nationality","email","phoneNumber"]
    },
    { 
        id: "Stage 2", 
        name: "Travel Preferences",
        fields: ["depDate","retDate","accPre","specialReq"]
    },
    { 
        id: "Stage 3", 
        name: "Health and Safety",
        fields: ["healthDec","emergencyEmail", "emergencyPhoneNumber","medConditions"]
    },
    { id: "Stage 4", name: "Completion"},   
];

export default function Form() {
    const [previousStage, setPreviousStage] = useState(0);
    const [currentStage, setCurrentStage] = useState(0);
    const delta = currentStage - previousStage;

    const {
        register,
        handleSubmit,
        trigger,
        formState: { errors }
    } = useForm<Inputs>({
        resolver: zodResolver(FormDataSchema)
    });

    const processForm: SubmitHandler<Inputs> = data => { //submission 
        console.log(data);
        alert("Check console for the data");
        //reset();
    };

    type FieldName = keyof Inputs

    const next = async () => {
        const fields = stages[currentStage].fields;
        const output = await trigger(fields as FieldName[], { shouldFocus: true });

        if (!output) return;

        if (currentStage < stages.length - 1) {
            if (currentStage === stages.length - 2) {
            await handleSubmit(processForm)();
            }
            setPreviousStage(currentStage);
            setCurrentStage(stage => stage + 1);
        }
    };

    const prev = () => {
    if (currentStage > 0) {
        setPreviousStage(currentStage);
        setCurrentStage(stage => stage - 1);
    }
    };

    return (
        <section className='absolute inset-0 flex flex-col justify-between p-24'>
            {/* Navigation for the stages */}
            <div className="mt-8 pt-5">
                <div className="">
                    <nav aria-label='Progress'>
                        <ol role='list' className='space-y-4 md:flex md:space-x-8 md:space-y-0'>
                        {stages.map((stage, index) => (
                            <li key={stage.name} className='md:flex-1'>
                            {currentStage > index ? ( //previous highlighted nav items 
                                <div className='group flex w-full flex-col border-l-4 border-sky-600 py-2 pl-4 transition-colors md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4'>
                                    <span className='text-sm font-medium text-sky-600 transition-colors '>
                                        {stage.id}
                                    </span>
                                    <span className='text-sm font-medium'>{stage.name}</span>
                                </div>
                            ) : currentStage === index ? ( //current highlighted nav items 
                                <div className='flex w-full flex-col border-l-4 border-sky-600 py-2 pl-4 md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4'>
                                    <span className='text-sm font-medium text-sky-600'>
                                        {stage.id}
                                    </span>
                                    <span className='text-sm font-medium'>{stage.name}</span>
                                </div>
                            ) : ( //future greyed out nav items 
                                <div className='group flex w-full flex-col border-l-4 border-gray-200 py-2 pl-4 transition-colors md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4'>
                                    <span className='text-sm font-medium text-gray-500 transition-colors'>
                                        {stage.id}
                                    </span>
                                    <span className='text-sm font-medium'>{stage.name}</span>
                                </div>
                            )}
                            </li>
                        ))}
                        </ol>
                    </nav>
                </div>
            </div>

            <form className='mt-12 py-12' onSubmit={handleSubmit(processForm)}>
                {/* Stage 1 */}
                {currentStage === 0 && (
                <motion.div
                    initial={{ x: delta >= 0 ? "50%" : "-50%", opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                    <h2 className='text-base font-semibold leading-7 text-gray-900'>
                    Personal Information
                    </h2>
                    <p className='mt-1 text-sm leading-6 text-gray-600'>
                    Providing accurate personal information is crucial for participant identification and coordination. 
                    This section gathers essential details necessary for accurate identification and communication purposes.
                    </p>
                    <div className='mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6'>
                        <div className='sm:col-span-3'>
                            <label
                                htmlFor='firstName'
                                className='block text-sm font-medium leading-6 text-gray-900'
                            >
                                First name
                            </label>
                            <div className='mt-2'>
                                <input
                                    type='text'
                                    id='firstName'
                                    {...register("firstName")}
                                    autoComplete='given-name'
                                    className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6'
                                />
                                {errors.firstName?.message && (
                                    <p className='mt-2 text-sm text-red-400'>
                                    {errors.firstName.message}
                                    </p>
                                )}
                            </div>
                        </div>

                        <div className='sm:col-span-3'>
                            <label
                                htmlFor='lastName'
                                className='block text-sm font-medium leading-6 text-gray-900'
                            >
                                Last name
                            </label>
                            <div className='mt-2'>
                                <input
                                    type='text'
                                    id='lastName'
                                    {...register("lastName")}
                                    autoComplete='family-name'
                                    className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6'
                                />
                                {errors.lastName?.message && (
                                    <p className='mt-2 text-sm text-red-400'>
                                    {errors.lastName.message}
                                    </p>
                                )}
                            </div>
                        </div>
                        
                        <div className='sm:col-span-3'>
                            <label htmlFor='birthdate' className='block date-sm font-medidum leading-3 text-grey-900'>
                                Date of Birth
                            </label>
                            <div className='mt-2'>
                                <input 
                                    id='birthdate'
                                    type='date'
                                    {...register("birthdate")}
                                    autoComplete='date'
                                    className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6'
                                />
                                {errors.birthdate?.message && (
                                    <p className='mt-2 text-sm text-red-400'>
                                    {errors.birthdate.message}
                                    </p>
                                )}
                            </div>
                        </div>
                        
                        <div className='sm:col-span-3'>
                            <label htmlFor='nationality' className='block date-sm font-medidum leading-3 text-grey-900'>
                                Nationality
                            </label>
                            <div className='mt-2'>
                                <input 
                                    id='nationality'
                                    type='string'
                                    {...register("nationality")}
                                    autoComplete='nationality'
                                    className='p-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6'
                                />
                                {errors.nationality?.message && (
                                    <p className='mt-2 text-sm text-red-400'>
                                    {errors.nationality.message}
                                    </p>
                                )}
                            </div>
                        </div>

                        <div className='sm:col-span-3'>
                            <label
                                htmlFor='email'
                                className='block text-sm font-medium leading-6 text-gray-900'
                            >
                                Email address
                            </label>
                            <div className='mt-2'>
                                <input
                                    id='email'
                                    type='email'
                                    {...register("email")}
                                    autoComplete='email'
                                    className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6'
                                />
                                {errors.email?.message && (
                                    <p className='mt-2 text-sm text-red-400'>
                                    {errors.email.message}
                                    </p>
                                )}
                            </div>
                        </div>

                        <div className='sm:col-span-3'>
                            <label
                                htmlFor='phoneNumber'
                                className='block text-sm font-medium leading-6 text-gray-900'
                            >
                                Phone Number
                            </label>
                            <div className='mt-2'>
                                <input
                                    type='text'
                                    id='phoneNumber'
                                    {...register("phoneNumber")}
                                    autoComplete='given-name'
                                    className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6'
                                />
                                {errors.phoneNumber?.message && (
                                    <p className='mt-2 text-sm text-red-400'>
                                    {errors.phoneNumber.message}
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                </motion.div>
                )}
                {/* Stage 2 */}
                {currentStage === 1 && (
                <motion.div
                    initial={{ x: delta >= 0 ? "50%" : "-50%", opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                    <h2 className='text-base font-semibold leading-7 text-gray-900'>
                    Travel Preferences
                    </h2>
                    <p className='mt-1 text-sm leading-6 text-gray-600'>
                    The Travel Preference section allows you to indicate your preferred departure and return dates, 
                    as well as specify accommodation preferences. 
                    Your choices contribute to customizing travel arrangements for your comfort.
                    </p>
                    <div className='mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6'>
                        <div className="flex items-center sm:col-span-5">
                            <div className="relative">
                                <input id="start" type="date" {...register("depDate")} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Select date start">
                                </input>
                                {errors.depDate?.message && (
                                    <p className='mt-2 text-sm text-red-400'>
                                    {errors.depDate.message}
                                    </p>
                                )}
                            </div>
                            
                            <span className="relative mx-4">Depature Date to Return Date</span>
                            <div className="relative">
                                <input id="end" type="date" {...register("retDate")} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Select date end">
                                </input>
                                {errors.retDate?.message && (
                                    <p className='mt-2 text-sm text-red-400'>
                                    {errors.retDate.message}
                                    </p>
                                )}    
                            </div>
                        </div>
                        
                        
                        <div className='sm:col-span-5'>
                            <label htmlFor='accPre' className='block date-sm font-medidum leading-3 text-grey-900'>
                                Accommodation Preference 
                            </label>
                            <div className='mt-2'>
                                <input 
                                    id='accPre'
                                    type='string'
                                    {...register("accPre")}
                                    autoComplete='space-hotel'
                                    placeholder='Enter either [Space Hotel] or [Martian Base]'
                                    className='p-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6'
                                />
                                {errors.accPre?.message && (
                                    <p className='mt-2 text-sm text-red-400'>
                                    {errors.accPre.message}
                                    </p>
                                )}
                            </div>
                        </div>
                        
                        <div className='sm:col-span-5'>
                            <label htmlFor='specialReq' className='block date-sm font-medidum leading-3 text-grey-900'>
                                Special Requests or Preferences
                            </label>
                            <div className='mt-2'>
                                <textarea 
                                    id='specialReq'
                                    {...register("specialReq")}
                                    rows={4}
                                    placeholder="Write your requests here..."
                                    className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6'
                                />
                                {errors.specialReq?.message && (
                                    <p className='mt-2 text-sm text-red-400'>
                                    {errors.specialReq.message}
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                </motion.div>
                )}
                {/* Stage 3 */}
                {currentStage === 2 && (
                <motion.div
                    initial={{ x: delta >= 0 ? "50%" : "-50%", opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                    <h2 className='text-base font-semibold leading-7 text-gray-900'>
                    Health and Safety
                    </h2>
                    <p className='mt-1 text-sm leading-6 text-gray-600'>
                    Ensuring a secure Journey: We prioritize your health and safety. 
                    This section is dedicated to understanding your medical history and health conditions, 
                    allowing us to tailor our measures and address any potential risks for a secure and successful expedition.
                    </p>
                    <div className='mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6'>
                        <div className='sm:col-span-2'>
                            <label htmlFor='healthDec' className='block date-sm font-medidum leading-3 text-grey-900'>
                                Health Declaration
                            </label>
                            <div className='mt-2'>
                                <input 
                                    id='healthDec'
                                    type='text'
                                    {...register("healthDec")}
                                    autoComplete='no'
                                    className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6'
                                />
                                {errors.healthDec?.message && (
                                    <p className='mt-2 text-sm text-red-400'>
                                    {errors.healthDec.message}
                                    </p>
                                )}
                            </div>
                        </div>

                        <div className='sm:col-span-3'>
                            <label
                                htmlFor='emergencyEmail'
                                className='block text-sm font-medium leading-6 text-gray-900'
                            >
                                Emergency person&apos;s email address
                            </label>
                            <div className='mt-2'>
                                <input
                                    id='emergencyEmail'
                                    type='email'
                                    {...register("emergencyEmail")}
                                    autoComplete='email'
                                    className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6'
                                />
                                {errors.emergencyEmail?.message && (
                                    <p className='mt-2 text-sm text-red-400'>
                                    {errors.emergencyEmail.message}
                                    </p>
                                )}
                            </div>
                        </div>

                        <div className='sm:col-span-3'>
                            <label
                                htmlFor='emergencyPhoneNumber'
                                className='block text-sm font-medium leading-6 text-gray-900'
                            >
                                Emergency phone number
                            </label>
                            <div className='mt-2'>
                                <input
                                    type='text'
                                    id='emergencyPhoneNumber'
                                    {...register("emergencyPhoneNumber")}
                                    autoComplete='phonenumber'
                                    className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6'
                                />
                                {errors.emergencyPhoneNumber?.message && (
                                    <p className='mt-2 text-sm text-red-400'>
                                    {errors.emergencyPhoneNumber.message}
                                    </p>
                                )}
                            </div>
                        </div>
                        <div className='sm:col-span-5'>
                            <label htmlFor='medConditions' className='block date-sm font-medidum leading-3 text-grey-900'>
                                Special Requests or Preferences
                            </label>
                            <div className='mt-2'>
                                <textarea 
                                    id='medConditions'
                                    {...register("medConditions")}
                                    rows={4}
                                    placeholder="Write your medical conditions here..."
                                    className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6'
                                />
                                {errors.medConditions?.message && (
                                    <p className='mt-2 text-sm text-red-400'>
                                    {errors.medConditions.message}
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                </motion.div>
                )}
                {/* Stage 4 */}
                {currentStage === 3 && (
                <motion.div
                    initial={{ x: delta >= 0 ? "50%" : "-50%", opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                    <h2 className='text-base font-semibold leading-7 text-gray-900'>
                    Complete
                    </h2>
                    <p className='mt-1 text-sm leading-6 text-gray-600'>
                    Thank you for your submission.
                    </p>
                    
                </motion.div>
                )}
            </form>
            {/* Navigation Buttons*/}
            <div className='mt-8 pt-5'>
                <div className='flex justify-between'>
                    <button
                        type='button'
                        onClick={prev}
                        disabled={currentStage === 0}
                        className='rounded bg-white px-2 py-1 text-sm font-semibold text-sky-900 shadow-sm ring-1 ring-inset ring-sky-300 hover:bg-sky-50 disabled:cursor-not-allowed disabled:opacity-50'
                    >
                        <svg
                            xmlns='http://www.w3.org/2000/svg'
                            fill='none'
                            viewBox='0 0 24 24'
                            strokeWidth='1.5'
                            stroke='currentColor'
                            className='h-6 w-6'
                        >
                            <path
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                d='M15.75 19.5L8.25 12l7.5-7.5'
                            />
                        </svg>
                    </button>
                    <button
                        type='button'
                        onClick={next}
                        disabled={currentStage === stages.length - 1}
                        className='rounded bg-white px-2 py-1 text-sm font-semibold text-sky-900 shadow-sm ring-1 ring-inset ring-sky-300 hover:bg-sky-50 disabled:cursor-not-allowed disabled:opacity-50'
                    >
                        <svg
                        xmlns='http://www.w3.org/2000/svg'
                        fill='none'
                        viewBox='0 0 24 24'
                        strokeWidth='1.5'
                        stroke='currentColor'
                        className='h-6 w-6'
                        >
                            <path
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                d='M8.25 4.5l7.5 7.5-7.5 7.5'
                            />
                        </svg>
                    </button>
                </div>
            </div>
        </section>
    );
}