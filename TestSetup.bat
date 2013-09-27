@ECHO OFF

if "%ELVENWARE%"=="" goto usage
if "%GIT_WRITING%"=="" goto usage
if "%GITHUB%"=="" goto usage
if "%JSOBJECTS%"=="" goto usage
if "%PYTHON_HOME%"=="" goto usage
if "%PYTHONPATH%"=="" goto usage

ECHO Your set up looks good.
ECHO ELVENWARE=%ELVENWARE%
ECHO GIT_WRITING=%GIT_WRITING%
ECHO GITHUB=%GITHUB%
ECHO JSOBJECTS=%JSOBJECTS%
ECHO PYTHON_HOME=%PYTHON_HOME%
ECHO PYTHONPATH=%PYTHONPATH%
goto :eof

:usage
ECHO =============================================
ECHO ====== Batch Files in This Directory ========
ECHO =============================================
ECHO Some of the scripts in this folder expect
ECHO several environment variables to be set. 
ECHO ---------------------------------------------
ECHO Before you run this script, set these variables. 
ECHO ---------------------------------------------
ECHO You can set these variables by using the 
ECHO ENVIRONMENT VARIABLES dialog. To get to 
ECHO that dialog:
ECHO   Control Panel\System and Security\System
ECHO   Advanced System Settings\Environment Vars
ECHO ---------------------------------------------
ECHO Alternatively you can set them temporarily at 
ECHO the command prompt by writing something like this:
ECHO   set GITHUB=C:\GitHub
ECHO   set JSOBJECTS=C:\GitHub\JsObjects
ECHO =============================================