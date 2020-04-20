import React from 'react';
class InputField extends React.Component {

    constructor(props) {
        super(props);
        this.state = {childInfo : ""};
        this.sendDataToParent = this.sendDataToParent.bind(this);
    }

    sendDataToParent(e) {
        e.preventDefault();
        this.setState(
            {childInfo : this.props.type}
        );
        this.props.inputData(this.state.childInfo, e.target.value);
    }

    render() {
        if (this.props.type != "age") {
            return (
                <div>
                    <p>Enter your {this.props.type}</p>
                    <input type="text" value={this.props.data} onChange={this.sendDataToParent}></input>
                </div>
            )
        } else {
            return (
                <div>
                    <p>Enter your {this.props.type}</p>
                    <input type="number" value={this.props.data} onChange={this.sendDataToParent}></input>
                </div>
            )
        }

    }

}

export default InputField;