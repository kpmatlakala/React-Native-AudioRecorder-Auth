// app/index.tsx

import { useSession } from "@/context/Authcontext";
import AudioRecordingScreen from "@/screens/AudioRecordingScreen";
import { router } from "expo-router";
import { useEffect } from "react";
import { Text, View } from "react-native";

const index = () => {

    const { signOut, session } = useSession();

    useEffect(()=>{
    
      console.log("sess", session)
      
    }, [session])

    return (
      <>
        {/* <AudioRecordingScreen /> */}
        <View> 
          <Text> Audio Recorder </Text> 
          
          <Text
            onPress={() => { 
              signOut(); 
              router.replace("/login")
            }}>
            Sign Out
          </Text>

          <Text
            onPress={() => {               
              router.replace("/register")
            }}>
            Sign-Register
          </Text>
        </View>
        
      </>
    )
  }

export default index;