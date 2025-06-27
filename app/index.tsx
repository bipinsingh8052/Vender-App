import { AntDesign, FontAwesome } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Image,
  ToastAndroid
} from 'react-native';
import { BASE_URL } from './(vender)/(components)/Config';
import axios from 'axios';

const Index = () => {
const [email, setEmail] = useState<any>('');
const [password, setPassword] = useState<any>('');

const route =useRouter();

  const handleLogin = async() => {
    let api=`${BASE_URL}/vendor/auth`

    try {
      let response=await axios.post(api,{
      email: email,
      password: password
    })
       ToastAndroid.showWithGravity(response.data.message, ToastAndroid.SHORT, ToastAndroid.CENTER);
    } catch (error) {
      ToastAndroid.showWithGravity('Server Error!', ToastAndroid.SHORT, ToastAndroid.CENTER);
      console.log(error)
    }
  
  
    route.navigate("/(vender)")
  };

  return (
    <View style={styles.container}>
      <View  >
        <Text style={styles.welcomeText}>Welcome Back!</Text>

        <TextInput
          placeholder="Username or Email :"
          style={styles.input}
          onChangeText={setEmail}
          value={email}
        />

        <TextInput
          placeholder="Password :"
          secureTextEntry
          style={styles.input}
          onChangeText={setPassword}
          value={password}
        />

        <TouchableOpacity onPress={() => Alert.alert('Forgot Password tapped!')}>
          <Text style={styles.forgotText}>Forgot Password?</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginText}>Login</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.separatorContainer}>
        <Text style={styles.separatorText}>- OR Continue with -</Text>
      </View>

      <View style={styles.socialRow}>
        <View style={styles.socialIcon}>
          <FontAwesome name='facebook-f' size={30} color={"blue"}/>
        </View>
        <View style={styles.socialIcon} >
          {/* <FontAwesome name='google' size={30}  color={"green"} /> */}
          <Image  source={{uri:"https://www.citypng.com/public/uploads/preview/google-logo-icon-gsuite-hd-701751694791470gzbayltphh.png"}} style={{height:"60%", width:"60%", overflow:"hidden"}}/>
        </View>
        <View style={styles.socialIcon} >
          <AntDesign name='apple1'  size={30}/>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  
    justifyContent:"center",
    // alignItems:"center",
    backgroundColor: '#fff',
    
  },
  
  welcomeText: {
    textAlign:"center",
    fontSize: 30,
    fontWeight: 'bold',
    fontFamily: 'Montserrat',
    color: '#000',
    marginBottom: 35,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    padding: 10,
    marginBottom: 20,
    fontSize: 16,
  },
  forgotText: {
    color: 'red',
    textAlign: 'right',
    marginBottom: 20,
  },
  loginButton: {
    backgroundColor: 'red',
    padding: 15,
    borderRadius: 6,
    alignItems: 'center',
  },
  loginText: {
    color: '#fff',
    fontSize: 18,
  },
  separatorContainer: {
    marginTop:20,
    alignItems: 'center',
    // marginVertical: 0,
  },
  separatorText: {
    fontSize: 18,
    fontFamily: 'Montserrat',
    fontWeight: 'bold',
  },
  socialRow: {
    marginTop:20,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  socialIcon: {
    height: 75,
    alignItems:"center",
    justifyContent:"center",
        width: 75,
    borderRadius: 50,
    borderWidth: 0.5,
    backgroundColor:"#Fffff",
    borderColor: '#B48383',
    overflow:"hidden"
  },
});

export default Index;
