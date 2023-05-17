import createDebugMessages from 'debug';
const debug = createDebugMessages('elf-sorting');

function sortIt(obj) {
    const keys = Object.keys(obj);
    keys.sort();
    debug('Keys:', keys);
    const sorted = {};
    keys.map((key) => {
        sorted[key] = obj[key];
        return sorted;
    });
    debug('Sorted:', sorted);
    return sorted;
}

export default sortIt;
