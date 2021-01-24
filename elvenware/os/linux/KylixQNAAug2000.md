The Kylix Q&A
=============

**1) What is "Kylix"?**

Kylix is the code name for a Borland Development Tools Project that will
deliver native rapid application development for the Linux operating
system. Kylix is not intended to be the actual product name.

**2) Why are you building the Kylix project?**

For Linux to take the next step and succeed as a mainstream platform
will require a much greater number of native applications and Kylix is
the project designed to enable developers to deliver those applications.
Because no such application development tool exists for Linux today,
there is a tremendous demand for Kylix both from the Linux development
community and millions of developers on Windows today who wish to
develop for Linux. Kylix will give Linux the developers and native
applications that it lacks today and will give Delphi and Delphi
developers a decided advantage over competitors with the new benefit of
Windows/Linux crossplatform.

**3) Is Kylix "Delphi for Linux"?**

You can think of Kylix as Delphi and C++Builder for Linux. Kylix will
have a feature set very similar to the Windows versions of Delphi and
C++Builder and is being designed to leverage existing Delphi and
C++Builder projects and programming skills. The Delphi edition will be
the first to be released in 2000 followed by the C++ edition in early
2001.

**4) When did the Kylix project begin?**

The Kylix project began in Spring 1999 at about the time of the first
Linux World conference. The project began in a mostly research phase,
but some development such as the primary backend compiler work also
began in Spring 1999. The project was switched from a research project
to a development project by Dale Fuller, the Inprise CEO, in the summer
of 1999.

**5) When will Kylix be available?**

The Kylix project encompasses several actual products. The first
products that will be released from the Kylix project are expected to be
available by end of year 2000.

**6) Is Kylix a native Linux development tool?**

Absolutely yes. Native rapid application development is the primary goal
of the Kylix project. A completely new ultra high performance ELF format
Linux native code compiler is behind the Kylix project. Also, a new
native Linux Visual Component Library (VCL), called CLX, is under
development to provide a fully component-based abstraction to the Linux
operating system, GUI, Internet and database access.

**7) Is the Kylix VCL (called CLX) compatible with the Delphi and
C++Builder VCL?**

Yes, with qualifications. CLX, the new Linux VCL, is based on the Delphi
and C++Builder VCL architecture. The orginal VCL was designed as a
component framework deeply abstracting the Windows operating system in
order to radically simplify Windows development. The new Linux VCL is
based on the same architecture but some differences in the underlying
operating system and graphics subsystems may surface as minor
differences between the two VCLs requiring some source code
modifications in projects migrating from todays Windows VCL to Linux.
CLX, however, has been designed from day one to be completely
cross-platform and will be included in the next release of Delphi for
Windows as well. Once applications are built with CLX, the goal is for
simple re-compiles on the target platform.

**8) Which GUI toolkit will CLX be based on?**

CLX as a whole is not dependent on a GUI toolkit. The GUI components in
CLX, called VisualCLX, are based on VCL widgets. VisualCLX components
implement or "draw" Qt widgets rather than Windows common controls and
use Qt drawing functions rather than GDI drawing functions. Ultimately,
from a Kylix developer's perspective, the GUI toolkit will be
transparent because the graphics and GUI layer will be exposed to
developers through CLX. It is feasible for VisualCLX components to
leverage other GUI libraries as well in the future, though no such plans
have been announced by Borland or any open source organizations as of
yet.

**9) Will I be able to recompile a Delphi for Windows app under Kylix?**

Many basic applications will simply recompile with small unit name
changes - a form and button "hello world" application for example.
However, most real-world VCL applications will likely require some
modifications in order to compile with Kylix. The changes will mostly
center around a developer's direct calls to Win32 and 3rd party
component availability on Kylix. Though some source changes may be
necessary, porting from Windows to Linux with Delphi, C++Builder, and
Kylix will by far be the fastest and easiest way to build native
applications for both platforms.

**10) Will Kylix be both Delphi and C++Builder in the same IDE?**

The Kylix project is being developed to support both Delphi and C/C++
RAD development. While both languages will be supported, how the
languages will be packaged has not been announced. At this time a Delphi
language edition of Kylix will be released first.

**11) How will Kylix be priced?**

Pricing has not been announced but is expected to be similar to the
pricing of Delphi for Windows which ranges between \$99 and \$799 for
the standard to professional editions and up to \$2500 for the
Enterprise editions.

**12) Are you concerned whether or not people will buy Linux development
tools?**

Not at all. There is a high demand for tools like Delphi and C++Builder
on Linux. Hundreds of thousands of developers have also told us directly
that they are eager to purchase high quality, high performance,
supported application development tools.

**13) Which Linux Desktop, KDE or GNOME, will Kylix apps work with?**

Kylix generated apps will operate perfectly under either Gnome or KDE,
or no desktop at all. It's Borland's intention that the first release of
Kylix be desktop "neutral" and to provide direct desktop API support in
later releases and updates. It's likely, however, given the nature of
the Delphi and Linux community that there will be CLX components
available from Kylix developers soon after Kylix is available that
encapsulate popular desktop APIs.

**14) Which Linux distributions will Kylix and Kylix generated
applications support?**

Kylix and Kylix generated applicaitons will support multiple major
Linux. All major Linux distros are also actively participating the Kylix
beta program.

**15) Is Kylix an Open Source project?**

While the Kylix project itself is not being developed in a community
Open Source model, it is a top requirement that developers be able to
use Kylix to develop both Open Source and proprietary applicaitons. To
accomplish this may require that some key technologies in the Kylix
project be released under an Open Source license. These details are
currently under development and will be announced at a later date. The
Kylix development team believes strongly in the value of open source and
free software (in the FSF sense) and aims to support GPL application
development as a clear option in Kylix.

**16) How far along is the Kylix project?**

All areas of the Kylix project - compiler, CLX, debugger, IDE, database
connectivity, and Web components - are well underway. Kylix is entering
it's third beta release.

**17) When will we be able to see Kylix?**

Kylix is currently being "sneak peeked" at various user events and trade
shows around the world. A search on the web or on Borland's community
site (community.borland.com) will also reveal many Kylix articles and
valuable information.

**18) When will the Kylix beta be available and how can I get on the
beta program?**

The Kylix beta program is filled to capacity. To get on the Kylix Beta
waiting list send email to KylixBeta@borland.com - be sure to include
your name, contact phone, address and fax number. If the team is able to
open expand the beta program, those on the waiting list will be the
first to be accepted.

**19) What databases will be supported in Kylix?**

The R&D team is currently working on MySQL and Interbase support.
Borland is also working with all major database vendors and will
announce support for other RDBMS's before Kylix is released.

**20) Will a Linux BDE be included in Kylix?**

The BDE, with support for Paradox and Dbase, is not to be included in
Kylix in the first release. It's our recommendation that Paradox and
Dbase tables be migrated to MySQL or Interbase with the datapump utility
included in Delphi 5.

**21) Will developers have to learn a new data access model?**

No, the primary data access model in Kylix will be Midas-like for Local,
Client/Server, and Multi-tier Distributed database access. This will
allow desktop and Web applications to seamlessly scale from local to
distributed data models as needs dictate. So if developer use datasets
and Midas today, little if anything will appear to have changed with
Kylix. A new cross-platform data access layer will sit under Midas
providing thin high-performance, easily distributable and easily
maintainable data access. While Midas technology is being brought
directly into CLX for data access, an additional Midas server license
will not be required for local or Client/Server data access. A Midas
server license is likely to continue to be required for Multi-tier
database access as it is today.

**22) Will Kylix support Interfaces for Delphi development?**

Yes, Interfaces are supported and will work exactly the same in Kylix as
in Delphi. Therefore instances may be created directly or with a call to
QueryInterface. The Delphi Interface language features were designed to
support COM, but are implemented independently of COM. Therefore Kylix
will not support Dispinterface or the Dual-interface mechanism that
allows Interfaces to be invoked remotely via COM. There are several 3rd
party implementations of COM remoting on Linux so the mechanism in the
compiler will be available but a default implementation will not be
provided.

**23) How is Kylix different than other commercial and open source
development tools for Linux?**

While tools such as GCC/Emacs, MetroWerks Code Warrior, and Cygnus Code
Fusion are well suited for system level development, rebuilding the
Linux kernel for example, Kylix is focused on building high performance
native Linux applications. The Kylix development environment takes the
traditional "Compiler/Editor/Debugger" to a completely different level
by radically simplifying the multitude of complex application
technologies such as GUI (Graphical User Interface), database, Internet,
client/server, and distributed object technologies. If a developer is
interesting in the kernel then the existing tools are probably best
suited, however if a developer is interested in building applications
then Kylix is by far the most obvious choice.

**24) Are Kylix applications dependent on Wine?**

No. Kylix developed applications do not use Wine, WineLib or any Win32
APIs and do not have any Wine dependencies. Kylix applications are 100%
pure Linux ELF object format executables and use the new Borland CLX
native crossplatform component library.

**25) How was the Kylix IDE built?**

The Kylix IDE is a native port of the Delphi for Windows IDE compiled
with the Kylix Delphi compiler and uses non-visual CLX runtimes. While
the IDE is a fully native ELF format Linux application it does not use
CLX visual components to draw most of the IDE GUI in the first version.
In order to develop CLX and the Kylix IDE simultaneously, Windows GUI
components are used to draw the widgets on screen for most of the IDE.
The exceptions are the component pallette, form designer, and common
dialogs, which are built with Kylix VisualCLX components.
