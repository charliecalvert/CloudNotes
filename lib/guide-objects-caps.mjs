/* const guidesNoQuotes = [
    androidGuide, artGuide, cloudGuide,
    csharpGuide, cssGuide, databaseGuide,
    designGuide, expressionsGuide, firebaseGuide,
    gitGuide, htmlGuide, javaGuide,
    javascriptGuide, jqueryGuide, mobileGuide,
    osGuide, phpGuide, pythonGuide,
    serverGuide, slashGuide, testsGuide,
    webGuide
]; */

const guides = [
    "androidGuide", "artGuide", "cloudGuide",
    "csharpGuide", "cssGuide", "databaseGuide",
    "designGuide", "expressionsGuide", "firebaseGuide",
    "gitGuide", "htmlGuide", "javaGuide",
    "javascriptGuide", "jqueryGuide", "mobileGuide",
    "osGuide", "phpGuide", "pythonGuide",
    "serverGuide", "slashGuide", "testsGuide",
    "webGuide"
];

/**
 * 
 * regex:
 *     \'([^']*)': '([^']*)',\g
 *     \    $1: {\n category: '',\n type: '$2',\n path: ''\n    },\g
 * 
 * @typedef {Object} FileInfo
 * @property {string} relativePath
 * @property {string} directory
 * @property {string} fullPath
 * @property {string} fileName
 * @property {string} category
 * @property {string} type
 * @property {string} path
 * @property {string} title
 * @property {string} directoryName
 * @property {string} category
 * @property {string} frontMatter
 * @property {string} content
 * @property {string} contentWithFrontMatter
 */ 
const guidePairs = {
    androidGuide: {
        category: 'android-guide',
        type: 'Android',
        path: '/home/ubuntu/Git/CloudNotes/elvenware/development/android'
    },
    artGuide: {
        category: 'art-guide',
        type: 'Art',
        path: ''
    },
    cloudGuide: {
        category: 'cloud-guide',
        type: 'Cloud',
        path: '/home/ubuntu/Git/CloudNotes/elvenware/development/cloud'
    },
    csharpGuide: {
        category: 'csharp-guide',
        type: 'C#',
        path: '/home/ubuntu/Git/CloudNotes/elvenware/development/csharp'
    },
    cssGuide: {
        category: 'css-guide',
        type: 'CSS',
        path: '/home/ubuntu/Git/CloudNotes/elvenware/development/web/CssGuide'
    },
    databaseGuide: {
        category: 'database-guide',
        type: 'Database',
        path: '/home/ubuntu/Git/CloudNotes/elvenware/development/database'
    },
    designGuide: {
        category: '',
        type: 'Design',
        path: ''
    },
    expressionsGuide: {
        category: '',
        type: 'Expressions',
        path: ''
    },
    firebaseGuide: {
        category: '',
        type: 'Firebase',
        path: ''
    },
    gitGuide: {
        category: '',
        type: 'Git',
        path: ''
    },
    htmlGuide: {
        category: '',
        type: 'HTML',
        path: ''
    },
    javaGuide: {
        category: '',
        type: 'Java',
        path: ''
    },
    javascriptGuide: {
        category: '',
        type: 'JavaScript',
        path: ''
    },
    jqueryGuide: {
        category: '',
        type: 'jQuery',
        path: ''
    },
    mobileGuide: {
        category: '',
        type: 'Mobile',
        path: ''
    },
    osGuide: {
        category: '',
        type: 'OS',
        path: ''
    },
    phpGuide: {
        category: '',
        type: 'PHP',
        path: ''
    },
    pythonGuide: {
        category: '',
        type: 'Python',
        path: ''
    },
    serverGuide: {
        category: '',
        type: 'Server',
        path: ''
    },
    slashGuide: {
        category: '',
        type: 'Slash',
        path: ''
    },
    testsGuide: {
        category: '',
        type: 'Tests',
        path: ''
    },
};

const guidePairsOriginal = {
    'androidGuide': 'Android',
    'artGuide': 'Art',
    'cloudGuide': 'Cloud',
    'csharpGuide': 'C#',
    cssGuide: {type:'CSS', path:'/home/ubuntu/Git/CloudNotes/elvenware/development/web/CssGuide'},
    'databaseGuide': 'Database',
    'designGuide': 'Design',
    'expressionsGuide': 'Expressions',
    'firebaseGuide': 'Firebase',
    'gitGuide': 'Git',
    'htmlGuide': 'HTML',
    'javaGuide': 'Java',
    'javascriptGuide': 'JavaScript',
    'jqueryGuide': 'jQuery',
    'mobileGuide': 'Mobile',
    'osGuide': 'OS',
    'phpGuide': 'PHP',
    'pythonGuide': 'Python',
    'serverGuide': 'Server',
    'slashGuide': 'Slash',
    'testsGuide': 'Tests',
};

const guidePairsArrays = [
    ['androidGuide', 'Android'],
    ['artGuide', 'Art'],
    ['cloudGuide', 'Cloud'],
    ['csharpGuide', 'C#'],
    ['cssGuide', '/home/ubuntu/Git/CloudNotes/elvenware/development/web/CssGuide'],
    ['databaseGuide', 'Database'],
    ['designGuide', 'Design'],
    ['expressionsGuide', 'Expressions'],
    ['firebaseGuide', 'Firebase'],
    ['gitGuide', 'Git'],
    ['htmlGuide', 'HTML'],
    ['javaGuide', 'Java'],
    ['javascriptGuide', 'JavaScript'],
    ['jqueryGuide', 'jQuery'],
    ['mobileGuide', 'Mobile'],
    ['osGuide', 'OS'],
    ['phpGuide', 'PHP'],
    ['pythonGuide', 'Python'],
    ['serverGuide', 'Server'],
    ['slashGuide', 'Slash'],
    ['testsGuide', 'Tests'],
    ['webGuide', 'Web']
];

export { guides, guidePairs, guidePairsArrays };
