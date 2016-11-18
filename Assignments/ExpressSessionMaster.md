## Overview

cp -r Week09-SessionCouch/ Week10-SessionMaster
cd Week10-SessionMaster/

npm install passport --save
npm install passport passport-facebook --save
npm install passport-google-oauth20 --save
npm install passport-twitter --save

cd routes/
cp ../../Week08-Passport/routes/twitter-login.js .
cp ../../Week08-Passport/routes/google-auth.js .
cp ../../Week08-Passport/routes/facebook.js .

cd views/
2129  cp ../../Week08-Passport/views/profile-facebook.jade .
2130  cp ../../Week08-Passport/views/profile-twitter.jade .
2131  cp ../../Week08-Passport/views/account.jade profile-google.jade

Make sure you have facebook CLIENT_ID loaded:

echo $FACEBOOK_CLIENT_ID

Copy the code from Week08-Passport **index.js** that is Passport specific:

- <http://www.ccalvert.net/books/CloudNotes/Assignments/Passport.html#generic-code>
