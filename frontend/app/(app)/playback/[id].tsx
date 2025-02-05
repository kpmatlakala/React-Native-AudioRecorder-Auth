import React, { useState, useEffect, useRef, useContext } from 'react';
import { View, Text, StyleSheet, Pressable, Alert } from 'react-native';
import { Audio } from 'expo-av';
import { useRoute } from '@react-navigation/native';
import { router } from 'expo-router';
import { RecordingsContext } from '@/context/RecordingContext';
import * as FileSystem from 'expo-file-system';
import { loadRecordingById, loadRecordings } from '@/utils/loadRecordings';

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

        try {
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
                // await FileSystem.deleteAsync(fileUri, { idempotent: true });

                // 2. Update the context by removing the recording
                deleteRecording(id);

                Alert.alert('Success', 'Recording deleted successfully.');
                loadRecordings();
                router.back(); // Go back after successful deletion               
            }
        } catch (error) {
            console.error('Error deleting recording:', error);
            Alert.alert('Error', 'An unexpected error occurred while deleting the recording.');
        } finally {
            setIsButtonPressing(false);
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
        <View style={styles.container}>
            <Text style={styles.title}>Audio Playback</Text>
            {recording && (
                <>
                    <Text>
                        {isPlaying && 'Playing: '}
                        {recording.name}
                    </Text>
                    <Text>URI: {recording.uri}</Text>
                    <View style={styles.timeContainer}>
                        <Text>{formatTime(playbackPosition)}</Text>
                        <Text>{formatTime(playbackDuration)}</Text>
                    </View>
                    <View style={styles.controlsContainer}>
                        {isPlaying ? (
                            <>
                                <Pressable onPress={handlePlayPause} style={styles.button}>
                                    <Text style={styles.buttonText}>Pause</Text>
                                </Pressable>
                                <Pressable onPress={handleStop} style={styles.button}>
                                    <Text style={styles.buttonText}>Stop</Text>
                                </Pressable>
                            </>
                        ) : (
                            <>
                                <Pressable onPress={handlePlayPause} style={styles.button}>
                                    <Text style={styles.buttonText}>Play</Text>
                                </Pressable>
                            </>
                        )}
                        <Pressable onPress={handleDeleteRecording} style={styles.button}>
                            <Text style={styles.buttonText}>Delete</Text>
                        </Pressable>
                    </View>
                </>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    timeContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginBottom: 20,
    },
    controlsContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 20,
    },
    button: {
        backgroundColor: '#6200ee',
        paddingVertical: 20,
        paddingHorizontal: 40,
        borderRadius: 5,
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
    },
});

export default AudioPlaybackScreen;
