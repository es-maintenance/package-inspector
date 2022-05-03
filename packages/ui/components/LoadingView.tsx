import { CircularProgress } from '@mui/material';
import * as React from 'react';

import styles from './LoadingView.module.css';

export const LoadingView: React.FC = () => {
  return (
    <div className={styles.loadingContainer}>
      <CircularProgress disableShrink={true} />
    </div>
  );
};
