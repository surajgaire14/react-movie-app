import React from 'react';
import { Outlet } from 'react-router-dom';
import { Navigate } from 'react-router-dom';

// const useAuth = () => {
//   const user = { loggedIn:true}
//   return user && user.loggedIn
// }

// const ProtectedRoutes = ({component:Compomemt,isAuth,...rest}) => {
//   // return (
//   //     <Route {...rest} render = {(props)=> {
//   //       if(isAuth)
//   //         return <Compomemt />
//   //        else 
//   //        return <Navigate to = {{pathname:"/login" ,state:{from:props.location}}}/> 
//   //     }}/>
//   // );

// };
const ProtectedRoutes = (props) => {
  // console.log(props.auth)
  return props.auth ? <Outlet /> : <Navigate to="/login"/>
}

export default ProtectedRoutes;
