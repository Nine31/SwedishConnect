import { observer } from 'mobx-react-lite';
import { Container } from 'semantic-ui-react';
import NavBar from './NavBar';
import { Outlet, useLocation } from 'react-router-dom';
import { useStore } from '../stores/store';
import { useEffect } from 'react';
import LoadingComponent from './LoadingComponent';
import ModalContainer from '../common/modals/ModalContainer';
import HomePage from '../../features/home/HomePage';
import { ToastContainer } from 'react-toastify';

function App() {
  const location = useLocation();
  const { commonStore, userStore} = useStore();

  useEffect(() => {
    if (commonStore.token) {
      userStore.getUser().finally(() => commonStore.setAppLoaded())
    } else {
      commonStore.setAppLoaded()
    }
  }, [commonStore, userStore])

  if (!commonStore.appLoaded) return <LoadingComponent content='Učitavanje...' />

  return (
    <>
        <ToastContainer position='bottom-right' hideProgressBar theme='colored' />
        <ModalContainer />
        {location.pathname === '/' ? <HomePage /> : (
          <>
            <NavBar />
            <Container className='vijest' style={{marginTop: '7em'}}>
              <Outlet />
            </Container>
          </>
        )}
    </>
  );
}

export default observer(App);
