import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Heading,
  IconButton,
  HStack,
  Text,
  useToast,
  Radio,
  RadioGroup,
} from '@chakra-ui/react';
import { AddIcon, DeleteIcon } from '@chakra-ui/icons';
import { quizService } from '../services/quizService';
import { useAuth } from '../context/AuthContext';

function CreateQuiz() {
  const [title, setTitle] = useState('');
  const [questions, setQuestions] = useState([{
    question: '',
    options: ['', '', '', ''],
    correctAnswer: '0'
  }]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const toast = useToast();
  const { user } = useAuth();

  const handleQuestionChange = (index, value) => {
    const newQuestions = [...questions];
    newQuestions[index].question = value;
    setQuestions(newQuestions);
  };

  const handleOptionChange = (questionIndex, optionIndex, value) => {
    const newQuestions = [...questions];
    newQuestions[questionIndex].options[optionIndex] = value;
    setQuestions(newQuestions);
  };

  const handleCorrectAnswerChange = (questionIndex, value) => {
    const newQuestions = [...questions];
    newQuestions[questionIndex].correctAnswer = value;
    setQuestions(newQuestions);
  };

  const addQuestion = () => {
    setQuestions([
      ...questions,
      {
        question: '',
        options: ['', '', '', ''],
        correctAnswer: '0'
      }
    ]);
  };

  const removeQuestion = (index) => {
    if (questions.length > 1) {
      const newQuestions = questions.filter((_, i) => i !== index);
      setQuestions(newQuestions);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim()) {
      toast({
        title: 'Error',
        description: 'Please enter a quiz title',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    const isValid = questions.every(q => 
      q.question.trim() && 
      q.options.every(opt => opt.trim()) &&
      q.correctAnswer
    );

    if (!isValid) {
      toast({
        title: 'Error',
        description: 'Please fill in all questions, options, and select correct answers',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    try {
      setLoading(true);
      const quizData = {
        title,
        questions,
        createdBy: user ? user.id : null,
      };

      quizService.addQuiz(quizData);
      toast({
        title: 'Success',
        description: 'Quiz created successfully',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
      navigate('/quizzes');
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

  return (
    <Container maxW="container.md" py={10}>
      <VStack spacing={8}>
        <Heading>Create New Quiz</Heading>
        <Box w="100%" as="form" onSubmit={handleSubmit}>
          <VStack spacing={6}>
            <FormControl isRequired>
              <FormLabel>Quiz Title</FormLabel>
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter quiz title"
              />
            </FormControl>

            {questions.map((question, qIndex) => (
              <Box key={qIndex} w="100%" p={4} borderWidth={1} borderRadius="md">
                <VStack spacing={4}>
                  <HStack w="100%" justify="space-between">
                    <Heading size="sm">Question {qIndex + 1}</Heading>
                    {questions.length > 1 && (
                      <IconButton
                        icon={<DeleteIcon />}
                        onClick={() => removeQuestion(qIndex)}
                        colorScheme="red"
                        variant="ghost"
                      />
                    )}
                  </HStack>

                  <FormControl isRequired>
                    <FormLabel>Question</FormLabel>
                    <Input
                      value={question.question}
                      onChange={(e) => handleQuestionChange(qIndex, e.target.value)}
                      placeholder="Enter question"
                    />
                  </FormControl>

                  <FormControl isRequired>
                    <FormLabel>Options</FormLabel>
                    <VStack spacing={2}>
                      {question.options.map((option, oIndex) => (
                        <Input
                          key={oIndex}
                          value={option}
                          onChange={(e) => handleOptionChange(qIndex, oIndex, e.target.value)}
                          placeholder={`Option ${oIndex + 1}`}
                        />
                      ))}
                    </VStack>
                  </FormControl>

                  <FormControl isRequired>
                    <FormLabel>Correct Answer</FormLabel>
                    <RadioGroup
                      value={question.correctAnswer}
                      onChange={(value) => handleCorrectAnswerChange(qIndex, value)}
                    >
                      <VStack align="start">
                        {question.options.map((_, index) => (
                          <Radio key={index} value={index.toString()}>
                            Option {index + 1}
                          </Radio>
                        ))}
                      </VStack>
                    </RadioGroup>
                  </FormControl>
                </VStack>
              </Box>
            ))}

            <Button
              leftIcon={<AddIcon />}
              onClick={addQuestion}
              colorScheme="blue"
              variant="ghost"
            >
              Add Question
            </Button>

            <Button
              type="submit"
              colorScheme="blue"
              w="100%"
              isLoading={loading}
            >
              Create Quiz
            </Button>
          </VStack>
        </Box>
      </VStack>
    </Container>
  );
}

export default CreateQuiz;