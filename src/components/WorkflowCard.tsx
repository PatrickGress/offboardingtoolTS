import React from 'react';
import { Card, CardContent, Avatar, Typography, Box, Grid, Chip } from '@mui/material';

export type SubflowStatus =
  | { type: 'not started' }
  | { type: 'ongoing'; step: number; total: number }
  | { type: 'done' };

export type Subflow = {
  name: string;
  status: SubflowStatus;
};

export type WorkflowData = {
  id: string;
  name: string;
  dueDate: string;
  picture: string;
  subflows: Subflow[];
};

export function WorkflowCard({ data, onNameClick }: { data: WorkflowData; onNameClick: () => void }) {
  return (
    <Card sx={{ display: 'flex', alignItems: 'center', p: 2 }}>
      <Avatar src={data.picture} sx={{ width: 56, height: 56, mr: 2 }} />
      <CardContent sx={{ flex: 1 }}>
        <Typography variant="h6" color="primary" sx={{ cursor: 'pointer' }} onClick={onNameClick}>
          {data.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">Due: {data.dueDate}</Typography>
        <Box sx={{ mt: 1 }}>
          <Grid container spacing={1}>
            {data.subflows.map((sf, idx) => (
              <Grid item key={idx}>
                <Chip
                  label={
                    sf.status.type === 'ongoing'
                      ? `${sf.name}: ${sf.status.step}/${sf.status.total}`
                      : `${sf.name}: ${sf.status.type === 'done' ? '✔️' : '⏳'}`
                  }
                  color={
                    sf.status.type === 'done'
                      ? 'success'
                      : sf.status.type === 'ongoing'
                      ? 'info'
                      : 'default'
                  }
                  variant={sf.status.type === 'not started' ? 'outlined' : 'filled'}
                />
              </Grid>
            ))}
          </Grid>
        </Box>
      </CardContent>
    </Card>
  );
}
