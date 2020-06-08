import React from 'react'

const ValidateIt = (Screen) => {
    class Validator extends React.Component {

        constructor(props) {
            super(props)
            this.check = this.check.bind(this)
            this.basicChecks = this.basicChecks.bind(this)
            this.checkBoxChecks = this.checkBoxChecks.bind(this)
            this.dateChecker = this.dateChecker.bind(this)
            this.vinchecker = this.vinchecker.bind(this)
        }

        check(checkFor, page, value) {
            if (page == 'addMaker') {
                if ((checkFor == 'manufacturer') || (checkFor == 'country')) {
                    return this.basicChecks(value)
                }
            }

            if (page == 'addModel') {
                if (checkFor == 'model') {
                    return this.basicChecks(value)
                }
                if (checkFor == 'variant') {
                    return this.checkBoxChecks(value)
                }
            }

            if(page == 'addData') {
                if (checkFor == 'VIN') {
                    return this.vinchecker(value)
                }
                if (checkFor == 'owner') {
                    return this.basicChecks(value)
                }
                if (checkFor == 'purchased') {
                    return this.dateChecker(value)
                }
                if (checkFor == 'repaired') {
                    return this.dateChecker(value)
                }
            }
            return
        }

        basicChecks(checkItem) {

            if (!checkItem) {
                return 'invalid! empty data'
            } else if ((/^\s*$/.test(checkItem))) {
                return 'invalid! empty data'
            } else if (checkItem.charCodeAt(0) == 32) {
                return 'invalid! Please remove whitespaces from beginning'
            }

            return ''
        }

        vinchecker(checkItem) {
            if(!(/^[A-Z]{2}([ \-])[0-9]{2}[ ,][A-Z0-9]{1,2}[A-Z]\1[0-9]{4}$/.test(checkItem))) {
                return 'invalid! Please correct input'
            }
            return ''
        }

        dateChecker(checkItem) {
            if(!(/^(?:(?:(?:(?:(?:[1-9]\d)(?:0[48]|[2468][048]|[13579][26])|(?:(?:[2468][048]|[13579][26])00))(\/|-|\.)(?:0?2\1(?:29)))|(?:(?:[1-9]\d{3})(\/|-|\.)(?:(?:(?:0?[13578]|1[02])\2(?:31))|(?:(?:0?[13-9]|1[0-2])\2(?:29|30))|(?:(?:0?[1-9])|(?:1[0-2]))\2(?:0?[1-9]|1\d|2[0-8])))))$/.test(checkItem))) {
                return 'invalid! Please input correct date in YYYY-MM-DD format'
            }
            return ''
        }

        checkBoxChecks(checkItem) {
            if (!checkItem) {
                this.setState({ shouldProgress: false })
                return 'invalid! Please select atleast one'
            }

            return ''
        }

        render() {

            return (
                <div>
                    <Screen {...this.props} checkValid={this.check} />
                </div>
            )
        }
    }
    return Validator
}

export default ValidateIt