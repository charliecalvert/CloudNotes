const symLinkFiles = [
    "/home/ubuntu/Git/CloudNotes/Assignments/FirebaseStarter.md",
    "/home/ubuntu/Git/CloudNotes/Assignments/FirebaseData.md",
    "/home/ubuntu/Git/CloudNotes/Assignments/FirebaseFinalPrep.md",
    "/home/ubuntu/Git/CloudNotes/Assignments/FirebaseLogin.md",
    "/home/ubuntu/Git/CloudNotes/Assignments/ExpressRoutesSolar.md",
    "/home/ubuntu/Git/CloudNotes/Assignments/SinglePageExpress.md",
    "/home/ubuntu/Git/CloudNotes/Assignments/ExpressJQueryNumbers.md",
    "/home/ubuntu/Git/CloudNotes/Assignments/ExpressRoutesSolarTests.md",
    "/home/ubuntu/Git/CloudNotes/Assignments/MapExpress.md",
    "/home/ubuntu/Git/CloudNotes/Assignments/ExpressBasics.md",
    "/home/ubuntu/Git/CloudNotes/Assignments/ExpressSessionMaster.md",
    "/home/ubuntu/Git/CloudNotes/Assignments/MangoExpress.md",
    "/home/ubuntu/Git/CloudNotes/Assignments/ExpressMiddlewareBasics.md",
    "/home/ubuntu/Git/CloudNotes/Assignments/ExpressSessionBasics.md",
    "/home/ubuntu/Git/CloudNotes/Assignments/ExpressPagesAndMixins.md",
    "/home/ubuntu/Git/CloudNotes/Assignments/ExpressJQuery.md",
    "/home/ubuntu/Git/CloudNotes/Assignments/BashExpressScript.md",
    "/home/ubuntu/Git/CloudNotes/Assignments/ExpressRoutes.md",
    "/home/ubuntu/Git/CloudNotes/Assignments/NodeExpressMongo01.md",
    "/home/ubuntu/Git/CloudNotes/Assignments/ExpressMiddlewareUser.md",
    "/home/ubuntu/Git/CloudNotes/Assignments/ExpressSessionCouch.md",
    "/home/ubuntu/Git/CloudNotes/Assignments/ExpressRoutesSolarCleaner.md",
    "/home/ubuntu/Git/CloudNotes/Assignments/JasmineExpressMock.md",
    "/home/ubuntu/Git/CloudNotes/Assignments/ExpressRoutesSolarDeeper.md",
    "/home/ubuntu/Git/CloudNotes/Assignments/ExpressRoutesSolarRefactor.md",
    "/home/ubuntu/Git/CloudNotes/Assignments/CodeAcademy04.md",
    "/home/ubuntu/Git/CloudNotes/Assignments/CodeAcademy07.md",
    "/home/ubuntu/Git/CloudNotes/Assignments/CodeAcademyGit02.md",
    "/home/ubuntu/Git/CloudNotes/Assignments/CodeAcademy02.md",
    "/home/ubuntu/Git/CloudNotes/Assignments/CodeAcademy03.md",
    "/home/ubuntu/Git/CloudNotes/Assignments/CodeAcademyGit03.md",
    "/home/ubuntu/Git/CloudNotes/Assignments/CodeAcademyGit04.md",
    "/home/ubuntu/Git/CloudNotes/Assignments/CodeAcademyGit01.md",
    "/home/ubuntu/Git/CloudNotes/Assignments/CodeAcademy05.md",
    "/home/ubuntu/Git/CloudNotes/Assignments/CodeAcademy06.md",
    "/home/ubuntu/Git/CloudNotes/Assignments/CodeAcademy01.md",
    "/home/ubuntu/Git/CloudNotes/Assignments/HerokuStarter.md",
    "/home/ubuntu/Git/CloudNotes/Assignments/HerokuReactStarter.md",
    "/home/ubuntu/Git/CloudNotes/Assignments/GruntSmokeTest01.md",
    "/home/ubuntu/Git/CloudNotes/Assignments/GruntSmokeTest03.md",
    "/home/ubuntu/Git/CloudNotes/Assignments/GruntSmokeTest02.md",
    "/home/ubuntu/Git/CloudNotes/Assignments/GitHubApi.md",
    "/home/ubuntu/Git/CloudNotes/Assignments/GitDualRepos.md",
    "/home/ubuntu/Git/CloudNotes/Assignments/GitBranchProject.md",
    "/home/ubuntu/Git/CloudNotes/Assignments/NewGitBucket.md",
    "/home/ubuntu/Git/CloudNotes/Assignments/GitBranchBasics.md",
    "/home/ubuntu/Git/CloudNotes/Assignments/GitBranchWeeks.md",
    "/home/ubuntu/Git/CloudNotes/Assignments/LinuxServerBasics.md",
    "/home/ubuntu/Git/CloudNotes/Assignments/MongoMark.md",
    "/home/ubuntu/Git/CloudNotes/Assignments/AngularMongoDbTest.md",
    "/home/ubuntu/Git/CloudNotes/Assignments/AngularMongooseRefine.md",
    "/home/ubuntu/Git/CloudNotes/Assignments/MongooseBasics.md",
    "/home/ubuntu/Git/CloudNotes/Assignments/AngularMongoDbCrud.md",
    "/home/ubuntu/Git/CloudNotes/Assignments/MongooseComments.md",
    "/home/ubuntu/Git/CloudNotes/Assignments/ServerSaveMongo.md",
    "/home/ubuntu/Git/CloudNotes/Assignments/AngularMongooseOnePage.md",
    "/home/ubuntu/Git/CloudNotes/Assignments/MongoStarter.md",
    "/home/ubuntu/Git/CloudNotes/Assignments/MongooseMtgSets.md",
    "/home/ubuntu/Git/CloudNotes/Assignments/AngularMongoDbStarter.md",
    "/home/ubuntu/Git/CloudNotes/Assignments/MongooseRoutes.md",
    "/home/ubuntu/Git/CloudNotes/Assignments/MongooseSignInComment.md",
    "/home/ubuntu/Git/CloudNotes/Assignments/MongooseSubDocuments.md",
    "/home/ubuntu/Git/CloudNotes/Assignments/MongooseEditor.md",
    "/home/ubuntu/Git/CloudNotes/Assignments/MongooseMagic.md",
    "/home/ubuntu/Git/CloudNotes/Assignments/MongooseSignIn.md",
    "/home/ubuntu/Git/CloudNotes/Assignments/NodeExpressMongo01.md",
    "/home/ubuntu/Git/CloudNotes/Assignments/MongoLabBasics.md",
    "/home/ubuntu/Git/CloudNotes/Assignments/AngularMongooseBasics.md",
    "/home/ubuntu/Git/CloudNotes/Assignments/Ec2SiteDeploy.md",
    "/home/ubuntu/Git/CloudNotes/Assignments/Ec2EndOfQuarter.md",
    "/home/ubuntu/Git/CloudNotes/Assignments/Ec2CloudOnly.md",
    "/home/ubuntu/Git/CloudNotes/Assignments/Ec2MarkdownToHtml.md",
    "/home/ubuntu/Git/CloudNotes/Assignments/LampBootstrap.md",
    "/home/ubuntu/Git/CloudNotes/Assignments/Ec2Checklist.md",
    "/home/ubuntu/Git/CloudNotes/Assignments/Ec2Provision.md",
    "/home/ubuntu/Git/CloudNotes/Assignments/Ec2GetStarted.md",
    "/home/ubuntu/Git/CloudNotes/Assignments/Ec2RunElvenSite.md",
    "/home/ubuntu/Git/CloudNotes/Assignments/LampMarkdown.md",
    "/home/ubuntu/Git/CloudNotes/Assignments/Ec2DataHunterFinalPrep.md",
    "/home/ubuntu/Git/CloudNotes/Assignments/ApacheHtml.md",
    "/home/ubuntu/Git/CloudNotes/Assignments/Ec2GitHtmlPictures.md",
    "/home/ubuntu/Git/CloudNotes/Assignments/NpmUtilities.md",
    "/home/ubuntu/Git/CloudNotes/Assignments/NpmAllInclusive.md",
    "/home/ubuntu/Git/CloudNotes/Assignments/NpmPublishing.md",
]

export default symLinkFiles;