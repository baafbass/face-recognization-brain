import './App.css';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import {Component} from 'react'
// import Clarifai from 'clarifai';

// const app = new Clarifai.App({
//   apiKey: '8dfcb2c0b2ed47af8542e12cd016ea1c'
// });

class  App extends Component{

constructor(){
  super();
  this.state = {
    input : '',
  }
}

onInputChange = (event) =>
{
  console.log(event.target.value);
}

onButtonSubmit = () => {
  console.log('click')
  // app.models.predict('6dc7e46bc9124c5c8824be4822abe105','https://upload.wikimedia.org/wikipedia/commons/thumb/c/c8/Lionel_Messi_WC2022.jpg/250px-Lionel_Messi_WC2022.jpg').then(
  // function(response)
  //   {
  //   console.log(response);
  //   },
  //   function(err)
  //   {

  //   }
  //   );
}

  render(){
      return (
    <div className="App">
    <Navigation />
    <Logo/>
    <Rank/>
    <ImageLinkForm onInputChange = {this.onInputChange} onButtonSubmit = {this.onButtonSubmit}/>
    {/*
    
   <FaceRecognition/>*/} 
    </div>
  );
}

  }


export default App;
