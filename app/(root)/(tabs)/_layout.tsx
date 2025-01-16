import Home from "@/assets/svgs/tabs/home";
import Snowflake from "@/assets/svgs/tabs/snowflake";
import Trolley from "@/assets/svgs/tabs/trolley";
import Truck from "@/assets/svgs/tabs/truck";
import User from "@/assets/svgs/tabs/user";
import TabIcon from "@/components/Tabs/tabIcon";
import { Tabs } from "expo-router";

export default function TabsLayout() {
    return (
        <Tabs
            initialRouteName="home"
            screenOptions={{
                animation: "shift",
                tabBarShowLabel: false,
                tabBarLabelStyle: {
                    fontSize: 10,
                    opacity: 1,
                    color: "white"
                },
                tabBarStyle: {
                    position: 'absolute',
                    bottom: 24,
                    flexDirection: "row",
                    marginHorizontal: 5,
                    borderRadius: 50,
                    paddingHorizontal: 5,
                    height: 74,
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "#0066e1",
                    overflow: "hidden",
                },
            }}
        >
            <Tabs.Screen
                name="storage"
                options={{
                    headerShown: false,
                    title: 'Storage',
                    tabBarIcon: ({ focused, color }) => (
                        <TabIcon
                            focused={focused}
                            Icon={<Snowflake />}
                            title="Storage"
                            className={"rounded-tl-full rounded-bl-full rounded-tr-xl rounded-br-xl"}
                        />
                    ),

                }}
            />
            <Tabs.Screen
                name="crates"
                options={{
                    headerShown: false,
                    title: 'Crates',
                    tabBarIcon: ({ focused }) => (
                        <TabIcon
                            focused={focused}
                            Icon={<Trolley />}
                            title="Crates"
                        />
                    )
                }}
            />
            <Tabs.Screen
                name="home"
                options={{
                    headerShown: false,
                    title: 'Home',
                    tabBarIcon: ({ focused }) => (
                        <TabIcon
                            focused={focused}
                            Icon={<Home />}
                            title="Home"
                        />
                    )
                }}
            />
            <Tabs.Screen
                name="logistics"
                options={{
                    headerShown: false,
                    title: 'Logistics',
                    tabBarIcon: ({ focused }) => (
                        <TabIcon
                            focused={focused}
                            Icon={<Truck />}
                            title="Logistics"
                        />
                    )
                }}
            />
            <Tabs.Screen
                name="profile"
                options={{
                    headerShown: false,
                    title: 'Profile',
                    tabBarIcon: ({ focused }) => (
                        <TabIcon
                            focused={focused}
                            Icon={<User />}
                            title="Profile"
                            className={"rounded-tr-full rounded-br-full rounded-tl-xl rounded-bl-xl"}
                        />
                    )
                }}
            />
        </Tabs>
    )
}