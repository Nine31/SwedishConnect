import { useEffect, useState } from 'react'
import axios from 'axios';
import { Container } from 'semantic-ui-react';
import { Vijest } from '../models/vijest';
import NavBar from './NavBar';
import VijestDashboard from '../../features/vijesti/dashboard/VijestDashboard';

function App() {
  const [vijesti, setVijesti] = useState<Vijest[]>([]);
  const [selectedVijest, setselectedVijest] = useState<Vijest | undefined>(undefined);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    axios.get<Vijest[]>('http://localhost:5000/api/vijesti')
      .then(response => {
        setVijesti(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the data', error);
      });
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
    if (vijest.slug) {
        setVijesti([...vijesti.filter(v => v.slug !== vijest.slug), vijest]);
    } else {
        try {
            const response = await axios.post<Vijest>('http://localhost:5000/api/vijesti', vijest);
            setVijesti([...vijesti, response.data]); // Backend generiše slug, frontend ga koristi
        } catch (error) {
            console.error("Greška prilikom kreiranja vijesti:", error);
        }
    }
    setEditMode(false);
    setselectedVijest(vijest);
  }

  function handleDeleteVijest(slug: string) {
    setVijesti([...vijesti.filter(v => v.slug !== slug)])
  }


  // function handleCreateOrEditVijest(vijest: Vijest) {
  //   vijest.slug
  //     ? setVijesti([...vijesti.filter(v => v.slug !== vijest.slug), vijest])
  //     : setVijesti([...vijesti, vijest]);
  //   setEditMode(false);
  //   setselectedVijest(vijest);
  // }

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
        />
      </Container>
    </>
  );
};

export default App
