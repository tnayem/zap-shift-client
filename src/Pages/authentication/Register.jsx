import React from 'react';
import { useForm } from 'react-hook-form';
import useInfo from '../../hooks/useInfo';
import { Link, useLocation, useNavigate } from 'react-router';

const Register = () => {
    const { createUser, googleSignUp } = useInfo()
    const location = useLocation()
    const navigate = useNavigate()
    console.log(location);
    const { register, handleSubmit, formState: { errors } } = useForm()
    const onSubmit = (data) => {
        const { email, password } = data;
        createUser(email, password)
            .then(result => {
                console.log(result.user);
                // navigate(`${location.state} || '/`)
                if (location.pathname === "/register" || location.state === null) {
                    return navigate("/")
                }
                navigate(`${location.state}` || "/")

            })
            .catch(error => {
                console.log(error);
            })
    }
    const handleGoogleSignUP = () => {
        googleSignUp()
            .then(result => {
                console.log(result.user);
                console.log(location);
                if (location.pathname === "/register" || location.state === null) {
                    return navigate("/")
                }
                navigate(`${location.state}` || "/")
            })
            .catch(error => {
                console.log(error);
            })
    }
    return (
        <div className="card bg-base-100 w-full shrink-0 shadow-2xl">
            <h1 className="text-5xl font-bold">Create An Account</h1>
            <div className="card-body">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <fieldset className="fieldset">
                        <label className="label">Your Name</label>
                        <input type="text" {...register("name", { required: true })} className="input w-full" placeholder="Your Name" />
                        {
                            errors?.name?.type === "required" && <p className='text-red-500'>This field is required</p>
                        }
                        <label className="label">Email</label>
                        <input type="email" {...register("email", { required: true, pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ })} className="input w-full" placeholder="Email" />
                        {
                            errors?.email?.type === "required" && <p className='text-red-500'>Email is required</p>
                        }
                        {
                            errors?.email?.type === "pattern" && <p className='text-red-500'>Please enter a valid email address</p>
                        }
                        <label className="label w-full">Password</label>
                        <input type="password" {...register("password", { required: true, pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/ })} className="input" placeholder="Password" />
                        {
                            errors?.password?.type === "required" && <p className='text-red-500'>Password is required</p>
                        }
                        {
                            errors?.password?.type === "pattern" && <p className='text-red-500'>⚠️ Password must contain at least one uppercase, one lowercase, and one number</p>
                        }
                        <button className="btn bg-[#caeb66] my-4">Register</button>

                    </fieldset>

                </form>
                {/*Google Login Button*/}
                <button onClick={handleGoogleSignUP} className="btn bg-white text-black border-gray-400">
                    <svg aria-label="Google logo" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g><path d="m0 0H512V512H0" fill="#fff"></path><path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path><path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path><path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path><path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path></g></svg>
                    Login with Google
                </button>
                <p className='text-center'><small> Already have account? Please <Link to='/login' className='text-blue-700'>Login</Link></small></p>
            </div>
        </div>
    );
};

export default Register;