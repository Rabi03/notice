import React from "react";
import signUp from "@/firebase/auth/signup";
import { useRouter } from 'next/navigation'

function SignUp() {
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')
    const router = useRouter()

    const handleForm = async (event) => {
        event.preventDefault()

        const { result, error } = await signUp(email, password);

        if (error) {
            return console.log(error)
        }

        // else successful
        console.log(result)
        return router.push("/")
    }
    return (<div className="wrapper">
        <div className="form-wrapper">
            <form onSubmit={handleForm} className="form">
                <div className="bg-grey-lighter min-h-screen flex flex-col">
                    <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
                        <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
                            <h1 className="mb-8 text-3xl text-center">Sign up</h1>

                            <input
                                type="text"
                                className="block border border-grey-light w-full p-3 rounded mb-4"
                                name="email"
                                placeholder="Email" onChange={e=>setEmail(e.target.value)} />

                            <input
                                type="password"
                                className="block border border-grey-light w-full p-3 rounded mb-4"
                                name="password"
                                placeholder="Password" onChange={e=>setPassword(e.target.value)} />

                            <button
                                type="submit"
                                className="w-full text-center py-3 rounded bg-green-500 text-white hover:bg-green-dark focus:outline-none my-1"
                            >Create Account</button>
                        </div>

                        <div className="text-grey-dark mt-6">
                            Already have an account?
                            <a className="no-underline border-b border-blue text-blue" href="/signin">
                                Log in
                            </a>.
                        </div>
                    </div>
                </div>
            </form>
        </div>
    </div>);
}

export default SignUp;