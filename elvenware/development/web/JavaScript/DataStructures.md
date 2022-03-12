---
fullPath: /home/ubuntu/Git/CloudNotes/elvenware/development/web/JavaScript/DataStructures.md
relativePath: elvenware/development/web/JavaScript/DataStructures.md
title: DataStructures
debug: aec has both but checking ELF code
creationLocalTime: 3/11/2022, 4:02:54 PM
subject: JavaScript
---

<!-- toc -->
<!-- tocstop -->

# JavaScript DataStructures

Here we will discuss various data structures that can be used in a JavaScript application.

Below I provide the names commonly used in Computer Science courses that cover data structures. We will need to create classes that use these names. It is more important that you use the conventional names than that you avoid a functional call in order to "optimize" your code.

## Queues

The classic real world example of a queue is a line at a cash register.

The methods are as follows:

- **enqueue**: Insert an item a the end of a queue (Array.push)
- **dequeue**: Remove an item from the beginning of the queue (Array.shift)
- **front**: Peek at first element [index into the queue with 0]
- **back**: Peek at last element [index into the queue]
- **empty**: Boolean function to determine if the Queue is empty

In addition, you will need an array to hold the data. Typically this called **data**.

## Stacks

The classic real world example of a stack is a set of trays or plates at a lunch counter.

The methods are as follows:

- **top**: The index designating the last item in the array.
- **push**: Insert at end of array (Array.push)
- **pop**: Remove from end of the array (Array.pop)
- **peek**: Index into the queue to see the last element

In addition, you will need an array to hold the data. Typically this called **data**.

There is some question as to whether or not **top** serves any purpose in JavaScript.

> Written with [StackEdit](https://stackedit.io/).
