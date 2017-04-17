## React Props

We will learn a bit about React props by continuing to expand the **week02-rest-basics** program. We will try to understand properties, and to see how they can be passed from one component to another.

Check if site is public or private.

## Tag

Since we are often working on a single project that has multiple phases, I suggest creating a git tag marking your current status:

```bash
$ git tag -a v3.0.0 -m "Start Week03"
$ git push origin v3.0.0
$ git tag -n1
```

The first command creates a tag that has a message associated with it. The message works much like the message in a commit.

The second command pushes the tag from your local machine to the cloud.

The last command lists your tags and their message on one line. If you have only a single tag, it is not particularly useful, but once you have multiple tags you will see how helpful this can be. Increase the value of the number after -n? to see more information about your tag. You can read about tags here:

- [git tag docs](https://git-scm.com/book/en/v2/Git-Basics-Tagging)

## Bower

Modify the hidden file **.bowerrc** to reference **public/bower-components**.

Add **bower-components** to **.gitignore**:

```
# Dependency directories
node_modules
jspm_packages
bower-components
```

## New Branch

Create a new branch called **Week03**. You **must** put your homework for week three in this branch! (You can do it!)

```bash
git branch Week03
git checkout Week03
```

Write some code, commit your work. Push it:

```bash
git push --set-upstream origin Week03
```

## Images and CSS

I found images here:

- <https://pixabay.com/en/gold-fish-aquarium-goldfish-fins-30831/>
- <https://pixabay.com/en/goldfish-fins-tropical-animal-47022/>
- <https://commons.wikimedia.org/wiki/File:Small_SVG_house_icon.svg>
- <https://commons.wikimedia.org/wiki/File:Flower-of-Life-91circles36arcs.svg>
- <https://commons.wikimedia.org/wiki/File:Tree-of-Life_Flower-of-Life_Stage.svg>
-
Try also, this search in Chrome/Chromium:

```
https://www.google.com/search?q=svg+free+small
```

Turn to the images page. Select tools, and select **Labeled for non-commercial reuse** or something similar.

## Tests

As you refactor your components, your tests might need to change. For instance, if you move the H1 for your app into **components/Header.js**, you might need to change your tests. Consider this code:

```javascript
import App from './App';

// Code omitted here

it.only('renders and reads H1 text', () => {
    const wrapper = shallow(<App />);
    const welcome = <h2>Welcome to React</h2>;
    expect(wrapper.contains(welcome)).toEqual(true);
});
```

It will likely end up like this:

```javascript
import Header from './components/Header';

// Code omitted here

it.only('renders and reads H1 text', () => {
    const wrapper = shallow(<Header />);
    const welcome = <h2>Welcome to React</h2>;
    expect(wrapper.contains(welcome)).toEqual(true);
});
```
