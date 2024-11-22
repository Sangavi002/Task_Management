import React from 'react';
import { Routes,Route } from 'react-router-dom'
import { Registration } from './Registration';
import { Login } from './Login';
import { Home } from './components/Home';
import { CreateTaskModal } from './components/CreateTaskModal';
import { EditTaskModal } from './components/EditTaskModal';

export const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Registration />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/taskModal" element={<CreateTaskModal />} />
        <Route path="/edittask" element={<EditTaskModal />} />
      </Routes>

    </>
  );
};
