import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  VStack,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  useToast,
} from '@chakra-ui/react';
import { useAuth } from '../context/AuthContext';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [loading, setLoading] = useState(false);
  const { signup } = useAuth();
  const navigate = useNavigate();
  const toast = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirm) return toast({ title: 'Error', description: 'Passwords do not match', status: 'error' });
    try {
      setLoading(true);
      await signup(email, password);
      toast({ title: 'Registered', status: 'success', duration: 2000 });
      navigate('/');
    } catch (err) {
      toast({ title: 'Error', description: err.message, status: 'error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxW="container.sm" py={10}>
      <VStack spacing={6}>
        <Heading>Register</Heading>
        <form style={{ width: '100%' }} onSubmit={handleSubmit}>
          <VStack spacing={4}>
            <FormControl isRequired>
              <FormLabel>Email</FormLabel>
              <Input value={email} onChange={(e) => setEmail(e.target.value)} type="email" />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Password</FormLabel>
              <Input value={password} onChange={(e) => setPassword(e.target.value)} type="password" />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Confirm Password</FormLabel>
              <Input value={confirm} onChange={(e) => setConfirm(e.target.value)} type="password" />
            </FormControl>
            <Button type="submit" isLoading={loading} colorScheme="blue" w="100%">Register</Button>
          </VStack>
        </form>
        <Text fontSize="sm">After registering you'll be logged in automatically.</Text>
      </VStack>
    </Container>
  );
}
