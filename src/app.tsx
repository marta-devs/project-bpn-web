import { Route, Routes } from 'react-router';
import { Home } from './pages/Home';
import { Login } from './pages/auth/login';
import { AuthLayout } from './pages/layout-route-private';
import { Example } from './pages/example';

export default function App(){
  return (
    <Routes>
      <Route element={<AuthLayout />}>
        <Route index element={<Home />} />
      </Route>
      <Route path="/login" element={<Login />} />
      <Route path="/example" element={<Example />} />
    </Routes>
  )
}

