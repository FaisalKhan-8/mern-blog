import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Dashboard from './pages/Dashboard';
import SignUp from './pages/SignUp';
import SignIn from './pages/Signin';
import Projects from './pages/Projects';
import Header from './components/Header';
import Footer from './components/Footer';
import PrivateRoute from './components/PrivateRoute';
import CreatePost from './pages/CreatePost';
import OnlyAdminPrivateRoute from './components/OnlyAdminPrivateRoute';
import UpdatePost from './pages/UpdatePost';

const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/sign-up' element={<SignUp />} />
        <Route path='/sign-in' element={<SignIn />} />
        <Route element={<PrivateRoute />}>
          <Route path='/dashboard' element={<Dashboard />} />
        </Route>
        <Route element={<OnlyAdminPrivateRoute />}>
          <Route path='/create-post' element={<CreatePost />} />
        </Route>
        <Route element={<OnlyAdminPrivateRoute />}>
          <Route path='/update-post/:postId' element={<UpdatePost />} />
        </Route>
        <Route path='/projects' element={<Projects />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
