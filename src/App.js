import React, {Component} from 'react';
import Recommendations from './Recommendations';

class App extends Component {
   render() {
      return (
         <div>
            <h1>WOD Advisor</h1>
            <Recommendations />
         </div>
      );
   }
}

export default App;
