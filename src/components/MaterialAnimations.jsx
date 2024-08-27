import Slide from '@mui/material/Slide';
import Grow from '@mui/material/Grow';
import Collapse from '@mui/material/Collapse';
import Fade from '@mui/material/Fade';
import Zoom from '@mui/material/Fade';

 export const customSlide = (props) => {
    return <Slide {...props} direction='down' />
  };

  export const customZoom = (props) => {
    return <Zoom {...props} />
  };

  export const customCollapse = (props) => {
    return <Collapse {...props} />
  };

  export const customFade = (props) => {
    return <Fade {...props} />
  };

  export const customGrow = (props) => {
    return <Grow {...props} />
  };