"use client"

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Form, FormControl } from "@/components/ui/form"
import CustomForm, { FormFieldType } from "../CustomForm"
import { useState } from "react"
import { UserFormValidation } from "@/lib/validation"
import SubmitButton from "../SubmitButton"
import { useRouter } from "next/navigation"
import { createUser } from "@/lib/actions/patient.action"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { GenderOptions } from "@/constants"



export default function RegisterForms({ user }: { user: User }) {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const form = useForm<z.infer<typeof UserFormValidation>>({
        resolver: zodResolver(UserFormValidation),
        defaultValues: {
            name: "",
            email: "",
            phone: "",
        },
    });

    const onSubmit = async (values: z.infer<typeof UserFormValidation>) => {

        console.log("onSubmit button is clicked")

        setIsLoading(true);

        try {
            const users = {
                name: values.name,
                email: values.email,
                phone: values.phone,
            };

            console.log("The value of user filled in the form is " + JSON.stringify(users))

            const newUser = await createUser(users);

            if (newUser) {
                router.push(`/patient/${newUser.$id}/register`);
            }
        } catch (error) {
            console.log(error);
        }

        setIsLoading(false);
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 flex-1">
                <section className="space-y-4">
                    <h1 className="header">Welcome 👋 </h1>
                    <p className="text-dark-700">Let us know about yourself.</p>

                </section>
                <section className="mb-4 space-y-2">
                    <h2 className="sub-header">Personal Information</h2>
                </section>

                <CustomForm
                    fieldType={FormFieldType.INPUT}
                    control={form.control}
                    name="name"
                    label="Full name"
                    placeholder="Avnish Kumar"
                    iconSrc="/assets/icons/user.svg"
                    iconAlt="user"
                />
                <div className="flex flex-col gap-6 xl:flex-row">
                    <CustomForm
                        fieldType={FormFieldType.INPUT}
                        control={form.control}
                        name="email"
                        label="Email"
                        placeholder="cse.avnish@gmail.com"
                        iconSrc="/assets/icons/email.svg"
                        iconAlt="email"
                    />

                    <CustomForm
                        fieldType={FormFieldType.PHONE_INPUT}
                        control={form.control}
                        name="phone"
                        label="Phone number"
                        placeholder="7700801472"
                    />

                </div>

                <div className="flex flex-col gap-6 xl:flex-row">
                    <CustomForm
                        fieldType={FormFieldType.DATE_PICKER}
                        control={form.control}
                        name="birthDate"
                        label="Date of birth"
                    />

                    <CustomForm
                        fieldType={FormFieldType.SKELETON}
                        control={form.control}
                        name="gender"
                        label="Gender"
                        renderSkeleton={(field) => (
                            <FormControl>
                                <RadioGroup
                                    className="flex h-11 gap-6 xl:justify-between"
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                >
                                    {GenderOptions.map((option, i) => (
                                        <div key={option + i} className="radio-group">
                                            <RadioGroupItem value={option} id={option} />
                                            <Label htmlFor={option} className="cursor-pointer">
                                                {option}
                                            </Label>
                                        </div>
                                    ))}
                                </RadioGroup>
                            </FormControl>
                        )}
                    />
                </div>



                <SubmitButton isLoading={isLoading}>Submit and Continue</SubmitButton>
            </form>
        </Form>
    )
}