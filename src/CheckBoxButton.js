import React from 'react';
import {Button} from 'react-bootstrap';

class CheckBoxButton extends React.Component {
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
      let className = (this.state.checked ? 'CheckBoxButton-checked' : 'CheckBoxButton-unchecked');
      return <Button type="button" aria-label="Add to WOD" onClick={this.update.bind(this)} className="CheckBoxButton">
         <span className={'glyphicon glyphicon-ok ' + className} />
      </Button>
   }
}

export default CheckBoxButton;