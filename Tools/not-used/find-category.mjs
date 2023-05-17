import { guidePairs } from '../insert-front-matter/guide-objects-caps.mjs';
import createDebugMessages from 'debug';
const debug = createDebugMessages('lib:find-category');
const debugFindCategory = createDebugMessages('lib:find-category:findCategory');

/**
 * This code is never used.
 */


/**
 * This code is never used.
 */
function findCategoryWithIf(fileInfo) {
    if (fileInfo.directory === guidePairs.cloudGuide.path) {
        fileInfo.category = guidePairs.cloudGuide.category;
    } else if (fileInfo.directory === guidePairs.cssGuide.path) {
        fileInfo.category = guidePairs.cssGuide.category;
    } else if (fileInfo.directory === guidePairs.databaseGuide.path) {
        fileInfo.category = guidePairs.databaseGuide.category;
    }
    return fileInfo;
}

/**
 * This code is never used.
 */
function findCategory(fileInfo) {
    debugFindCategory('FIND CATEGORY:', fileInfo.directory);
    switch (fileInfo.directory) {
    case guidePairs.cloudGuide.path:
        debug('Found cloud guide');
        fileInfo.category = guidePairs.cloudGuide.category;
        break;
    case guidePairs.cssGuide.path:
        debug('Found css guide');
        fileInfo.category = guidePairs.cssGuide.category;
        break;
    case guidePairs.databaseGuide.path:
        fileInfo.category = guidePairs.databaseGuide.category;
        break;
    default:
        break;
    }
    return fileInfo;
}

export { findCategory, findCategoryWithIf };
