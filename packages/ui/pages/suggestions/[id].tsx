import { gql, useQuery } from '@apollo/client';
import { Loading } from '@nextui-org/react';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';

import { NexusGenFieldTypes } from '../../graphql/generated/nexus-typegen';

interface SuggestionData {
  suggestion: NexusGenFieldTypes['Suggestion'];
}

const SuggestionQuery = gql`
  query GetSuggestion($suggestionId: String!) {
    suggestion(id: $suggestionId) {
      id
      name
      pluginTarget
    }
  }
`;

interface SuggestionPageProps {
  id: string;
}

const Suggestion: NextPage = () => {
  const router = useRouter();
  let { id } = router.query;

  if (!id) {
    id = '';
  } else if (Array.isArray(id)) {
    id = id.join();
  }

  const { data, loading, error } = useQuery<
    SuggestionData,
    { suggestionId: string }
  >(SuggestionQuery, { variables: { suggestionId: id } });

  if (!id) return <h1>Error: no id passed via query...</h1>;

  if (loading) return <Loading />;
  if (error) return <p>Oh no... {error.message}</p>;
  if (!data) return <p>Oh no... could not load report</p>;

  return <h1>Suggestion Landing Page: {data.suggestion.id}</h1>;
};

export default Suggestion;
