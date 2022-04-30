import { NextPage } from 'next';
import { useRouter } from 'next/router';

import { Layout } from '../../components/Layout';

const Package: NextPage = () => {
  const router = useRouter();
  const { name } = router.query;

  return (
    // FIXME: this should work
    <Layout title={''}>
      <h1>Package: {name}</h1>
    </Layout>
  );
};

export default Package;
