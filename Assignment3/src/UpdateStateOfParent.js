import React from 'react';
class UpdateStateOfParent extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
        <div>
            <button id="bu" onClick={this.props.updateStateprop}>Click me please!!</button>
        </div> 
        )

    }

}

export default UpdateStateOfParent;