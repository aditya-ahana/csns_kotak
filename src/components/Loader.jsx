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
      <Box 
        className="loader-container"
      >
      <Lottie 
       animationData={LoadingAnimation}
       autoPlay
       className='loader-modal'
       open
       loop
      //  style={}     
      />
      </Box>
    </Modal>
  )
};
