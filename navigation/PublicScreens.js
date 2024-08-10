import { Colors, Typography, View } from "react-native-ui-lib";
import { EventsContextProvider } from "@context/Events";
import { LoaderContextProvider } from "@context/LoaderContext";
import HomePage from "@pages/Hymnal/HymnalPage";
import ConfigPage from "@pages/Config/ConfigPage";
import PlaylistPage from "@pages/Playlist/PlaylistPage";
import SignInPage from "@pages/Auth/SignInPage";
import LoginPage from "@pages/Auth/LoginPage";
import RecoveryPasswordPage from "@pages/Auth/RecoveryPasswordPage";
import VerifyEmailPage from "@pages/Auth/VerifyEmailPage";
import SongsPage from "@pages/Songs/SongsPage";
import WelcomePage from "@pages/WelcomePage";
import { Platform } from "react-native";
import PropTypes from "prop-types";
import RedDot from "@components/atoms/RedDot";
import HomeIcon from "@assets/icons/home.svg";
import SharedIcon from "@assets/icons/icon-shared.svg";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import useTabBar from "@hooks/useTabBar";
import useUser from "@hooks/useUser";
import { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import AnimatedLoader from "@components/atoms/AnimatedLoader";
import toastConfig from "@components/atoms/Toast";
import { useLoaderContext } from '@context/LoaderContext'
import Toast from 'react-native-toast-message';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const IconButton = ({ hasNotifications = false, icon }) => {
  return (
    <View center>
      {hasNotifications && <RedDot />}
      <View center>{icon}</View>
    </View>
  );
};

IconButton.propTypes = {
  hasNotifications: PropTypes.bool,
  icon: PropTypes.node.isRequired,
};

IconButton.propTypes = {
  focused: PropTypes.bool,
  icon: PropTypes.node.isRequired,
};

const HomeNav = () => {
  const { setCurrentTab } = useTabBar();

  return (
    <Stack.Navigator
      screenOptions={({ route }) => {
        setCurrentTab(route.name);
        return {
          headerShown: false,
        };
      }}
    >
      <Stack.Screen
        name="List"
        component={HomePage}
        screenOptions={{
          gestureEnabled: false,
        }}
      />
      {/* <Stack.Screen name='Account' component={Account} />
			<Stack.Screen name='Notifications' component={Notifications} /> */}
    </Stack.Navigator>
  );
};

const AuthPagesWithContexts = () => {
  const { loader } = useLoaderContext();
  return (
    <>
      <AuthPages />
      {
        loader ? 
        <AnimatedLoader /> : null
      }
       <Toast position={'top'} topOffset={Platform.OS === 'ios' ? 60 : 50} config={toastConfig}/>
    </>
  );
};

const AuthPages = () => {

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        gestureEnabled: false,
        swipeEnabled: false,
      }}
    >
      <Stack.Screen
        name="WelcomePageAuth"
        component={WelcomePage}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="SingInPage"
        component={SignInPage}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="VerifyEmailProccesAuth"
        component={VerifyEmailPage}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="LoginPage"
        component={LoginPage}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="RecoveryPasswordPage"
        component={RecoveryPasswordPage}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

const AppWithContexts = () => {
  const { loader } = useLoaderContext();
  return (
    <>
      <App />
      {
        loader ? 
        <AnimatedLoader /> : null
      }
      <Toast position={'top'} topOffset={Platform.OS === 'ios' ? 60 : 50} config={toastConfig}/>
    </>
  );
};
const App = () => {
  // const { expoPushToken, notification } = useNotifications()

  // const { sharedTickets, sentTickets, refreshEvents } = useEvents()

  // const [deviceToken, { isLoading }] = useDeviceTokenMutation()

  // const registerDevice = async () => {
  // 	try {
  // 		await deviceToken(expoPushToken).unwrap()
  // 	} catch (error) {
  // 		console.log('error', error)
  // 	}
  // }

  // React.useEffect(() => {
  // 	const unsubscribe = navigation.addListener("tabPress", async (e) => {
  // 	 // add your business logic here
  // 	})

  // // Unsubscribe to event listener when component unmount
  //  return () => unsubscribe();
  //   }, [ navigation]);

  // const {user} = useUser()

  // const navigator = useNavigation();
  // useEffect(() => {
  //   if (!user) {
  //     navigator.navigate("WelcomePage");
  //   }
  // }, []);

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: Colors.blue600,
        tabBarInactiveTintColor: Colors.gray500,
        tabBarLabelStyle: {
          ...Typography.tabBarLabel,
          paddingVertical: Platform.OS === "ios" ? 0 : 6,
        },
        tabBarStyle: {
          paddingVertical: 8,
          backgroundColor: Colors.tabBarColor,
          // backgroundColor:
          // 	isEventDetailView && selectedEvent?.event?.high_light_colors?.length > 0
          // 		? `rgba(${selectedEvent?.event?.high_light_colors[0]})`
          // 		: Colors.white
        },
      }}
    >
      <Tab.Screen
        name="HomePage"
        component={HomeNav}
        listeners={({ navigation }) => ({
          tabPress: (e) => {
            e.preventDefault();
            navigation.navigate("List");
          },
        })}
        options={{
          tabBarLabel: "Himnos",
        }}
        Options={{
          tabBarIcon: ({ focused }) => (
            <IconButton
              focused={focused}
              icon={
                <HomeIcon
                  width={20}
                  height={20}
                  fill={focused ? Colors.blue600 : Colors.gray500}
                />
              }
            />
          ),
        }}
      />
      <Tab.Screen
        name="PlaylistPage"
        component={PlaylistPage}
        options={{
          tabBarLabel: "Playlist",
        }}
        Options={{
          tabBarIcon: ({ focused }) => (
            <IconButton
              hasNotifications={true}
              icon={
                <SharedIcon
                  width={20}
                  height={20}
                  fill={focused ? Colors.blue600 : Colors.gray500}
                />
              }
            />
          ),
        }}
      />
      <Tab.Screen
        name="Songs"
        component={SongsPage}
        options={{
          tabBarLabel: "Mis canciones",
        }}
        Options={{
          tabBarIcon: ({ focused }) => (
            <IconButton
              hasNotifications={true}
              icon={
                <SharedIcon
                  width={20}
                  height={20}
                  fill={focused ? Colors.blue600 : Colors.gray500}
                />
              }
            />
          ),
        }}
      />
      <Tab.Screen
        name="Configuration"
        component={ConfigPage}
        options={{
          tabBarLabel: "Configuración",
        }}
        Options={{
          tabBarIcon: ({ focused }) => (
            <IconButton
              hasNotifications={true}
              icon={
                <SharedIcon
                  width={20}
                  height={20}
                  fill={focused ? Colors.blue600 : Colors.gray500}
                />
              }
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const PublicScreens = () => {
  return (
    <EventsContextProvider>
      <LoaderContextProvider>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
            gestureEnabled: false,
            swipeEnabled: false,
          }}
        >
          <Stack.Screen
            name="App"
            component={AppWithContexts}
            options={{ title: "Boletia" }}
          />
          <Stack.Screen
            name="WelcomePage"
            component={AuthPagesWithContexts}
            options={{
              presentation: "transparentModal",
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="VerifyEmailPage"
            component={VerifyEmailPage}
            options={{
              presentation: "transparentModal",
              headerShown: false,
            }}
          />
        </Stack.Navigator>
      </LoaderContextProvider>
    </EventsContextProvider>
  );
};

export default PublicScreens;
