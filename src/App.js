import React from 'react'
import { Container } from 'react-bootstrap'

import Routes from './config/routes'
import Header from './components/Header'
import Footer from './components/Footer'
import Chatbot from './components/ChatBot'

function App() {
  return (
    <div className="App">
      <Header />
      <main className="py-3">
        <Container>
          <Routes/>
        </Container>
      </main>
      <Chatbot />
      <Footer />
    </div>
  );
}

export default App;
