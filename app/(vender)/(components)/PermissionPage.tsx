import { AntDesign, Entypo } from '@expo/vector-icons';
import { useNavigation, useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { DataTable, Button, IconButton } from 'react-native-paper';
import axios from 'axios';
import Toast from 'react-native-toast-message';
import { useFocusEffect } from '@react-navigation/native';
import { BASE_URL } from './Config';
import Loader from './Loader';

const itemsPerPage = 8;

const PermissionPage = () => {
  const [search, setSearch] = useState('');
  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);
  const [load, setLoad] = useState(true);
  const [visible, setVisible] = useState(false);

  const [options, setOptions] = useState([
    { label: 'Permission', checked: true },
    { label: 'Actions', checked: true },
  ]);

  const toggleOption = (index) => {
    const updated = [...options];
    updated[index].checked = !updated[index].checked;
    setOptions(updated);
  };

  const filteredData = data.filter(item =>
    item.name?.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const paginatedData = filteredData.slice(page * itemsPerPage, (page + 1) * itemsPerPage);

  const Router = useRouter();
  const Navigation = useNavigation();

  const reload = async () => {
    setLoad(true);
    try {
      const response = await axios.get(`${BASE_URL}/vendor/permissions`);
      // console.log(response.data.permission)
      setData(response.data.permissions || []);
      setLoad(false);
    } catch (error) {
      console.log(error,"per");
      setLoad(true);
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(`${BASE_URL}/vendor/permissions/${id}`);
      Toast.show({
        type: 'success',
        text1: res.data.message || 'Success',
        text2: 'Permission Deleted',
        position: 'top',
        visibilityTime: 4000,
        autoHide: true,
      });
      reload();
    } catch (error) {
      console.log(error);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      reload();
    }, [])
  );

  return (
    <>
      <View style={{ flex: 1, backgroundColor: '#f1f1f1', paddingTop: 10, paddingBottom: 10 }}>
        {/* Header */}
        <View style={{
          backgroundColor: 'red',
          padding: 15,
          paddingTop: 35,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: "space-between"
        }}>
          <TouchableOpacity onPress={() => Navigation.goBack()}>
            <AntDesign name="arrowleft" size={20} color="#fff" />
          </TouchableOpacity>
          <Text style={{ color: 'white', fontSize: 18 }}>Permission Page</Text>
          <TouchableOpacity
            style={{
              backgroundColor: 'white',
              borderRadius: 4,
              paddingHorizontal: 8,
              paddingVertical: 4,
              flexDirection: 'row',
              alignItems: 'center',
            }}
            onPress={() => Router.push('/(vender)/(components)/PermissionForm')}
          >
            <Text style={{ color: '#d32f2f', fontWeight: 'bold', marginRight: 4 }}>Add</Text>
            <AntDesign name="plus" size={14} color="#d32f2f" />
          </TouchableOpacity>
        </View>

        {load ? (
          <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
            <Loader loading={load} />
          </View>
        ) : (
          <ScrollView style={{ padding: 10, backgroundColor: '#f4f4f4' }}>
            {/* Search Bar */}
            <View style={{ flexDirection: 'row', marginBottom: 10 }}>
              <TextInput
                placeholder="Search..."
                value={search}
                onChangeText={(text) => {
                  setSearch(text);
                  setPage(0);
                }}
                style={{
                  flex: 1,
                  height: 40,
                  borderWidth: 1,
                  borderColor: '#ccc',
                  borderRadius: 8,
                  paddingHorizontal: 10,
                  backgroundColor: '#fff',
                }}
              />
              <TouchableOpacity
                style={{ backgroundColor: "red", paddingHorizontal: 10, flexDirection: "row", alignItems: "center", justifyContent: "center", borderRadius: 10, marginLeft: 10, height: 40 }}
                onPress={() => setVisible(!visible)}
              >
                <Text style={{ color: "white" }}> View</Text>
                <AntDesign name='down' size={15} color={"white"} />
              </TouchableOpacity>

              {/* Dropdown for view options */}
              {visible && (
                <View style={{
                  backgroundColor: '#444',
                  padding: 10,
                  borderRadius: 6,
                  position: 'absolute',
                  top: 50,
                  right: 0,
                  zIndex: 999,
                  width: 150,
                }}>
                  <Text style={{
                    color: '#bbb',
                    fontSize: 14,
                    marginBottom: 10,
                    borderBottomWidth: 1,
                    borderBottomColor: '#555',
                    paddingBottom: 5,
                  }}>Toggle View</Text>
                  {options.map((item, index) => (
                    <TouchableOpacity key={index} onPress={() => { toggleOption(index); setVisible(false); }} style={{ paddingVertical: 6 }}>
                      <Text style={{ color: '#fff' }}>{item.checked ? '✓ ' : '   '}{item.label}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              )}
            </View>

            {/* Table */}
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <DataTable>
                <DataTable.Header style={{ backgroundColor: '#f2f2f2' }}>
                  {options.filter(item => item.checked).map((item, index) => (
                    <DataTable.Title key={index} style={{ width: 200 }}>
                      <Text style={{ fontWeight: 'bold', color: 'black' }}>{item.label}</Text>
                    </DataTable.Title>
                  ))}
                </DataTable.Header>

                {paginatedData.map((item) => (
                  <DataTable.Row key={item.id}>
                    {options[0].checked && (
                      <DataTable.Cell style={{ width: 200 }}>
                        <Text>{item.name}</Text>
                      </DataTable.Cell>
                    )}
                    {options[1].checked && (
                      <DataTable.Cell style={{ width: 200 }}>
                        <View style={{ flexDirection: 'row', gap: 5 }}>
                          
                          <TouchableOpacity onPress={() => Router.push({ pathname: '/(vender)/(components)/PermissionForm', params: { id: item.id, name: item.name } })}>
                            <IconButton icon="pencil" iconColor="blue" size={18} />
                          </TouchableOpacity>
                          <TouchableOpacity onPress={() => handleDelete(item.id)}>
                            <IconButton icon="delete" iconColor="red" size={18} />
                          </TouchableOpacity>
                        </View>
                      </DataTable.Cell>
                    )}
                  </DataTable.Row>
                ))}
              </DataTable>
            </ScrollView>

            {/* Pagination */}
            <View style={{ flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center', padding: 10 }}>
              <Button mode="outlined" onPress={() => page > 0 && setPage(page - 1)} disabled={page === 0} style={{ marginRight: 10 }}>Prev</Button>
              <Text style={{ marginRight: 10 }}>Page {page + 1} of {totalPages}</Text>
              <Button mode="contained" onPress={() => page + 1 < totalPages && setPage(page + 1)} disabled={page + 1 >= totalPages}>Next</Button>
            </View>
          </ScrollView>
        )}

        {/* Add Button */}
        <TouchableOpacity style={{
          backgroundColor: '#fce6e6',
          padding: 15,
          alignItems: 'center',
          marginTop: 20
        }} onPress={() => Router.push('/(vender)/(components)/PermissionForm')}>
          <Text style={{ fontWeight: 'bold' }}>Create</Text>
        </TouchableOpacity>
      </View>
      <Toast />
    </>
  );
};

export default PermissionPage;
