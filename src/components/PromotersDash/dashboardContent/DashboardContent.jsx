import React, { useState } from 'react';
import {
  Box,
  Typography,
  Divider,
  Card,
  CardContent,
  Avatar,
  Chip,
  CircularProgress,
  useTheme,
  Paper,
  TextField,
  Button,
  Tooltip,
  IconButton
} from '@mui/material';
import {
  Event,
  Logout,
  Dashboard,
  Person,
  Share,
  Search,
  ManageSearch,
  ImageSearch,
  TrendingUp,
  ArrowDropDown as ArrowDropDownIcon,
  Pending,
  CheckCircle,
  TimerOff,
  Groups,
  HowToReg,
  SupportAgent,
  Autorenew,
  Send,
  Inbox,
  AttachMoney,
  AccountBalanceWallet,
  Favorite,
  GroupAdd,
  PersonOff,
  PendingActions,
  TaskAlt,
  Settings,
  Lock,
  Notifications,
  Email,
  Verified,
  ContentCopy,
  WhatsApp,
  PersonAdd,
  Check,
  Link as LinkIcon
} from '@mui/icons-material';
import { toast } from 'react-toastify';
import { useGetPromoterDashboard } from '../../api/Promoter';
import TokenService from '../../token/tokenService';

const DashboardContent = () => {
  const theme = useTheme();
  const decodedToken = TokenService.decodeToken();
  const promoterId = decodedToken?.promoter_id || decodedToken?.username;

  const { data: dashboardData, isLoading } = useGetPromoterDashboard(promoterId);

  const promoter = dashboardData?.promoter || {
    promoter_name: decodedToken?.first_name || decodedToken?.username || "Promoter",
    promoter_id: decodedToken?.promoter_id || decodedToken?.username || "N/A",
    membership_type: "Partner Promoter",
    registration_date: "Active",
    status: "active"
  };

  const stats = dashboardData?.stats || {
    totalUsers: 0,
    activeUsers: 0,
    pendingUsers: 0,
    totalEarnings: 0,
    paidAmount: 0,
    pendingAmount: 0
  };

  const [copied, setCopied] = useState(false);
  const promoCode = promoter?.promoter_id || promoterId || "";
  const referralLink = typeof window !== 'undefined' ? `${window.location.origin}/register?ref=${promoCode}` : "";

  const handleCopyLink = () => {
    if (!promoCode || promoCode === "N/A") {
      toast.error("Promoter code not available yet.");
      return;
    }
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    toast.success("Referral link copied to clipboard!");
    setTimeout(() => setCopied(false), 2500);
  };

  const handleShareWhatsApp = () => {
    if (!promoCode || promoCode === "N/A") return;
    const text = encodeURIComponent(
      `Hello! Register on Girija Kalyana Matrimony to find your perfect partner. Use my referral code ${promoCode} or click here: ${referralLink}`
    );
    window.open(`https://api.whatsapp.com/send?text=${text}`, "_blank");
  };

  const getIconComponent = (iconName, props = {}) => {
    const iconComponents = {
      Logout,
      Dashboard,
      Person,
      Share,
      Search,
      ManageSearch,
      ImageSearch,
      TrendingUp,
      ArrowDropDown: ArrowDropDownIcon,
      Pending,
      CheckCircle,
      TimerOff,
      Groups,
      HowToReg,
      SupportAgent,
      Autorenew,
      Send,
      Inbox,
      AttachMoney,
      AccountBalanceWallet,
      Favorite,
      GroupAdd,
      PersonOff,
      PendingActions,
      TaskAlt,
      Event,
      Settings,
      Lock,
      Notifications,
      Email,
      Verified
    };
    
    const IconComponent = iconComponents[iconName];
    return IconComponent ? <IconComponent {...props} /> : null;
  };

  const statCards = [
    {
      title: "Referred Users",
      value: stats.totalUsers ?? 0,
      color: "#4caf50",
      icon: "Groups",
    },
    {
      title: "Active / Paid Members",
      value: stats.activeUsers ?? 0,
      color: "#2196f3",
      icon: "CheckCircle",
    },
    {
      title: "Pending Approval",
      value: stats.pendingUsers ?? 0,
      color: "#ff9800",
      icon: "Pending",
    },
    {
      title: "My Total Earnings",
      value: `₹${Number(stats.totalEarnings ?? 0).toLocaleString()}`,
      color: "#9c27b0",
      icon: "AttachMoney",
    },
    {
      title: "Paid Amount",
      value: `₹${Number(stats.paidAmount ?? 0).toLocaleString()}`,
      color: "#f44336",
      icon: "AccountBalanceWallet",
    },
    {
      title: "Pending Payout",
      value: `₹${Number(stats.pendingAmount ?? 0).toLocaleString()}`,
      color: "#607d8b",
      icon: "PendingActions",
    },
  ];

  return (
    <>
      <Typography 
        variant="h4" 
        gutterBottom 
        sx={{ 
          color: '#9E1B47',
          fontWeight: 'bold', 
          textAlign: { xs: 'start', md: 'center' },
          fontSize: { xs: '1.5rem', sm: '2rem' },
          mb: 3
        }}
      >
        Welcome, {promoter?.promoter_name || "Partner"}
      </Typography>
      
      <Divider sx={{ height: '1px', my: 2 }} />

      {/* Top Cards Section */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          gap: 3,
          justifyContent: 'center',
          alignItems: 'stretch'
        }}
      >
        <Card
          sx={{
            backgroundColor: '#fce4ec',
            borderRadius: '12px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
            flex: 1,
            minWidth: { xs: '100%', sm: '260px' },
          }}
        >
          <CardContent sx={{ textAlign: 'center', p: 2 }}>
            <Typography variant="body1" sx={{ color: '#880e4f', fontWeight: 'bold' }}>
              Promoter Plan
            </Typography>
            <Typography variant="h5" sx={{ color: '#ad1457', fontWeight: 'bold', mt: 1 }}>
              {promoter?.membership_type || "Partner"}
            </Typography>
          </CardContent>
        </Card>

        <Card
          sx={{
            backgroundColor: '#e8f5e9',
            borderRadius: '12px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
            flex: 1,
            minWidth: { xs: '100%', sm: '260px' },
          }}
        >
          <CardContent sx={{ textAlign: 'center', p: 2 }}>
            <Typography variant="body1" sx={{ color: '#2e7d32', fontWeight: 'bold' }}>
              Your Promo / Referral Code
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1, mt: 1 }}>
              <Typography variant="h5" sx={{ color: '#1b5e20', fontWeight: 'bold', letterSpacing: '1px' }}>
                {promoter?.promoter_id || "N/A"}
              </Typography>
              {promoCode && (
                <Tooltip title="Copy Promo Code">
                  <IconButton
                    size="small"
                    onClick={() => {
                      navigator.clipboard.writeText(promoCode);
                      toast.success(`Copied Code: ${promoCode}`);
                    }}
                    sx={{ color: '#1b5e20' }}
                  >
                    <ContentCopy fontSize="small" />
                  </IconButton>
                </Tooltip>
              )}
            </Box>
          </CardContent>
        </Card>

        <Card
          sx={{
            backgroundColor: '#e3f2fd',
            borderRadius: '12px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
            flex: 1,
            minWidth: { xs: '100%', sm: '260px' },
          }}
        >
          <CardContent
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <Event color="primary" sx={{ mr: 1 }} />
              <Typography variant="body1" sx={{ color: '#1565c0', fontWeight: 'bold' }}>
                Account Info
              </Typography>
            </Box>

            <Box
              sx={{
                display: 'flex',
                flexDirection: { xs: 'column', sm: 'row' },
                alignItems: 'center',
                gap: 1.5,
                mt: 0.5,
              }}
            >
              <Chip
                label={`Joined: ${promoter?.registration_date || "Active"}`}
                color="primary"
                variant="outlined"
                sx={{
                  fontWeight: 'bold',
                  borderWidth: 2,
                  fontSize: '0.85rem',
                }}
              />
              <Chip
                label={promoter?.status ? promoter.status.toUpperCase() : "ACTIVE"}
                color="success"
                variant="filled"
                sx={{
                  fontWeight: 'bold',
                  fontSize: '0.85rem',
                }}
              />
            </Box>
          </CardContent>
        </Card>
      </Box>

      {/* Referral Link */}
      <Card
        sx={{
          borderRadius: '12px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
          border: '1px solid #e2e8f0',
          backgroundColor: '#ffffff',
          my: 2.5,
          p: { xs: 2, sm: 2.5 },
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            alignItems: { xs: 'flex-start', md: 'center' },
            justifyContent: 'space-between',
            gap: 2,
          }}
        >
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Typography variant="body2" sx={{ color: '#64748b', fontWeight: 600 }}>
              Your Referral Link
            </Typography>
            <Typography
              variant="body1"
              sx={{
                fontWeight: 600,
                color: '#9E1B47',
                fontFamily: 'monospace',
                fontSize: { xs: '0.85rem', sm: '0.95rem' },
                mt: 0.5,
                wordBreak: 'break-all',
              }}
            >
              {referralLink}
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', width: { xs: '100%', md: 'auto' } }}>
            <Button
              size="small"
              variant="contained"
              onClick={handleCopyLink}
              startIcon={copied ? <Check /> : <ContentCopy />}
              sx={{
                backgroundColor: copied ? '#16a34a' : '#9E1B47',
                color: '#fff',
                textTransform: 'none',
                fontWeight: 600,
                borderRadius: '8px',
                px: 2,
                '&:hover': { backgroundColor: copied ? '#15803d' : '#801336' },
              }}
            >
              {copied ? 'Copied' : 'Copy Link'}
            </Button>
            <Button
              size="small"
              variant="outlined"
              color="success"
              onClick={handleShareWhatsApp}
              startIcon={<WhatsApp />}
              sx={{
                textTransform: 'none',
                fontWeight: 600,
                borderRadius: '8px',
                px: 2,
              }}
            >
              WhatsApp
            </Button>
            <Button
              size="small"
              variant="outlined"
              onClick={() => window.open(referralLink, '_blank')}
              sx={{
                color: '#9E1B47',
                borderColor: '#cbd5e1',
                textTransform: 'none',
                fontWeight: 600,
                borderRadius: '8px',
                px: 2,
                '&:hover': { borderColor: '#9E1B47', backgroundColor: 'rgba(158, 27, 71, 0.04)' },
              }}
            >
              Add User
            </Button>
          </Box>
        </Box>
      </Card>

      <Divider sx={{ height: '1px', my: 3 }} />

      {/* User Cards Section */}
      <Typography 
        variant="h5" 
        gutterBottom 
        sx={{ 
          color: '#9E1B47', 
          fontWeight: 'bold', 
          mb: 3,
          textAlign: 'center',
          fontSize: { xs: '1.3rem', sm: '1.5rem' }
        }}
      >
        Real-Time Performance Statistics
      </Typography>
      
      {isLoading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
          <CircularProgress color="primary" />
        </Box>
      ) : (
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 3,
            justifyContent: 'center',
            alignItems: 'stretch'
          }}
        >
          {statCards.map((item, index) => (
            <Card
              key={index}
              sx={{
                flex: '1 1 300px',
                maxWidth: { xs: '100%', sm: 'calc(50% - 24px)', md: 'calc(33.333% - 24px)' },
                minWidth: '260px',
                minHeight: '130px',
                borderRadius: '12px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                borderLeft: `5px solid ${item.color}`,
                backgroundColor: '#ffffff',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: '0 8px 20px rgba(0,0,0,0.15)',
                },
              }}
            >
              <CardContent sx={{ p: 2.5 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <Avatar
                    sx={{
                      backgroundColor: `${item.color}20`,
                      color: item.color,
                      mr: 2,
                      width: 48,
                      height: 48,
                    }}
                  >
                    {getIconComponent(item.icon)}
                  </Avatar>
                  <Typography
                    variant="h5"
                    sx={{
                      color: item.color,
                      fontWeight: 'bold',
                      fontSize: '1.6rem',
                    }}
                  >
                    {item.value}
                  </Typography>
                </Box>
                <Typography
                  variant="body2"
                  sx={{
                    color: theme.palette.text.secondary,
                    fontWeight: 600,
                    textAlign: 'start',
                    fontSize: '1rem'
                  }}
                >
                  {item.title}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Box>
      )}
    </>
  );
};

export default DashboardContent;
