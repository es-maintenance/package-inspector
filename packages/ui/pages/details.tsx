import type { NextPage } from 'next';
import Link from 'next/link';
import { Grid, Link as LinkUI, Loading } from '@nextui-org/react';
import { gql, useQuery } from '@apollo/client';
import { ResponsiveTreeMap } from '@nivo/treemap';

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
        }
      }
    }
  }
`;

type NivoGraphNode = {
  name: string;
  size?: number;
  children: NivoGraphNode[];
};

const Report: NextPage = () => {
  const { data, loading, error } = useQuery<ReportData>(ReportQuery);

  if (loading) return <Loading />;
  if (error) return <p>Oh no... {error.message}</p>;
  if (!data) return <p>Oh no... could not load data from query.</p>;

  const topLevelDepMap: { [name: string]: NivoGraphNode } = {};

  // FIXME: https://github.com/es-maintenance/package-inspector/issues/31
  // [...(data?.report?.dependencies || [])].forEach((dependency) => {
  //   if (!dependency.name) return;

  //   const topLevelDepName = dependency.breadcrumb.split('#')[0];

  //   if (!topLevelDepMap[topLevelDepName]) {
  //     topLevelDepMap[topLevelDepName] = {
  //       name: topLevelDepName,
  //       children: [],
  //     };
  //   }

  //   topLevelDepMap[topLevelDepName].children.push({
  //     name: dependency.name,
  //     size: dependency.size,
  //     children: [],
  //   });
  // });

  const nivoData = {
    name: 'dependencies',
    children: Object.keys(topLevelDepMap).map((topLevelDepName) => {
      return topLevelDepMap[topLevelDepName];
    }),
  };

  return (
    <>
      <h1>Report: {data.report.root.name}</h1>
      <h2>
        <Link href="/" passHref={true}>
          <LinkUI>Back to home</LinkUI>
        </Link>
      </h2>

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

      <table className={styles.packageTable}>
        <thead>
          <tr>
            <th>NAME</th>
            <th>VERSION</th>
            <th>TYPE</th>
          </tr>
        </thead>
        <tbody>
          {data.report.root.dependencies.map(
            (dep) =>
              dep &&
              dep.name && (
                <tr className={styles.packageTableRow} key={dep.name}>
                  <td>
                    <Link
                      href={`packages/${encodeURIComponent(dep.name)}`}
                      passHref={true}
                    >
                      <LinkUI>{dep.name}</LinkUI>
                    </Link>
                  </td>
                  <td>{dep.version}</td>
                  <td>{dep.type}</td>
                </tr>
              )
          )}
        </tbody>
      </table>
    </>
  );
};

export default Report;
