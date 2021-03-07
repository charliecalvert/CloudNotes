#Static and Instance Data

On the instance data issue in modular pattern, I believe it goes like this:

this.goober = "foo"

In the above, **goober** is always instance based. It is always just the specific instance of the object that you created. 

MyObject.prototype.goober = "foo";

In the above, goober is always static. There is only one prototype per object. You can make 5000 instances of the object, but there will be only one copy of prototype.goober. That is the way the prototype works. A key fact, perhaps the key fact, about prototypes is that there is only one per class, no matter how many instances you create. Each instance has a pointer to the prototype for that class. There is only one. If you change Object.prototype, then every object in your program will see the change, since they all inherit from that one, single, Object prototype. All of them point to that prototype. (Well, usually all of them do. It is possible to create an object that does not inherit from Object, but that is rarely done.)

var goober="foo";

Now goober is part of the closure, and I believe that means it is going to be static data. What about accessing goober from a public instance method:

 this.foo = function() { console.log(goober)}? 

I need to test that. This is an instance based function, so if it has a closure that wraps data, is data static or instance based. I would think instance based, but I would need to check.

Actually, I thinking I see more. if we call myObject.foo(). Then isn't the closure really still on the MyObject constructor, and so won't goober be static since MyObject is on prototype? The constructor is in the prototype, and so it is static. Obviously the constructor is static. There is only one constructor per object, no matter how many instances we make. Isn't the constructor's closure that we care about? I'm not totally sure.

Suppose it is part of the instance method's (foo's) closure. If goober is accessed from a public instance method, then perhaps it is part of the closure for that instance method, so it may make sense to say that it would be instance based and not static. And private methods are usually just part of the closure for our public static prototype methods, so they would be static. But what about a method like foo? I think it is the constructor's closure that matters, but I need to test.

Still mysteries here. But I am much closer to really understanding it. I just need time to spelunk, and I don't have it today.


> Written with [StackEdit](https://stackedit.io/).