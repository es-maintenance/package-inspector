import { Loading } from '@nextui-org/react';
import * as React from 'react';

import styles from '../styles/ErrorView.module.css';
import { Layout } from './';

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
