import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container,
  VStack,
  Heading,
  Box,
  Radio,
  RadioGroup,
  Button,
  Text,
  Progress,
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  List,
  ListItem,
  ListIcon,
} from '@chakra-ui/react';
import { CheckCircleIcon, WarningIcon } from '@chakra-ui/icons';
import { quizService } from '../services/quizService';

function TakeQuiz() {
  const { quizId } = useParams();
  const navigate = useNavigate();
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [quiz, setQuiz] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [results, setResults] = useState(null);

  useEffect(() => {
    const fetchQuiz = () => {
      try {
        const quizData = quizService.getQuizById(quizId);
        if (quizData) {
          setQuiz(quizData);
          setAnswers(new Array(quizData.questions.length).fill(''));
        } else {
          toast({
            title: 'Error',
            description: 'Quiz not found',
            status: 'error',
            duration: 5000,
            isClosable: true,
          });
          navigate('/quizzes');
        }
      } catch (error) {
        toast({
          title: 'Error',
          description: error.message,
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchQuiz();
  }, [quizId, navigate, toast]);

  const handleAnswer = (value) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = value;
    setAnswers(newAnswers);
  };

  const nextQuestion = () => {
    if (currentQuestion < quiz.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const previousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const calculateResults = () => {
    const results = quiz.questions.map((question, index) => ({
      question: question.question,
      correctAnswer: question.options[parseInt(question.correctAnswer)],
      userAnswer: question.options[parseInt(answers[index])],
      isCorrect: question.correctAnswer === answers[index],
    }));

    const score = results.filter(r => r.isCorrect).length;
    const percentage = (score / quiz.questions.length) * 100;

    setResults({ details: results, score, percentage });
    onOpen();
  };

  if (loading) {
    return (
      <Container maxW="container.md" py={10}>
        <Text>Loading quiz...</Text>
      </Container>
    );
  }

  if (!quiz) {
    return (
      <Container maxW="container.md" py={10}>
        <Text>Quiz not found</Text>
      </Container>
    );
  }

  return (
    <Container maxW="container.md" py={10}>
      <VStack spacing={8}>
        <Heading>{quiz.title}</Heading>
        
        <Progress
          value={(currentQuestion + 1) / quiz.questions.length * 100}
          width="100%"
          colorScheme="blue"
        />

        <Box width="100%" p={6} borderWidth={1} borderRadius="lg">
          <VStack spacing={6} align="stretch">
            <Text fontSize="xl">
              Question {currentQuestion + 1} of {quiz.questions.length}
            </Text>
            
            <Text fontSize="lg" fontWeight="medium">
              {quiz.questions[currentQuestion].question}
            </Text>

            <RadioGroup
              value={answers[currentQuestion]}
              onChange={handleAnswer}
            >
              <VStack align="stretch" spacing={4}>
                {quiz.questions[currentQuestion].options.map((option, index) => (
                  <Radio key={index} value={index.toString()}>
                    {option}
                  </Radio>
                ))}
              </VStack>
            </RadioGroup>
          </VStack>
        </Box>

        <Box width="100%" display="flex" justifyContent="space-between">
          <Button
            onClick={previousQuestion}
            isDisabled={currentQuestion === 0}
          >
            Previous
          </Button>

          {currentQuestion === quiz.questions.length - 1 ? (
            <Button
              colorScheme="blue"
              onClick={calculateResults}
              isDisabled={answers.includes('')}
            >
              Finish Quiz
            </Button>
          ) : (
            <Button
              colorScheme="blue"
              onClick={nextQuestion}
              isDisabled={!answers[currentQuestion]}
            >
              Next
            </Button>
          )}
        </Box>
      </VStack>

      {/* Results Modal */}
      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Quiz Results</ModalHeader>
          <ModalBody>
            <VStack spacing={6} align="stretch">
              <Box textAlign="center">
                <Heading size="lg">
                  Your Score: {results?.percentage.toFixed(1)}%
                </Heading>
                <Text>
                  ({results?.score} out of {quiz.questions.length} correct)
                </Text>
              </Box>

              <List spacing={4}>
                {results?.details.map((result, index) => (
                  <ListItem
                    key={index}
                    p={4}
                    borderWidth={1}
                    borderRadius="md"
                    bg={result.isCorrect ? 'green.50' : 'red.50'}
                  >
                    <VStack align="stretch" spacing={2}>
                      <Text fontWeight="bold">
                        Question {index + 1}: {result.question}
                      </Text>
                      <Text>
                        <ListIcon
                          as={result.isCorrect ? CheckCircleIcon : WarningIcon}
                          color={result.isCorrect ? 'green.500' : 'red.500'}
                        />
                        Your answer: {result.userAnswer}
                      </Text>
                      {!result.isCorrect && (
                        <Text color="green.600">
                          Correct answer: {result.correctAnswer}
                        </Text>
                      )}
                    </VStack>
                  </ListItem>
                ))}
              </List>
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button onClick={() => navigate('/quizzes')} colorScheme="blue">
              Back to Quizzes
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Container>
  );
}

export default TakeQuiz;