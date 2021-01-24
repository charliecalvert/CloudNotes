# Elven Utils

Some utilities and gists.

## Elf Logger

This logger is designed to be used with React. The source for **ElfLogger** is available as a gist:

- [http://bit.ly/elf-logger](http://bit.ly/elf-logger)

We typically initialize it like this:

```javascript
import Logger from '../elf-logger';
const logger = new Logger('data-loader', 'yellow', 'green', '18px');
```

Then we can use it like this anywhere in that module:

```javascript
logger.log('Loading data');
logger.log('Param1', 'Param2', 'Param3');
```

Right now there are only three strings that can be sent.

Let's take a moment to look a little more deeply at this simple utility. We need to be able to turn logging on and off as needed. One way to do it is to set it by module. If we set a particular environment variable to the name of a module, then the debug statements for that module will be visible.

It turns out that **create-react-app** deliberately suppresses all environment variables except:

- **NODE_ENV**: which the **create-react-app** startup script defined and could have only certain values
- **PUBLIC_URL**: which was again filled out by **create-react-app**
- And any environment variable that begins with **REACT_APP**.

An explanation is here: [http://bit.ly/react-app-elf](http://bit.ly/react-app-elf).

So, instead of defining a variable called **ELF_LOGGER**, we will use **REACT_APP_ELF_LOGGER**.

I've set things up so you can include 0, 1 or more values. That way you can define loggers for more than one module. To define two or more variables, separate them with a semicolon. For instance, consider the following examples:

- 0 environment variables: **export REACT_APP_ELF_LOGGER=**
- 1 environment variables: **export REACT_APP_ELF_LOGGER='address'**
- 2 environment variables: **export REACT_APP_ELF_LOGGER='address;data-loader'**
- And so on.

In each case the string to the right of the semicolon should be entered at the command line before your start the application with **npm start** or some other system. For instance:

```
export REACT_APP_ELF_LOGGER='address;data-loader'
npm start
```

You only need to export the variable once per bash shell. You can check the current variable of the environment variable by typing:

```
echo $REACT_APP_ELF_LOGGER
```

Be sure to name each logger after the module in which you use it:

In **address.js**:

```javascript
const logger = new Logger('address', 'yellow', 'green', '18px');
```

In **DataLoader.js**:

```javascript
const logger = new Logger('data-loader', 'yellow', 'green', '18px');
```

The first parameter is required, the last three have default values. Therefore, you could leave off the last parameter and take the default size:

```javascript
import Logger from '../elf-logger';
const logger = new Logger('data-loader', 'yellow', 'green');
```

Or even this will work:

```javascript
import Logger from '../elf-logger';
const logger = new Logger('data-loader');
```

In this case the last three parameters will have default values.

## Elf Debug Enzyme

The source for **ElfDebugEnzyme** as a gist: [http://bit.ly/elf-debug-enzyme](http://bit.ly/elf-debug-enzyme)

Watch the [ElfDebugEnzyme video](https://youtu.be/JCfN8OgmKXA)

Watch a [second video](https://youtu.be/Z44pG1w-ZiU) documenting additional updates.
