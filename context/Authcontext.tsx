import { useContext, createContext, type PropsWithChildren, useState } from 'react';
// import { useStorageState } from './useStorageState';

type AuthContextType = {
  signIn: () => void;
  signOut: () => void;
  session?: string | null;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType>({
  signIn: () => null,
  signOut: () => null,
  session: null,
  isLoading: false,
});

// This hook can be used to access the user info.
export function useSession() {
  const value = useContext(AuthContext);
  return value;
}

export function SessionProvider({ children }: PropsWithChildren) {
  // const [[isLoading, session], setSession] = useStorageState('session');
  const [ session, setSession] = useState<string | null>(null);
  const [ isLoading, setIsLoading] = useState(false);

  return (
    <AuthContext.Provider
      value={{
        signIn: () => { setSession('logged-in'); }, // Perform sign-in logic here
        signOut: () => { setSession(null); },
        session,
        isLoading,
      }}>
      {children}
    </AuthContext.Provider>
  );
}
