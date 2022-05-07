import React,{useContext} from 'react'

import {Route} from 'react-router-dom'

import { AuthContext } from '../context/auth'


function AuthRoute (props){
    const {kullanici} = useContext(AuthContext);

    if(kullanici) return <Route path="/"/>
    else if(!kullanici) return <Route {...props} />
}

export default AuthRoute;