import type { NextPage } from 'next';
import Link from 'next/link';
import { Grid, Link as LinkUI } from '@nextui-org/react';
import { gql, useQuery } from '@apollo/client';
import { ResponsiveTreeMap } from '@nivo/treemap';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import { LoadingView, Layout } from '../components';

import { NexusGenFieldTypes } from '../graphql/generated/nexus-typegen';

import styles from '../styles/Report.module.css';

interface ReportData {
  report: Pick<NexusGenFieldTypes['Report'], 'summary'> & {
    root: NexusGenFieldTypes['Package'];
  };
}

const ReportQuery = gql`
  query {
    report {
      summary
      root {
        name
        version
        dependencies {
          id
          name
          version
          type
          metadata {
            size {
              files
              physical
            }
          }
        }
      }
    }
  }
`;

const Report: NextPage = () => {
  const { data, loading, error } = useQuery<ReportData>(ReportQuery);

  if (loading) return <LoadingView />;
  if (error) return <p>Oh no... {error.message}</p>;
  if (!data) return <p>Oh no... could not load data from query.</p>;

  const nivoData = {
    name: 'dependencies',
    children: [...(data?.report?.root?.dependencies || [])].map(
      (dependency) => {
        if (!dependency) return {};

        return {
          name: dependency.name,
          // FIXME: what the heck is going on here
          size: (dependency as any).metadata?.size?.physical,
          children: [],
        };
      }
    ),
  };

  return (
    <Layout title={data.report.root.name}>
      <Grid.Container gap={2}>
        <Grid sm={12} md={12} style={{ height: '300px' }}>
          <ResponsiveTreeMap
            data={nivoData}
            onClick={(ev) => console.log(ev)}
            identity="name"
            value="size"
            valueFormat=">-.0s"
            margin={{ top: 10, right: 10, bottom: 10, left: 10 }}
            label="name"
            labelSkipSize={12}
            labelTextColor={{
              from: 'color',
              modifiers: [['darker', 1.2]],
            }}
            parentLabelPosition="left"
            parentLabelTextColor={{
              from: 'color',
              modifiers: [['darker', 2]],
            }}
            borderColor={{
              from: 'color',
              modifiers: [['darker', 0.1]],
            }}
          />
        </Grid>
      </Grid.Container>

      <h2>Dependencies:</h2>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>NAME</TableCell>
              <TableCell>VERSION</TableCell>
              <TableCell>TYPE</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.report.root.dependencies.map(
              (dep) =>
                dep &&
                dep.name && (
                  <TableRow
                    key={dep.name}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="td">
                      <Link
                        href={`packages/${encodeURIComponent(dep.name)}`}
                        passHref={true}
                      >
                        <LinkUI>{dep.name}</LinkUI>
                      </Link>
                    </TableCell>
                    <TableCell component="td">{dep.version}</TableCell>
                    <TableCell component="td">{dep.type}</TableCell>
                  </TableRow>
                )
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Layout>
  );
};

export default Report;
