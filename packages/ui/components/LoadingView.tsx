import { Loading } from '@nextui-org/react';
import * as React from 'react';

import styles from '../styles/LoadingView.module.css';

export const LoadingView: React.FC = () => {
  return (
    <div className={styles.loadingContainer}>
      <Loading />
    </div>
  );
};
