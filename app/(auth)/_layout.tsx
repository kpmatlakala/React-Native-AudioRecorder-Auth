import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'

const Auth_layout = () => {
    return (
        <Stack screenOptions={{ headerShown : false }}>
            <Stack.Screen name='index' />
        </Stack>
    )
}

export default Auth_layout