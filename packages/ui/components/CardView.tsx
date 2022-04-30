import * as React from 'react';

import { Card, Grid, Text } from '@nextui-org/react';
import Link from 'next/link';

export const CardView: React.FC<{ suggestion: any }> = ({ suggestion }) => {
  return (
    <Grid sm={12} md={3} key={suggestion.id}>
      <Card>
        <Link href={`/suggestions/${suggestion.id}`}>{suggestion.name}</Link>
        <Text>{suggestion.message}</Text>
        <Card.Footer>{suggestion.actions.length} actions</Card.Footer>
      </Card>
    </Grid>
  );
};
