import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  Divider,
  Grid,
  Typography,
} from '@mui/material';
import Link from 'next/link';
import { useRouter } from 'next/router';
import * as React from 'react';

import type { CardViewSuggestionsFragment } from '../';

export const CardView: React.FC<{
  suggestion: CardViewSuggestionsFragment;
}> = ({ suggestion }) => {
  const router = useRouter();

  return (
    <Grid item sm={12} md={4} key={suggestion.id}>
      <Card
        variant="outlined"
        style={{ position: 'relative', height: 300, maxHeight: 300 }}
      >
        <CardActionArea
          style={{ position: 'relative', height: 300, maxHeight: 300 }}
          onClick={() => router.push(`/suggestions/${suggestion.id}`)}
        >
          <CardContent style={{ position: 'absolute', top: 0 }}>
            <Link href={`/suggestions/${suggestion.id}`}>
              {suggestion.name}
            </Link>
            <Typography>{suggestion.message}</Typography>
          </CardContent>
          <CardActions
            style={{
              bottom: 0,
              position: 'absolute',
              width: '100%',
              display: 'block',
            }}
          >
            <Divider variant="fullWidth" />
            <Typography>{suggestion.count.toLocaleString()} actions</Typography>
          </CardActions>
        </CardActionArea>
      </Card>
    </Grid>
  );
};
