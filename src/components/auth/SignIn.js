import React from "react";
import signIn from "@/firebase/auth/signin";
import { useRouter } from 'next/navigation'

function SignIn() {
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')
    const router = useRouter()

    const handleForm = async (event) => {
        event.preventDefault()

        const { result, error } = await signIn(email, password);

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
                <div class="bg-grey-lighter min-h-screen flex flex-col">
                    <div class="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
                        <div class="bg-white px-6 py-8 rounded shadow-md text-black w-full">
                            <h1 class="mb-8 text-3xl text-center">Sign in</h1>
                            

                            <input
                                type="text"
                                class="block border border-grey-light w-full p-3 rounded mb-4"
                                name="email"
                                placeholder="Email" onChange={e=>setEmail(e.target.value)} />

                            <input
                                type="password"
                                class="block border border-grey-light w-full p-3 rounded mb-4"
                                name="password"
                                placeholder="Password" onChange={e=>setPassword(e.target.value)} />

                            <button
                                type="submit"
                                class="w-full text-center py-3 rounded bg-green-500 text-white hover:bg-green-dark focus:outline-none my-1"
                            >Sign In</button>
                        </div>

                        <div class="text-grey-dark mt-6">
                            Do not have  account?
                            <a class="no-underline border-b border-blue text-blue" href="/signup">
                                Register
                            </a>.
                        </div>
                    </div>
                </div>
            </form>
        </div>

    </div>);
}

export default SignIn;