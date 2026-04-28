import { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Box,
  Alert,
  Snackbar,
  ThemeProvider,
  createTheme,
  CssBaseline,
  Paper,
  GlobalStyles,
} from '@mui/material';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import RecipeGrid from './components/RecipeGrid';
import Pagination from './components/Pagination';
import axios from 'axios';

// Create a custom theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#667eea',
    },
    secondary: {
      main: '#764ba2',
    },
    background: {
      default: 'transparent',
    },
  },
  typography: {
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif',
    h1: {
      fontWeight: 700,
    },
    h6: {
      fontWeight: 600,
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
          '&:hover': {
            transform: 'translateY(-8px)',
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          transition: 'all 0.3s ease-in-out',
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: '0 4px 12px rgba(102, 126, 234, 0.4)',
          },
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          transition: 'all 0.3s ease-in-out',
          '&:hover': {
            transform: 'scale(1.1)',
            backgroundColor: 'rgba(102, 126, 234, 0.1)',
          },
        },
      },
    },
  },
});

// Enhanced global styles with button glow effects
const globalStyles = {
  // Reset styles
  '*': {
    margin: 0,
    padding: 0,
    boxSizing: 'border-box',
  },
  
  // Body styles
  body: {
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif',
    WebkitFontSmoothing: 'antialiased',
    MozOsxFontSmoothing: 'grayscale',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    minHeight: '100vh',
  },
  
  // App container styles
  '.app-container': {
    minHeight: '100vh',
    padding: '2rem',
  },
  
  // Custom scrollbar - Webkit (Chrome, Safari, Edge)
  '::-webkit-scrollbar': {
    width: '8px',
    height: '8px',
  },
  
  '::-webkit-scrollbar-track': {
    background: '#f1f1f1',
    borderRadius: '10px',
  },
  
  '::-webkit-scrollbar-thumb': {
    background: '#888',
    borderRadius: '10px',
    '&:hover': {
      background: '#555',
    },
  },
  
  // Card animation
  '@keyframes fadeIn': {
    from: {
      opacity: 0,
      transform: 'translateY(20px)',
    },
    to: {
      opacity: 1,
      transform: 'translateY(0)',
    },
  },
  
  '.MuiCard-root': {
    animation: 'fadeIn 0.5s ease-out',
  },

  // ========================================
  // ENHANCED BUTTON STYLES WITH GLOW EFFECTS
  // ========================================
  
  // All buttons base styles
  'button': {
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important',
    position: 'relative',
    overflow: 'hidden',
  },
  
  // Button hover effects
  'button:hover': {
    transform: 'translateY(-2px) !important',
    filter: 'brightness(1.05)',
  },
  
  // Primary buttons glow effect
  '.MuiButton-containedPrimary': {
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%) !important',
    transition: 'all 0.3s ease-in-out !important',
  },
  
  '.MuiButton-containedPrimary:hover': {
    transform: 'translateY(-2px) !important',
    boxShadow: '0 8px 20px rgba(102, 126, 234, 0.4) !important',
    background: 'linear-gradient(135deg, #764ba2 0%, #667eea 100%) !important',
  },
  
  // Outlined buttons glow effect
  '.MuiButton-outlinedPrimary': {
    borderColor: '#667eea !important',
    color: '#667eea !important',
  },
  
  '.MuiButton-outlinedPrimary:hover': {
    borderColor: '#764ba2 !important',
    backgroundColor: 'rgba(102, 126, 234, 0.1) !important',
    transform: 'translateY(-2px) !important',
    boxShadow: '0 4px 12px rgba(102, 126, 234, 0.3) !important',
  },
  
  // Icon buttons glow effect
  '.MuiIconButton-root': {
    transition: 'all 0.3s ease-in-out !important',
  },
  
  '.MuiIconButton-root:hover': {
    transform: 'scale(1.15) !important',
    backgroundColor: 'rgba(102, 126, 234, 0.15) !important',
    boxShadow: '0 0 12px rgba(102, 126, 234, 0.3) !important',
  },
  
  // Rating star buttons
  '.MuiRating-root .MuiIconButton-root': {
    padding: '4px',
  },
  
  '.MuiRating-root .MuiIconButton-root:hover': {
    transform: 'scale(1.2) !important',
    backgroundColor: 'transparent !important',
  },
  
  // Chip buttons (tags and difficulty badges)
  '.MuiChip-root': {
    transition: 'all 0.3s ease-in-out !important',
    cursor: 'pointer',
  },
  
  '.MuiChip-root:hover': {
    transform: 'translateY(-2px)',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.15)',
  },
  
  '.MuiChip-colorSuccess': {
    background: 'linear-gradient(135deg, #48bb78 0%, #38a169 100%) !important',
    color: 'white !important',
  },
  
  '.MuiChip-colorSuccess:hover': {
    boxShadow: '0 4px 12px rgba(72, 187, 120, 0.5) !important',
  },
  
  '.MuiChip-colorWarning': {
    background: 'linear-gradient(135deg, #ed8936 0%, #dd6b20 100%) !important',
    color: 'white !important',
  },
  
  '.MuiChip-colorWarning:hover': {
    boxShadow: '0 4px 12px rgba(237, 137, 54, 0.5) !important',
  },
  
  '.MuiChip-colorError': {
    background: 'linear-gradient(135deg, #e53e3e 0%, #c53030 100%) !important',
    color: 'white !important',
  },
  
  '.MuiChip-colorError:hover': {
    boxShadow: '0 4px 12px rgba(229, 62, 62, 0.5) !important',
  },
  
  // Pagination buttons
  '.MuiPaginationItem-root': {
    transition: 'all 0.3s ease-in-out !important',
  },
  
  '.MuiPaginationItem-root:hover': {
    transform: 'translateY(-2px)',
    backgroundColor: 'rgba(102, 126, 234, 0.1) !important',
    boxShadow: '0 2px 8px rgba(102, 126, 234, 0.3) !important',
  },
  
  '.Mui-selected': {
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%) !important',
    color: 'white !important',
    boxShadow: '0 4px 12px rgba(102, 126, 234, 0.4) !important',
  },
  
  '.Mui-selected:hover': {
    transform: 'translateY(-2px) !important',
    boxShadow: '0 6px 16px rgba(102, 126, 234, 0.5) !important',
  },
  
  // Close button in snackbar
  '.MuiAlert-action .MuiIconButton-root': {
    padding: '4px',
  },
  
  '.MuiAlert-action .MuiIconButton-root:hover': {
    transform: 'scale(1.1) !important',
    backgroundColor: 'rgba(0, 0, 0, 0.1) !important',
  },
  
  // Ripple effect animation for buttons
  '@keyframes ripple': {
    '0%': {
      transform: 'scale(0)',
      opacity: 0.5,
    },
    '100%': {
      transform: 'scale(4)',
      opacity: 0,
    },
  },
  
  // Add ripple effect to buttons
  'button::after': {
    content: '""',
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: '50%',
    transform: 'translate(-50%, -50%) scale(0)',
    transition: 'transform 0.5s ease-out',
    pointerEvents: 'none',
  },
  
  'button:active::after': {
    transform: 'translate(-50%, -50%) scale(1)',
    transition: 'transform 0s',
  },
  
  // Focus styles for buttons
  'button:focus-visible': {
    outline: '2px solid #667eea',
    outlineOffset: '2px',
  },
};

const API_BASE_URL = 'https://dummyjson.com/recipes';
const RECIPES_PER_PAGE = 12;

function App() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalRecipes, setTotalRecipes] = useState(0);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const totalPages = Math.ceil(totalRecipes / RECIPES_PER_PAGE);

  useEffect(() => {
    fetchRecipes();
  }, [currentPage]);

  async function fetchRecipes() {
    setLoading(true);
    setError(null);
    
    const skip = (currentPage - 1) * RECIPES_PER_PAGE;
    const url = `${API_BASE_URL}?limit=${RECIPES_PER_PAGE}&skip=${skip}`;
    
    try {
      const response = await axios.get(url);
      
      if (response.status === 200) {
        setRecipes(response.data.recipes);
        setTotalRecipes(response.data.total);
      } else {
        throw new Error('Failed to fetch recipes');
      }
    } catch (err) {
      console.error('Error fetching recipes:', err);
      setError(err.message || 'An error occurred while fetching recipes');
      setSnackbarOpen(true);
    } finally {
      setLoading(false);
    }
  }

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <GlobalStyles styles={globalStyles} />
      
      <Box className="app-container">
        <Container maxWidth="xl">
          {/* Header Section */}
          <Box textAlign="center" mb={6}>
            <Paper
              elevation={0}
              sx={{
                py: 4,
                px: 2,
                background: 'rgba(255, 255, 255, 0.95)',
                borderRadius: 4,
                mb: 4,
              }}
            >
              <RestaurantMenuIcon sx={{ fontSize: 60, color: '#667eea', mb: 2 }} />
              <Typography 
                variant="h1" 
                gutterBottom
                sx={{
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  color: 'transparent',
                  fontSize: { xs: '2rem', sm: '3rem', md: '4rem' },
                }}
              >
                Recipe Explorer
              </Typography>
              <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 600, mx: 'auto' }}>
                Discover delicious recipes from around the world. Browse, explore, and find your next favorite dish!
              </Typography>
            </Paper>
          </Box>

          {/* Main Content */}
          <RecipeGrid 
            recipes={recipes} 
            loading={loading} 
            error={error} 
          />

          {/* Pagination */}
          {!loading && !error && recipes.length > 0 && (
            <Box mt={6} mb={4}>
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
                totalItems={totalRecipes}
                itemsPerPage={RECIPES_PER_PAGE}
              />
            </Box>
          )}

          {/* Error Snackbar */}
          <Snackbar
            open={snackbarOpen}
            autoHideDuration={6000}
            onClose={handleCloseSnackbar}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          >
            <Alert onClose={handleCloseSnackbar} severity="error" sx={{ width: '100%' }}>
              {error}
            </Alert>
          </Snackbar>
        </Container>
      </Box>
    </ThemeProvider>
  );
}

export default App;