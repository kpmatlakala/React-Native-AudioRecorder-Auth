import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { Redirect, Slot, Stack, usePathname } from 'expo-router'
import { Drawer } from 'expo-router/drawer';

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
            <Drawer>
                <Drawer.Screen
                    name="index"
                    options={{
                        drawerLabel: "🎙️ Audio Recorder",
                        title: "Audio Recorder",
                    }}
                />
                
                <Drawer.Screen
                    name="profile"
                    options={{
                        drawerLabel: "👤 Profile",
                        title: "Playback",
                    }}
                />

                <Drawer.Screen
                    name="settings"
                    options={{
                        drawerLabel: "⚙ Settings",
                        title: "Playback",
                    }}
                />
            </Drawer>
           {/* <Drawer>
                

                <Drawer.Screen
                name="recordings/index"
                options={{
                    drawerLabel: "📼 Recordings",
                    title: "Recordings",
                }}
                />

                <Drawer.Screen
                name="playback/index"
                options={{
                    drawerLabel: "🎧 Playback",
                    title: "Playback",
                }}
                />

                

          </Drawer> */}
        </GestureHandlerRootView>
        // 
    )
}

export default App_Layout

const styles = StyleSheet.create({})