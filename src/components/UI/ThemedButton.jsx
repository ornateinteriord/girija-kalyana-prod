import React from 'react'
import Button from '@mui/material/Button'

const ThemedButton = ({
  title,
  onClick,
  sx,
  style,
  ...rest
}) => {
  return (
    <Button
      onClick={onClick}
      sx={{
        color: '#fff',
        background: 'linear-gradient(135deg, #9E1B47 0%, #E91E63 100%)',
        '&:hover': {
          background: 'linear-gradient(135deg, #4A0E2E 0%, #9E1B47 100%)',
          boxShadow: '0 6px 20px rgba(158, 27, 71, 0.45)',
          transform: 'translateY(-2px)',
        },
        borderRadius: '8px',
        textTransform: 'capitalize',
        fontWeight: 700,
        transition: 'all 0.25s ease',
        ...sx,
      }}
      style={style}
      {...rest}
    >
      {title}
    </Button>
  )
}

export default ThemedButton