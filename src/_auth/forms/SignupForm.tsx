import React from 'react';
import { z } from 'zod';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage, } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { SignupValidation } from '@/lib/validation';
import Loader from '@/components/shared/Loader';
import { Link, useNavigate } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';
import { useCreateUserAccount, useSignInAccount } from '@/lib/react-query/queriesAndMutations';
import { useUserContext } from '@/context/authContext';

const SignupForm: React.FC = () => {
  const { toast } = useToast();
  const {checkAuthUser, isLoading: isUserLoading} = useUserContext();
  const navigate = useNavigate();

  const { mutateAsync: createUserAccount, isPending: isCreatingAccount } = useCreateUserAccount();

  const { mutateAsync: signInAccount, isPending: isSigninIn } = useSignInAccount();

  // 1. Define your form.
  const form = useForm<z.infer<typeof SignupValidation>>({
    resolver: zodResolver(SignupValidation),
    defaultValues: {
      name: "",
      username: "",
      email: "",
      password: "",
    },
  });



  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof SignupValidation>) {
    const newUser = await createUserAccount(values);

    if (!newUser) {
      return toast({ title: 'Signup failed. Please try again.' })
    }

    const session = await signInAccount({
      email: values.email,
      password: values.password
    })

    if (!session) {
      return toast({title: 'Signin failed, Please try again.'})
    }

    const isLoggedIn = await checkAuthUser();

    if(isLoggedIn) {
      form.reset();
      navigate('/');
    } else {
      return toast({title: 'Sign up failed. Please try again'});
    }

  }


  return (
    <Form {...form}>
      <div className="sm:w-420 flex-center flex-col">

        <img src="/assets/images/logo.png" alt='logo' width='50'/>
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
            {isCreatingAccount ? (
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