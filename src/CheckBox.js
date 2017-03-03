import React from 'react';
import {FaCheck} from 'react-icons/lib/fa';
import './CheckBox.css';

class CheckBox extends React.Component {
   constructor() {
      super();
      this.state = {
         checked: false
      }
   }

   componentWillMount() {
      if (this.props.checked) {
         this.setState({checked: true});
      }
   }

   update() {
      let newValue = !this.state.checked;
      this.setState({checked: newValue});
      this.props.update(newValue);
   }

   render() {
      let className = (this.state.checked ? 'CheckBox-checked' : 'CheckBox-unchecked');
      return <span onClick={this.update.bind(this)} className="CheckBox">
         <FaCheck className={className}/>
      </span>
   }
}

export default CheckBox;