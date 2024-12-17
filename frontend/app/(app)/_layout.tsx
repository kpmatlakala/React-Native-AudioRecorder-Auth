import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { Redirect, Slot, Stack, usePathname } from 'expo-router'
import { useSession } from '@/context/AuthContext';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const App_Layout = () => {

    const { session, isLoading } = useSession();
    useEffect(() => {
        console.log("app/(app) | session: ", session)
      }, [session]);

    const _pathname = usePathname();
    const authRoutes = ["/login", "/register"]  

    if(!session && !authRoutes.includes(_pathname))
    {
        return <Redirect href={{ pathname: "/login", }} />
    }  
    
    if(session && authRoutes.includes(_pathname))
    {
        return <Redirect href={{ pathname: "/"}} />
    }

    if(isLoading)
    {
        return <Text>Loading...</Text>;
    }

    return (
        <GestureHandlerRootView style={{flex:1}} >
            <Stack />
        </GestureHandlerRootView>
        // 
    )
}

export default App_Layout

const styles = StyleSheet.create({})