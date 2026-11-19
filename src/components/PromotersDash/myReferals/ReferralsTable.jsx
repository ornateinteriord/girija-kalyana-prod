import React from 'react';
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  Chip
} from '@mui/material';
import { useGetMyUsers } from '../../api/Promoter';
import TokenService from '../../token/tokenService';

const ReferralsTable = ({ statusFilter }) => {
  const decodedToken = TokenService.decodeToken();
  const promoterId = decodedToken?.promoter_id;

  const { data, isLoading, error } = useGetMyUsers(promoterId);

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
        <CircularProgress sx={{ color: '#9E1B47' }} />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: 3 }}>
        <Typography color="error">Error loading users</Typography>
      </Box>
    );
  }

  const users = data?.users || [];

  // Filter users based on the statusFilter passed from the parent tabs
  const filteredUsers = users.filter(user => {
    switch (statusFilter) {
      case 'Pending':
        return user.type_of_user === 'FreeUser' || user.status === 'Pending' || user.status === 'pending';
      case 'Success':
        return user.type_of_user === 'PremiumUser' || user.type_of_user === 'SilverUser';
      case 'Expired':
        return user.status === 'Expired' || user.status === 'expired';
      case 'inActive':
        return user.status === 'inactive' || user.status === 'inActive';
      case 'TeamUsers':
        return true; 
      case 'AssistancePending':
        return user.type_of_user === 'Assistance' && (user.status === 'pending' || user.status === 'Pending' || user.status === 'inactive' || user.status === 'inActive');
      case 'AssistanceSuccess':
        return user.type_of_user === 'Assistance' && (user.status === 'active' || user.status === 'Active');
      default:
        return true;
    }
  });

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h6" sx={{ mb: 2, color: '#9E1B47', fontWeight: 700 }}>
        {statusFilter} Referrals ({filteredUsers.length})
      </Typography>
      <TableContainer component={Paper} elevation={3}>
        <Table 
          size="small" 
          sx={{ 
            minWidth: 650, 
            '& .MuiTableCell-root': { padding: '8px 12px' } 
          }} 
          aria-label="referrals table"
        >
          <TableHead sx={{ backgroundColor: '#fcf3f6' }}>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold', color: '#4A0E2E' }}>Registration No</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: '#4A0E2E' }}>Name</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: '#4A0E2E' }}>Gender</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: '#4A0E2E' }}>Age</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: '#4A0E2E' }}>City</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: '#4A0E2E' }}>Email</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: '#4A0E2E' }}>Mobile</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: '#4A0E2E' }}>User Type</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: '#4A0E2E' }}>Status</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: '#4A0E2E' }}>Registration Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user) => (
                <TableRow
                  key={user._id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row" sx={{ fontWeight: 600 }}>
                    {user.registration_no}
                  </TableCell>
                  <TableCell>{user.first_name} {user.last_name}</TableCell>
                  <TableCell>{user.gender || 'N/A'}</TableCell>
                  <TableCell>{user.age || 'N/A'}</TableCell>
                  <TableCell>{user.city || 'N/A'}</TableCell>
                  <TableCell>{user.email_id}</TableCell>
                  <TableCell>{user.mobile_no}</TableCell>
                  <TableCell>
                    <Chip 
                      label={user.type_of_user} 
                      size="small" 
                      color={user.type_of_user === 'PremiumUser' ? 'success' : user.type_of_user === 'SilverUser' ? 'info' : 'default'}
                    />
                  </TableCell>
                  <TableCell>
                    <Chip 
                      label={user.status || 'N/A'} 
                      size="small" 
                      color={user.status === 'active' || user.status === 'Active' ? 'success' : 'warning'}
                    />
                  </TableCell>
                  <TableCell>{user.registration_date}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={10} align="center" sx={{ py: 3, color: '#666' }}>
                  No {statusFilter.toLowerCase()} referrals found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default ReferralsTable;
