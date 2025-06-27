import React from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import { Feather, MaterialIcons, Ionicons, FontAwesome5, Entypo } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import Herosection from './(components)/Herosection';
import Navbar from './(components)/Navbar';

const iconColor = '#f44336';
const iconSize = 16;

const IconItem = ({ label, icon, type }: any) => {
  let IconComponent: any = Feather;

  switch (type) {
    case 'MaterialIcons': IconComponent = MaterialIcons; break;
    case 'Ionicons': IconComponent = Ionicons; break;
    case 'FontAwesome5': IconComponent = FontAwesome5; break;
    case 'Entypo': IconComponent = Entypo; break;
  }

  return (
    <View style={{ flex: 1, alignItems: 'center', paddingVertical: 16 }}>
      <View style={{
        backgroundColor: '#ffecec',
        height: 34,
        width: 34,
        borderRadius: 17,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 6,
      }}>
        <IconComponent name={icon} size={iconSize} color={iconColor} />
      </View>
      <Text style={{ fontWeight: '500', fontSize: 12, textAlign: 'center' }}>{label}</Text>
    </View>
  );
};

const VerticalDivider = () => (
  <View style={{
    width: 1,
    backgroundColor: '#ddd',
    marginVertical: 12,
  }} />
);

export default function Index() {
  const Router = useRouter();
  const handleTax = () => {
    Router.push('/OrderPage');
  };

  return (
    <SafeAreaView>
      <ScrollView>
        {/* Header */}
        <View style={{ backgroundColor: '#e01616', paddingHorizontal: 16, paddingVertical: 12, borderBottomLeftRadius: 16, borderBottomRightRadius: 16 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center', marginBottom: 25, marginTop: 40 }}>
            <View style={{ position: 'absolute', left: 0, right: 0, alignItems: 'center', zIndex: 1 }}>
              <TouchableOpacity style={{ backgroundColor: '#f44336', borderRadius: 25, paddingHorizontal: 10, paddingVertical: 3, flexDirection: 'row', alignItems: 'center' }}>
                <Text style={{ color: '#fff', fontSize: 14, fontWeight: '500' }}>Bipin Singh</Text>
                <Ionicons name="chevron-down" size={16} color="#fff" style={{ marginLeft: 6 }} />
              </TouchableOpacity>
            </View>
            <TouchableOpacity>
              <Feather name="search" size={20} color="white" />
            </TouchableOpacity>
          </View>

          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <TouchableOpacity style={{ backgroundColor: '#fff', borderRadius: 20, paddingHorizontal: 10, paddingVertical: 2 }}>
              <Text style={{ color: '#e01616' }}>Free Plan</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text style={{ color: 'white', fontSize: 12, fontWeight: '500' }}>
                Visit Store <Feather name="arrow-up-right" size={14} color="white" />
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Stats Section */}
        <View style={{ alignItems: 'center', marginTop: 30 }}>
          <View style={{
            backgroundColor: '#fff', borderRadius: 24, width: '90%',
            paddingVertical: 20, paddingHorizontal: 16, elevation: 6,
            shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 10,
            shadowOffset: { width: 0, height: 3 }
          }}>
            <Text style={{ fontWeight: "500", fontSize: 16, marginBottom: 12 }}>Today so far</Text>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <View style={{ alignItems: 'center', flex: 1 }}>
                <Text style={{ fontSize: 12, fontWeight: 'bold' }}>1</Text>
                <Text style={{ fontSize: 12, color: '#555', marginTop: 4 }}>Page Views</Text>
              </View>
              <TouchableOpacity style={{ alignItems: "center", justifyContent: "center", flex: 1 }} onPress={handleTax}>
                <Text style={{ fontSize: 12, fontWeight: 'bold' }}>2</Text>
                <Text style={{ fontSize: 12, color: '#555', marginTop: 4 }}>Order</Text>
              </TouchableOpacity>
              <View style={{ alignItems: 'center', flex: 1 }}>
                <Text style={{ fontSize: 12, fontWeight: 'bold' }}>₹ 200</Text>
                <Text style={{ fontSize: 12, color: '#555', marginTop: 4 }}>Revenue</Text>
              </View>
            </View>
          </View>

          <TouchableOpacity style={{
            backgroundColor: '#fff', borderRadius: 24, padding: 5, marginTop: -20,
            elevation: 4, shadowColor: '#000', shadowOpacity: 0.2,
            shadowRadius: 6, shadowOffset: { width: 0, height: 2 }
          }}>
            <Feather name="chevron-down" size={22} color="black" />
          </TouchableOpacity>
        </View>

        {/* Static 3x4 Grid Section */}
       <View style={{
      margin: 16,
      borderRadius: 20,
      backgroundColor: '#fff',
      elevation: 4,
      overflow: 'hidden',
      paddingVertical: 12,
    }}>
      {/* Row 1 */}
      <View style={{ flexDirection: 'row', justifyContent:"space-around" }}>
        <TouchableOpacity style={{  alignItems: 'center' }} onPress={()=>{Router.push('/(vender)/(components)/ProductPage')}}>
          <IconItem label="Products" icon="tshirt" type="Feather" />
        </TouchableOpacity>
        <VerticalDivider />
        <TouchableOpacity style={{  alignItems: 'center' }} onPress={()=>{Router.push('/(vender)/(components)/PermissionPage')}}>
          <IconItem label="Permission" icon="collections" type="MaterialIcons" />
        </TouchableOpacity>
        <VerticalDivider />
        <TouchableOpacity style={{  alignItems: 'center' }} onPress={()=>{Router.push('/(vender)/(components)/RolePage')}}> 
          <IconItem label="Role" icon="people-outline" type="Ionicons" />
        </TouchableOpacity>
        <VerticalDivider />
        <TouchableOpacity style={{  alignItems: 'center' }} onPress={()=>{Router.navigate("/(vender)/taxPage")}}>
          <IconItem label="Tax" icon="file-document" type="MaterialIcons" />
        </TouchableOpacity>
      </View>

      {/* Row 2 */}
      <View style={{ flexDirection: 'row', justifyContent:"space-around" }}>
        <TouchableOpacity style={{  alignItems: 'center' }}  onPress={()=>{Router.push('/(vender)/(components)/Complain')}}>
          <IconItem label="Complain" icon="image" type="Feather" />
        </TouchableOpacity>
        <VerticalDivider />
        <TouchableOpacity style={{  alignItems: 'center' }} onPress={()=>{Router.push('/(vender)/(components)/CouponPage')}}>
          <IconItem label="Coupons" icon="local-offer" type="MaterialIcons" />
        </TouchableOpacity>
        <VerticalDivider />
        <TouchableOpacity style={{ alignItems: 'center' }}>
          <IconItem label="Settings" icon="settings" type="Feather" />
        </TouchableOpacity>
        <VerticalDivider />
        <TouchableOpacity style={{  alignItems: 'center' }} onPress={()=>{Router.push('/(vender)/(components)/RefundPage')}}>
          <IconItem label="Refund" icon="youtube-play" type="FontAwesome5" />
        </TouchableOpacity>
      </View>



      {/* Row 3 */}
      <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
        <TouchableOpacity style={{ alignItems: 'center' }} onPress={()=>{Router.push('/(vender)/(components)/ReturnPage')}}>
          <IconItem label="Return" icon="chatbubble-ellipses-outline" type="Ionicons" />
        </TouchableOpacity>
        <VerticalDivider />
        <TouchableOpacity style={{  alignItems: 'center' }} onPress={()=>{Router.push("/(vender)/(components)/ReviewPage")}}>
          <IconItem label="Review" icon="plugin" type="Entypo" />
        </TouchableOpacity>
        <VerticalDivider />
        <TouchableOpacity style={{ alignItems: 'center' }} onPress={()=>{Router.push('/(vender)/(components)/SellingPage')}}>
          <IconItem label="Selling" icon="star-half" type="Ionicons" />
        </TouchableOpacity>
        <View style={{  }} />
      </View>
    </View>
    <Herosection/>
    <View style={{height:100}}></View>
    <Navbar/>
      </ScrollView>
    </SafeAreaView>
  );
}
