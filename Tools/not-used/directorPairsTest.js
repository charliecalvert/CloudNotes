import createDebugMessages from 'debug';
const debug = createDebugMessages('lib:directory-pairs-test');
const debugCall = createDebugMessages('lib:directory-pairs-test:call');

/**
 * This code is never used.
 */


/**
 * This is our redundant code we don't need it.
 * @see findGuidePair
 *
 * Test if the directory matches the guidePair path
 *
 * @param {object} fileInfo
 * @param {object} guidePair
 * @returns {boolean} isMatch
 */
function testMatch(fileInfo, guidePair) {
    debugCall(`Testing match: ${fileInfo.directory} against %s)`, guidePair.path); // JSON.stringify(guidePair));
    const isMatch = (fileInfo.directory === guidePair.path);
    return isMatch;
}

function testMatchB(fileInfo, guidePair) {
    debugCall(`Testing match: ${fileInfo.directory} against %s)`, JSON.stringify(guidePair));
    const isMatch = (
        fileInfo.directory.includes(guidePair.Comments.path) ||
        fileInfo.directory.includes(guidePair.Prog280.path) ||
        fileInfo.directory.includes(guidePair.Tips.path) ||
        fileInfo.directory.includes(guidePair.Isit320.path) ||
        fileInfo.directory.includes(guidePair.Prog109.path) ||
        fileInfo.directory.includes(guidePair.RootHome.path) ||
        fileInfo.directory.includes(guidePair.Assignments.path) ||
        fileInfo.directory.includes(guidePair.Assignments.path) ||
        fileInfo.directory.includes(guidePair.Assignments.path) ||
        fileInfo.directory.includes(guidePair.Assignments.path) ||
        fileInfo.directory.includes(guidePair.Assignments.path) ||
        fileInfo.directory.includes(guidePair.Assignments.path) ||
        fileInfo.directory.includes(guidePair.Assignments.path) ||
        fileInfo.directory.includes(guidePair.Assignments.path) ||
        fileInfo.directory.includes(guidePair.Assignments.path) ||
        fileInfo.directory.includes(guidePair.Assignments.path) ||
        fileInfo.directory.includes(guidePair.Assignments.path) ||
        fileInfo.directory.includes(guidePair.Assignments.path) ||
        fileInfo.directory.includes(guidePair.Assignments.path) ||
        fileInfo.directory.includes(guidePair.Assignments.path) ||
        fileInfo.directory.includes(guidePair.Assignments.path) ||
        fileInfo.directory.includes(guidePair.Assignments.path) ||
        fileInfo.directory.includes(guidePair.Assignments.path) ||
        fileInfo.directory.includes(guidePair.Assignments.path) ||
        fileInfo.directory.includes(guidePair.Assignments.path) ||
        fileInfo.directory.includes(guidePair.Assignments.path) ||
        fileInfo.directory.includes(guidePair.Assignments.path) ||
        fileInfo.directory.includes(guidePair.Prog270.path) ||
        fileInfo.directory.includes(guidePair.Prog272.path) ||
        fileInfo.directory.includes(guidePair.Prog282.path) ||
        fileInfo.directory.includes(guidePair.Esig.path) ||
        fileInfo.directory.includes(guidePair.elvenware.path) ||
        fileInfo.directory.includes(guidePair.elvenware.path) ||
        fileInfo.directory.includes(guidePair.Computers.path) ||
        fileInfo.directory.includes(guidePair.elvenware.path) ||
        fileInfo.directory.includes(guidePair.elvenware.path) ||
        fileInfo.directory.includes(guidePair.elvenware.path) ||
        fileInfo.directory.includes(guidePair.elvenware.path) ||
        fileInfo.directory.includes(guidePair.books.path) ||
        fileInfo.directory.includes(guidePair.books.path) ||
        fileInfo.directory.includes(guidePair.books.path) ||
        fileInfo.directory.includes(guidePair.Art.path) ||
        fileInfo.directory.includes(guidePair.Art.path) ||
        fileInfo.directory.includes(guidePair.Art.path) ||
        fileInfo.directory.includes(guidePair.Art.path) ||
        fileInfo.directory.includes(guidePair.Art.path) ||
        fileInfo.directory.includes(guidePair['2003_11_CraterLake'].path) ||
        fileInfo.directory.includes(guidePair['2011_06_Kawaii'].path) ||
        fileInfo.directory.includes(guidePair.Art.path) ||
        fileInfo.directory.includes(guidePair.Art.path) ||
        fileInfo.directory.includes(guidePair.Art.path) ||
        fileInfo.directory.includes(guidePair.Art.path) ||
        fileInfo.directory.includes(guidePair.elvenware.path) ||
        fileInfo.directory.includes(guidePair.development.path) ||
        fileInfo.directory.includes(guidePair.database.path) ||
        fileInfo.directory.includes(guidePair.database.path) ||
        fileInfo.directory.includes(guidePair.database.path) ||
        fileInfo.directory.includes(guidePair.data.path) ||
        fileInfo.directory.includes(guidePair.data.path) ||
        fileInfo.directory.includes(guidePair.database.path) ||
        fileInfo.directory.includes(guidePair.development.path) ||
        fileInfo.directory.includes(guidePair.development.path) ||
        fileInfo.directory.includes(guidePair.development.path) ||
        fileInfo.directory.includes(guidePair.development.path) ||
        fileInfo.directory.includes(guidePair.CssGuide.path) ||
        fileInfo.directory.includes(guidePair.CssGuide.path) ||
        fileInfo.directory.includes(guidePair.development.path) ||
        fileInfo.directory.includes(guidePair.development.path) ||
        fileInfo.directory.includes(guidePair.development.path) ||
        fileInfo.directory.includes(guidePair.development.path) ||
        fileInfo.directory.includes(guidePair.development.path) ||
        fileInfo.directory.includes(guidePair.development.path) ||
        fileInfo.directory.includes(guidePair.development.path) ||
        fileInfo.directory.includes(guidePair.csharp.path) ||
        fileInfo.directory.includes(guidePair.csharp.path) ||
        fileInfo.directory.includes(guidePair.development.path) ||
        fileInfo.directory.includes(guidePair.development.path) ||
        fileInfo.directory.includes(guidePair.android.path) ||
        fileInfo.directory.includes(guidePair.design.path) ||
        fileInfo.directory.includes(guidePair.design.path) ||
        fileInfo.directory.includes(guidePair.cloud.path) ||
        fileInfo.directory.includes(guidePair.Prog219.path) ||
        fileInfo.directory.includes(guidePair.Library.path) ||
        fileInfo.directory.includes(guidePair.Library.path) ||
        fileInfo.directory.includes(guidePair.Library.path) ||
        fileInfo.directory.includes(guidePair.Library.path) ||
        fileInfo.directory.includes(guidePair.font.path) ||
        fileInfo.directory.includes(guidePair.css.path) ||
        fileInfo.directory.includes(guidePair.css.path) ||
        fileInfo.directory.includes(guidePair.css.path) ||
        fileInfo.directory.includes(guidePair.css.path) ||
        fileInfo.directory.includes(guidePair.css.path) ||
        fileInfo.directory.includes(guidePair.Library.path) ||
        fileInfo.directory.includes(guidePair.Library.path) ||
        fileInfo.directory.includes(guidePair.Library.path) ||
        fileInfo.directory.includes(guidePair.highlight.path) ||
        fileInfo.directory.includes(guidePair.Library.path) ||
        fileInfo.directory.includes(guidePair.Library.path) ||
        fileInfo.directory.includes(guidePair.Library.path) ||
        fileInfo.directory.includes(guidePair.Library.path) ||
        fileInfo.directory.includes(guidePair.Library.path) ||
        fileInfo.directory.includes(guidePair.Library.path) ||
        fileInfo.directory.includes(guidePair.leap.path) ||
        fileInfo.directory.includes(guidePair.Library.path) ||
        fileInfo.directory.includes(guidePair.Library.path) ||
        fileInfo.directory.includes(guidePair.js.path) ||
        fileInfo.directory.includes(guidePair.Isit322.path) ||
        fileInfo.directory.includes(guidePair.back.path) ||
        fileInfo.directory.includes(guidePair.Images.path)
    );
    return isMatch;
}

 export { testMatch, testMatchB };
