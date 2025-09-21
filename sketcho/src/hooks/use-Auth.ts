import { useConvexAuth } from "convex/react"
import { useRouter } from "next/router"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { useAuthActions } from "@convex-dev/auth/react"
import { email, z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from "sonner"
import { Password } from "@convex-dev/auth/providers/Password"

const signInSchema = z.object({
    email: z.string().email("invalid email address"),
    Password: z.string().min(6, "password must be of 6 characters")
})
const signUpSchema = z.object({
    firstname: z.string().min(2, "First name should be atleast 2 characters "),
    lastname: z.string().min(2, "last name should be atleast 2 characters "),
    email: z.string().email("invalid email address"),
    Password: z.string().min(6, "password must be of 6 characters")
})

type signInData = z.infer<typeof signInSchema>
type signUpData = z.infer<typeof signUpSchema>

export const useAuth = () => {
    const { signIn, signOut } = useAuthActions()
    const router = useRouter()
    const [loading, isloading] = useState(false)

    const signInForm = useForm<signInData>({
        resolver: zodResolver(signInSchema),
        defaultValues: {
            email: "",
            Password: "",
        },
    })

    const signUpForm = useForm<signUpData>({
        resolver: zodResolver(signUpSchema),
        defaultValues: {
            firstname: "",
            lastname: "",
            email: "",
            Password: "",
        },
    })

    const handlesignIn = async (data: signInData) => {
        isloading(true)
        try {
            await signIn("password", {
                email: data.email,
                password: data.Password,
                flow: 'signIn',
            })
            router.push('/dashboard')
        } catch (err) {
            console.log("error in sign in ", err)
            signInForm.setError('root', {
                message: "failed to sign-in , invalid email or password"
            })
            toast.error('Invalid Email or Password')
        } finally {
            isloading(false)
        }

    }
    const handlesignUp = async (data: signUpData) => {
        isloading(true)
        try {
            await signIn("password", {
                name: `${data.firstname} ${data.lastname}`,
                email: data.email,
                password: data.Password,
                flow: 'signUp'
            })
            router.push('/dashboard')
        } catch (err) {
            console.log("error in sign up ", err)
            signUpForm.setError('root', {
                message: "failed to crate Account , Email may already exists"
            })
            toast.error('Error creating account')
        } finally {
            isloading(false)
        }
    }
    const handlesignOut = async () => {
        isloading(true)
        try {
            await signOut()
            router.push('/auth/sign-in')

        } catch (err) {
            console.log(err);

        } finally {
            isloading(false)
        }
    }

    return {
        signInForm,
        signUpForm,
        handlesignIn,
        handlesignOut,
        handlesignUp,
        loading,
    }
}