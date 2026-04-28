import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Chip,
  Rating,
  Divider,
  Button,
  CardActions,
  IconButton,
  Tooltip,
} from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShareIcon from '@mui/icons-material/Share';
import VisibilityIcon from '@mui/icons-material/Visibility';

const getDifficultyColor = (difficulty) => {
  switch (difficulty?.toLowerCase()) {
    case 'easy':
      return 'success';
    case 'medium':
      return 'warning';
    case 'hard':
      return 'error';
    default:
      return 'default';
  }
};

function RecipeCard({ recipe }) {
  return (
    <Card 
      sx={{ 
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        cursor: 'pointer',
        position: 'relative',
        '&:hover': {
          boxShadow: (theme) => theme.shadows[10],
        },
      }}
    >
      <Box sx={{ position: 'relative' }}>
        <CardMedia
          component="img"
          height="240"
          image={recipe.image}
          alt={recipe.name}
          sx={{
            objectFit: 'cover',
          }}
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/400x240?text=No+Image';
          }}
        />
        <Chip
          label={recipe.difficulty}
          color={getDifficultyColor(recipe.difficulty)}
          size="small"
          sx={{
            position: 'absolute',
            top: 10,
            right: 10,
            fontWeight: 'bold',
            textTransform: 'uppercase',
            boxShadow: 2,
            transition: 'all 0.3s ease-in-out',
            '&:hover': {
              transform: 'scale(1.05)',
              boxShadow: 3,
            },
          }}
        />
        
        {/* Hover overlay with action buttons */}
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            bgcolor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 2,
            opacity: 0,
            transition: 'opacity 0.3s ease-in-out',
            '&:hover': {
              opacity: 1,
            },
          }}
        >
          <Tooltip title="View Recipe">
            <IconButton
              sx={{
                bgcolor: 'white',
                '&:hover': {
                  bgcolor: '#667eea',
                  color: 'white',
                  transform: 'scale(1.1)',
                },
              }}
            >
              <VisibilityIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Save to Favorites">
            <IconButton
              sx={{
                bgcolor: 'white',
                '&:hover': {
                  bgcolor: '#ff6b6b',
                  color: 'white',
                  transform: 'scale(1.1)',
                },
              }}
            >
              <FavoriteBorderIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Share Recipe">
            <IconButton
              sx={{
                bgcolor: 'white',
                '&:hover': {
                  bgcolor: '#4ecdc4',
                  color: 'white',
                  transform: 'scale(1.1)',
                },
              }}
            >
              <ShareIcon />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>

      <CardContent sx={{ flexGrow: 1 }}>
        <Typography 
          variant="h6" 
          component="h2" 
          gutterBottom 
          sx={{
            fontWeight: 'bold',
            minHeight: 64,
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {recipe.name}
        </Typography>

        <Box display="flex" alignItems="center" gap={1} mb={1}>
          <RestaurantIcon fontSize="small" color="action" />
          <Typography variant="body2" color="text.secondary">
            {recipe.cuisine}
          </Typography>
        </Box>

        <Box display="flex" alignItems="center" gap={1} mb={1}>
          <AccessTimeIcon fontSize="small" color="action" />
          <Typography variant="body2" color="text.secondary">
            {recipe.cookTimeMinutes} mins
          </Typography>
        </Box>

        <Box display="flex" alignItems="center" gap={1} mb={2}>
          <LocalFireDepartmentIcon fontSize="small" color="action" />
          <Typography variant="body2" color="text.secondary">
            {recipe.caloriesPerServing} kcal
          </Typography>
        </Box>

        <Divider sx={{ my: 1 }} />

        <Box display="flex" alignItems="center" justifyContent="space-between" mt={1}>
          <Box display="flex" alignItems="center" gap={1}>
            <Rating 
              value={recipe.rating} 
              precision={0.1} 
              readOnly 
              size="small"
              sx={{
                '& .MuiRating-iconHover': {
                  transform: 'scale(1.2)',
                },
              }}
            />
            <Typography variant="body2" color="text.secondary">
              ({recipe.reviewCount})
            </Typography>
          </Box>
          <Chip
            label={`${recipe.servings} servings`}
            size="small"
            variant="outlined"
            sx={{
              transition: 'all 0.3s ease-in-out',
              '&:hover': {
                transform: 'translateY(-2px)',
                borderColor: '#667eea',
                color: '#667eea',
              },
            }}
          />
        </Box>

        <Box display="flex" gap={0.5} mt={2} flexWrap="wrap">
          {recipe.tags?.slice(0, 3).map((tag) => (
            <Chip
              key={tag}
              label={tag}
              size="small"
              variant="outlined"
              sx={{ 
                fontSize: '0.7rem',
                transition: 'all 0.3s ease-in-out',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  backgroundColor: '#667eea',
                  color: 'white',
                  borderColor: '#667eea',
                },
              }}
            />
          ))}
        </Box>
      </CardContent>

      <CardActions sx={{ p: 2, pt: 0 }}>
        <Button 
          variant="contained" 
          fullWidth
          sx={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            transition: 'all 0.3s ease-in-out',
            '&:hover': {
              transform: 'translateY(-2px)',
              boxShadow: '0 8px 20px rgba(102, 126, 234, 0.4)',
              background: 'linear-gradient(135deg, #764ba2 0%, #667eea 100%)',
            },
          }}
        >
          View Recipe
        </Button>
      </CardActions>
    </Card>
  );
}

export default RecipeCard;