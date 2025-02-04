import React, { createContext, useContext, useState, PropsWithChildren, useEffect } from 'react';
import { auth } from '@/firebase/config';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';

// Define session expiration time (2 days)
const SESSION_EXPIRATION_TIME = 2 * 24 * 60 * 60 * 1000;

type Session = {
    email: string;
    username?: string;
    isGuest: boolean;
    timestamp: number;
};

type AuthContextType = {
    SignUp: (email: string, password: string) => Promise<void>;
    SignIn: (email?: string, password?: string) => Promise<void>;
    SignOut: () => Promise<void>;
    session: Session | null;
    isLoading: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useSession() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useSession must be used within a SessionProvider');
    }
    return context;
}

export function SessionProvider({ children }: PropsWithChildren) {
    const [session, setSession] = useState<Session | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    // Restore session on app startup
    useEffect(() => {
        const restoreSession = async () => {
            const savedSession = await AsyncStorage.getItem('session');
            if (savedSession) {
                const { email, isGuest, timestamp } = JSON.parse(savedSession);
                const currentTime = new Date().getTime();

                // Check if the session is expired (more than 2 days old)
                if (currentTime - timestamp < SESSION_EXPIRATION_TIME) {
                    setSession({ email, isGuest, timestamp });
                    router.replace('/(app)/(recorder)');
                } else {
                    // Session is expired
                    setSession(null);
                    router.replace('/(auth)/login');
                }
            } else {
                // No session found, go to login
                setSession(null);
                router.replace('/(auth)/login');
            }
            setIsLoading(false);
        };

        restoreSession();
    }, []);

    // SignUp function
    const SignUp = async (email: string, password: string) => {
        setIsLoading(true);
        try {
            // Create a new user with email and password
            await createUserWithEmailAndPassword(auth, email, password);
            setSession({
                email,
                isGuest: false,
                timestamp: new Date().getTime(),
            });
            await AsyncStorage.setItem(
                'session',
                JSON.stringify({ email, isGuest: false, timestamp: new Date().getTime() })
            );
            router.replace('/(app)/(recorder)'); // Redirect to recorder page
        } catch (error) {
            console.error('Sign up failed:', error.message);
            alert(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    const SignIn = async (email?: string, password?: string) => {
        setIsLoading(true);
        try {
            if (email && password) {
                const currentTime = new Date().getTime();
                await signInWithEmailAndPassword(auth, email, password);
                await AsyncStorage.setItem(
                    'session',
                    JSON.stringify({ email, isGuest: false, timestamp: currentTime })
                );
                setSession({ email, isGuest: false, timestamp: currentTime });
                router.replace('/(app)/(recorder)');
            } else {
                // Handle guest session
                await AsyncStorage.setItem('guest-session', JSON.stringify({ email: 'Guest', isGuest: true, timestamp: new Date().getTime() }));
                setSession({ email: 'Guest', isGuest: true, timestamp: new Date().getTime() });
                router.replace('/(app)/(recorder)');
            }
        } catch (error) {
            console.error('Login failed:', error.message);
            alert(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    const SignOut = async () => {
        await signOut(auth);
        setSession(null);
        router.replace('/(auth)/login');
    };

    return (
        <AuthContext.Provider value={{ SignUp, SignIn, SignOut, session, isLoading }}>
            {children}
        </AuthContext.Provider>
    );
}
