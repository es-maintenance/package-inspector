import type { BrowserPlugin, Suggestion } from '@package-inspector/core';
import { Card, Grid, Text } from '@nextui-org/react';

import React from 'react';

export class TestPlugin implements BrowserPlugin {
  name: string;
  version: string;
  pluginData: any;
  suggestions: Suggestion[];

  constructor() {
    this.name = 'Test Plugin';
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
      return <div style={{ border: '1px solid purple' }}>Plugin Page View</div>;
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
  get cardView(): React.FC<{ suggestions: Suggestion[] | any[] }> {
    return ({ suggestions }) => {
      console.log(suggestions);

      return (
        <div>
          {suggestions
            .filter((suggestion) => {
              return suggestion.id === 'packagesWithPinnedVersions';
            })
            .map((suggestion) => {
              return (
                <Card>
                  <Text h4>{suggestion.name}</Text>
                  <Text>{suggestion.message}</Text>
                  <Card.Footer>
                    {suggestion.actions.length} actions &nbsp;
                    <b>Rendered by plugin</b>
                  </Card.Footer>
                </Card>
              );
            })}
        </div>
      );
    };
  }
}
