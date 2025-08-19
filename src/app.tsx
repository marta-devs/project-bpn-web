import { Route, Routes } from 'react-router';
import { Home } from './pages/Home';
import { Login } from './pages/auth/login';
import { PrivateRoute } from './pages/private-route';
import { Example } from './pages/example';

export default function App(){
  return (
    <Routes>
      <Route element={<PrivateRoute />}>
        <Route index element={<Home />} />
      </Route>
      <Route path="/login" element={<Login />} />
      <Route path="/example" element={<Example />} />
    </Routes>
  )
}

