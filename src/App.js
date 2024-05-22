import React from 'react';
import Header from './components/Header';
import UserManagement from './components/UserManagement';
import Footer from './components/Footer';

function App() {
  return (
    <div className="body">
      <header>
        <Header />
      </header>
      <main>
        <UserManagement />
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}

export default App;
