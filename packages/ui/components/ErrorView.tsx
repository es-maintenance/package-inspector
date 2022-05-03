import * as React from 'react';

import { Layout } from './';
import styles from './ErrorView.module.css';

interface ErrorViewProps {
  title: string;
  message: string;
}

export const ErrorView: React.FC<ErrorViewProps> = ({ title, message }) => {
  return (
    <Layout title={title}>
      <div className={styles.errorContainer}>{message}</div>
    </Layout>
  );
};
