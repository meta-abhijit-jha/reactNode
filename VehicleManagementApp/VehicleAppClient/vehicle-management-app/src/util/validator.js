module.exports = (checkFor, screen) => {
    let warningObject = {validCount: 0}

    for (let [key, value] of Object.entries(checkFor)) {

        if (screen == 'addMaker') {
             if(key == 'manufacturer') {
                 warningObject.manufacturer = basicChecks(value)
                 if(warningObject.manufacturer == 'valid') {
                     warningObject.validCount++
                 }
             }

             if(key == 'country') {
                warningObject.country = basicChecks(value)
                if(warningObject.country == 'valid') {
                    warningObject.validCount++
                }
             }
        }
    }

    return warningObject

}

function basicChecks(checkItem) {

    if (!checkItem) {
        return 'invalid! empty data'
    }
    else if ((/^\s*$/.test(checkItem))) {
        return 'invalid! empty data'
    }
    else if (checkItem.charCodeAt(0) == 32) {
        return 'invalid! Please remove whitespaces from beginning'
    }

    return 'valid'
}