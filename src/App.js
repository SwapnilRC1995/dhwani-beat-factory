import marble from '../src/image/marble-background.jpg'
import Header from './components/Header';
import Generator  from './components/Generator'
import Footer from './components/Footer';

function App() {
  return (
    <div className="App">    
        <img src={marble} alt="Backdrop" className="backdrop-image"/>     
         <Header/>
         <Generator/>
         <Footer/>
    </div>
  );
}

export default App;
