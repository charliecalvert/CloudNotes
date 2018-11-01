## Overview

Let's formalize the **build-copy** script we worked on in class.

I'm going to start with two clarifications on the issues that causes us to rathole on minor issues for far too long in class on Monday. The issues are:

- Quotes in strings
- Curly braces

## Single vs Double Quotes

The general wisdom on the web is that we should quote the strings and variables we use in bash scripts. However, there is a difference between single quotes and double quotes. Single quotes cause the string to be interpreted literally, as we were finding in class. Double quotes allow interpolation to occur. [Interpolation][ip] is when variables in a string are expanded.

 Consider this code:

    echo '${SERVER_DIR}/precache-manifest*.js'

It produces this output:

    ${SERVER_DIR}/precache-manifest*.js

Now look at this example:

    echo "${SERVER_DIR}/precache-manifest*.js"

It does what we expect, and produces this output:

    ../server/public/precache-manifest*.js    

Thus, this code does what we expect:

    ls "${SERVER_DIR}/precache-manifest."\*".js"

It produces this output:

    ../server/public/precache-manifest.2efd1de520c30948b299e17d59c75fef.js    


## When do you Need Curly Braces?

I mentioned that it is a good idea to use Curly Braces in variable expansion. Both [This Stack Overflow answer][so1] and [this Unix and Linux Stack Overflow discussion][ul1] helped me understand the subject perhaps a bit better. Consider this example where we want to concatenate the word **Foo** on the value held in the variable **BAR**:

    BAR='bar'
    FOO=$BARFoo
    echo $FOO

It outputs an empty string because bash looks for a variable **BARFoo** rather than **$BAR+Foo**. But if we write this, we get the expected output of **barFoo**:

    BAR='bar'
    FOO=${BAR}Foo
    echo $FOO

There are other things you can do with curly braces. However, in our case, we want to use them in places like this where they can help to clarify our intention to either bash itself, or to readers of the code.

In our case, the curly braces are optional because our code would be clear to both bash and to readers without them:

    SERVER_DIR='../server/public'
    echo ${SERVER_DIR}/precache-manifest*.js
    echo $SERVER_DIR/precache-manifest*.js

Here lines two and three produce the same output. However, I think it is arguable that the second line is easier to read:

    echo ${SERVER_DIR}/precache-manifest*.js

Or perhaps it isn't, depending on your tastes. However, it does seem to me that making a practice of including curly braces would be a good best practice as it could ensure that ambiguous code is never written. I'm not sure I'm ready to make it a rule that we must follow.    

[so1]: https://stackoverflow.com/a/8748880/253576
[ul1]: https://unix.stackexchange.com/questions/4899/var-vs-var-and-to-quote-or-not-to-quote
[ip]: https://en.wikipedia.org/wiki/String_interpolation
