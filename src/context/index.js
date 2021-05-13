/* eslint-disable prettier/prettier */
import React, {createContext, useReducer} from 'react';
import users from '../data';

const UserContext = createContext({});
const initialState = { users };

export const UserProvider = props => {

    function reducer(state, action){
        if (action.type === 'deleteUser'){
            const user = action.payload;
            return {
                users: state.users.filter(u => u.id !== user.id),
            };
        }

        if (action.type === 'createUser'){
            const user = action.payload;
            user.id = Math.random();
            return {
                ...state,
                users: [...state.users, user],
            };
        }
        if (action.type === 'updateUser'){
            const updated = action.payload;
            return {
                ...state,
                users: state.users.map(u => u.id === updated.id ? updated : u),
            };
        }
    }

    const [state, dispatch] = useReducer(reducer, initialState);


    return (
        <UserContext.Provider value={{state, dispatch}}>
            {props.children}
        </UserContext.Provider>
    );
};

export default UserContext;
