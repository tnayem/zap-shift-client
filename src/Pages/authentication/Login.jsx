import React from 'react';
import { useForm } from 'react-hook-form';

const Login = () => {
    const {register,handleSubmit,formState: { errors }} = useForm()

    const onSubmit=(data)=>{
        console.log(data);
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <fieldset className="fieldset">
                <label className="label">Email</label>
                <input type="email" {...register("email",{required:true,pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/})} className="input w-full" placeholder="Email" />
                {
                    errors.email?.type === "required" && <p className='text-red-500'>Email is required</p>
                }
                {
                    errors.email?.type === "pattern" && <p className='text-red-500'>Email is Not Valid</p>
                }
                <label className="label">Password</label>
                <input type="password" {...register("password",{required:true, pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/})} className="input w-full" placeholder="Password" />
                {
                    errors.password?.type === "required" && <p className='text-red-500'>Password is Required</p>
                }
                {
                    errors.password?.type === "pattern" && <p className='text-red-500'>Password must be at least 6 characters and one uppercase,one lowercase</p>
                }
                <div><a className="link link-hover">Forgot password?</a></div>
                <button className="btn btn-neutral mt-4">Login</button>
            </fieldset>
        </form>
    );
};

export default Login;