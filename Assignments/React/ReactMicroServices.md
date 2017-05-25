# React Micro Services

We have a principle that we talk about quite a bit:

- [Single Responsibility Principle][srp]

There is another of the [SOLID principles][solid] that we don't talk about as much:

- [Interface Segragation Principle][isp]

This principle states that we prefer small interfaces over fat interfaces. "Instead of one fat interface, many small interfaces are preferred".

To help us abide by the spirit of this principle, we will divide our server code into multiple "microservices". Instead of one fat server, we will create several small servers. They will talk to one another over HTTP.

[solid]: https://en.wikipedia.org/wiki/SOLID_(object-oriented_design)
[srp]: https://en.wikipedia.org/wiki/Single_responsibility_principle
[isp]: https://en.wikipedia.org/wiki/Interface_segregation_principle
