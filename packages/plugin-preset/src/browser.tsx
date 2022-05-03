import type { BrowserPlugin, Suggestion } from '@package-inspector/core';

// FIXME: we should not be shipping this end stage
import type { NexusGenFieldTypes } from '@package-inspector/ui/graphql/generated/nexus-typegen';

import React from 'react';

// FIXME: should expose this nicer
import { CardView } from '@package-inspector/ui/components/CardView';
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

  // // Renders as a full page experience
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

  // Renders the card view for a given suggestion
  // TODO: talk to lewis about how graphql types don't overlap with report types
  get cardView(): React.FC<{ suggestion: NexusGenFieldTypes['Suggestion'] }> {
    return ({ suggestion }) => {
      return <CardView suggestion={suggestion} />;
    };
  }
}

export default TestPlugin;
