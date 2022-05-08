import * as React from 'react';

import styles from './ErrorView.module.css';

interface ErrorViewProps {
  message: string;
}

export const ErrorView: React.FC<ErrorViewProps> = ({ message }) => {
  return <div className={styles.errorContainer}>{message}</div>;
};
