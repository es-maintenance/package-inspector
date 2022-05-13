import { type BrowserPlugin, type Suggestion } from '@package-inspector/core';
// FIXME: This should be automatically generated at build time based on input commands such as what plugins we are requiring
// we don't want to import anything here
import { default as TestPlugin } from '@package-inspector/plugin-preset/browser';

export class PluginProvider {
  plugins: BrowserPlugin[] = [];

  constructor() {
    this.plugins = [new (TestPlugin as any)()];
  }

  // Finds all the plugins that expose their own report pages
  hasReportView(): string[] {
    const pluginsWithReportPages: string[] = this.plugins
      .filter((plugin) => {
        return plugin.reportView;
      })
      .map((plugin) => {
        return plugin.name;
      });

    return pluginsWithReportPages;
  }

  pluginPageView(pluginName: string): React.FC | undefined {
    const found = this.plugins.find((plugin) => {
      return plugin.name === pluginName;
    });

    if (found && found.pluginPageView) return found.pluginPageView;

    return;
  }

  cardView(
    pluginName: string
  ): React.FC<{ suggestion: Suggestion | any }> | undefined {
    const found = this.plugins.find((plugin) => {
      return plugin.name === pluginName;
    });

    if (found && found.cardView) return found.cardView;

    return;
  }
}
