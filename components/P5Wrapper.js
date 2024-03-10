import { useEffect, useRef } from "react";
import p5 from "p5";
import { Box } from '@mui/material';

export const P5Wrapper = ({ sketch }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const p5Instance = new p5(sketch, canvasRef.current);
    return () => {
      p5Instance.remove();
    };
  }, [sketch]);

  return (
    <Box ref={canvasRef} />
  );
};

