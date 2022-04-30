import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { gql, useQuery } from '@apollo/client';

import { PluginProvider } from '../../lib/PluginProvider';

import { Layout, LoadingView } from '../../components';

import { NexusGenFieldTypes } from '../../graphql/generated/nexus-typegen';

interface ReportData {
  report: Pick<NexusGenFieldTypes['Report'], 'summary'> & {
    root: NexusGenFieldTypes['Package'];
  };
}

const ReportQuery = gql`
  query {
    report {
      root {
        name
      }
    }
  }
`;

const Package: NextPage = () => {
  const pluginProvider = new PluginProvider();

  const router = useRouter();
  let { name } = router.query;

  if (!name) {
    name = '';
  } else if (Array.isArray(name)) {
    name = name.join();
  }

  const {
    data: reportData,
    loading: loadingReport,
    error: reportError,
  } = useQuery<ReportData>(ReportQuery);

  if (loadingReport) return <LoadingView />;
  if (reportError) return <p>Oh no... {reportError.message}</p>;
  if (!reportData) return <p>Oh no... could not load Report</p>;

  const PluginPageView = pluginProvider.pluginPageView(name);

  // FIXME: make an error page
  if (!PluginPageView) {
    return <div>Plugin does not have a page view</div>;
  }

  // FIXME: Talk to Lewis about how to get data into the plugin page view
  // it should be able make a graphql call
  return (
    <Layout title={reportData.report.root.name}>
      <h1>Plugin</h1>
      <PluginPageView />
    </Layout>
  );
};

export default Package;