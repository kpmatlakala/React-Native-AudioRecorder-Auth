import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Drawer } from "expo-router/drawer";
import { Redirect, Stack, useNavigation } from "expo-router";
import { useEffect, useState } from "react";
import RecordingProvider from "@/context/RecordingsContext";
import { useSession } from "@/context/Authcontext";
import { Text } from "react-native";

export default function Layout() { 

  const [user, setUser] = useState({username:"", email:"", isLoggedIn: false });
  const { session, isLoading } = useSession();
  //my.3xC@p.com

  if(isLoading)
  {
    return <Text>Loading...</Text>;
  }

  if(!session)
  {
    return <Redirect href={{ pathname: "/login", }} />
  }
  

  return (
    <>  
      <RecordingProvider>
          <GestureHandlerRootView style={{ flex: 1 }}>
          <Drawer>
            <Drawer.Screen
              name="index"
              options={{
                drawerLabel: "🎙️ Audio Recorder",
                title: "Audio Recorder",
              }}
            />
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
        </GestureHandlerRootView>
      </RecordingProvider> 
    </>    
    
  );
}
