import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  Box,
  Typography,
  TextField,
  Button,
  CircularProgress,
  InputAdornment,
  IconButton,
  Tooltip,
} from "@mui/material";
import {
  Visibility,
  VisibilityOff,
  PersonOutline,
  LockOutlined,
  ArrowBack,
  PhoneIphone,
  EmailOutlined,
  BadgeOutlined,
  BusinessOutlined,
  AccountBalanceOutlined,
  CasinoOutlined,
  LoginOutlined,
  Handshake,
} from "@mui/icons-material";
import { toast } from "react-toastify";
import { usePromoterRegister } from "../../api/Promoter";
import { extractErrorMessage } from "../../api/Auth";
import "./PromoterAuth.scss";

const PromoterRegister = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    promoter_name: "",
    promoter_id: "",
    mobile: "",
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
    company_name: "",
    account_number: "",
    bank_ifsc: "",
    country: "India",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { mutate: registerPromoter, isPending } = usePromoterRegister();

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "mobile") {
      if (value === "" || /^\d{0,10}$/.test(value)) {
        setFormData((prev) => ({ ...prev, [name]: value }));
      }
      return;
    }

    if (name === "promoter_id") {
      setFormData((prev) => ({ ...prev, [name]: value.toUpperCase() }));
      return;
    }

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const generatePromoterId = () => {
    const baseName = formData.promoter_name.trim().replace(/[^a-zA-Z]/g, "").toUpperCase();
    const prefix = (baseName.length >= 4 ? baseName.substring(0, 4) : baseName.padEnd(4, "GKPR")).substring(0, 4);
    const randomDigits = Math.floor(1000 + Math.random() * 9000);
    const generated = `${prefix}${randomDigits}`;
    setFormData((prev) => ({ ...prev, promoter_id: generated }));
    toast.info(`Generated Promoter ID: ${generated}`);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validations
    if (!formData.promoter_name.trim()) {
      toast.error("Please enter your Full Name");
      return;
    }

    if (!formData.promoter_id.trim()) {
      toast.error("Please enter or generate a Promoter ID (e.g. ABCD1234)");
      return;
    }

    if (!/^[A-Za-z]{4}\d{4}$/.test(formData.promoter_id.trim())) {
      toast.error("Promoter ID must start with 4 letters followed by 4 numbers (e.g., ABCD1234)");
      return;
    }

    if (!formData.mobile.trim() || !/^\d{10}$/.test(formData.mobile)) {
      toast.error("Please enter a valid 10-digit mobile number");
      return;
    }

    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      toast.error("Please enter a valid email address");
      return;
    }

    if (!formData.username.trim()) {
      toast.error("Please enter a username for logging in");
      return;
    }

    if (!formData.password || formData.password.length < 6) {
      toast.error("Password must be at least 6 characters long");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    const payload = {
      promoter_name: formData.promoter_name.trim(),
      promoter_id: formData.promoter_id.trim().toUpperCase(),
      mobile: formData.mobile.trim(),
      email: formData.email.trim(),
      username: formData.username.trim(),
      password: formData.password.trim(),
      company_name: formData.company_name.trim() || "Independent Promoter",
      account_number: formData.account_number.trim() || "Not Updated",
      bank_ifsc: formData.bank_ifsc.trim() || "Not Updated",
      country: formData.country.trim() || "India",
      membership_type: "Promoter",
    };

    registerPromoter(payload, {
      onSuccess: (res) => {
        toast.success(res?.message || "Registration successful! You can now log in.");
        navigate("/promoter/login");
      },
      onError: (err) => {
        toast.error(
          extractErrorMessage(err, "Registration failed. Please try again.")
        );
      },
    });
  };

  return (
    <div className="promoter-auth-page register-page">
      <div className="promoter-auth-container register-container">
        {/* Back Link */}
        <Link to="/" className="promoter-back-link">
          <ArrowBack fontSize="small" /> Back to Girija Kalyana
        </Link>

        {/* Card */}
        <div className="promoter-auth-card register-card">
          {/* Header */}
          <div className="promoter-auth-header">
            <div className="brand-badge">
              <Handshake className="badge-icon" />
              <span>Become a Partner</span>
            </div>
            <h1 className="auth-title">Promoter Registration</h1>
            <p className="auth-subtitle">
              Join the Girija Kalyana partner network, refer prospective brides and grooms, and earn verified referral commissions.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="promoter-auth-form" noValidate>
            <div className="form-section-title">Personal & Contact Details</div>

            <div className="form-grid-2">
              <div className="form-group">
                <label htmlFor="promoter_name">Full Name *</label>
                <TextField
                  id="promoter_name"
                  name="promoter_name"
                  placeholder="e.g. Suresh Kumar"
                  fullWidth
                  variant="outlined"
                  value={formData.promoter_name}
                  onChange={handleChange}
                  disabled={isPending}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PersonOutline className="input-icon" />
                      </InputAdornment>
                    ),
                  }}
                />
              </div>

              <div className="form-group">
                <label htmlFor="promoter_id">
                  Promoter Referral ID * (4 letters + 4 digits)
                </label>
                <TextField
                  id="promoter_id"
                  name="promoter_id"
                  placeholder="e.g. ABCD1234"
                  fullWidth
                  variant="outlined"
                  value={formData.promoter_id}
                  onChange={handleChange}
                  disabled={isPending}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <BadgeOutlined className="input-icon" />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <Tooltip title="Click to auto-generate a valid ID">
                          <Button
                            size="small"
                            onClick={generatePromoterId}
                            startIcon={<CasinoOutlined fontSize="small" />}
                            sx={{
                              textTransform: "none",
                              fontSize: "0.75rem",
                              fontWeight: 600,
                              background: "rgba(212, 175, 55, 0.15)",
                              color: "#D4AF37",
                              borderRadius: "20px",
                              "&:hover": { background: "rgba(212, 175, 55, 0.25)" },
                            }}
                          >
                            Auto
                          </Button>
                        </Tooltip>
                      </InputAdornment>
                    ),
                  }}
                />
              </div>
            </div>

            <div className="form-grid-2">
              <div className="form-group">
                <label htmlFor="mobile">Mobile Number *</label>
                <TextField
                  id="mobile"
                  name="mobile"
                  placeholder="10-digit mobile number"
                  fullWidth
                  variant="outlined"
                  value={formData.mobile}
                  onChange={handleChange}
                  disabled={isPending}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PhoneIphone className="input-icon" />
                      </InputAdornment>
                    ),
                  }}
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email Address *</label>
                <TextField
                  id="email"
                  name="email"
                  type="email"
                  placeholder="name@example.com"
                  fullWidth
                  variant="outlined"
                  value={formData.email}
                  onChange={handleChange}
                  disabled={isPending}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <EmailOutlined className="input-icon" />
                      </InputAdornment>
                    ),
                  }}
                />
              </div>
            </div>

            <div className="form-section-title">Login Credentials</div>

            <div className="form-grid-3">
              <div className="form-group">
                <label htmlFor="username">Login Username *</label>
                <TextField
                  id="username"
                  name="username"
                  placeholder="Choose unique username"
                  fullWidth
                  variant="outlined"
                  value={formData.username}
                  onChange={handleChange}
                  disabled={isPending}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PersonOutline className="input-icon" />
                      </InputAdornment>
                    ),
                  }}
                />
              </div>

              <div className="form-group">
                <label htmlFor="password">Password *</label>
                <TextField
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="At least 6 characters"
                  fullWidth
                  variant="outlined"
                  value={formData.password}
                  onChange={handleChange}
                  disabled={isPending}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockOutlined className="input-icon" />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowPassword(!showPassword)}
                          edge="end"
                          aria-label="toggle password visibility"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </div>

              <div className="form-group">
                <label htmlFor="confirmPassword">Confirm Password *</label>
                <TextField
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Re-type password"
                  fullWidth
                  variant="outlined"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  disabled={isPending}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockOutlined className="input-icon" />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          edge="end"
                          aria-label="toggle confirm password visibility"
                        >
                          {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </div>
            </div>

            <div className="form-section-title">
              Bank / Agency Info <span className="optional-tag">(Optional, for payouts)</span>
            </div>

            <div className="form-grid-3">
              <div className="form-group">
                <label htmlFor="company_name">Agency / Company Name</label>
                <TextField
                  id="company_name"
                  name="company_name"
                  placeholder="Self or Agency name"
                  fullWidth
                  variant="outlined"
                  value={formData.company_name}
                  onChange={handleChange}
                  disabled={isPending}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <BusinessOutlined className="input-icon" />
                      </InputAdornment>
                    ),
                  }}
                />
              </div>

              <div className="form-group">
                <label htmlFor="account_number">Bank Account Number</label>
                <TextField
                  id="account_number"
                  name="account_number"
                  placeholder="Account number"
                  fullWidth
                  variant="outlined"
                  value={formData.account_number}
                  onChange={handleChange}
                  disabled={isPending}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <AccountBalanceOutlined className="input-icon" />
                      </InputAdornment>
                    ),
                  }}
                />
              </div>

              <div className="form-group">
                <label htmlFor="bank_ifsc">Bank IFSC Code</label>
                <TextField
                  id="bank_ifsc"
                  name="bank_ifsc"
                  placeholder="e.g. SBIN0001234"
                  fullWidth
                  variant="outlined"
                  value={formData.bank_ifsc}
                  onChange={handleChange}
                  disabled={isPending}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <AccountBalanceOutlined className="input-icon" />
                      </InputAdornment>
                    ),
                  }}
                />
              </div>
            </div>

            <Button
              type="submit"
              variant="contained"
              fullWidth
              disabled={isPending}
              className="submit-btn"
              sx={{ mt: 3 }}
            >
              {isPending ? (
                <>
                  <CircularProgress size={22} color="inherit" sx={{ mr: 1.5 }} />
                  Creating Account...
                </>
              ) : (
                "Complete Promoter Registration"
              )}
            </Button>
          </form>

          {/* Switch to Login */}
          <div className="promoter-auth-footer">
            <p>
              Already have a Promoter account?{" "}
              <Link to="/promoter/login" className="switch-link">
                <LoginOutlined fontSize="small" sx={{ mr: 0.5, verticalAlign: "middle" }} />
                Sign In to Promoter Portal
              </Link>
            </p>
          </div>
        </div>

        {/* Safe Help Info */}
        <div className="promoter-help-footer">
          <span>By registering, you agree to Girija Kalyana Promoter Guidelines & Commission Policy.</span>
        </div>
      </div>
    </div>
  );
};

export default PromoterRegister;
