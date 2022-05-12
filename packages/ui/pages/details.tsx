import { gql } from '@apollo/client';
import {
  Container,
  Link,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { ResponsiveTreeMap } from '@nivo/treemap';
import type { NextPage } from 'next';
import NextLink from 'next/link';

import { LoadingView } from '../components';
import { useDetailsReportQuery } from '../graphql/generated';

gql`
  query DetailsReport {
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
  const { data, loading, error } = useDetailsReportQuery();

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

  const nivoContainerStyles = { height: '300px' };

  return (
    <>
      <h1> Details </h1>

      <h2>Dependency Map:</h2>

      <Container
        disableGutters={true}
        maxWidth={false}
        style={nivoContainerStyles}
      >
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
      </Container>

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
                      <NextLink
                        href={`packages/${encodeURIComponent(dep.name)}`}
                        passHref={true}
                      >
                        <Link>{dep.name}</Link>
                      </NextLink>
                    </TableCell>
                    <TableCell component="td">{dep.version}</TableCell>
                    <TableCell component="td">{dep.type}</TableCell>
                  </TableRow>
                )
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default Report;
