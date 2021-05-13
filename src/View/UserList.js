/* eslint-disable prettier/prettier */
import React, { useContext } from 'react';
import {View, FlatList, Alert} from 'react-native';
import {ListItem, Avatar, Icon, Button} from 'react-native-elements';
import UserContext from '../context';

export default function UserList(props) {

    const {state, dispatch} = useContext(UserContext);

    function handleDelete(user){
        Alert.alert('Excluir Usuário', 'Você deseja excluir usuário permanentemente ?',[
            {
                text: 'Sim',
                onPress(){
                    dispatch({
                        type: 'deleteUser',
                        payload: user,
                    });
                },
            },
            {
                text: 'Não',
            },
        ]);
    }


    function getUser({ item: user }){
        return (
            <ListItem key={user.id} bottomDivider onPress={() => props.navigation.navigate('UserForm', user)}>
                <Avatar rounded size="medium" source={{uri: user.avatarUrl}}/>
                <ListItem.Content>
                    <ListItem.Title >{user.name}</ListItem.Title>
                    <ListItem.Subtitle>{user.email}</ListItem.Subtitle>
                    <ListItem.Content placement="right">
                    <Button
                    type="clear"
                    icon={<Icon name="edit" size={15}
                    onPress={() => props.navigation.navigate('UserForm', user)}
                    />}

                    />
                    <Button
                    type="clear"
                    icon={<Icon name="delete" size={15} />}
                    onPress={() => handleDelete(user)}
                    />
                    </ListItem.Content>


                </ListItem.Content>
            </ListItem>
        );
    }

  return (
    <View>
      <FlatList
      keyExtractor={user => user.id.toString()}
      data={state.users}
      renderItem={getUser}
      />
    </View>
  );
}
