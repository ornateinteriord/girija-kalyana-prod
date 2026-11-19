import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  Box,
  Typography,
  TextField,
  Button,
  CircularProgress,
  Checkbox,
  FormControlLabel,
  InputAdornment,
  IconButton,
} from "@mui/material";
import {
  Visibility,
  VisibilityOff,
  PersonOutline,
  LockOutlined,
  ArrowBack,
  HowToRegOutlined,
  Handshake,
} from "@mui/icons-material";
import { toast } from "react-toastify";
import { useLoginMutation } from "../../api/Auth";
import TokenService from "../../token/tokenService";
import "./PromoterAuth.scss";

const PromoterLogin = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const { mutate: login, isPending } = useLoginMutation();

  useEffect(() => {
    // If already logged in as promoter, redirect to dashboard
    const role = TokenService.getRole()?.toString().toLowerCase();
    if (TokenService.getToken() && role === "promoter") {
      navigate("/PromotAdmin", { replace: true });
    }

    const savedUser = localStorage.getItem("gk_promoter_username");
    if (savedUser) {
      setFormData((prev) => ({ ...prev, username: savedUser }));
      setRememberMe(true);
    }
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.username.trim() || !formData.password) {
      toast.error("Please enter both Username/ID and Password");
      return;
    }

    if (rememberMe) {
      localStorage.setItem("gk_promoter_username", formData.username.trim());
    } else {
      localStorage.removeItem("gk_promoter_username");
    }

    login({
      username: formData.username.trim(),
      password: formData.password,
    });
  };

  return (
    <div className="promoter-auth-page">
      <div className="promoter-auth-container">
        {/* Back Link */}
        <Link to="/" className="promoter-back-link">
          <ArrowBack fontSize="small" /> Back to Girija Kalyana
        </Link>

        {/* Card */}
        <div className="promoter-auth-card">
          {/* Header */}
          <div className="promoter-auth-header">
            <div className="brand-badge">
              <Handshake className="badge-icon" />
              <span>Partner Network</span>
            </div>
            <h1 className="auth-title">Promoter Login</h1>
            <p className="auth-subtitle">
              Sign in to manage referrals, monitor commissions, and grow your matrimonial network.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="promoter-auth-form" noValidate>
            <div className="form-group">
              <label htmlFor="username">Username, Email, or Promoter ID</label>
              <TextField
                id="username"
                name="username"
                placeholder="e.g. ABCD1234 or your username"
                fullWidth
                variant="outlined"
                value={formData.username}
                onChange={handleChange}
                autoComplete="username"
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
              <label htmlFor="password">Password</label>
              <TextField
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                fullWidth
                variant="outlined"
                value={formData.password}
                onChange={handleChange}
                autoComplete="current-password"
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

            <div className="form-row-between">
              <FormControlLabel
                control={
                  <Checkbox
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    size="small"
                    color="primary"
                  />
                }
                label={<span className="checkbox-label">Remember me</span>}
              />
            </div>

            <Button
              type="submit"
              variant="contained"
              fullWidth
              disabled={isPending}
              className="submit-btn"
            >
              {isPending ? (
                <>
                  <CircularProgress size={22} color="inherit" sx={{ mr: 1.5 }} />
                  Signing In...
                </>
              ) : (
                "Sign In to Promoter Dashboard"
              )}
            </Button>
          </form>

          {/* Switch to Registration */}
          <div className="promoter-auth-footer">
            <p>
              Don't have a Promoter account?{" "}
              <Link to="/promoter/register" className="switch-link">
                <HowToRegOutlined fontSize="small" sx={{ mr: 0.5, verticalAlign: "middle" }} />
                Create New Promoter Account
              </Link>
            </p>
          </div>
        </div>

        {/* Safe Help Info */}
        <div className="promoter-help-footer">
          <span>Need help or having issues logging in? Contact support at ornateinteriord@gmail.com</span>
        </div>
      </div>
    </div>
  );
};

export default PromoterLogin;
