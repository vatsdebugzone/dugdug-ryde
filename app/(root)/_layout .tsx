import { Stack } from "expo-router";

const Layout = () => {
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }}></Stack.Screen>
    </Stack>
  );
};

export default Layout;
