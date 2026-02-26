import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Box, Typography, ThemeProvider, createTheme } from '@mui/material';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import './App.css';
import ProfileProvider from './components/usecontext/ProfileProvider';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ProtectedRoute from './components/roterProtector/RouterProtector';
import Register from './components/register/Register';
import MembershipPlan from './components/membershipplan/MembershipPlan';
import PromotersDashboard from './components/PromotersDash/PromotersDashboard';
import AdminProfileDialog from './components/Adminprofile/AdminProfile';

import ProfilePage from './components/PromotersDash/ProfilePage/ProfilePage';
import ReferInvitePage from './components/PromotersDash/RefferInvite/RefferInvitePage';

import Pending from './components/PromotersDash/myReferals/Pending';
import Success from './components/PromotersDash/myReferals/Success';
import DashboardContent from './components/PromotersDash/dashboardContent/DashboardContent';
import sidebarData from './components/PromotersDash/sidebar/data';
import Expired from './components/PromotersDash/myReferals/Expired';
import InActive from './components/PromotersDash/myReferals/InActive';
import TeamUsers from './components/PromotersDash/myReferals/TeamUsers';
import ActivationPending from './components/activationPending/activationPending';
import ScrollToTop from './components/common/scrollToTop';
import NotFoundPage from './components/notFound/NotFoundPage';



// Create a query client with default options
const queryClient = new QueryClient();

// Global theme configuration
const globalTheme = createTheme({
  palette: {
    primary: {
      main: '#1a4f72',
      light: '#2196f3',
      dark: '#0f3047',
    },
    secondary: {
      main: '#ffb74d',
      light: '#ffcc80',
      dark: '#f57c00',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          transition: 'all 0.25s ease',
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          transition: 'all 0.2s ease',
        },
      },
    },
  },
  typography: {
    fontFamily: 'Outfit, sans-serif',
    h1: { fontFamily: 'Playfair Display, serif' },
    h2: { fontFamily: 'Playfair Display, serif' },
    h3: { fontFamily: 'Playfair Display, serif' },
    h4: { fontFamily: 'Playfair Display, serif' },
    h5: { fontFamily: 'Playfair Display, serif' },
  },
});

// Lazy loading components
const HeroSlider = lazy(() => import('./components/hero/HeroSlider'));
const Connect = lazy(() => import('./components/howWorks/Connect'));
const Members = lazy(() => import('./components/members/Member'));
const AboutUs = lazy(() => import('./components/Aboutus/AboutUs'));
const Privacy = lazy(() => import('./components/privecy/Privacy'));
const ContactUs = lazy(() => import('./components/contactus/ContactUs'));
const AdminDashboard = lazy(() => import('./components/Admin/AdminDashboard'));
const UserTable = lazy(() => import('./components/Admin/UserManagement/UserTable'));
const UserData = lazy(() => import('./components/Admin/userData/UserData'));
const Dashboard = lazy(() => import('./components/Admin/dashboard/Dashboard'));
const RenewalsData = lazy(() => import('./components/Admin/renewalsdata/RenewalsData'));
const ResetPassword = lazy(() => import('./components/Admin/resetpassword/ResetPassword'));
const ImageVerificationData = lazy(() => import('./components/Admin/imageVarify/ImageVerificationdata'));
const PendingData = lazy(() => import('./components/Admin/pendinData/PendingData'));
const SuccessData = lazy(() => import('./components/Admin/successData/SuccessData'));
const PromotersUsersData = lazy(() => import('./components/Admin/PromotersUserData/PromotersUserData'));
const PayToPromoterData = lazy(() => import('./components/Admin/PromoterManagement/PayToPromoterData'));
const PromotersEarningsData = lazy(() => import('./components/Admin/PromotersEarnings/PromotersEarningsData'));
const PromotersData = lazy(() => import('./components/Admin/PromoterData/PromotersData'));
const PromotersUsers = lazy(() => import('./components/Admin/PromotersUsers/PromotersUsers'));
const OnlineTransactionData = lazy(() => import('./components/Admin/Receipts/OnlineTransactiondata'));
const AssistanceOnlineTransactionData = lazy(() => import('./components/Admin/Receipts/AssistanceOnlineTransactionData'));
const ReceiptVoucher = lazy(() => import('./components/Admin/Receipts/ReceiptVocher'));
const UserReports = lazy(() => import('./components/Admin/Reports/UserReports'));
const RenewalsReportsData = lazy(() => import('./components/Admin/Reports/RenewalsReportsData'));
const ReceiptsReportsData = lazy(() => import('./components/Admin/Reports/ReceiptsReportsData'));
const UserNavBar = lazy(() => import('./components/Userprofile/User/UserNavBar'));
const NotificationData = lazy(() => import('./components/Admin/notificationDta/NotificationData'));
const Servieces = lazy(() => import('./components/servieces/Servieces'));
const MyMatches = lazy(() => import('./components/Userprofile/myMatches/MyMatches'));
const MyInterest = lazy(() => import('./components/Userprofile/myIntrest/MyIntrest'));
const ViewAll = lazy(() => import('./components/Userprofile/viewAll/ViewAll'));
const Search = lazy(() => import('./components/Userprofile/search/Search'));
const UserDashboard = lazy(() => import('./components/Userprofile/userdDashboard/UserDashboard'));
const Profile = lazy(() => import('./components/Userprofile/profile/Profile'));
const TestPlanSelection = lazy(() => import('./components/TestPlanSelection'));

const IncompletePayments = lazy(() => import('./components/Admin/IncompletePayments/IncompletePayments.jsx'));
const PaymentRedirect = lazy(() => import('./components/PaymentRedirect/PaymentRedirect'));

export const LoadingComponent = () => {
  return (
    <Box
      sx={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        background: 'linear-gradient(135deg, #081d2d 0%, #1a4f72 50%, #2196f3 100%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 3,
        animation: 'fadeInLoader 0.3s ease',
        '@keyframes fadeInLoader': {
          from: { opacity: 0 },
          to: { opacity: 1 },
        },
      }}
    >
      {/* Decorative ring */}
      <Box sx={{ position: 'relative', width: 100, height: 100 }}>
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            borderRadius: '50%',
            border: '3px solid rgba(255, 183, 77, 0.2)',
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            borderRadius: '50%',
            border: '3px solid transparent',
            borderTopColor: '#ffb74d',
            borderRightColor: '#ffcc80',
            animation: 'spinGold 0.9s linear infinite',
            '@keyframes spinGold': {
              '0%': { transform: 'rotate(0deg)' },
              '100%': { transform: 'rotate(360deg)' },
            },
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            inset: 12,
            borderRadius: '50%',
            border: '2px solid transparent',
            borderBottomColor: 'rgba(255, 183, 77, 0.6)',
            animation: 'spinGoldRev 1.4s linear infinite',
            '@keyframes spinGoldRev': {
              '0%': { transform: 'rotate(0deg)' },
              '100%': { transform: 'rotate(-360deg)' },
            },
          }}
        />
        {/* Heart center */}
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.8rem',
            animation: 'pulse 1.4s ease-in-out infinite',
            '@keyframes pulse': {
              '0%, 100%': { transform: 'scale(1)', opacity: 1 },
              '50%': { transform: 'scale(1.15)', opacity: 0.85 },
            },
          }}
        >
          ❤️
        </Box>
      </Box>

      {/* Brand name */}
      <Typography
        sx={{
          fontFamily: 'Playfair Display, serif !important',
          fontSize: '1.5rem',
          fontWeight: 700,
          color: '#fff',
          letterSpacing: '0.5px',
          animation: 'fadeUpText 0.6s ease 0.2s both',
          '@keyframes fadeUpText': {
            from: { opacity: 0, transform: 'translateY(10px)' },
            to: { opacity: 1, transform: 'translateY(0)' },
          },
        }}
      >
        Girija❤️Kalyana
      </Typography>

      {/* Subtitle */}
      <Typography
        sx={{
          color: 'rgba(255, 183, 77, 0.85)',
          fontSize: '0.85rem',
          fontWeight: 400,
          letterSpacing: '2px',
          textTransform: 'uppercase',
          animation: 'fadeUpText 0.6s ease 0.4s both',
        }}
      >
        Finding your perfect match...
      </Typography>
    </Box>
  );
};



const App = () => {
  return (
    <ThemeProvider theme={globalTheme}>
      <ProfileProvider>
        <QueryClientProvider client={queryClient}>
          <Suspense fallback={

            <LoadingComponent />

          }>
            <Router>
              <ScrollToTop />
              <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1, minHeight: '100dvh' }}>
                <Routes>
                  {/* Public Routes */}
                  <Route path="/" element={<><HeroSlider /><Connect /><Members /></>} />
                  <Route path="/service" element={<Servieces />} />
                  <Route path="/about" element={<AboutUs />} />
                  <Route path="/privacy-policy" element={<Privacy />} />
                  <Route path="/contact" element={<ContactUs />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/test-plan" element={<TestPlanSelection />} />
                  <Route path="/membership" element={<MembershipPlan />} />

                  {/* Admin Routes */}
                  <Route element={<ProtectedRoute allowedRoles={["Admin"]} />}>
                    <Route path="/admin" element={<AdminDashboard />}>
                      <Route path="dashboard" element={<Dashboard />} />
                      <Route path="user-table" element={<UserTable />} />
                      <Route path="userData" element={<UserData />} />
                      <Route path="renewals" element={<RenewalsData />} />
                      <Route path="resetpass" element={<ResetPassword />} />
                      <Route path="pendingdata" element={<PendingData />} />
                      <Route path="successdata" element={<SuccessData />} />
                      {/* <Route path="promotersdata" element={<PromotersUsersData />} /> */}
                      <Route path="paytopromoters" element={<PayToPromoterData />} />
                      <Route path="promoterearn" element={<PromotersEarningsData />} />
                      <Route path="imageverify" element={<ImageVerificationData />} />
                      <Route path="promoters" element={<PromotersData />} />
                      <Route path="promotersusers" element={<PromotersUsers />} />
                      <Route path="onlinetransaction" element={<OnlineTransactionData />} />
                      <Route path="assistance" element={<AssistanceOnlineTransactionData />} />
                      <Route path="receiptsvocher" element={<ReceiptVoucher />} />
                      <Route path="userreports" element={<UserReports />} />
                      <Route path="renewalreports" element={<RenewalsReportsData />} />
                      <Route path="receiptsreports" element={<ReceiptsReportsData />} />
                      <Route path="notification" element={<NotificationData />} />
                      {/* Add this new route */}
                      <Route path="incomplete-payments" element={<IncompletePayments />} />
                      <Route path="pending" element={<Pending />} />
                      <Route path="success" element={<Success />} />
                      <Route path="expired" element={<Expired />} />
                      <Route path="inactive" element={<InActive />} />
                      <Route path="team-users" element={<TeamUsers />} />
                    </Route>
                  </Route>

                  {/* <Route element={<ProtectedRoute allowedRoles={["Admin"]} />}> */}
                  <Route element={<ProtectedRoute allowedRoles={["promoter"]} />}>
                    <Route path="/PromotAdmin" element={<PromotersDashboard />}>
                      <Route index element={<DashboardContent sidebarData={sidebarData} />} />
                      <Route path="admin-profile" element={<AdminProfileDialog />} />
                      <Route path="profilepage" element={<ProfilePage />} />
                      <Route path="refer" element={<ReferInvitePage />} />
                      <Route path="pending" element={<Pending />} />
                      <Route path="success" element={<Success />} />
                      <Route path="expired" element={<Expired />} />
                      <Route path="inactive" element={<InActive />} />
                      <Route path="team-users" element={<TeamUsers />} />
                    </Route>
                  </Route>

                  {/* User Routes */}
                  <Route element={<ProtectedRoute allowedRoles={["FreeUser", "PremiumUser", "SilverUser"]} />}>
                    <Route path="/user" element={<UserNavBar />}>
                      <Route path="userDashboard" element={<UserDashboard />} />
                      <Route path="profile" element={<Profile />} />
                      <Route path="MyMatches" element={<MyMatches />} />
                      <Route path="myintrest" element={<MyInterest />} />
                      <Route path="viewAll" element={<ViewAll />} />
                      <Route path="search" element={<Search />} />
                    </Route>
                  </Route>

                  {/* Payment Redirect Route */}
                  <Route path="/payment-redirect" element={<PaymentRedirect />} />

                  {/* 404 Route */}
                  <Route path="activation-pending" element={<ActivationPending />} />
                  <Route path="*" element={<NotFoundPage />} />
                </Routes>
              </Box>
            </Router>

            <ToastContainer position="top-right" autoClose={3000} />
          </Suspense>
        </QueryClientProvider>

        {/* <ProfileViewer /> */}
      </ProfileProvider>
    </ThemeProvider>
  );
};

export default App;
