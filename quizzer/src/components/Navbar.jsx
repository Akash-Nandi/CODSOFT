import { Box, Flex, Button, Heading, useColorModeValue } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Navbar() {
  const bg = useColorModeValue('white', 'gray.800');
  const { user, logout } = useAuth();

  return (
    <Box bg={bg} px={4} boxShadow="sm">
      <Flex h={16} alignItems="center" justifyContent="space-between">
        <Heading as={RouterLink} to="/" size="md">
          Quizzer
        </Heading>

        <Flex alignItems="center" gap={4}>
          <Button as={RouterLink} to="/quizzes" variant="ghost">
            Browse Quizzes
          </Button>

          {user ? (
            <>
              <Button as={RouterLink} to="/create" variant="ghost">
                Create Quiz
              </Button>
              <Button onClick={logout} colorScheme="red" variant="outline">
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button as={RouterLink} to="/login" variant="ghost">
                Login
              </Button>
              <Button as={RouterLink} to="/login" colorScheme="blue">
                Register
              </Button>
            </>
          )}
        </Flex>
      </Flex>
    </Box>
  );
}

export default Navbar;