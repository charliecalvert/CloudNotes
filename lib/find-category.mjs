import { guidePairs } from './guide-objects-caps.mjs';

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

function findCategory(fileInfo) {
    switch (fileInfo.directory) {
        case guidePairs.cloudGuide.path:
            fileInfo.category = guidePairs.cloudGuide.category;
            break;
        case guidePairs.cssGuide.path:
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