import { observer } from 'mobx-react-lite';
import { Container } from 'semantic-ui-react';
import NavBar from './NavBar';
import { Outlet } from 'react-router-dom';

function App() {

  return (
    <>
      <NavBar />
      <Container className='vijest' style={{marginTop: '7em'}}>
        <Outlet />
      </Container>
    </>
  );
}

export default observer(App);
