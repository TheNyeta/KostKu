import React from 'react';
import { View, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import DashboardPage from './Dashboard';
import CalendarPage from './Calendar';
import SettingPage from './Setting';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
      <Tab.Navigator
        initialRouteName="Dashboard"
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: '#FFB700',
          tabBarShowLabel: false,
          tabBarStyle: {
            position: 'absolute',
            left: 50,
            right: 50,
            bottom: 30,
            borderRadius: 30,
            elevation: 10,
            shadowColor: '#FFB700',
            borderTopWidth: 0,
          }
        }}>
        <Tab.Screen
          name="Dashboard"
          component={DashboardPage}
          options={{
            tabBarLabel: 'Home',
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="home-outline" color={color} size={32} />
            ),
          }}
        />
        <Tab.Screen
          name="Calendar"
          component={CalendarPage}
          options={{
            tabBarLabel: 'Calendar',
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="calendar-outline" color={color} size={32} />
            ),
          }}
        />
        <Tab.Screen
          name="Setting"
          component={SettingPage}
          options={{
            tabBarLabel: 'Setting',
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="cog-outline" color={color} size={32} />
            ),
          }}
        />
      </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
