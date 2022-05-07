import React,{createContext,useReducer} from 'react';
import jwtdecode from 'jwt-decode'

const initialState = {
    kullanici:null
}

if (localStorage.getItem('jwtToken')) {
    const decodeToken = jwtdecode(localStorage.getItem('jwtToken'));

    if (decodeToken.exp * 1000 < Date.now()) {
        localStorage.removeItem('jwtToken')
    }else{
        initialState.kullanici=decodeToken;
    }
}

const AuthContext = createContext({
    kullanici:null,
    login:(userData) => {},
    logout:()=> {}
})


function authReducer (state,action){
    switch (action.type) {
        case 'LOGIN':
            return {
                ...state,
                kullanici:action.payload
            }
        
        case 'LOGOUT':
            return{
                ...state,
                kullanici:null
            }
    
        default:
            return state
    }
}

function AuthProvider(props){
    const [state,dispatch]=useReducer(authReducer,initialState)

    function login(userData){
        localStorage.setItem('jwtToken',userData.token);
        dispatch({
            type:'LOGIN',
            payload:userData
        })
    }
    function logout(){
        localStorage.removeItem('jwtToken')
        dispatch({
            type:'LOGOUT'
        })
    }

    return (
        <React.StrictMode>
            <AuthContext.Provider value={{ kullanici:state.kullanici,login,logout }} {...props}/>
        </React.StrictMode>
    )
}

export {AuthContext,AuthProvider}