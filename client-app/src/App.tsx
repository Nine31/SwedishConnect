import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios';
import { Header, List } from 'semantic-ui-react';

function App() {
  const [vijesti, setVijesti] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/vijesti')
      .then(response => {
        setVijesti(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the data', error);
      });
  }, []);

  return (
    <div>
      <Header as='h2' icon='connectdevelop' content='Swedish Connect' />
      <List>
        {vijesti.map((vijest: any) => (
          <List.Item key={vijest.id}>
            {vijest.title}
          </List.Item>
        ))}
      </List>
    </div>
  );
};

export default App
