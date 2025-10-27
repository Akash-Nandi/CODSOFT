import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  VStack,
  FormControl,
  FormLabel,
  Input,
  Button,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  useToast,
  Text,
} from '@chakra-ui/react';
import { useAuth } from '../context/AuthContext';

export default function AuthPage() {
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [loading, setLoading] = useState(false);
  const { login, signup } = useAuth();
  const navigate = useNavigate();
  const toast = useToast();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await login(loginEmail, loginPassword);
      toast({ title: 'Logged in', status: 'success', duration: 2000 });
      navigate('/');
    } catch (err) {
      toast({ title: 'Error', description: err.message, status: 'error', duration: 4000 });
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (registerPassword !== confirmPassword) {
      toast({ title: 'Error', description: "Passwords don't match", status: 'error', duration: 4000 });
      return;
    }
    try {
      setLoading(true);
      await signup(registerEmail, registerPassword);
      toast({ title: 'Account created', status: 'success', duration: 2000 });
      navigate('/');
    } catch (err) {
      toast({ title: 'Error', description: err.message, status: 'error', duration: 4000 });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box minH="100vh" display="flex" alignItems="center" justifyContent="center" bg="gray.50">
      <Container maxW="md" py={10}>
        <Box bg="white" p={8} borderRadius="lg" boxShadow="lg">
          <Tabs isFitted variant="enclosed">
            <TabList mb="1em">
              <Tab>Login</Tab>
              <Tab>Register</Tab>
            </TabList>

            <TabPanels>
              <TabPanel>
                <form onSubmit={handleLogin}>
                  <VStack spacing={4}>
                    <FormControl isRequired>
                      <FormLabel>Email</FormLabel>
                      <Input value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)} type="email" />
                    </FormControl>
                    <FormControl isRequired>
                      <FormLabel>Password</FormLabel>
                      <Input value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} type="password" />
                    </FormControl>
                    <Button type="submit" colorScheme="blue" width="full" isLoading={loading}>
                      Login
                    </Button>
                  </VStack>
                </form>
                <Text fontSize="sm" mt={4}>If you don't have an account, switch to Register.</Text>
              </TabPanel>

              <TabPanel>
                <form onSubmit={handleRegister}>
                  <VStack spacing={4}>
                    <FormControl isRequired>
                      <FormLabel>Email</FormLabel>
                      <Input value={registerEmail} onChange={(e) => setRegisterEmail(e.target.value)} type="email" />
                    </FormControl>
                    <FormControl isRequired>
                      <FormLabel>Password</FormLabel>
                      <Input value={registerPassword} onChange={(e) => setRegisterPassword(e.target.value)} type="password" />
                    </FormControl>
                    <FormControl isRequired>
                      <FormLabel>Confirm Password</FormLabel>
                      <Input value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} type="password" />
                    </FormControl>
                    <Button type="submit" colorScheme="blue" width="full" isLoading={loading}>
                      Register
                    </Button>
                  </VStack>
                </form>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
      </Container>
    </Box>
  );
}
