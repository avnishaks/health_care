"use client"

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import CustomForm, { FormFieldType } from "../CustomForm"
import { useState } from "react"
import { UserFormValidation } from "@/lib/validation"
import SubmitButton from "../SubmitButton"
import { useRouter } from "next/navigation"
import { createUser } from "@/lib/actions/patient.action"
 

 
export default function PaitentForms() {
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

  return(
    <Form {...form}>
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 flex-1">
      <section className="mb-12 space-y-4">
        <h1 className="header">Hi there 👋 </h1>
        <p className="text-dark-700">Schedule your first appointment.</p>

      </section>

      <CustomForm
          fieldType={FormFieldType.INPUT}
          control={form.control}
          name="name"
          label="Full name"
          placeholder="John Doe"
          iconSrc="/assets/icons/user.svg"
          iconAlt="user"
        />

        <CustomForm
          fieldType={FormFieldType.INPUT}
          control={form.control}
          name="email"
          label="Email"
          placeholder="johndoe@gmail.com"
          iconSrc="/assets/icons/email.svg"
          iconAlt="email"
        />

        <CustomForm
          fieldType={FormFieldType.PHONE_INPUT}
          control={form.control}
          name="phone"
          label="Phone number"
          placeholder="(555) 123-4567"
        />
      
      <SubmitButton isLoading={isLoading}>Get Started</SubmitButton>
    </form>
  </Form>
  )
}