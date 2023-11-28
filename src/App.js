import React from 'react'
import { Container } from 'react-bootstrap'

import Routes from './config/routes'
import Header from './components/Header'
import Footer from './components/Footer'
import Chatbot from './components/ChatBot'
import MainFooter from './components/MainFooter'
import SocketContainer from './SocketContainer'
import SnackbarProvider from 'react-simple-snackbar'
function App() {
  return (
    <SnackbarProvider>
      <SocketContainer>
        <div className="App">
          <Header />
          <main className="py-3">
            <Container>
              <Routes />
            </Container>
          </main>
          <Chatbot />
          <Footer />
          <MainFooter />
        </div>
      </SocketContainer>
    </SnackbarProvider>
  );
}

export default App;
