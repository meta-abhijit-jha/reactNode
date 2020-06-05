import React from 'react'

class Validator extends React.Component {

    constructor(props) {
        super(props)
        this.check = this.check.bind(this)
    }

    check(checkFor, type) {

        if (!checkFor) {
            return 'invalid! empty data'
            //this.props.func('invalid')
        }

        else if (type == 'textbox') {
            if ((/^\s*$/.test(checkFor))) {
                return 'invalid! empty data'
                //this.props.func('invalid')
            }
            if (checkFor.charCodeAt(0) == 32) {
                //this.props.func('invalid')
                return 'invalid! Please remove whitespaces from beginning'
            }
        }

        //else this.props.func('valid')
        return 'valid'
    }

    render() {
        const { checkFor, type } = this.props
        return (
            <div>
                <span><small>{this.check(checkFor, type)}</small></span>
            </div>
        )
    }
}

export default Validator;