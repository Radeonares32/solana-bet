import React from 'react';
import Navbar from './components/Navbar/Navbar'
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';

import { Sidebar } from './components/Sidebar/Sidebar'
import { Slider } from './components/Carousel/Slider'
import { Chat } from './components/Chat/Chat'

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

function App() {
  return (
    <div>
      <Navbar ></Navbar> 
      <Box  sx={{
          display: 'flex',
          justifyContent: 'space-around',
          p: 1,
          mt: 17,
          bgcolor: '#0b141e'
        }}>
          
        <Item sx={{backgroundColor:'#0b141e', mr:'14rem'}} ><Slider></Slider></Item>
        
      </Box>
      
      <Sidebar></Sidebar>
      <Chat/>
    </div>
  );
}

export default App;
