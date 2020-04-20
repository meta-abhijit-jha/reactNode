import React from 'react';
class Button extends React.Component {

    constructor(props) {
        super(props);
    }


    render() {
        return (
            <button onClick={this.props.property}>{this.props.type}</button>
        );
    }

}


export default Button;