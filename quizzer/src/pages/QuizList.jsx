import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  VStack,
  Heading,
  Box,
  Text,
  Button,
  SimpleGrid,
  useColorModeValue,
  Skeleton,
} from '@chakra-ui/react';
import { quizService } from '../services/quizService';

function QuizList() {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const bgColor = useColorModeValue('white', 'gray.700');

  useEffect(() => {
    const fetchQuizzes = () => {
      try {
        const quizData = quizService.getQuizzes();
        setQuizzes(quizData);
      } catch (error) {
        console.error('Error fetching quizzes:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchQuizzes();
  }, []);

  if (loading) {
    return (
      <Container maxW="container.lg" py={10}>
        <VStack spacing={8}>
          <Heading>Available Quizzes</Heading>
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6} width="100%">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Skeleton key={i} height="200px" />
            ))}
          </SimpleGrid>
        </VStack>
      </Container>
    );
  }

  return (
    <Container maxW="container.lg" py={10}>
      <VStack spacing={8}>
        <Heading>Available Quizzes</Heading>
        {quizzes.length === 0 ? (
          <Text>No quizzes available</Text>
        ) : (
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6} width="100%">
            {quizzes.map((quiz) => (
              <Box
                key={quiz.id}
                p={6}
                bg={bgColor}
                boxShadow="md"
                borderRadius="lg"
                border="1px"
                borderColor="gray.200"
              >
                <VStack spacing={4} align="stretch">
                  <Heading size="md">{quiz.title}</Heading>
                  <Text>{quiz.questions.length} Questions</Text>
                  <Button
                    colorScheme="blue"
                    onClick={() => navigate(`/take/${quiz.id}`)}
                  >
                    Take Quiz
                  </Button>
                </VStack>
              </Box>
            ))}
          </SimpleGrid>
        )}
      </VStack>
    </Container>
  );
}

export default QuizList;