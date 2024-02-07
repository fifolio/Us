import React from 'react';
import { z } from 'zod';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage, } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { SignInValidation } from '@/lib/validation';
import Loader from '@/components/shared/Loader';
import { Link, useNavigate } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';
import { useSignInAccount } from '@/lib/react-query/queriesAndMutations';
import { useUserContext } from '@/context/authContext';

const SignInForm: React.FC = () => {
  const { toast } = useToast();
  const {checkAuthUser, isLoading: isUserLoading} = useUserContext();
  const navigate = useNavigate();


  const { mutateAsync: signInAccount } = useSignInAccount();

  // 1. Define your form.
  const form = useForm<z.infer<typeof SignInValidation>>({
    resolver: zodResolver(SignInValidation),
    defaultValues: {
      email: "",
      password: "",
    },
  });



  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof SignInValidation>) {

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

        <img src="/assets/images/logo.svg" alt='logo' />
        <h2 className='h3-bold md:h2-bold pt-5 sm:pt-12'>Login</h2>
        <p className="text-light-3 small-medium md:base-regular mt-2">Please enter your details and join <b>Us</b>!</p>

        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5 w-full mt-4">
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
            {isUserLoading ? (
              <div className="flex-center gap-2">
                <Loader /> Loading...
              </div>
            ) : (
              "Sign In"
            )}
          </Button>

          <p className='text-sm text-center mt-2'>
            Don't have an account?
            <b>
              <Link to="/signup"> Sign up Now!</Link>
            </b>

          </p>
        </form>
      </div>
    </Form>
  );
};

export default SignInForm;