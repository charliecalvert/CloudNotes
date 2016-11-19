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


Use sessionStore. In the source for it, open up lib/databases/couchdb and do this:

```javascript
set: function (hash, sess, callback) {
  sess.collectionName = this.collectionName;
  if (sess && sess.cookie && sess.cookie.expires) {
    sess.expires = new Date(sess.cookie.expires);
  } else {
    // If there's no expiration date specified, it is
    // browser-session cookie or there is no cookie at all,
    // as per the connect docs.
    //
    // So we set the expiration to two-weeks from now
    // - as is common practice in the industry (e.g Django) -
    // or the default specified in the options.
    sess.expires = new Date(Date.now() + this.options.ttl * 1000);
  }
  console.log('couchStore', sess);        <===== HERE
  if (sess.elfStoreData === false) {      <===== HERE
      callback(null)                      <===== HERE
      return;                             <===== HERE
  }                                       <===== HERE 
  this.db.save(hash, sess._rev, sess, function(err) {
    console.log('actually saved');    
    if (err && err.error === 'conflict' && err.reason.indexOf('update conflict') >= 0) {
      return callback(new Error('ConcurrencyError: Session was updated by someone else!'));
    }
    callback(err);
  });
},

```
