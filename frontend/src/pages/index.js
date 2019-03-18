import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { Link, graphql } from 'gatsby';
import { startOfDay } from 'date-fns';
import Layout from '../components/layout';
import SEO from '../components/seo';

const GET_ALL_SAILINGS = gql`
  query getOneRoute($route_id: uuid, $today: timestamptz) {
    route(where: { id: { _eq: $route_id } }) {
      id
      route_name
      car_waits
      oversize_waits
      sailingsByrouteId(
        where: { scheduled_departure: { _gt: $today } }
        order_by: { scheduled_departure: asc }
      ) {
        id
        scheduled_departure
        actual_departure
        eta
        sailing_status
        percent_full
        vessel
      }
    }
  }
`;

const Favourites = ({ edges, favourites }) =>
  <div className="mb-12">
    <h2 className="text-white text-lg font-semibold antialiased">
      Favourites
    </h2>
    {edges
      .filter(each => /^\/route/.test(each.node.path))
      .filter(each => favourites.includes(each.node.context.route_name))
      .map(({ node }) => (
        <Route {...node} key={node.context.id} />
      ))}
  </div>

const Route = ({ path, context }) => {
  const { route_name, id } = context;
  const [departureTerminal, arrivalTerminal] = route_name.split(' to ');
  return (
    <Query
      query={GET_ALL_SAILINGS}
      pollInterval={60000}
      variables={{
        route_id: id,
        today: startOfDay(new Date()),
      }}
    >
      {({ loading, error, data }) => {
        return <div
          className="my-4 bg-white rounded-lg px-4 py-4 shadow border-b-4 border-blue-light"
          key={id}
        >
          <Link
            to={path}
            key={id}
            className="no-underline hover:underline text-grey-darkest text-xl"
          >
            <div className="font-bold pb-1">{departureTerminal}</div>
            <div className="text-grey-dark text-lg">to {arrivalTerminal}</div>
          </Link>
        </div>
      }}
    </Query>
  );
};

function IndexPage({ data: { allSitePage } }) {
    const favourites =
    typeof localStorage !== 'undefined'
      ? JSON.parse(localStorage.getItem('favourites')) || []
      : [];

  
  return (
    <Layout>
      <SEO
        title="Home"
        keywords={[`gatsby`, `tailwind`, `react`, `tailwindcss`]}
      />

      <div className="">
      
        {favourites.length > 0 && <Favourites {...allSitePage} favourites={favourites} />}
        <h2 className="text-white text-lg font-semibold antialiased">
          All routes
        </h2>
        
        {allSitePage.edges.map(({ node }) =>  <Route {...node} key={node.context.id} /> )}

      </div>
    </Layout>
  );
}

export const query = graphql`
  query Home {
    allSitePage(
      filter: { path: { regex: "/^/route/" } }
      sort: { fields: path, order: ASC }
    ) {
      edges {
        node {
          path
          context {
            id
            route_name
            average_sailing
          }
        }
      }
    }
  }
`;

export default IndexPage;
