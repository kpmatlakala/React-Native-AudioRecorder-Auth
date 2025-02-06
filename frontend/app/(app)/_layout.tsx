import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Redirect, Stack, usePathname } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useSession } from '@/context/AuthContext';
import RecordingProvider from '@/context/RecordingContext';

const App_Layout = () => {
  const { session, isLoading } = useSession();
  const [recordings, setRecordings] = useState([]);

  useEffect(() => {
    console.log("app/(app) | session: ", session);
  }, [session]);

  const _pathname = usePathname();
  const authRoutes = ["/login", "/register"];

  if (!session && !authRoutes.includes(_pathname)) 
  {
    return <Redirect href={{ pathname: "/login" }} />;
  }

  if (session && authRoutes.includes(_pathname)) {
    return <Redirect href={{ pathname: "/" }} />;
  }

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

//   useEffect(() => {
//     logRecordingsWithFileStatus();
//     checkForOrphanedFiles(); // Call this on app launch to check for orphaned files
//   }, []);

  return (
    <RecordingProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <Stack>
          <Stack.Screen 
            name="(recorder)" 
            options={{ headerShown: false, title: "🎙️ Recorder" }} 
          />
          <Stack.Screen 
            name="playback/[id]" 
            options={{ headerShown: true, title: "🎧" }} 
          />
        </Stack>
      </GestureHandlerRootView>
    </RecordingProvider>
  );
};

export default App_Layout;

const styles = StyleSheet.create({});
