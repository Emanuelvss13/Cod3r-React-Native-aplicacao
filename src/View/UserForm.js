/* eslint-disable prettier/prettier */
import React, { useContext, useState } from 'react';
import {View, StyleSheet} from 'react-native';
import { Button, Input } from 'react-native-elements';
import UserContext from '../context';

export default function UserForm({route, navigation}) {

    const [user, setUser] = useState(route.params ? route.params : {});

    const {dispatch} = useContext(UserContext);

  return (
    <View style={styles.container}>
      <Input
      placeholder="Digite seu nome"
      label="Nome:"
      value={user.name}
      onChangeText={name => setUser({...user, name})}
      />
      <Input
      label="E-mail:"
      placeholder="Digite seu email"
      value={user.email}
      onChangeText={email => setUser({...user, email})}
      />
      <Input
      label="Avatar:"
      placeholder="Avatar URL"
      value={user.avatarUrl}
      onChangeText={avatarUrl => setUser({...user, avatarUrl})}
      />
      <Button title="Cadastrar"
      type="solid"
      buttonStyle={{backgroundColor: '#84c', width: 330, height: 50, fontSize:20}}
      onPress={() =>{
        dispatch({
          type: user.id ? 'updateUser' : 'createUser',
          payload: user,
        });
        navigation.goBack();
      } }
      />
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 30,
        alignItems: 'center',
    },
});
