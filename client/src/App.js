import './App.css';
import LoginPage from './pages/LoginPage';
import Signup from './components/Signup';
import Homepage from './components/Homepage';
import Friends from './components/Friends';
import Addfriends from './components/Addfriends';
import Navbar from './components/Navbar';
import UserContext from './components/UserContext';
import { setContext } from '@apollo/client/link/context';
import { 
  ApolloClient, 
  InMemoryCache, 
  ApolloProvider,
  createHttpLink
} from '@apollo/client';

//Browser Router
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useState } from 'react';


const httplink = createHttpLink({
  uri: 'http://localhost:3001/graphql',
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  }
});


const client = new ApolloClient({
  link: authLink.concat(httplink),
  cache: new InMemoryCache()
});

//Use browserRouter to navigate between pages and components
function App() {
  const [userName, setUserName] = useState(null);
  console.log('userName in App component:', userName)
  return (
    <UserContext.Provider value={{ userName, setUserName }}>
    <ApolloProvider client={client}>
      <Router>
    <div className="App">
      <Routes>
        <Route 
        path='/'
        element={<LoginPage />}
        />

        <Route 
        path='/Signup'
        element={<Signup />}
        />

        <Route 
        path='/Homepage'
        element={<Homepage />}
        />

        <Route 
        path='/Friends'
        element={<Friends />}
        />

        <Route 
        path='/Addfriends'
        element={<Addfriends />}
        />
      </Routes>

      <Navbar />
    </div>
    </Router>
    </ApolloProvider>
    </UserContext.Provider>
  );
}

export default App;
