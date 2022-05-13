import type { BrowserPlugin, Suggestion } from '@package-inspector/core';

import React from 'react';
export class TestPlugin implements BrowserPlugin {
  name: string;
  version: string;
  pluginData: any;
  suggestions: Suggestion[];

  constructor() {
    this.name = '@package-inspector/plugin-preset';
    this.version = '0.0.1';

    this.suggestions = [];
    this.pluginData = {};
  }

  // View rendered as a block on the report page
  get reportView(): React.FC {
    return () => {
      return <div style={{ border: '1px solid purple' }}>Report View</div>;
    };
  }

  // Renders as a full page experience
  get pluginPageView(): React.FC {
    return () => {
      return (
        <div style={{ border: '1px solid purple' }}>
          Plugin Page View for Plugin Preset
        </div>
      );
    };
  }

  // Renders on the package page
  get packageView(): React.FC {
    return () => {
      return <div style={{ border: '1px solid purple' }}>Package View</div>;
    };
  }
}

export default TestPlugin;
