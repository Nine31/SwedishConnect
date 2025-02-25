import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { Container } from 'semantic-ui-react';
import NavBar from './NavBar';
import VijestDashboard from '../../features/vijesti/dashboard/VijestDashboard';
import LoadingComponent from './LoadingComponent';
import { useStore } from '../stores/store';
import ParticlesBackground from '../../components/ParticlesBackground';

function App() {
  const {vijestStore} = useStore();

  useEffect(() => {
    vijestStore.loadVijesti();
  }, [vijestStore])

  if (vijestStore.loadingInitial) return <LoadingComponent content='Učitavanje vijesti...' />

  return (
    <>
      <ParticlesBackground />
      <NavBar />
      <Container className='vijest' style={{marginTop: '7em'}}>
        <VijestDashboard />
      </Container>
    </>
  );
}

export default observer(App);
