import createDebugMessages from 'debug';
const debugCall = createDebugMessages('lib:find-guide-pair:call');

/**
 * @param {object} guidePairs
 * @returns {object} guidePair
 * @returns {null} null
 * @example
 * const guidePair = findGuidePair(directory, guidePairs);
 * if (!guidePair) {
 *    continue;
 * } else {
 *   directorIncludes +=
 *      util.format(`fileInfo.directory.includes(guidePair.%s.path) ||\n`, guidePair.type);
 *  const directoryPair = {
 *     name: directory,
 *    path: directory
 * };
 * directoryPairs.push(directoryPair);
 * }
 * return { directoryPairs, directorIncludes };
 * }
 */
export function findGuidePair(directory, guidePairs) {
    debugCall('findGuidePair called', directory, guidePairs);
    let guidePair = {};

    for (const key in guidePairs) {
        if (directory === guidePairs[key].path) {
            guidePair = guidePairs[key];
            return guidePair;
        }
    }

    return null;
}
