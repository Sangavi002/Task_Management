import React, { useState } from 'react';
import { Box, Input, Button, Select, Heading } from '@chakra-ui/react';
import axios from 'axios'; 
import { useNavigate } from 'react-router-dom';

export const Registration = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    role: '',
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const url = "https://todo-349ec-default-rtdb.asia-southeast1.firebasedatabase.app/User.json"; // Firebase Realtime Database URL

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    
    if (!formData.username || !formData.password || !formData.role) {
      setError('All fields are required.');
      
      return; 
    }

    try {
      const response = await axios.get(url); 
      const users = response.data;
      const usernameExists = Object.values(users || {}).some(user => user.username === formData.username);
      
      if (usernameExists) {
        setError('Username already exists. Please choose another one.');
        return;
      }

      
      await axios.post(url, formData);
      alert('User registered successfully!');
      setFormData({ username: '', password: '', role: '' });
      setError(''); 
      navigate("/login"); 
    } catch (error) {
      console.error("Error registering user:", error);
      alert('Error registering user');
    }
  };

  return (
    <Box maxW="400px" mx="auto" mt="50px" p="6" boxShadow="lg" borderRadius="md">
      <Heading as="h2" size="lg" textAlign="center" mb="6">
        Registration
      </Heading>
      <form onSubmit={handleSubmit}>
        {error && <Box color="red.500" mb="4">{error}</Box>} 
        <Box mb="4">
          <label htmlFor="username">Username</label>
          <Input
            id="username"
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Enter username"
            borderColor={!formData.username && error ? 'red.500' : 'gray.200'}
          />
        </Box>
        <Box mb="4">
          <label htmlFor="password">Password</label>
          <Input
            id="password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter password"
            borderColor={!formData.password && error ? 'red.500' : 'gray.200'}
          />
        </Box>
        <Box mb="4">
          <label htmlFor="role">Role</label>
          <Select
            id="role"
            name="role"
            value={formData.role}
            onChange={handleChange}
            placeholder="Select role"
            borderColor={!formData.role && error ? 'red.500' : 'gray.200'}
          >
            <option value="admin">Admin</option>
            <option value="user">User</option>
          </Select>
        </Box>
        <Button type="submit" colorScheme="blue" width="full">
          Register
        </Button>
        <Box display="flex" justifyContent="center" textDecor="underline" textDecorationColor="green.400">
          <Button onClick={() => navigate("/login")} bg="none" color="green.400">Login</Button>
        </Box>
      </form>
    </Box>
  );
};
