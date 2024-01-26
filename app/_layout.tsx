import { Stack } from 'expo-router';


export default function RootLayout() {
  return (
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="anime/[id]" options={{ headerShown: false }} />
        <Stack.Screen name="topanimes" options={{ headerShown: false }} />
        <Stack.Screen name="newrelease" options={{ headerShown: false }} />
      </Stack>
  );
}
