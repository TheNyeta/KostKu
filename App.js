import React, { useState, useContext } from 'react';
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
import RoleSelectScreen from './app/RoleSelectScreen';
import NewPenghuniListScreen from './app/NewPenghuniListScreen';
import NewPenghuniDetailScreen from './app/NewPenghuniDetailScreen';
import SplashScreen from './app/SplashScreen';
import UserProfileScreen from './app/UserProfileScreen';
import UserProfileEditScreen from './app/UserProfileEditScreen';
import OnBoardingScreen from './app/OnBoardingScreen';
import CreateKostScreen from './app/CreateKostScreen';
import CreateEventScreen from './app/CreateEventScreen';
import KostScreen from './app/KostScreen';
import KostDetailScreen from './app/KostDetailScreen';
import KostEditScreen from './app/KostEditScreen';
import PenjagaKostScreen from './app/PenjagaKostScreen';

import HomePagePenghuni from './app/TabBarPenghuni';
import EnterCodeScreen from './app/EnterCodeScreen'
import PusatInformasiScreen from './app/PusatInformasiScreen';
import EnterRumahKostScreen from './app/EnterRumahKostScreen';
import WaitingScreen from './app/WaitingScreen';
import CreateRatingScreen from './app/CreateRatingScreen';
import PeraturanDetailScreen from './app/PeraturanDetailScreen';
import PeraturanDetailEditScreen from './app/PeraturanDetailEditScreen';
import CreateKeluhanScreen from './app/CreateKeluhanScreen';
import CreateLaporanScreen from './app/CreateLaporanScreen';
import PaymentLogListScreen from './app/PaymentLogListScreen';
import RoomDetailEditScreen from './app/RoomDetailEditScreen';
import ForgotPasswordScreen from './app/ForgotPasswordScreen';
import OtpScreen from './app/OtpScreen';
import ChangePasswordScreen from './app/ChangePasswordScreen';


import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { UpdateContext } from './app/GlobalState';

const Stack = createNativeStackNavigator()


function App() {
  const [update, setUpdate] = useState({
    updateDashboard: true,
    updateCalendar: false,
    updateSetting: false
  })

  return (
    <UpdateContext.Provider value={[update, setUpdate]} >
      <>
      <NavigationContainer>
        <Stack.Navigator 
          screenOptions={{
            headerShown: false,
            cardStyle: { backgroundColor: '#FFFFFF' }
          }} 
        >
          <Stack.Screen name="Splash" component={SplashScreen} />
          <Stack.Screen name="RoleSelect" component={RoleSelectScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
          <Stack.Screen name="OnBoarding" component={OnBoardingScreen} />
          <Stack.Screen name="CreateKost" component={CreateKostScreen} />
          <Stack.Screen name="Home" component={HomePage} />
          <Stack.Screen name="UserProfile" component={UserProfileScreen} />
          <Stack.Screen name="UserProfileEdit" component={UserProfileEditScreen} />
          <Stack.Screen name="Kost" component={KostScreen} />
          <Stack.Screen name="KostDetail" component={KostDetailScreen} />
          <Stack.Screen name="KostEdit" component={KostEditScreen} />
          <Stack.Screen name="PenjagaKost" component={PenjagaKostScreen} />
          <Stack.Screen name="NewPenghuniList" component={NewPenghuniListScreen} />
          <Stack.Screen name="NewPenghuniDetail" component={NewPenghuniDetailScreen} />
          <Stack.Screen name="CreateEvent" component={CreateEventScreen} />
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

          <Stack.Screen name="HomePenghuni" component={HomePagePenghuni} />
          <Stack.Screen name="EnterCode" component={EnterCodeScreen} />
          <Stack.Screen name="PusatInformasi" component={PusatInformasiScreen} />
          <Stack.Screen name="EnterRumahKost" component={EnterRumahKostScreen} />
          <Stack.Screen name="Waiting" component={WaitingScreen} />
          <Stack.Screen name="CreateRating" component={CreateRatingScreen} />
          <Stack.Screen name="PeraturanDetail" component={PeraturanDetailScreen} />
          <Stack.Screen name="PeraturanDetailEdit" component={PeraturanDetailEditScreen} />
          <Stack.Screen name="CreateKeluhan" component={CreateKeluhanScreen} />
          <Stack.Screen name="CreateLaporan" component={CreateLaporanScreen} />
          <Stack.Screen name="PaymentLogList" component={PaymentLogListScreen} />
          <Stack.Screen name="RoomDetailEdit" component={RoomDetailEditScreen} />
          <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
          <Stack.Screen name="Otp" component={OtpScreen} />
          <Stack.Screen name="ChangePassword" component={ChangePasswordScreen} />



        </Stack.Navigator>
      </NavigationContainer>
      </>
    </UpdateContext.Provider>
  );
}

export default App;
