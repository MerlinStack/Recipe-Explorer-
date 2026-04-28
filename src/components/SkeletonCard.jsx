import { Card, CardContent, Box, Skeleton } from '@mui/material';

function SkeletonCard() {
  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Skeleton
        variant="rectangular"
        height={240}
        animation="wave"
        sx={{ bgcolor: 'grey.200' }}
      />
      <CardContent>
        <Skeleton 
          variant="text" 
          height={32} 
          width="80%" 
          animation="wave"
          sx={{ mb: 1 }}
        />
        <Skeleton 
          variant="text" 
          height={24} 
          width="60%" 
          animation="wave"
          sx={{ mb: 1 }}
        />
        <Skeleton 
          variant="text" 
          height={24} 
          width="40%" 
          animation="wave"
          sx={{ mb: 2 }}
        />
        <Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
          <Skeleton variant="rounded" width={60} height={24} animation="wave" />
          <Skeleton variant="rounded" width={60} height={24} animation="wave" />
          <Skeleton variant="rounded" width={60} height={24} animation="wave" />
        </Box>
      </CardContent>
    </Card>
  );
}

export default SkeletonCard;