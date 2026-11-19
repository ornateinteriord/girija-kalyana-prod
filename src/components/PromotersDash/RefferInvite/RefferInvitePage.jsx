import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  IconButton,
  Divider,
  Grid,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Card
} from '@mui/material';
import { Add, Delete, Send, ContentCopy, WhatsApp, PersonAdd, Check, Link as LinkIcon, Share } from '@mui/icons-material';
import { toast } from 'react-toastify';
import TokenService from '../../token/tokenService';

const ReferInvitePage = () => {
  const decodedToken = TokenService.decodeToken();
  const promoCode = decodedToken?.promoter_id || "";
  const referralLink = typeof window !== 'undefined' ? `${window.location.origin}/register?ref=${promoCode}` : "";
  const [copied, setCopied] = useState(false);

  const handleCopyLink = () => {
    if (!promoCode) {
      toast.error("Promoter code not available.");
      return;
    }
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    toast.success("Referral link copied!");
    setTimeout(() => setCopied(false), 2500);
  };

  const handleShareWhatsApp = () => {
    if (!promoCode) return;
    const text = encodeURIComponent(
      `Hello! Register on Girija Kalyana Matrimony with my referral code ${promoCode} or click here: ${referralLink}`
    );
    window.open(`https://api.whatsapp.com/send?text=${text}`, "_blank");
  };

  const [entries, setEntries] = useState([{
    email: '',
    mobile: '',
    name: '',
    relationship: '',
    channel: 'email'
  }]);

  const handleAddEntry = () => {
    setEntries([...entries, {
      email: '',
      mobile: '',
      name: '',
      relationship: '',
      channel: 'email'
    }]);
  };

  const handleDeleteEntry = (index) => {
    if (entries.length > 1) {
      const newEntries = [...entries];
      newEntries.splice(index, 1);
      setEntries(newEntries);
    }
  };

  const handleInputChange = (index, field, value) => {
    const newEntries = [...entries];
    newEntries[index][field] = value;
    setEntries(newEntries);
  };

  const handleSubmit = () => {
    console.log('Submitted entries:', entries);
    // Add your submission logic here
  };

  return (
    <Box sx={{
      p: 0,
      ml:{xs:0, md:2},
      mt:{xs:1, md:2}, 
      maxWidth: 900,
      borderRadius: 2
    }}>

     <Typography
        variant="h4"
        sx={{
          fontWeight: 700,
          mb: 3,
          color: 'primary.main',
          textAlign: 'center'
        }}
      >
        Invite Your Friends & Family
      </Typography>

      {/* Direct Referral Link Card */}
      <Card
        sx={{
          mb: 4,
          p: { xs: 2, sm: 2.5 },
          borderRadius: "12px",
          border: "1px solid #e2e8f0",
          backgroundColor: "#ffffff",
          boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
        }}
      >
        <Typography variant="body2" sx={{ fontWeight: 600, color: "#64748b", mb: 0.5 }}>
          Your Referral Link
        </Typography>

        <Box sx={{ display: "flex", flexDirection: { xs: "column", sm: "row" }, gap: 1.5, alignItems: "center" }}>
          <TextField
            fullWidth
            size="small"
            value={referralLink}
            InputProps={{
              readOnly: true,
              startAdornment: <LinkIcon sx={{ color: "#64748b", mr: 1 }} fontSize="small" />,
              sx: {
                backgroundColor: "#f8fafc",
                color: "#0f172a",
                fontFamily: "monospace",
                fontSize: "0.88rem",
                borderRadius: "8px",
              },
            }}
          />
          <Box sx={{ display: "flex", gap: 1, width: { xs: "100%", sm: "auto" } }}>
            <Button
              size="small"
              variant="contained"
              onClick={handleCopyLink}
              startIcon={copied ? <Check /> : <ContentCopy />}
              sx={{
                backgroundColor: copied ? "#16a34a" : "#9E1B47",
                color: "#fff",
                fontWeight: 600,
                textTransform: "none",
                whiteSpace: "nowrap",
                borderRadius: "8px",
                px: 2,
                "&:hover": { backgroundColor: copied ? "#15803d" : "#801336" },
              }}
            >
              {copied ? "Copied" : "Copy"}
            </Button>
            <Button
              size="small"
              variant="outlined"
              color="success"
              onClick={handleShareWhatsApp}
              startIcon={<WhatsApp />}
              sx={{
                fontWeight: 600,
                textTransform: "none",
                whiteSpace: "nowrap",
                borderRadius: "8px",
                px: 2,
              }}
            >
              WhatsApp
            </Button>
            <Button
              size="small"
              variant="outlined"
              onClick={() => window.open(referralLink, "_blank")}
              sx={{
                color: "#9E1B47",
                borderColor: "#cbd5e1",
                fontWeight: 600,
                textTransform: "none",
                whiteSpace: "nowrap",
                borderRadius: "8px",
                px: 2,
                "&:hover": { borderColor: "#9E1B47" },
              }}
            >
              Add User
            </Button>
          </Box>
        </Box>
      </Card>

      {/* Subheading */}
      <Typography
        variant="h5"
        sx={{
          fontWeight: 600,
          mb: 3,
          display: 'flex',
          alignItems: 'center',
          gap: 1.5,
          textAlign:  'center' 
        }}
      >
        <Send fontSize="large" /> Refer / Invite
      </Typography>

      <Divider sx={{ mb: 4 }} />

      {entries.map((entry, index) => (
        <React.Fragment key={index}>
            <Grid item xs={12} sm={3} mb={2}>
              <TextField
               sx={{width:'80%'}}
                label="Full Name"
                variant="outlined"
                value={entry.name}
                onChange={(e) => handleInputChange(index, 'name', e.target.value)}
              />
            </Grid>
             <Grid item xs={12} sm={3} mb={2}>
              <TextField
               sx={{width:'80%'}}
                fullWidth
                label="Email ID"
                variant="outlined"
                placeholder="example@domain.com"
                value={entry.email}
                onChange={(e) => handleInputChange(index, 'email', e.target.value)}
              />
            </Grid>
          <Grid container spacing={2} sx={{ mb: 3 }}>
            
            
            <Grid item xs={12} sm={2}>
              <TextField
                fullWidth
                label="Mobile No"
                variant="outlined"
                placeholder="9876543210"
                value={entry.mobile}
                onChange={(e) => handleInputChange(index, 'mobile', e.target.value)}
              />
            </Grid>

            
            <Grid item xs={12} sm={1} sx={{ display: 'flex', justifyContent: 'center' }}>
              <IconButton
                onClick={() => handleDeleteEntry(index)}
                disabled={entries.length <= 1}
                size='large'
                sx={{
                  '&:hover': {
                    background:'transparent',
                    color: 'red'
                  }
                }}
              >
                <Delete fontSize="small" />
              </IconButton>
            </Grid>
          </Grid>
          
          {index < entries.length - 1 && <Divider sx={{ my: 2 }} />}
        </React.Fragment>
      ))}

      <Box sx={{ display: 'flex',
         justifyContent: 'flex-start',
          mt: 3, gap:1.5 }}>
        <Button
          variant="outlined"
          startIcon={<Add />}
          onClick={handleAddEntry}
           sx={{
            p:{xs:'10px', md:'10px'},
            textTransform:'capitalize',
                  '&:hover': {
                    background: 'transparent'
                }
              }}
        >
          Add Contact
        </Button>
        
        <Button
          variant="contained"
          endIcon={<Send />}
          onClick={handleSubmit}
          sx={{ px: 4, textTransform:'capitalize', 
             p:{xs:'10px', md:' 10px 15px'},
          }}
        >
          Submit
        </Button>
      </Box>
    </Box>
  );
};

export default ReferInvitePage;