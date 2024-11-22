import React, { useState } from 'react';
import { Box, Input, Button, Heading } from '@chakra-ui/react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const Login = () => {
  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!credentials.username || !credentials.password ) {
      setError('All fields are required.');
      
      return; 
    }

    const url = "https://todo-349ec-default-rtdb.asia-southeast1.firebasedatabase.app/User.json";

    try {
      const response = await axios.get(url);

      if (response.data) {
        const users = Object.values(response.data);
        const user = users.find(
          (u) => u.username === credentials.username && u.password === credentials.password
        );

        if (user) {
          localStorage.setItem("role", user.role);
          localStorage.setItem("username", user.username);

          alert('Login successful!');
          setError('');
          setCredentials({ username: '', password: '' }); 
          navigate("/home");
        } else {
          setError('Invalid username or password');
        }
      } else {
        setError('No users found');
      }
    } catch (error) {
      setError('Error logging in. Please try again.');
    }
  };

  return (
    <Box maxW="400px" mx="auto" mt={{base:"100px",md:"50px"}} p="6" boxShadow="lg" borderRadius="md">
      <Heading as="h2" size="lg" textAlign="center" mb="6">
        Login
      </Heading>
      {error && (
        <Box color="red.500" mb="4" textAlign="center">
          {error}
        </Box>
      )}
      <form onSubmit={handleSubmit}>
        <Box mb="4">
          <label htmlFor="username">Username</label>
          <Input
            id="username"
            type="text"
            name="username"
            value={credentials.username}
            onChange={handleChange}
            placeholder="Enter username"
            borderColor={!credentials.username && error ? 'red.500' : 'gray.200'}
          />
        </Box>
        <Box mb="4">
          <label htmlFor="password">Password</label>
          <Input
            id="password"
            type="password"
            name="password"
            value={credentials.password}
            onChange={handleChange}
            placeholder="Enter password"
            borderColor={!credentials.password && error ? 'red.500' : 'gray.200'}
          />
        </Box>
        <Button type="submit" colorScheme="blue" width="full">
          Login
        </Button>
        <Box display="flex" justifyContent="center" textDecor="underline" textDecorationColor="green.400"> 
          <Button onClick={() => navigate("/")} bg="none" color="green.400" >Register</Button>
        </Box>
      </form>
    </Box>
  );
};
