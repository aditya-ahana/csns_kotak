import { Box, Modal } from '@mui/material';
import Lottie from 'lottie-react';
import LoadingAnimation from '../Dynamic/ktk_phaser_blue.json';
import React from 'react';

export default function Loader(props) {
  return (
    <Modal 
     open
     slotProps={{ 
      backdrop : {
        sx : {
           backgroundColor : "transparent",
        }
      }
     }}
     data-testid="loader-modal"
    >
      <Box sx={{  display:"flex",
           backgroundColor :"rgba(248, 248, 253, 0.4)",
           flex : 1,
           height:"100vh",
          alignItems: "center",
          justifyContent : "center" }}>
      <Lottie 
       animationData={LoadingAnimation}
       autoPlay
       className='loader-modal'
       style={{ height : '27rem',display : "flex",alignSelf : "center",justifyContent : "center",backgroundColor : 'transparent',marginBottom : "3.6rem",}}
       open
       loop
      //  style={}     
      />
      </Box>
    </Modal>
  )
};
