'use client';
import { Box, Button, TextField, Typography, Paper } from '@mui/material';

export default function LoginPage() {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        bgcolor: '#f5f5f5',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Paper elevation={3} sx={{ p: 4, minWidth: 340 }}>
        <Typography variant="h4" gutterBottom>
          Login
        </Typography>
        <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField label="Email" type="email" fullWidth required />
          <TextField label="Password" type="password" fullWidth required />
          <Button variant="contained" color="primary" type="submit">
            Login
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}