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
        background: 'linear-gradient(135deg, #1a4f72 0%, #2196f3 100%)',
        '&:hover': {
          background: 'linear-gradient(135deg, #0f3047 0%, #1a4f72 100%)',
          boxShadow: '0 6px 20px rgba(26, 79, 114, 0.45)',
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