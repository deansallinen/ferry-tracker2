import fetch from 'isomorphic-unfetch';
import Link from 'next/link';
import { request } from 'graphql-request';
import Header from '../components/header';

const URL = 'https://ferrytrackerserver.now.sh/graphql';
// const URL = 'http://localhost:4000/graphql';

const Index = props => (
  <div>
    <Header />
    <ul>
      {props.allRoutes.map(route => (
        <li key={route.id}>
          <Link
            prefetch
            as={`post?id=${route.routeName}`}
            href={{ pathname: '/post', query: { id: route.routeName } }}
          >
            <a>
              <h2>{route.routeName}</h2>
            </a>
          </Link>
        </li>
      ))}
    </ul>
  </div>
);

Index.getInitialProps = async function() {
  const query = `{
    allRoutes {
      id
      routeName
    }
  }`;
  const res = await request(URL, query);
  console.log(`All routes fetched. Count: ${res.allRoutes.length}`);
  return res;
};

export default Index;
