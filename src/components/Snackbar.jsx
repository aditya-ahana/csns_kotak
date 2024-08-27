import React, { useEffect, useState } from 'react'
import Snackbar from '@mui/material/Snackbar';
import { Box, SnackbarContent, Typography } from '@mui/material';
import { customCollapse, customFade, customGrow, customSlide, customZoom } from './MaterialAnimations';

export default function MaterialToast(props) {

  return (
    <Snackbar
    anchorOrigin={{ vertical : "bottom" , horizontal : "center" }}
    open={true}
    sx={{ zIndex : 1 }}
    autoHideDuration={props.duration}
    TransitionComponent={customSlide}
    transitionDuration={400}
    message={props.message}
    ContentProps={{
      sx : {
        backgroundColor : props.backgroundColor,
        color : props.color,
        fontWeight : props.fontWeight,
        borderRadius : "12px",
        borderWidth : "1.5px",
        borderStyle : "solid",
        borderColor : "white",
        width : "20rem",
        animation : "alternate-reverse"
      },
    }}
  />
  )
};


