import * as React from 'react';

import styles from './ErrorView.module.css';

interface ErrorViewProps {
  title: string;
  message: string;
}

export const ErrorView: React.FC<ErrorViewProps> = ({ title, message }) => {
  return <div className={styles.errorContainer}>{message}</div>;
};
