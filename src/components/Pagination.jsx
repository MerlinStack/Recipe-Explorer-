import { Box, Button, Typography, Paper, Pagination as MuiPagination } from '@mui/material';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';

function Pagination({ currentPage, totalPages, onPageChange, totalItems, itemsPerPage }) {
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  const handleChange = (event, value) => {
    onPageChange(value);
  };

  if (totalPages <= 1) return null;

  return (
    <Paper
      elevation={3}
      sx={{
        p: 3,
        display: 'flex',
        flexDirection: { xs: 'column', sm: 'row' },
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 2,
        borderRadius: 2,
        background: 'rgba(255, 255, 255, 0.95)',
      }}
    >
      <Typography variant="body2" color="text.secondary">
        Showing {startItem} - {endItem} of {totalItems} recipes
      </Typography>

      <Box display="flex" alignItems="center" gap={2}>
        <Button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          startIcon={<ChevronLeft />}
          variant="outlined"
          size="small"
        >
          Previous
        </Button>

        <MuiPagination
          count={totalPages}
          page={currentPage}
          onChange={handleChange}
          color="primary"
          size="small"
          siblingCount={1}
          boundaryCount={1}
        />

        <Button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          endIcon={<ChevronRight />}
          variant="outlined"
          size="small"
        >
          Next
        </Button>
      </Box>

      <Typography variant="body2" color="text.secondary">
        Page {currentPage} of {totalPages}
      </Typography>
    </Paper>
  );
}

export default Pagination;