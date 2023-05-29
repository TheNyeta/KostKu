import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Text, TouchableOpacity, ToastAndroid, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

const LoginScreen = ({navigation}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [secure, setSecure] = useState(true);
  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const handleLogin = () => {
    // Code to handle login
    let error = false

    if (username.length < 3) {
      setUsernameError('Minimal 3 karakter')
      error = true
    } else if (username.length >= 50) {
      setUsernameError('Maksimal 50 karakter')
      error = true
    } else if (!usernamere.test(username)) {
      setUsernameError('Nama hanya boleh alphabet')
      error = true
    } else {
      setUsernameError('')
    }

    if (password.length < 8) {
      setPasswordError('Minimal 8 digit')
      error = true
    } else {
      setPasswordError('')
    }

    if (!error) {
      navigation.navigate('Home')
    }
    navigation.navigate('Home')

  }

  const forgotPassword = () => {
    // Code to handle login
    ToastAndroid.show('forgor', 1)
  }

  const goToRegister = () => {
    // Code to handle login
    navigation.navigate('Register')
  }

  return (
    <View style={styles.container}>
      <Image source={require('../assets/image/kostkuLogo150.png')} style={{ height: 120, width: 120, marginTop: 30 }} />
      <Text style={{ fontSize: 30, fontWeight: 'bold', marginBottom: 50, color: 'black' }} >Masuk</Text>
      <View style={{ alignItems: 'center', justifyContent: 'center', width: '70%' }}>
      <View style={[styles.form, { borderColor: usernameError ? 'red' : '#FFB700' }]}>
            <Icon size={18} name='pencil' color='#FFB700' style={{ alignSelf: 'center', marginLeft: 5, marginRight: 5 }} />
            <TextInput
              style={styles.input}
              placeholder="Username"
              placeholderTextColor='#ccc'
              onChangeText={setUsername}
              value={username}
            />
          </View>
          { usernameError ? <Text style={{ alignSelf: 'flex-start', color: 'red', margin: 5, marginTop: -5 }} >{usernameError}</Text> : null }
        <View style={[styles.form, { borderColor: passwordError ? 'red' : '#FFB700' }]}>
          <Icon size={18} name='lock' color='#FFB700' style={{ alignSelf: 'center', marginLeft: 5, marginRight: 5 }} />
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor='#ccc'
            secureTextEntry={secure}
            onChangeText={setPassword}
            value={password}
          />
          <TouchableOpacity onPress={() => setSecure(!secure)} >
            <Icon size={18} name={`eye${secure ? '' : '-off'}`} color='#FFB700' />
          </TouchableOpacity>
        </View>
        { passwordError ? <Text style={{ alignSelf: 'flex-start', color: 'red', margin: 5, marginTop: -5 }} >{passwordError}</Text> : null }
        <TouchableOpacity style={{ alignSelf: 'flex-end' }} onPress={() => forgotPassword()}>
          <Text style={{ color: '#cccccc', fontSize: 13, textAlign: 'right' }}>Lupa Password?</Text>
        </TouchableOpacity>
      </View>
      {/* <Button style={{ borderRadius: 10 }} title="Masuk" onPress={handleLogin} /> */}
      <TouchableOpacity onPress={() => handleLogin()} style={{ alignItems: 'center' ,backgroundColor: '#FFB700', padding: 5, width: '40%', borderRadius: 5, marginTop: 30 }}>
        <Text style={{ fontSize: 17, color: 'white', fontWeight: 'bold' }}>Masuk</Text>
      </TouchableOpacity>
      <View style={{ marginTop: 60 }}>
        <Text style={{ textAlign: 'center'}} >Belum punya akun?</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
          <Text style={{ textAlign: 'center'}} >Daftar </Text>
          <TouchableOpacity onPress={() => goToRegister()}>
            <Text style={{ color: '#FFB700', fontWeight: 'bold' }} >di sini</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const RegisterScreen = ({navigation}) => {
  const [username, setUsername] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [secure, setSecure] = useState(true);
  const [usernameError, setUsernameError] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const handleRegister = () => {
    let error = false
    let usernamere = /^[a-zA-Z]*$/
    if (username.length < 3) {
      setUsernameError('Minimal 3 karakter')
      error = true
    } else if (username.length >= 50) {
      setUsernameError('Maksimal 50 karakter')
      error = true
    } else if (!usernamere.test(username)) {
      setUsernameError('Nama hanya boleh alphabet')
      error = true
    } else {
      setUsernameError('')
    }

    let phonere = /^[0-9]*$/
    if (phone.length < 8) {
      setPhoneError('Minimal 8 digit')
      error = true
    } else if (phone.length >= 12) {
      setPhoneError('Maksimal 12 digit')
      error = true
    } else if (!phonere.test(phone)) {
      setPhoneError('Nomor HP hanya boleh angka')
      error = true
    } else {
      setPhoneError('')
    }

    let emailre = /\S+@\S+\.\S+/

    if (email == '') {
      setEmailError('Email tidak boleh kosong')
      error = true
    } else if (!emailre.test(email)) {
      setEmailError('Email tidak valid')
      error = true
    } else {
      setEmailError('')
    }

    if (password.length < 8) {
      setPasswordError('Minimal 8 digit')
      error = true
    } else {
      setPasswordError('')
    }

    if (!error) {
      ToastAndroid.show('register', 1)
      navigation.navigate('Home')
    }

  } 

  const goToLogin = () => {
    ToastAndroid.show('go to login', 1)
    navigation.navigate('Login')
  }

  const syaratDanKetentuan = () => {
    ToastAndroid.show('snk', 1)
  }

  return (
    <KeyboardAwareScrollView >
      <View style={styles.container}>
        <Image source={require('../assets/image/kostkuLogo150.png')} style={{ height: 120, width: 120, marginTop: 30 }} />
        <Text style={{ fontSize: 30, fontWeight: 'bold', marginBottom: 50, color: 'black' }} >Daftar</Text>
        <View style={{ alignItems: 'center', justifyContent: 'center', width: '70%' }}>
          <View style={[styles.form, { borderColor: usernameError ? 'red' : '#FFB700' }]}>
            <Icon size={18} name='pencil' color='#FFB700' style={{ alignSelf: 'center', marginLeft: 5, marginRight: 5 }} />
            <TextInput
              style={styles.input}
              placeholder="Username"
              placeholderTextColor='#ccc'
              onChangeText={setUsername}
              value={username}
            />
          </View>
          { usernameError ? <Text style={{ alignSelf: 'flex-start', color: 'red', margin: 5, marginTop: -5 }} >{usernameError}</Text> : null }
          <View style={[styles.form, { borderColor: phoneError ? 'red' : '#FFB700' }]}>
            <Icon size={18} name='cellphone' color='#FFB700' style={{ alignSelf: 'center', marginLeft: 5, marginRight: 5 }} />
            <TextInput
              style={styles.input}
              placeholder="Nomor HP"
              placeholderTextColor='#ccc'
              onChangeText={setPhone}
              value={phone}
              keyboardType='numeric'
            />
          </View>
          { phoneError ? <Text style={{ alignSelf: 'flex-start', color: 'red', margin: 5, marginTop: -5 }} >{phoneError}</Text> : null }
          <View style={[styles.form, { borderColor: emailError ? 'red' : '#FFB700' }]}>
            <Icon size={18} name='email-outline' color='#FFB700' style={{ alignSelf: 'center', marginLeft: 5, marginRight: 5 }} />
            <TextInput
              style={styles.input}
              placeholder="Email"
              placeholderTextColor='#ccc'
              onChangeText={setEmail}
              value={email}
            />
          </View>
          { emailError ? <Text style={{ alignSelf: 'flex-start', color: 'red', margin: 5, marginTop: -5 }} >{emailError}</Text> : null }
          <View style={[styles.form, { borderColor: passwordError ? 'red' : '#FFB700' }]}>
            <Icon size={18} name='lock' color='#FFB700' style={{ alignSelf: 'center', marginLeft: 5, marginRight: 5 }} />
            <TextInput
              style={styles.input}
              placeholder="Password"
              placeholderTextColor='#ccc'
              secureTextEntry={secure}
              onChangeText={setPassword}
              value={password}
            />
            <TouchableOpacity onPress={() => setSecure(!secure)} >
              <Icon size={18} name={`eye${secure ? '' : '-off'}`} color='#FFB700' />
            </TouchableOpacity>
          </View>
          { passwordError ? <Text style={{ alignSelf: 'flex-start', color: 'red', margin: 5, marginTop: -5 }} >{passwordError}</Text> : null }
        </View>
        {/* <Button style={{ borderRadius: 10 }} title="Masuk" onPress={handleLogin} /> */}
        <TouchableOpacity onPress={() => handleRegister()} style={{ alignItems: 'center' ,backgroundColor: '#FFB700', padding: 5, width: '40%', borderRadius: 5, marginTop: 20 }}>
          <Text style={{ fontSize: 17, color: 'white', fontWeight: 'bold' }}>Daftar</Text>
        </TouchableOpacity>
        <View style={{ marginTop: 20 }}>
          <Text style={{ textAlign: 'center'}} >Dengan mendaftar Anda setuju dengan</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
            <TouchableOpacity onPress={() => syaratDanKetentuan()}>
              <Text style={{ color: '#FFB700', fontWeight: 'bold' }} >Syarat & Ketentuan</Text>
            </TouchableOpacity>
            <Text style={{ textAlign: 'center'}} > Kostku</Text>
          </View>
        </View>
        <View style={{ marginTop: 20 }}>
          <Text style={{ textAlign: 'center'}} >Sudah punya akun?</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ textAlign: 'center'}} >Masuk </Text>
            <TouchableOpacity onPress={() => goToLogin()}>
              <Text style={{ color: '#FFB700', fontWeight: 'bold' }} >di sini</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    // justifyContent: 'center'
  },
  input: {
    height: 40,
    width: '80%',
    marginVertical: 10,
    padding: 10,
    alignSelf:  'center'
  },
  form: {
    width: '100%',
    height: 40,
    marginVertical: 5,
    padding: 10,
    borderWidth: 1,
    borderColor: '#FFB700',
    borderRadius: 5,
    flexDirection: 'row'
  },
});

export { LoginScreen, RegisterScreen };
