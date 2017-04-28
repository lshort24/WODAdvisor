import React from 'react';
import {Button} from 'react-bootstrap';

class CheckBoxButton extends React.Component {
    onChange() {
        let newValue = !this.props.checked;
        this.props.onChange(newValue);
    }
    
    render() {
        let className = (this.props.checked ? 'checkbox-button-checked' : 'checkbox-button-unchecked');
        return <Button type="button" onClick={this.onChange.bind(this)} className="checkbox-button">
            <span className={'glyphicon glyphicon-ok ' + className}/>
        </Button>
    }
}

export default CheckBoxButton;