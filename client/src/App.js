import './App.css';
import LoginPage from './pages/LoginPage';
import { 
  ApolloClient, 
  InMemoryCache, 
  ApolloProvider
} from '@apollo/client';

//Keep following the apollo website to create http linking/Love.Dev repo.
const client = new ApolloClient({
  uri: 'http//:localhost:3001/graphql',
  cache: new InMemoryCache()
})

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
