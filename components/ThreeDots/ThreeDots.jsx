import React from 'react';
import styles from './ThreeDots.module.css';
import { useTheme } from '@mui/material';

export const ThreeDots = (props) => {
  const { color } = props;
  const theme = useTheme();

  return (
    <div
      className={
        color === theme.palette.white.main
          ? styles['spinner-white']
          : styles['spinner-black']
      }
    >
      <div style={{ color }} className={styles.bounce1}></div>
      <div style={{ color }} className={styles.bounce2}></div>
      <div style={{ color }} className={styles.bounce3}></div>
    </div>
  );
};
