#Passport

    express Passport
    cd Passport
    npm install passport passport-google

Then:

    var passport = require('passport');
    var GoogleStrategy = require('passport-google').Strategy;

And in the use section:

    app.use(passport.initialize());
    app.use(passport.session());
    
    
##Passport Code

Right after this line:

    var app = express();

Insert this:

```
passport.serializeUser(function(user, done) {
	done(null, user.identifier);
});

passport.deserializeUser(function(id, done) {
	done(null, {
		identifier : id
	});
});

passport.use(new GoogleStrategy({
	returnURL : 'http://localhost:30025/auth/google/return',
	realm : 'http://localhost:30025/'
}, function(identifier, profile, done) {
	profile.identifier = identifier;
	return done(null, profile);
}));
```

##Login and Logout

```
app.get('/auth/google/:return?', passport.authenticate('google', {
	successRedirect : '/'
}));

app.get('/auth/logout', function(req, res) {
	req.logout();
	res.redirect('/');
});
```

##Run

And to run it:

> http://localhost:30025/auth/google

##Permissions

You want to track who has permissions to access your account information:

> https://security.google.com/settings/security/permissions