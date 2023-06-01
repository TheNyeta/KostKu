import React from 'react';
import { LoginScreen, RegisterScreen } from './app/loginregister';
import CreateRoomScreen from './app/CreateRoomScreen';
import RoomListScreen from './app/RoomListScreen';
import CreateRoomGroupScreen from './app/CreateRoomGroupScreen';
import PaymentDetailScreen from './app/PaymentDetailScreen';
import RoomDetailScreen from './app/RoomDetailScreen';
import RoomGroupListScreen from './app/RoomGroupListScreen';
import EmptyRoomListScreen from './app/EmptyRoomListScreen';
import JatuhTempoListScreen from './app/JatuhTempoListScreen';
import BroadcastScreen from './app/BroadcastScreen';
import CreateBroadcastScreen from './app/CreateBroadcastScreen';
import BroadcastDetailScreen from './app/BroadcastDetailScreen';
import KeluhanListScreen from './app/KeluhanListScreen';
import KeluhanDetailScreen from './app/KeluhanDetailScreen';
import LaporanListScreen from './app/LaporanListScreen';
import LaporanDetailScreen from './app/LaporanDetailScreen';
import RatingListScreen from './app/RatingListScreen';
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
            headerShown: false,
            cardStyle: { backgroundColor: '#FFFFFF' }
          }} 
        >
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
          <Stack.Screen name="Home" component={HomePage} />
          <Stack.Screen name="RatingList" component={RatingListScreen} />
          <Stack.Screen name="RoomList" component={RoomListScreen} />
          <Stack.Screen name="JatuhTempoList" component={JatuhTempoListScreen} />
          <Stack.Screen name="KeluhanList" component={KeluhanListScreen} />
          <Stack.Screen name="KeluhanDetail" component={KeluhanDetailScreen} />
          <Stack.Screen name="LaporanList" component={LaporanListScreen} />
          <Stack.Screen name="LaporanDetail" component={LaporanDetailScreen} />
          <Stack.Screen name="Broadcast" component={BroadcastScreen} />
          <Stack.Screen name="BroadcastDetail" component={BroadcastDetailScreen} />
          <Stack.Screen name="CreateBroadcast" component={CreateBroadcastScreen} />
          <Stack.Screen name="EmptyRoomList" component={EmptyRoomListScreen} />
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
