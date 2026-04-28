import { Grid, Box, Typography } from '@mui/material';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import RecipeCard from './RecipeCard';
import SkeletonCard from './SkeletonCard';

function RecipeGrid({ recipes, loading, error }) {
  if (loading) {
    return (
      <Grid container spacing={3}>
        {[...Array(12)].map((_, index) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
            <SkeletonCard />
          </Grid>
        ))}
      </Grid>
    );
  }

  if (error) {
    return (
      <Box textAlign="center" py={8}>
        <Typography variant="h5" color="white" gutterBottom>
          Oops! Something went wrong
        </Typography>
        <Typography variant="body1" color="white">
          {error}. Please try again later.
        </Typography>
      </Box>
    );
  }

  if (recipes.length === 0) {
    return (
      <Box textAlign="center" py={8}>
        <SentimentDissatisfiedIcon sx={{ fontSize: 64, color: 'white', mb: 2 }} />
        <Typography variant="h5" color="white" gutterBottom>
          No recipes found
        </Typography>
        <Typography variant="body1" color="white">
          Try adjusting your search or filters
        </Typography>
      </Box>
    );
  }

  return (
    <Grid container spacing={3}>
      {recipes.map((recipe) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={recipe.id}>
          <RecipeCard recipe={recipe} />
        </Grid>
      ))}
    </Grid>
  );
}

export default RecipeGrid;