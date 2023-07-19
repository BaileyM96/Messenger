import './App.css';
import LoginPage from './pages/LoginPage';
import { setContext } from '@apollo/client/link/context';
import { 
  ApolloClient, 
  InMemoryCache, 
  ApolloProvider,
  createHttpLink
} from '@apollo/client';

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

//Keep following the apollo website to create http linking/Love.Dev repo.
const client = new ApolloClient({
  link: authLink.concat(httplink),
  cache: new InMemoryCache()
});

function App() {
  return (
    <ApolloProvider client={client}>
    <div className="App">
      <header className="App-header">
        <LoginPage />
      </header>
    </div>
    </ApolloProvider>
  );
}

export default App;
