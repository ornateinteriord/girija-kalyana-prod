import { useNavigate } from "react-router-dom";
import { Box, Typography, Button, Stack } from "@mui/material";

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        background: 'linear-gradient(135deg, #fff5f5 0%, #fff 100%)',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: 4,
        color: '#9E1B47'
      }}
    >
      <Box sx={{ maxWidth: '600px' }}>
        <Typography
          variant="h1"
          sx={{
            fontSize: '6rem',
            fontWeight: 800,
            mb: 1,
            color: '#9E1B47',
            fontFamily: 'Playfair Display, serif !important',
            lineHeight: 1,
          }}
        >
          404
        </Typography>

        <Typography
          sx={{ fontSize: '2rem', mb: 1 }}
        >
          ❤️
        </Typography>

        <Typography
          variant="h2"
          sx={{
            fontSize: '1.8rem',
            fontWeight: 700,
            mb: 2,
            color: '#4A0E2E',
            fontFamily: 'Playfair Display, serif !important',
          }}
        >
          Page Not Found
        </Typography>

        <Typography
          variant="body1"
          sx={{
            fontSize: '1.05rem',
            color: '#666',
            mb: 4,
            lineHeight: 1.7
          }}
        >
          The page you're looking for doesn't exist or has been moved.
          <br />
          Please check the URL or use the buttons below to navigate.
        </Typography>

        <Stack direction="row" spacing={2} justifyContent="center">
          <Button
            variant="contained"
            onClick={() => navigate('/')}
            sx={{
              textTransform: 'capitalize',
              background: 'linear-gradient(135deg, #9E1B47 0%, #E91E63 100%)',
              '&:hover': {
                background: 'linear-gradient(135deg, #4A0E2E 0%, #9E1B47 100%)',
                transform: 'translateY(-2px)',
                boxShadow: '0 6px 20px rgba(158, 27, 71,0.4)',
              },
              transition: 'all 0.25s ease',
              fontWeight: 700,
              px: 3,
              py: 1,
              borderRadius: '8px',
            }}
          >
            Return to Home
          </Button>

          <Button
            variant="outlined"
            onClick={() => navigate(-1)}
            sx={{
              textTransform: 'capitalize',
              color: '#9E1B47',
              borderColor: '#9E1B47',
              fontWeight: 600,
              '&:hover': {
                backgroundColor: '#9E1B47',
                color: 'white',
                borderColor: '#9E1B47',
              },
              transition: 'all 0.25s ease',
              px: 3,
              py: 1,
              borderRadius: '8px',
            }}
          >
            Go Back
          </Button>
        </Stack>
      </Box>
    </Box>
  );
};

export default NotFoundPage;