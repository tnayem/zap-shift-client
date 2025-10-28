import React from 'react';
import { useForm } from 'react-hook-form';

const Register = () => {
    const {register,handleSubmit,formState: { errors }} = useForm()
    const onSubmit=(data)=>{
        console.log(data);
    }
    return (
        <div className="card bg-base-100 w-full shrink-0 shadow-2xl">
            <h1 className="text-5xl font-bold">Create An Account</h1>
            <div className="card-body">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <fieldset className="fieldset">
                        <label className="label">Your Name</label>
                        <input type="text" {...register("name",{required:true})} className="input w-full" placeholder="Your Name" />
                        {
                            errors?.name?.type === "required" && <p className='text-red-500'>This field is required</p>
                        }
                        <label className="label">Email</label>
                        <input type="email" {...register("email",{required:true,pattern:/^[^\s@]+@[^\s@]+\.[^\s@]+$/})} className="input w-full" placeholder="Email" />
                        {
                            errors?.email?.type === "required" && <p className='text-red-500'>Email is required</p>
                        }
                        {
                            errors?.email?.type === "pattern" && <p className='text-red-500'>Please enter a valid email address</p>
                        }
                        <label className="label w-full">Password</label>
                        <input type="password" {...register("password",{required:true,pattern:/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/})} className="input" placeholder="Password" />
                        {
                            errors?.password?.type === "required" && <p className='text-red-500'>Password is required</p>
                        }
                        {
                            errors?.password?.type === "pattern" && <p className='text-red-500'>⚠️ Password must contain at least one uppercase, one lowercase, and one number</p>
                        }
                        <button className="btn btn-neutral mt-4">Register</button>
                    </fieldset>
                </form>
            </div>
        </div>
    );
};

export default Register;