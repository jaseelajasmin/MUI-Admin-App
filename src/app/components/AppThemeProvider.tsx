import { createTheme, ThemeProvider } from '@mui/material';
import React from 'react'

export default function AppThemeProvider( {
  children,
}: Readonly<{
  children: React.ReactNode;
}>){

    const theme = createTheme({
  palette: {
    primary: {
      main: '#F4511E',
      light:'#FF7043'
    },
    secondary: {
      main: '#7cB342',
      dark:'#558B2F'
    },
  },
});


  return (
      <ThemeProvider theme={theme}>
   {children}
  </ThemeProvider>
  )
}