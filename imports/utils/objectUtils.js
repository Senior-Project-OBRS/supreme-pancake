const isObjectEmpty = (obj) => Object.keys(obj).length === 0;
const isObjectNotEmpty = (obj) => Object.keys(obj).length !== 0;

module.exports = {
    isObjectEmpty,
    isObjectNotEmpty
};