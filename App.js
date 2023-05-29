import React from 'react';
import { LoginScreen, RegisterScreen } from './app/loginregister';
import CreateRoomScreen from './app/CreateRoomScreen';
import RoomListScreen from './app/RoomListScreen';
import CreateRoomGroupScreen from './app/CreateRoomGroupScreen';
import PaymentDetailScreen from './app/PaymentDetailScreen';
import RoomDetailScreen from './app/RoomDetailScreen';
import RoomGroupListScreen from './app/RoomGroupListScreen';
import HomePage from './app/TabBar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NativeBaseProvider } from 'native-base';


const Stack = createNativeStackNavigator()

function App() {
  return (
    <NativeBaseProvider>
      <NavigationContainer>
        <Stack.Navigator 
          screenOptions={{
            headerShown: false
          }} 
        >
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
          <Stack.Screen name="Home" component={HomePage} />
          <Stack.Screen name="RoomList" component={RoomListScreen} />
          <Stack.Screen name="RoomGroupList" component={RoomGroupListScreen} />
          <Stack.Screen name="CreateRoomGroup" component={CreateRoomGroupScreen} />
          <Stack.Screen name="CreateRoom" component={CreateRoomScreen} />
          <Stack.Screen name="PaymentDetail" component={PaymentDetailScreen} />
          <Stack.Screen name="RoomDetail" component={RoomDetailScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </NativeBaseProvider>
  );
}

export default App;
