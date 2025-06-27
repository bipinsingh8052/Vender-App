import React from 'react'
import { View, Text, Image, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
export default function Herosection() {
  return (
    <LinearGradient
      colors={['#A908BE', '#2B01C8']}
      style={{
        borderRadius: 20,
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        margin: 15,
      }}
    >
      {/* Text Section */}
      <View style={{ flex: 1,  paddingLeft:5}}>
        <Text style={{ color: 'yellow', fontWeight: 'bold', fontSize: 24 }}>
          CYBER{"\n"}LINIO
        </Text>
        <Text style={{ color: 'white', fontSize: 15, marginTop: 5 }}>
          40% <Text style={{ fontSize: 8 }}>DSCNT</Text>
        </Text>
        <Text style={{ color: 'white', fontSize: 13 }}>in technology</Text>

        <View
          style={{
            backgroundColor: 'white',
            alignSelf: 'flex-start',
            paddingHorizontal: 5,
            paddingVertical: 4,
            borderRadius: 20,
            marginTop: 5,
          }}
        >
          <Text style={{ color: 'orange', fontSize: 8, fontWeight: '700' }}>
            FREE SHIPPING
          </Text>
        </View>
      </View>

      {/* Image Section */}
      <View style={{ flex: 1, alignItems: 'center', gap: 5 ,flexDirection:"row" ,position:"absolute" ,right:0}}>
        {/* Replace these Image sources with your local or online images */}
        <Image
          source={require('../../../assets/images/remote.png')}
          style={{ width: 150, height: 150,position:"relative", top:-30, left:120, zIndex:1,  }}
        />
        <Image
          source={require('../../../assets/images/gamer.png')}
          style={{ width: 144, height: 114, transform: [{ rotate: '-20deg' }], position:"relative", right:-60, top:-20, zIndex:10}}
        />
        <View>
            <Image
          source={require('../../../assets/images/earphone.png')}
          style={{ width: 80, height: 80, position:"relative", bottom:-50, left:-15, zIndex:1 }}
        />
        </View>
      </View>
      <View style={{  position:"relative", bottom:-80  ,left:-60 }}><Text style={{color:"#757575", fontSize:8,fontWeight:"regular"}}>*Valid from 27/03 to 01/04/2025. Min stock: 1 unit</Text></View>
    </LinearGradient>
  )
}
