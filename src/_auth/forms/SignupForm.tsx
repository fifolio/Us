import React from 'react';
import { z } from 'zod';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage, } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { SignupValidation } from '@/lib/validation';
import Loader from '@/components/shared/Loader';
import { Link } from 'react-router-dom';

const SignupForm: React.FC = () => {

  const isLoading = false;

  // 1. Define your form.
  const form = useForm<z.infer<typeof SignupValidation>>({
    resolver: zodResolver(SignupValidation),
    defaultValues: {
      name: "",
      username: "",
      email: "",
      password: "",
    },
  })

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof SignupValidation>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)
  }


  return (
    <Form {...form}>
      <div className="sm:w-420 flex-center flex-col">

        <img src="/assets/images/logo.svg" alt='logo' />
        <h2 className='h3-bold md:h2-bold pt-5 sm:pt-12'>Create a new account</h2>
        <p className="text-light-3 small-medium md:base-regular mt-2">Please enter your details and join <b>Us</b>!</p>

        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5 w-full mt-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                {/* <FormLabel>Name</FormLabel> */}
                <FormControl>
                  <Input type="text" placeholder='Type in your name' {...field} />
                </FormControl>
                <FormMessage className='shad-form_message' />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                {/* <FormLabel>Username</FormLabel> */}
                <FormControl>
                  <Input type="text" placeholder='Type in your Username' {...field} />
                </FormControl>
                <FormMessage className='shad-form_message' />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                {/* <FormLabel>Email</FormLabel> */}
                <FormControl>
                  <Input type="email" placeholder='Type in your Email address' {...field} />
                </FormControl>
                <FormMessage className='shad-form_message' />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                {/* <FormLabel>Password</FormLabel> */}
                <FormControl>
                  <Input type="password" placeholder='Set a new password' {...field} />
                </FormControl>
                <FormMessage className='shad-form_message' />
              </FormItem>
            )}
          />

          <Button type="submit" className='shad-button_primary font-bold'>
            {isLoading ? (
              <div className="flex-center gap-2">
                <Loader /> Loading...
              </div>
            ) : (
              "Sign Up"
            )}
          </Button>

          <p className='text-sm text-center mt-2'>
            Already have an account? 
            <b>
              <Link to="/signin"> Sign in Now!</Link>
            </b>

          </p>
        </form>
      </div>
    </Form>
  );
};

export default SignupForm;