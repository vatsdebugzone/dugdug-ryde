import { icons } from "@/constants";
import { Tabs } from "expo-router";
import React from "react";
import { Image, ImageSourcePropType, View } from "react-native";


const TabIcon = ({
  source,
  focused,
}: {
  source: ImageSourcePropType;
  focused: boolean;
}) => (
  <View  
  className={`flex flex-row justify-center items-center rounded-full  ${focused ? "bg-general-300" : ""}`}
>
  <View
    className={`rounded-full mx-auto w-11 h-11 items-center justify-center ${focused ? "bg-general-400" : ""}`}
  >
    <Image
      source={source}
      tintColor="white"
      resizeMode="contain"
      className="w-7 h-7"     
    />
  </View>
</View>
);

const TabLayout = () => (
  <Tabs
    initialRouteName="home"
    screenOptions={{
      tabBarActiveTintColor: "white",
      tabBarInactiveTintColor: "#6d6666",
      tabBarShowLabel: false,
      tabBarStyle: {
        backgroundColor: "#333333",
        borderRadius: 28,
        paddingBottom: 28,
        overflow: "hidden",
        marginHorizontal: 20,
        marginBottom: 40,
        height: 65,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "row",
        position: "absolute",
      },
    }}
  >
    <Tabs.Screen
      name="home"
      options={{
        title: "Home",
        headerShown: false,
        tabBarIcon: ({ focused }) => (
          <TabIcon source={icons.home} focused={focused} />
        ),
      }}
    />
      <Tabs.Screen
        name="ride"
        options={{
          title: "Rides",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon source={icons.list} focused={focused} />
          ),
        }}
      />
    <Tabs.Screen
        name="chat"
        options={{
          title: "Chat",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon source={icons.chat} focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon source={icons.profile} focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="history"
        options={{
          title: "History",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon source={icons.map} focused={focused} />
          ),
        }}
      />
     
      
  </Tabs>
);
export default TabLayout;
