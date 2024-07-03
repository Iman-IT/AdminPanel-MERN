
import { Route, Routes } from 'react-router-dom'
import Admin from './pages/admin'
import LandingPage from './pages/landing'
import Login from './pages/login'
import Register from './pages/register'
import Home from './pages/home'
import UserList from './pages/userlist'
import Edit from './pages/userlist/edit'
import Setting from './pages/setting'

function App() {


  return (
    <>
   <Routes>
    <Route path='/' element={<LandingPage/>} />
    <Route path='/login'  element={<Login/>}/>
    {/* user view */}
    <Route path='/home' element={<Home/>} />
{/* admin view */}
    <Route path='/adminpanel' element={<Admin/>} />
    <Route path='/register' element={<Register/>} />
    <Route path='/userlist' element={<UserList/>} />
    <Route path='/userlist/edit/:userId' element={<Edit/>} />
    <Route path='/adminsetting' element={<Setting/>} />

   </Routes>
    </>
  )
}

export default App
