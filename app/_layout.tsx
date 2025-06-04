import { Stack } from "expo-router";
import { SessionProvider, useSession } from "../ctx";
import { SplashScreenController } from "../splash";

export default function Root() {
  // Set up the auth context and render our layout inside of it.
  return (
    <SessionProvider>
      <SplashScreenController />
      <RootNavigator />
    </SessionProvider>
  );
}

// Separate this into a new component so it can access the SessionProvider context later
function RootNavigator() {
  const { session } = useSession();

  console.log("session", session);

  return (
    <Stack>
      <Stack.Protected guard={Boolean(session)}>
        <Stack.Screen name="(app)" />
      </Stack.Protected>

      <Stack.Protected guard={!Boolean(session)}>
        <Stack.Screen name="sign-in" />
      </Stack.Protected>
    </Stack>
  );
}
