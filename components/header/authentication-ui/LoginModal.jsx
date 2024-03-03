import { Box, Button, createTheme, FormControl, Grid, InputLabel, Modal, OutlinedInput, Stack, styled, ThemeProvider, Typography } from '@mui/material'
import { grey, red } from '@mui/material/colors';
import React, { useEffect } from 'react'
import { useContext } from 'react';
import { useState } from 'react';
import AuthContext from '../../../auth/AuthContext';
const style = {
    position: 'absolute',
    top: '40%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    borderRadius : "6px",
    boxShadow: 24,
    p: 4,
    zIndex : 5000,
  };

const HelperText = styled(`div`)({
  fontFamily : "arial",
  color : red[700],
  fontSize : "15px",
  textAlign : "center"
})

const LoginModal =({
    loginModalOpen,
    setLoginModalOpen
})=> {

  const [helperText, setHelperText]  = useState(null);
  const [username, setUsername]  = useState("");
  const [password, setPassword]  = useState("");

  const formTheme = createTheme({
    palette : {
      primary : {
        main : grey[700]
      }
    }
  })

  const {handleLoginThroughModal} = useContext(AuthContext);

  const handleLogin = (event)=> {
    event.preventDefault();
    console.log(username, password);
    handleLoginThroughModal(username, password, setUsername, setPassword, setHelperText, setLoginModalOpen);
  }

  useEffect(()=>{
    setHelperText(null);
  },[username, password])

  return (
    <Modal
    open={loginModalOpen}
    onClose={()=>setLoginModalOpen(false)}
    aria-labelledby="login-modal-title"
    aria-describedby="login-modal-description"
    sx={{
      "& button" : {
        textTransform : "none",
        width  : "100%",
      }
    }}
    >
    <Box sx={{
        ...style,
        width : {
            lg : "500px",
            sm : "500px",
            xs : "320px",
        },
        boxSizing : "border-box"
    }}>
        <Typography id="login-modal-title" variant="h6" component="h2" fontWeight="600">
            Login
        </Typography>
        <form onSubmit={(e)=>handleLogin(e)}>
          <Stack
            sx={{
              my : 2,
            }}
            direction = "column"
            spacing={3}
            pt ={1}
          >
            <ThemeProvider theme={formTheme}>

                <FormControl>
                <InputLabel htmlFor="login-username"
                  sx={{
                    bgcolor : "white",
                    px : "5px",
                  }}
                >Username</InputLabel>
                <OutlinedInput
                  value={username}
                  onChange={(e)=>setUsername(e.target.value)}
                  id="login-username"
                />
              </FormControl>

              <FormControl>
                <InputLabel htmlFor="login-password"
                  sx={{
                    bgcolor : "white",
                    px : "5px",
                  }}
                  
                >Password</InputLabel>
                <OutlinedInput
                  value={password}
                  onChange={(e)=>setPassword(e.target.value)}
                  id="login-password"
                  type='password'
                />
              </FormControl>
            </ThemeProvider>
            {helperText && <HelperText>{helperText}</HelperText>}
          </Stack>
          <Grid
            container
            spacing={2}
            pt={2}
          >
            <Grid item md={6} xs={12}>
            <Button variant='contained' size='large' color='primary' type='submit'
              onClick={handleLogin}
            >Login</Button>

            </Grid>
            <Grid item md={6} xs={12}>
            <Button variant='contained' size='large' color='error'
              onClick={()=>setLoginModalOpen(false)}
            >Cancel</Button>

            </Grid>
          </Grid>
        </form>
    </Box>
    </Modal>
  )
}

export default LoginModal