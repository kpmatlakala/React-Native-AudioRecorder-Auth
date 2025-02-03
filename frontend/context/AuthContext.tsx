// /context/AuthContext.tsx
import React, { createContext, useContext, useState, PropsWithChildren } from 'react';

import { auth } from '@/firebase/config';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';

// Define the auth context type
type AuthContextType = {
    SignUp: (email: string, password: string) => Promise<void>;
    SignIn: (email?: string, password?: string) => Promise<void>;
    SignOut: () => Promise<void>;
    session: string | null;
    isLoading: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useSession() 
{
    const context = useContext(AuthContext);
    if (!context) 
    {
        throw new Error('useSession must be used within a SessionProvider');
    }
    return context;
}

export function SessionProvider({ children }: PropsWithChildren) 
{
    const [session, setSession] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    // SignUp function
    const SignUp = async (email: string, password: string) => {
        setIsLoading(true);
        try 
        {
        // Create a new user with email and password
        await createUserWithEmailAndPassword(auth, email, password);
        setSession('logged-in');
        }
        catch (error) 
        {
        console.error('Sign up failed:', error.message);
        alert(error.message);
        } 
        finally { setIsLoading(false); }
    };

    const SignIn = async (email?: string, password?: string) => {
        setIsLoading(true);
        try 
        {
            if (email && password) 
            {
                await signInWithEmailAndPassword(auth, email, password);
                setSession('logged-in');
            } 
            else 
            {
                setSession('guest');
            }
        } 
        catch (error) 
        {
            console.error('Login failed:', error.message);
            alert(error.message);
        } 
        finally { setIsLoading(false); }
    };

    const SignOut = async () => {
        await signOut(auth);
        setSession(null);
    };

    return (
        <AuthContext.Provider value={{ SignUp, SignIn, SignOut, session, isLoading }}>
            {children}
        </AuthContext.Provider>
    );
}