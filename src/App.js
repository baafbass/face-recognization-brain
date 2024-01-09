import './App.css';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Rank from './components/Rank/Rank';
import {Component} from 'react'

const returnsetupClarifaiRequestOptions = (imageURL) =>{
    // Your PAT (Personal Access Token) can be found in the portal under Authentification
    const PAT = 'f2e9e5cd97cf46edabb328d372ecabcd';
    // Specify the correct user_id/app_id pairings
    // Since you're making inferences outside your app's scope
    const USER_ID = 'baafbass';       
    const APP_ID = 'smartbrain';
    // Change these to whatever model and image URL you want to use
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
  }
}

onInputChange = (event) =>
{
  this.setState({input:event.target.value});
}

onButtonSubmit = () => {
  this.setState({imageURL: this.state.input})

fetch("https://api.clarifai.com/v2/models/" 
  + 'face-detection' + "/outputs", 
  returnsetupClarifaiRequestOptions("https://avatars.githubusercontent.com/u/98693906?v=4"))
  .then(response => response.json())
  .then(result => console.log(result.outputs[0].data.regions[0].region_info.bounding_box))
}

  render(){
      return (
    <div className="App">
    <Navigation />
    <Logo/>
    <Rank/>
    <ImageLinkForm onInputChange = {this.onInputChange} onButtonSubmit = {this.onButtonSubmit}/>
    <FaceRecognition imageURL={this.state.imageURL}/> 
    </div>
  );
}

  }
export default App;
