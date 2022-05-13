import { gql } from '@apollo/client';
import { Container, Link } from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { ResponsiveTreeMap } from '@nivo/treemap';
import type { NextPage } from 'next';
import NextLink from 'next/link';

import { LoadingView } from '../components';
import { useDetailsReportQuery } from '../graphql/generated/client';

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
          size: dependency?.metadata?.size?.physical,
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

      <div style={{ height: 500, width: '100%' }}>
        <div style={{ display: 'flex', height: '100%' }}>
          <div style={{ flexGrow: 1 }}>
            <DataGrid
              columns={[
                {
                  field: 'name',
                  flex: 1,
                  renderCell(params) {
                    return (
                      <NextLink
                        href={`packages/${encodeURIComponent(params.value)}`}
                        passHref={true}
                      >
                        <Link>{params.value}</Link>
                      </NextLink>
                    );
                  },
                },
                { field: 'version', flex: 1 },
                { field: 'type', flex: 1 },
                { field: 'size', flex: 1 },
              ]}
              rows={data.report.root.dependencies.map((dep) => {
                return {
                  id: dep?.id,
                  name: dep?.name,
                  version: dep?.version,
                  type: dep?.type,
                  size: dep?.metadata?.size?.physical || 0,
                };
              })}
              components={{ Toolbar: GridToolbar }}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Report;
