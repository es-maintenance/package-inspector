import { NextPage } from 'next';
import { useRouter } from 'next/router';

import { ErrorView } from '../../components';
import { usePluginProvider } from '../../hooks';

const Package: NextPage = () => {
  const pluginProvider = usePluginProvider();
  const router = useRouter();

  let { name } = router.query;

  if (!name) {
    name = '';
  } else if (Array.isArray(name)) {
    name = name.join();
  }

  const PluginPageView = pluginProvider?.pluginPageView(name);

  if (!PluginPageView) {
    return <ErrorView message="Plugin does not have a page view" />;
  }

  // FIXME: Talk to Lewis about how to get data into the plugin page view
  // it should be able make a graphql call
  return (
    <>
      <h1>Plugin</h1>
      <PluginPageView />
    </>
  );
};

export default Package;
