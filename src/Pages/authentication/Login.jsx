import React from 'react';
import { useForm } from 'react-hook-form';
import { AuthContext } from '../../context/AuthContext';
import { Link } from 'react-router';

const Login = () => {

    const { register, handleSubmit, formState: { errors } } = useForm()

    const onSubmit = (data) => {
        console.log(data);
    }

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <fieldset className="fieldset">
                    <label className="label">Email</label>
                    <input type="email" {...register("email", { required: true, pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ })} className="input w-full" placeholder="Email" />
                    {
                        errors.email?.type === "required" && <p className='text-red-500'>Email is required</p>
                    }
                    {
                        errors.email?.type === "pattern" && <p className='text-red-500'>Email is Not Valid</p>
                    }
                    <label className="label">Password</label>
                    <input type="password" {...register("password", { required: true, pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/ })} className="input w-full" placeholder="Password" />
                    {
                        errors.password?.type === "required" && <p className='text-red-500'>Password is Required</p>
                    }
                    {
                        errors.password?.type === "pattern" && <p className='text-red-500'>Password must be at least 6 characters and one uppercase,one lowercase</p>
                    }
                    <div><a className="link link-hover">Forgot password?</a></div>
                    <button className="btn bg-[#caeb66] my-4">Login</button>

                </fieldset>

            </form>
            {/*Google Login Button*/}
            <button className="btn bg-white text-black border-gray-400 w-full">
                <svg aria-label="Google logo" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g><path d="m0 0H512V512H0" fill="#fff"></path><path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path><path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path><path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path><path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path></g></svg>
                Login with Google
            </button>
            <p className='text-center'><small> Haven't account? Please <Link to='/register' className='text-blue-700'>Register</Link></small></p>
        </div>
    );
};

export default Login;