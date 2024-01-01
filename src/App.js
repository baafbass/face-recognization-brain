import './App.css';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
// import Particles from 'react-particles';
// import Particles from "react-tsparticles";

// const particlesOptions = {
//                 particles: {
//                  Number: {
//                   value: 30,
//                   density: {
//                     enable:true,
//                     value_area: 800
//                   }
//                  }
//                 }
//               }


function App() {
  return (
    <div className="App">
    {/*<Particles className='particles'
              params={particlesOptions}
            />*/}

{/* hhh<Particles id="tsparticles" url="http://foo.bar/particles.json"/>*/}

    <Navigation />
    <Logo/>
    <Rank/>
    <ImageLinkForm/>
    {/*
    
   <FaceRecognition/>*/} 
    </div>
  );
}

export default App;
