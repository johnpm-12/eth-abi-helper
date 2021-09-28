import { Switch, Route, Redirect } from 'react-router-dom';
import styled from 'styled-components';

import HeaderLink from './components/HeaderLink';
import FragmentSignature from './pages/FragmentSignature';
import TransactionDataParser from './pages/TransactionDataParser';
import ErrorDataParser from './pages/ErrorDataParser';
import EventLogDataParser from './pages/EventLogDataParser';
import UnitConverter from './pages/UnitConverter';

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  margin: 40px;
`;

const Container = styled.div`
  width: 1024px;
  display: flex;
  flex-direction: column;
`;

const routes = [
  {
    path: '/fragment-signature',
    name: 'Fragment Signature',
    component: <FragmentSignature />,
  },
  {
    path: '/transaction-data-parser',
    name: 'Transaction Data Parser',
    component: <TransactionDataParser />,
  },
  {
    path: '/error-data-parser',
    name: 'Error Data Parser',
    component: <ErrorDataParser />,
  },
  {
    path: '/event-log-data-parser',
    name: 'Event Log Data Parser',
    component: <EventLogDataParser />,
  },
  {
    path: '/unit-converter',
    name: 'Unit Converter',
    component: <UnitConverter />,
  },
];

export default function App() {
  return (
    <Wrapper>
      <Container className='nes-container is-dark with-title'>
        <p className='title'>Miscellaneous Eth ABI tools</p>
        {routes.map((route, idx) => (
          <HeaderLink key={idx} to={route.path}>
            {route.name}
          </HeaderLink>
        ))}
        <div className='nes-container is-dark is-rounded'>
          <Switch>
            {routes.map((route, idx) => (
              <Route key={idx} exact path={route.path}>
                {route.component}
              </Route>
            ))}
            <Route path='/'>
              <Redirect to={routes[0].path} />
            </Route>
          </Switch>
        </div>
      </Container>
    </Wrapper>
  );
}
