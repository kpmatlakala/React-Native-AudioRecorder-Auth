import React, { useState, useEffect, useRef, useContext } from 'react';
import { View, Text, StyleSheet, Pressable, Alert, SafeAreaView } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { router } from 'expo-router';
import { Audio } from 'expo-av';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';

import { RecordingsContext } from '@/context/RecordingContext';
import { loadRecordingById, loadRecordings } from '@/utils/loadRecordings';
import Icons from '@/utils/Icons';

const AudioPlaybackScreen = () => {
    const route = useRoute();
    const { id } = route.params;
    const { deleteRecording } = useContext(RecordingsContext); // Assuming you have this function in context
    const [recording, setRecording] = useState<any>(null);
    const [sound, setSound] = useState<Audio.Sound | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [playbackPosition, setPlaybackPosition] = useState(0);
    const [playbackDuration, setPlaybackDuration] = useState(0);
    const soundRef = useRef<Audio.Sound | null>(null);
    const [isButtonPressing, setIsButtonPressing] = useState(false);
    const [isRepeating, setIsRepeating] = useState(false);

    const asyncInitSound = async (uri: string) => {
        try {
            const { sound } = await Audio.Sound.createAsync({ uri },
                { shouldPlay: false, progressUpdateIntervalMillis: 500 }); // Set shouldPlay to false

            soundRef.current = sound;
            setSound(sound);

            const status = await sound.getStatusAsync();
            if (status.isLoaded) {
                setPlaybackDuration(status.durationMillis / 1000);
            }

            sound.setOnPlaybackStatusUpdate((status) => {
                if (status.isLoaded) {
                    setPlaybackPosition(status.positionMillis / 1000);
                    if (status.didJustFinish) {
                        setIsPlaying(false);
                        isRepeating ? soundRef.current?.setPositionAsync(0) : handleStop();
                    }
                }
            });
        } catch (error) {
            console.error('Error loading sound:', error);
            Alert.alert('Playback Error', 'There was an error loading the audio file.');
        }
    };

    const handlePlayPause = async () => {
        if (isButtonPressing) return;

        setIsButtonPressing(true);

        try {
            if (isPlaying) {
                await soundRef.current?.pauseAsync();
            } else {
                if (!sound) {
                    await asyncInitSound(recording.uri);
                }
                await soundRef.current?.playAsync();
            }

            setIsPlaying(!isPlaying);
        } catch (error) {
            Alert.alert('Playback Error', 'There was an error toggling playback.');
        }

        setTimeout(() => setIsButtonPressing(false), 500);
    };

    const handleStop = async () => {
        if (isButtonPressing) return;

        setIsButtonPressing(true);
        try {
            await soundRef.current?.stopAsync();
            await soundRef.current?.setPositionAsync(0);

            setIsPlaying(false);
            setPlaybackPosition(0);
        } catch (error) {
            Alert.alert('Playback Error', 'There was an error stopping the audio.');
        }
        setTimeout(() => setIsButtonPressing(false), 500);
    };

    const fetchRecording = async () => {
        try {
            const recordingData = await loadRecordingById(id);
            if (recordingData) {
                setRecording(recordingData);
            } else {
                Alert.alert('Error', 'Recording not found');
            }
        } catch (error) {
            Alert.alert('Error', 'Failed to load recording');
        }
    };

    const handleDeleteRecording = async () => {
        if (isButtonPressing) return;

        setIsButtonPressing(true);

        try 
        {
            const confirmed = await new Promise((resolve) => {
                Alert.alert(
                    'Delete Recording',
                    'Are you sure you want to delete this recording?',
                    [
                        { text: 'Cancel', onPress: () => resolve(false) },
                        { text: 'Delete', onPress: () => resolve(true) },
                    ]
                );
            });

            if (confirmed) 
            {
                // 1. Delete the recording file from the filesystem
                const fileUri = recording.uri;
                await FileSystem.deleteAsync(fileUri, { idempotent: true });

                // 2. Update the context by removing the recording
                deleteRecording(id);

                Alert.alert('Success', 'Recording deleted successfully.');
                loadRecordings();
                router.back(); // Go back after successful deletion               
            }
        } 
        catch (error) 
        {
            console.error('Error deleting recording:', error);
            Alert.alert('Error', 'An unexpected error occurred while deleting the recording.');
        } 
        finally { setIsButtonPressing(false); }
    };

    const shareFile = async (recordingUri) => {
        try {
          if (await Sharing.isAvailableAsync()) {
            await Sharing.shareAsync(recordingUri); // sharing file URL (must be file:// or https://)
          } else {
            alert('Sharing is not available on this platform.');
          }
        } catch (error) {
          console.error('Error sharing file: ', error.message);
        }
      };

    useEffect(() => {
        if (id) { fetchRecording(); }
        return () => { soundRef.current?.unloadAsync(); };
    }, [id]);

    const formatTime = (seconds: number): string => {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const secs = Math.floor(seconds % 60);
        return `${hours > 0 ? `${hours}:` : ''}${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    return (
        <SafeAreaView style={styles.container}>
            {/* <Text style={styles.title}>Audio Playback</Text> */}
            {recording && (
                <>
                    
                    <Text style={{}}>
                        {isPlaying && 'Playing'}                            
                    </Text>       

                    <View style={styles.controlsContainer}>
                        <View style={styles.timeContainer}>
                            <Text>{formatTime(playbackPosition)}</Text>
                            <Text>{formatTime(playbackDuration)}</Text>
                        </View>

                        {isPlaying ? (
                            <View style={
                                {width:"100%", 
                                flexDirection:"row", 
                                justifyContent:"space-between", 
                                alignItems:"center",
                                paddingHorizontal:20 }}>
                                <Pressable onPress={handlePlayPause} style={styles.pauseBtn}>
                                    {/* <Text style={styles.buttonText}>Pause</Text> */}
                                     <Icons name={"pause"} color={"white"}/>
                                </Pressable>
                                <Pressable onPress={handleStop} style={styles.playNstopBtn}>
                                    {/* <Text style={styles.buttonText}>Stop</Text> */}
                                    <Icons name={"stop"} color={"white"}/>
                                </Pressable>
                                <Pressable onPress={handleStop} style={styles.repeatBtn}>
                                    {/* <Text style={styles.buttonText}>Stop</Text> */}
                                    <Icons name={"repeat"} color={"white"}/>
                                </Pressable>
                            </View>
                        ) : (
                            <>
                                <Pressable onPress={handlePlayPause} style={styles.playNstopBtn}>
                                    {/* <Text style={styles.buttonText}>Play</Text> */}
                                    <Icons name={"play"} color={"white"}/>
                                </Pressable>
                            </>
                        )}  

                        <Text style={{}}> {recording.name} </Text>                       
                    </View>                    

                    <View style={styles.footer}>  
                        
                        <Pressable style={styles.button} onPress={() => shareFile(recording.uri)} >
                            <Icons name={"share"} color={"black"}/>
                        </Pressable>

                        <Pressable style={styles.button} >
                            {/* <Text></Text> */}
                            <Icons name={"info"} color={"black"}/>
                        </Pressable>
                        {/* <Text>URI: {recording.uri}</Text> */} 

                        <Pressable style={styles.button} onPress={handleDeleteRecording} >
                            {/* <Text style={styles.buttonText}>Delete</Text> */}
                            <Icons name={"delete"} color={"black"}/>
                        </Pressable>
                    </View>
                </>
            )}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        marginBottom: "8%",        
        justifyContent: 'space-between',
        alignItems: 'center',
        // backgroundColor:"lightgray"
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    timeContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '64%',
        marginBottom: 20,
    },
    playNstopBtn: {
        width: 128,
        height: 128,
        backgroundColor: "#0077FF",
        borderRadius: 128,  // Circular button
        justifyContent: "center",
        alignItems: "center",
        marginVertical: 20,  // Space above the button
    },
    pauseBtn: {
        width: 64,
        height: 64,
        backgroundColor: "#0077FF",
        borderRadius: 128,  // Circular button
        justifyContent: "center",
        alignItems: "center",
        marginVertical: 20,  // Space above the button
    },
    repeatBtn: {
        width: 64,
        height: 64,
        backgroundColor: "#0077FF",
        borderRadius: 128,  // Circular button
        justifyContent: "center",
        alignItems: "center",
        marginVertical: 20,  // Space above the button      
    },
    controlsContainer: {       
        justifyContent: 'center',
        alignItems: "center",
        gap: 20,
        // backgroundColor:"lightgray"
    },
    button: 
    {
        width: 55,
        height: 55,
        alignItems:"center",
        justifyContent:"center",
        backgroundColor: 'lightgray',
        paddingVertical: 4,
        paddingHorizontal: 4,
        borderRadius: 32,
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    footer:{
        borderTopColor: "lightgray",
        borderTopWidth: 1,
        width: "100%", 
        flexDirection:'row', 
        justifyContent: "space-between" ,
        padding: 10,

    }
});

export default AudioPlaybackScreen;
