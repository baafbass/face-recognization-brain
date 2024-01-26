import './App.css';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import SignIn from './components/SignIn/SignIn';
import Register from './components/Register/Register';
import Rank from './components/Rank/Rank';
import {Component} from 'react'

const returnsetupClarifaiRequestOptions = (imageURL) =>{
    const PAT = 'f2e9e5cd97cf46edabb328d372ecabcd';
    const USER_ID = 'baafbass';       
    const APP_ID = 'smartbrain';
    const MODEL_ID = 'face-detection';    
    const IMAGE_URL = imageURL;

        const raw = JSON.stringify({
        "user_app_id": {
            "user_id": USER_ID,
            "app_id": APP_ID
        },
        "inputs": [
            {
                "data": {
                    "image": {
                        "url": IMAGE_URL
                    }
                }
            }
        ]
    });


         const requestOptions = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Authorization': 'Key ' + PAT
        },
        body: raw
    };

return requestOptions;
}

class App extends Component{

constructor(){
  super();
  this.state = {
    input : '',
    imageURL: '',
    box: {},
    route: 'SignIn',
    isSignedIn: false,
    user:{
        id: '',
        name: '',
        email: '',
        entries: 0,
        joined: ''
    }
  }
}

loadUser = (data) =>{
this.setState({user:{
  id: data.id,
  name: data.name,
  email: data.email,
  entries:data.entries,
  joined: data.joined
}})
}

calculateFaceLocation = (data) => {
  const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
  const image = document.getElementById('inputImage');
  const width = Number(image.width);
  const height = Number(image.height);

  return {
    leftCol: clarifaiFace.left_col*width,
    topRow: clarifaiFace.top_row*height,
    rightCol: width - (clarifaiFace.right_col*width),
    bottomRow: height - (clarifaiFace.bottom_row*height)
  }
} 

displayFaceBox = (box) =>{
 console.log(box);
 this.setState({box:box});
}


onInputChange = (event) =>
{
  this.setState({input:event.target.value});
}

onPictureSubmit = () => {
  this.setState({imageURL: this.state.input})


fetch("https://api.clarifai.com/v2/models/" 
  + 'face-detection' + "/outputs", 
  returnsetupClarifaiRequestOptions(this.state.input))
  .then(result => result.json())
  .then(response => {
    if(response)
    {
      fetch('http://localhost:3000/image',{
        method:'put',
        headers: {'Content-type':'application/json'},
        body: JSON.stringify({
          id:this.state.user.id
        })
      })
      .then(response => response.json())
      .then(count=>{
        this.setState(Object.assign(this.state.user,{entries:count}))
      })
    }
    this.displayFaceBox(this.calculateFaceLocation(response))})
  .catch(err => console.log(err))

}

onRouteChange = (route)=>{
  if(route === 'SignOut')
  {
    this.setState({isSignedIn: false});
  } else if(route === 'home')
  {
    this.setState({isSignedIn: true});
  }
  this.setState({route: route})
}

  render(){
  const {isSignedIn,box,imageURL,route} = this.state;


      return (
    <div className="App">
    <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange}/>

    { this.state.route === 'home' 
    ?     <div>
    <Logo/>
    <Rank name = {this.state.user.name} entries= {this.state.user.entries}/>
    <ImageLinkForm onInputChange = {this.onInputChange} onPictureSubmit = {this.onPictureSubmit}/>
    <FaceRecognition box={box} imageURL={imageURL}/> 
    </div>
    : (route === 'SignIn' ? <SignIn loadUser={this.loadUser} onRouteChange = {this.onRouteChange}/> : <Register loadUser={this.loadUser} onRouteChange = {this.onRouteChange}/>) 

  }
  </div>
  );
}

  }
export default App;
