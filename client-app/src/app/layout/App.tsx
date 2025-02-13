import { useEffect, useState } from 'react'
import { Container } from 'semantic-ui-react';
import { Vijest } from '../models/vijest';
import NavBar from './NavBar';
import VijestDashboard from '../../features/vijesti/dashboard/VijestDashboard';
import agent from '../api/agent';
import LoadingComponent from './LoadingComponent';

function App() {
  const [vijesti, setVijesti] = useState<Vijest[]>([]);
  const [selectedVijest, setselectedVijest] = useState<Vijest | undefined>(undefined);
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    agent.Vijesti.list().then(response => {
      let vijesti: Vijest[] = [];
      response.forEach(vijest => {
        vijest.publishedDate = vijest.publishedDate.split('T')[0];
        vijesti.push(vijest);
      })
      setVijesti(vijesti);
      setLoading(false);
    })
  }, []);

  function handleSelectVijest(slug: string) {
    setselectedVijest(vijesti.find(v => v.slug === slug));
  }

  function handleCancelSelectVijest() {
    setselectedVijest(undefined);
  }

  function handleFormOpen(slug: string = '') {
    slug ? handleSelectVijest(slug) : handleCancelSelectVijest();
    setEditMode(true);
  }

  function handleFormClose() {
    setEditMode(false);
  }

  async function handleCreateOrEditVijest(vijest: Vijest) {
    setSubmitting(true);
  
    if (vijest.slug) {
      agent.Vijesti.update(vijest).then(() => {
        setVijesti([...vijesti.filter(v => v.slug !== vijest.slug), vijest]);
        setselectedVijest(vijest);
        setEditMode(false);
        setSubmitting(false);
      });
    } else {
        try {
          const { id, ...vijestWithoutId } = vijest;
    
          const response = await agent.Vijesti.create(vijestWithoutId);
    
          if (response.data) {
            const newVijest: Vijest = response.data;
    
            setVijesti([...vijesti, newVijest]);
            setselectedVijest(newVijest);
          }
    
        } catch (error) {
          console.error("Greška pri kreiranju vijesti:", error);
        }
        setEditMode(false);
        setSubmitting(false);
    }
  }

  function handleDeleteVijest(slug: string) {
    setSubmitting(true);
    agent.Vijesti.delete(slug).then(() => {
      setVijesti([...vijesti.filter(v => v.slug !== slug)]);
      setSubmitting(false);
    })
  }

  if (loading) return <LoadingComponent content='Učitavanje vijesti...' />

  return (
    <>
      <NavBar openForm={handleFormOpen}/>
      <Container>
        <VijestDashboard 
          vijesti={vijesti}
          selectedVijest={selectedVijest}
          selectVijest={handleSelectVijest}
          cancelSelectVijest={handleCancelSelectVijest}
          editMode={editMode}
          openForm={handleFormOpen}
          closeForm={handleFormClose}
          createOrEdit={handleCreateOrEditVijest}
          deleteVijest={handleDeleteVijest}
          submitting={submitting}
        />
      </Container>
    </>
  );
};

export default App
