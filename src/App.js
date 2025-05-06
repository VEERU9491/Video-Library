import logo from './logo.svg';
import './App.css';
import { AdminLogin } from './components/admin-login';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import { UserLogin } from './components/user-login';
import { Home } from './components/home';
import { AdminDashboard } from './components/admin-dashboard';
import { UserDashboard } from './components/user-dashboard';
import { RegisterUser } from './components/register-user';
import { EditVideo } from './components/edit-video';
import { DeleteVideo } from './components/delete-video';
import { AddVideo } from './components/add-video';

function App() {
  return (
    <div className='body-background'>
      <div className='shade'>
<h1 className='text-white text-center p-4'>Video Library</h1>
<BrowserRouter>
<Routes>
<Route path='/' element={<Home />} />
<Route path='admin-login' element={<AdminLogin />} />
<Route path='user-login' element={<UserLogin />} />
<Route path='admin-dashboard' element={<AdminDashboard />}/>
<Route path='add-video' element={<AddVideo/>}/>
<Route path='edit-video/:id' element={<EditVideo/>}/>
<Route path='delete-video/:id' element={<DeleteVideo/>}/>
<Route path='user-dashboard' element={<UserDashboard/>}/>
<Route path='register-user' element={<RegisterUser/>}/>
</Routes>
</BrowserRouter>
      </div>
      
    </div>
  );
}

export default App;
