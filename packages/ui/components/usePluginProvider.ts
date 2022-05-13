import React from 'react';

import { PluginProvider } from '../lib/PluginProvider';

export function usePluginProvider(): PluginProvider | undefined {
  const [pluginProvider, setPluginProvider] = React.useState<PluginProvider>();

  React.useEffect(() => setPluginProvider(new PluginProvider()), []);

  return pluginProvider;
}
