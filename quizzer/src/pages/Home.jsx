import { Box, Heading, Text, Button, VStack, Container } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';

function Home() {
  return (
    <Container maxW="container.md" py={10}>
      <VStack spacing={8} textAlign="center">
        <Heading size="2xl">Welcome to Quizzer</Heading>
        <Text fontSize="xl" color="gray.600">
          Create and take quizzes on any topic. Test your knowledge and challenge others!
        </Text>

        <Box pt={6}>
          <VStack spacing={4}>
            <Button as={RouterLink} to="/create" size="lg" colorScheme="blue">
              Create a Quiz
            </Button>
            <Button as={RouterLink} to="/quizzes" size="lg" variant="outline">
              Take a Quiz
            </Button>
          </VStack>
        </Box>
      </VStack>
    </Container>
  );
}

export default Home;