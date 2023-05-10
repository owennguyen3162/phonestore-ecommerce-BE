const mongooseToObject = (object) => {
    return object ? object.toObject() : object
}

const multipleToObject = (array) => {
    return array.map((item) => item.toObject());
}

module.exports = {mongooseToObject,multipleToObject}