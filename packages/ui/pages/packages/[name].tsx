import { NextPage } from 'next';
import { useRouter } from 'next/router';

const Package: NextPage = () => {
  const router = useRouter();
  const { name } = router.query;

  return <h1>Package: {name}</h1>;
};

export default Package;
