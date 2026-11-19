import React, { useState, useEffect } from 'react';
import { 
  Box,
  Typography,
  Tabs,
  Tab,
  TextField,
  Divider,
  useTheme,
  useMediaQuery,
  Button,
  CircularProgress,
  Chip
} from '@mui/material';
import { 
  AccountBalance, 
  Person,
  Save,
  Edit,
  Close,
  BadgeOutlined,
  CheckCircle,
} from '@mui/icons-material';
import { toast } from 'react-toastify';
import { useGetPromoterDashboard, useUpdatePromoterProfile } from '../../api/Promoter';
import TokenService from '../../token/tokenService';

function ProfilePage() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [value, setValue] = useState(0);
  const [isEditing, setIsEditing] = useState(false);

  const decodedToken = TokenService.decodeToken();
  const promoterId = decodedToken?.promoter_id;

  const { data: dashboardData, isLoading } = useGetPromoterDashboard(promoterId);
  const promoter = dashboardData?.promoter || dashboardData?.data?.promoter;
  const { mutate: updateProfile, isPending: isUpdating } = useUpdatePromoterProfile();

  const [formData, setFormData] = useState(() => ({
    fullName: decodedToken?.first_name || '',
    email: decodedToken?.email_id || '',
    phone: decodedToken?.mobile_no || '',
    address: '',
    pinCode: '',
    country: 'India',
    state: '',
    city: decodedToken?.city || '',
    accountName: decodedToken?.first_name || '',
    accountNumber: '',
    accountType: 'Savings',
    ifscCode: '',
  }));

  useEffect(() => {
    if (promoter) {
      setFormData({
        fullName: promoter.promoter_name || decodedToken?.first_name || '',
        email: promoter.email || decodedToken?.email_id || '',
        phone: promoter.mobile || decodedToken?.mobile_no || '',
        address: (promoter.company_name && promoter.company_name !== 'Not Updated') ? promoter.company_name : '',
        pinCode: '',
        country: promoter.country || 'India',
        state: '',
        city: promoter.city || decodedToken?.city || '',
        accountName: promoter.promoter_name || decodedToken?.first_name || '',
        accountNumber: (promoter.account_number && promoter.account_number !== 'Not Updated') ? promoter.account_number : '',
        accountType: 'Savings',
        ifscCode: (promoter.bank_ifsc && promoter.bank_ifsc !== 'Not Updated') ? promoter.bank_ifsc : '',
      });
    }
  }, [promoter, decodedToken]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = () => {
    if (!formData.fullName.trim()) {
      toast.error("Full Name is required");
      return;
    }
    updateProfile(
      {
        promoter_id: promoterId,
        data: formData,
      },
      {
        onSuccess: (res) => {
          toast.success(res?.message || "Profile updated successfully!");
          setIsEditing(false);
        },
        onError: (err) => {
          toast.error(err?.response?.data?.message || err?.message || "Failed to update profile");
        },
      }
    );
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    if (promoter) {
      setFormData({
        fullName: promoter.promoter_name || decodedToken?.first_name || '',
        email: promoter.email || decodedToken?.email_id || '',
        phone: promoter.mobile || decodedToken?.mobile_no || '',
        address: (promoter.company_name && promoter.company_name !== 'Not Updated') ? promoter.company_name : '',
        pinCode: '',
        country: promoter.country || 'India',
        state: '',
        city: promoter.city || decodedToken?.city || '',
        accountName: promoter.promoter_name || decodedToken?.first_name || '',
        accountNumber: (promoter.account_number && promoter.account_number !== 'Not Updated') ? promoter.account_number : '',
        accountType: 'Savings',
        ifscCode: (promoter.bank_ifsc && promoter.bank_ifsc !== 'Not Updated') ? promoter.bank_ifsc : '',
      });
    }
  };

  return (
    <Box sx={{ 
      p: isMobile ? 0 : "0px 20px", 
      width: '100%'
    }}>
      {/* Header */}
      <Typography 
        variant="h4" 
        component="h1" 
        gutterBottom 
        sx={{ 
          textAlign: 'center', 
          mb: 2,
          fontWeight: 700,
          color: theme.palette.primary.main
        }}
      >
        My Profile
      </Typography>

      {/* Action Buttons & Promoter Badge */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3, flexWrap: 'wrap', gap: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, flexWrap: 'wrap' }}>
          <Chip
            icon={<BadgeOutlined />}
            label={`Promoter Code: ${promoter?.promoter_id || promoterId || "N/A"}`}
            color="primary"
            variant="filled"
            sx={{ fontWeight: 'bold', fontSize: '0.95rem', py: 0.5 }}
          />
          <Chip
            icon={<CheckCircle />}
            label={promoter?.status ? promoter.status.toUpperCase() : "ACTIVE"}
            color="success"
            variant="outlined"
            sx={{ fontWeight: 'bold', fontSize: '0.85rem' }}
          />
          {isLoading && <CircularProgress size={20} sx={{ ml: 1 }} />}
        </Box>

        <Box sx={{ display: 'flex', gap: 1.5 }}>
          {isEditing ? (
            <>
              <Button
                variant="outlined"
                color="inherit"
                startIcon={<Close />}
                onClick={handleCancel}
                disabled={isUpdating}
                sx={{ fontWeight: 'bold', textTransform: 'capitalize' }}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                color="primary"
                disabled={isUpdating}
                startIcon={isUpdating ? <CircularProgress size={20} color="inherit" /> : <Save />}
                onClick={handleSave}
                sx={{
                  fontWeight: 'bold',
                  p: '10px 24px',
                  textTransform: 'capitalize',
                  boxShadow: 2,
                  '&:hover': {
                    backgroundColor: theme.palette.primary.dark,
                  },
                }}
              >
                {isUpdating ? "Saving..." : "Save Profile"}
              </Button>
            </>
          ) : (
            <Button
              variant="contained"
              color="primary"
              startIcon={<Edit />}
              onClick={handleEdit}
              sx={{
                fontWeight: 'bold',
                p: '10px 24px',
                textTransform: 'capitalize',
                boxShadow: 2,
                '&:hover': {
                  backgroundColor: theme.palette.primary.dark,
                }
              }}
            >
              Edit Profile
            </Button>
          )}
        </Box>
      </Box>

      {/* Tabs */}
      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
        <Tabs 
          value={value} 
          onChange={handleChange}
          variant={isMobile ? 'scrollable' : 'standard'}
          scrollButtons="auto"
          allowScrollButtonsMobile
          sx={{
            width: '100%',
            borderBottom: 1,
            borderColor: 'divider',
            '& .MuiTabs-indicator': {
              backgroundColor: theme.palette.primary.main
            }
          }}
        >
          <Tab 
            label="About & Contact" 
            icon={<Person />} 
            iconPosition="start" 
            sx={{ fontWeight: 600, fontSize: '0.95rem' }}
          />
          <Tab 
            label="Bank Details" 
            icon={<AccountBalance />} 
            iconPosition="start" 
            sx={{ fontWeight: 600, fontSize: '0.95rem' }}
          />
        </Tabs>
      </Box>

      {/* About Section */}
      {value === 0 && (
        <Box sx={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: 3 }}>
          {/* Basic Information */}
          <Box sx={{ 
            p: isMobile ? 0 : 2, 
            borderRadius: 2, 
            flex: 1,
          }}>
            <Typography variant="h6" component="h2" gutterBottom sx={{ fontWeight: 700, color: '#333' }}>
              Basic Information
            </Typography>
            <Divider sx={{ mb: 3 }} />

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
              <TextField
                fullWidth
                name="fullName"
                label="Full Name"
                value={formData.fullName}
                onChange={handleInputChange}
                variant="outlined"
                disabled={!isEditing}
                InputLabelProps={{ shrink: true }}
              />

              <TextField
                fullWidth
                name="email"
                label="Email Id"
                value={formData.email}
                onChange={handleInputChange}
                variant="outlined"
                disabled={!isEditing}
                InputLabelProps={{ shrink: true }}
              />

              <TextField
                fullWidth
                name="phone"
                label="Phone No."
                value={formData.phone}
                onChange={handleInputChange}
                variant="outlined"
                disabled={!isEditing}
                InputLabelProps={{ shrink: true }}
              />
            </Box>
          </Box>

          {/* Address Information */}
          <Box sx={{ 
            p: isMobile ? 0 : 2, 
            borderRadius: 2, 
            flex: 1,
          }}>
            <Typography variant="h6" component="h2" gutterBottom sx={{ fontWeight: 700, color: '#333' }}>
              Agency & Location
            </Typography>
            <Divider sx={{ mb: 3 }} />

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
              <TextField
                fullWidth
                name="address"
                label="Agency / Company Name"
                value={formData.address}
                onChange={handleInputChange}
                variant="outlined"
                disabled={!isEditing}
                placeholder="e.g. Independent Promoter or Agency"
                InputLabelProps={{ shrink: true }}
              />

              <Box sx={{ display: 'flex', gap: 2 }}>
                <TextField
                  fullWidth
                  name="country"
                  label="Country"
                  value={formData.country}
                  onChange={handleInputChange}
                  variant="outlined"
                  disabled={!isEditing}
                  InputLabelProps={{ shrink: true }}
                />
                <TextField
                  fullWidth
                  name="city"
                  label="City"
                  value={formData.city}
                  onChange={handleInputChange}
                  variant="outlined"
                  disabled={!isEditing}
                  InputLabelProps={{ shrink: true }}
                />
              </Box>

              <Box sx={{ display: 'flex', gap: 2 }}>
                <TextField
                  fullWidth
                  name="state"
                  label="State"
                  value={formData.state}
                  onChange={handleInputChange}
                  variant="outlined"
                  disabled={!isEditing}
                  InputLabelProps={{ shrink: true }}
                />
                <TextField
                  fullWidth
                  name="pinCode"
                  label="Pin Code"
                  value={formData.pinCode}
                  onChange={handleInputChange}
                  variant="outlined"
                  disabled={!isEditing}
                  InputLabelProps={{ shrink: true }}
                />
              </Box>
            </Box>
          </Box>
        </Box>
      )}

      {/* Bank Details Section */}
      {value === 1 && (
        <Box sx={{ 
          p: isMobile ? 0 : 2, 
          borderRadius: 2,
          maxWidth: 700,
        }}>
          <Typography variant="h6" component="h2" gutterBottom sx={{ fontWeight: 700, color: '#333' }}>
            Bank Account for Payouts
          </Typography>
          <Divider sx={{ mb: 3 }} />

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
            <TextField
              fullWidth
              name="accountName"
              label="Account Holder Name"
              value={formData.accountName}
              onChange={handleInputChange}
              variant="outlined"
              disabled={!isEditing}
              InputLabelProps={{ shrink: true }}
            />

            <Box sx={{ display: 'flex', gap: 2 }}>
              <TextField
                fullWidth
                name="accountNumber"
                label="Bank Account Number"
                value={formData.accountNumber}
                onChange={handleInputChange}
                variant="outlined"
                disabled={!isEditing}
                placeholder="Enter account number"
                InputLabelProps={{ shrink: true }}
              />
              <TextField
                fullWidth
                name="accountType"
                label="Account Type"
                value={formData.accountType}
                onChange={handleInputChange}
                variant="outlined"
                disabled={!isEditing}
                InputLabelProps={{ shrink: true }}
              />
            </Box>

            <TextField
              fullWidth
              name="ifscCode"
              label="Bank IFSC Code"
              value={formData.ifscCode}
              onChange={handleInputChange}
              variant="outlined"
              disabled={!isEditing}
              placeholder="e.g. SBIN0001234"
              InputLabelProps={{ shrink: true }}
            />
          </Box>
        </Box>
      )}
    </Box>
  );
}

export default ProfilePage;
