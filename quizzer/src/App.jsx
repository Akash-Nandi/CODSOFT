import { ChakraProvider, Box } from '@chakra-ui/react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import CreateQuiz from './pages/CreateQuiz';
import TakeQuiz from './pages/TakeQuiz';
import QuizList from './pages/QuizList';
import Login from './pages/Login';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <ChakraProvider>
      <AuthProvider>
        <Router>
          <Routes>
            {/* Public Routes */}
            <Route path="/login" element={<Login />} />

            {/* Protected Routes */}
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <>
                    <Navbar />
                    <Box as="main" pt={16} minH="100vh" bg="gray.50">
                      <Home />
                    </Box>
                  </>
                </ProtectedRoute>
              }
            />
            <Route
              path="/create"
              element={
                <ProtectedRoute>
                  <>
                    <Navbar />
                    <Box as="main" pt={16} minH="100vh" bg="gray.50">
                      <CreateQuiz />
                    </Box>
                  </>
                </ProtectedRoute>
              }
            />
            <Route
              path="/quizzes"
              element={
                <ProtectedRoute>
                  <>
                    <Navbar />
                    <Box as="main" pt={16} minH="100vh" bg="gray.50">
                      <QuizList />
                    </Box>
                  </>
                </ProtectedRoute>
              }
            />
            <Route
              path="/take/:quizId"
              element={
                <ProtectedRoute>
                  <>
                    <Navbar />
                    <Box as="main" pt={16} minH="100vh" bg="gray.50">
                      <TakeQuiz />
                    </Box>
                  </>
                </ProtectedRoute>
              }
            />
          </Routes>
        </Router>
      </AuthProvider>
    </ChakraProvider>
  );
}

export default App;
