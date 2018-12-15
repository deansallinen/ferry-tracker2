import React from 'react';
import { StaticQuery, graphql, Link } from 'gatsby';
import {
  Ancestor, Parent, Child, Columns, Column, Container, H1, Section,
} from './helpers';

export default () => {
  const favourites = (typeof localStorage !== 'undefined') ? JSON.parse(localStorage.getItem('favourites')) || [] : [];

  return (<StaticQuery
    query={graphql`
      query Menu {
        allSitePage {
          edges {
            node {
              path
              context {
                routeId
                routeName
              }
            }
          }
        }
      }
    `}
    render={data => (
      <Section>
        <Container>
          <H1>All Routes</H1>
          <Columns>
            <Ancestor>
              <Column>
                {data.allSitePage.edges
                  .filter(each => /^\/route/.test(each.node.path))
                  .map(each => (
                    <Parent>
                      <Link to={each.node.path} key={each.node.context.routeId}>
                        <Child className="box">
                          <h5 className="title is-5">

                            {each.node.context.routeName}
                          </h5>
                        </Child>
                      </Link>
                    </Parent>
                  ))}
              </Column>
            </Ancestor>
          </Columns>
        </Container>
      </Section>
    )}
  />
  );
};
