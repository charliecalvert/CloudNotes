---
fullPath: /home/ubuntu/Git/CloudNotes/elvenware/os/linux/LinuxDays/LinuxSystem.md
relativePath: elvenware/os/linux/LinuxDays/LinuxSystem.md
title: LinuxSystem
debug: aec has both but checking ELF code
creationLocalTime: 3/18/2022, 8:21:00 AM
fileNameMarkdown: LinuxSystem.md
fileNameHTML: LinuxSystem.html
image: ./course/course-javascript.jpg
subject: LinuxDays
queryPath: elvenware/os/linux/LinuxDays/
---

<!-- toc -->
<!-- tocstop -->

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 3.2//EN">
<HTML>
<HEAD>
	<META HTTP-EQUIV="CONTENT-TYPE" CONTENT="text/html; charset=iso-8859-1">
	<TITLE>Linux System</TITLE>
    <META NAME="AUTHOR" CONTENT="Charlie Calvert">
	<script language="JavaScript" src="/charlie/libs/scripts/MeyerStyleSwitch.js" type="text/javascript"></script>  
	<!--#include virtual="../../scripts/HeaderInfo.html" -->
</HEAD>
<BODY>
<P>Linux System</P>

<UL>
<LI><A HREF="#PathConst">Path Constants</A></LI>
<LI><A HREF="#Device">Exploring the /dev directory</A></LI>
<LI><A HREF="#SymLink">Sym Links</A></LI>
<LI><A HREF="#LoadLib">Load a Library</A></LI>
<LI><A HREF="#Pipes">Pipes</A></LI>
</UL>

<H3><A HREF="#Device">Devices</A></H3>
<H3><A NAME="PathConst"></A>The Path Constants</H3>

<A NAME="PathConst"><h3>Program: PathConst</h3></A>

<P>In Libc you can find constants pointing at many of the paths in
the system. 
</P>
<P>For instance:</P>
<P>_PATH_MAN: Points at the path to the man files</P>
<P><BR><BR>
</P>
<H3><A NAME="Device"></A>Devices</H3>
<P>Run an ls -l on the files in dev. Notice that they begin with
unusual letters for their permissions. b means it is a block device,
whiel c means it is a character mode device.</P>


<H3><A NAME="SymLink"></A>Symbolic Links and Hard Links</H3>


<H3>Finding out about the Environment</H3>

<UL>
<LI>There are a lot of functions in Libc that you can use to explore the environment</LI>
<LI>getrusage: Returns the amount of a resource that is being used.</LI>
<LI>getrlimit: Get a resource limit. How far will a resource go?</LI>
<LI>sysconf</LI>
</UL>

<PRE>  rusage = packed record
    { Total amount of user time used.  }
    ru_utime: timeval;
    { Total amount of system time used.  }
    ru_stime: timeval;
    { Maximum resident set size (in kilobytes).  }
    ru_maxrss: Integer;
    { Amount of sharing of text segment memory
      with other processes (kilobyte-seconds).  }
    ru_ixrss: Integer;
    { Amount of data segment memory used (kilobyte-seconds).  }
    ru_idrss: Integer;
    { Amount of stack memory used (kilobyte-seconds).  }
    ru_isrss: Integer;
    { Number of soft page faults (i.e. those serviced by reclaiming
      a page from the list of pages awaiting reallocation.  }
    ru_minflt: Integer;
    { Number of hard page faults (i.e. those that required I/O).  }
    ru_majflt: Integer;
    { Number of times a process was swapped out of physical memory.  }
    ru_nswap: Integer;
    { Number of input operations via the file system.  Note: This
      and `ru_oublock' do not include operations with the cache.  }
    ru_inblock: Integer;
    { Number of output operations via the file system.  }
    ru_oublock: Integer;
    { Number of IPC messages sent.  }
    ru_msgsnd: Integer;
    { Number of IPC messages received.  }
    ru_msgrcv: Integer;
    { Number of signals delivered.  }
    ru_nsignals: Integer;
    { Number of voluntary context switches, i.e. because the process
      gave up the process before it had to (usually to wait for some
      resource to be available).  }
    ru_nvcsw: Integer;
    { Number of involuntary context switches, i.e. a higher priority process
      became runnable or the current process used up its time slice.  }
    ru_nivcsw: Integer;
  end;
  {$EXTERNALSYM rusage}
  TRUsage = rusage;
  PRUsage = ^TRUsage;
</PRE>                                                                   
 
<TABLE BORDER = 1>
<TR><TD>RLIMIT_CPU</TD><TD> CPU time in seconds </TD></TR>
<TR> <TD>RLIMIT_FSIZE   </TD><TD> Maximum filesize  </TD></TR>
<TR><TD> RLIMIT_DATA    </TD><TD> max data size  </TD></TR>
<TR><TD> RLIMIT_STACK   </TD><TD> max stack size  </TD></TR>
<TR><TD> RLIMIT_CORE    </TD><TD> max core file size  </TD></TR>
<TR><TD> RLIMIT_RSS     </TD><TD> max resident set size  </TD></TR>
<TR><TD> RLIMIT_NPROC   </TD><TD> max number of processes  </TD></TR>
<TR><TD> RLIMIT_NOFILE  </TD><TD> max number of open files  </TD></TR>
<TR><TD> RLIMIT_MEMLOCK </TD><TD> max locked-in-memory address space </TD></TR>
<TR><TD> RLIMIT_AS      </TD><TD> address space (virtual memory) limit</TD></TR>
</TABLE>
 
  
<H3>From the ExploreInfo program</H3>

<PRE>procedure TForm1.SysInfoBtnClick(Sender: TObject);
var
  usage: rusage;
  limit: rlimit;
  S: string;
  Priority: Integer;
begin
  ListBox1.Items.Clear;
  getrusage(RUSAGE_SELF, usage);
  S := Format('User time used = %d.%d, System time used = %d.%d',
    [usage.ru_utime.tv_sec, usage.ru_utime.tv_usec,
     usage.ru_stime.tv_sec, usage.ru_stime.tv_usec]);
  ListBox1.Items.Add(S);
  // (__which: Integer; __who: id_t): Integer; cdecl;
  priority := getpriority(PRIO_PROCESS, getpid());
  S := Format('Current Priority: %d', [priority]);
  ListBox1.Items.Add(S);
  getrlimit(RLIMIT_FSIZE, limit);
  S := Format('Current File Size Limit: soft = %d hard = %d',
    [limit.rlim_cur, limit.rlim_max]);
  ListBox1.Items.Add(S);

  getrlimit(RLIMIT_CORE, limit);
  S := Format('Current Core Dump Size Limit: soft = %d hard = %d',
    [limit.rlim_cur, limit.rlim_max]);
  ListBox1.Items.Add(S);

  getrlimit(RLIMIT_NOFILE, limit);
  S := Format('Current Limit On Number of Open Files: soft = %d hard = %d',
    [limit.rlim_cur, limit.rlim_max]);
  ListBox1.Items.Add(S);

  getrlimit(RLIMIT_STACK, limit);
  S := Format('Current Stack Size Limit: soft = %d hard = %d',
    [limit.rlim_cur, limit.rlim_max]);
  ListBox1.Items.Add(S);

  getrlimit(RLIMIT_AS, limit);
  S := Format('Current Address Space Limit (stack and data): soft = %d hard = %d',
    [limit.rlim_cur, limit.rlim_max]);
  ListBox1.Items.Add(S);

  getrlimit(RLIMIT_CPU, limit);
  S := Format('Current CPU Time Limit: soft = %d hard = %d',
    [limit.rlim_cur, limit.rlim_max]);
  ListBox1.Items.Add(S);
  
  S := Format('Max size for a file name: %d', [FILENAME_MAX]);
  ListBox1.Items.Add(S);
  S := Format('The number of bits in a char value: %d' +
              ' Max size for a char value: %d ' +
              ' Min size for a char value: %d',
              [SysConf(_SC_CHAR_BIT),
               SysConf(_SC_CHAR_MAX),
               SysConf(_SC_CHAR_MIN)]);
  ListBox1.Items.Add(S);

  S := Format('The number of bits in a long value: %d',
              [SysConf(_SC_LONG_BIT)]);
  ListBox1.Items.Add(S);

  S := Format('Max size for a int value: %d ' +
              ' Min size for a int value: %d',
              [SysConf(_SC_INT_MAX), SysConf(_SC_INT_MIN)]);

  ListBox1.Items.Add(S);              

end;
</PRE>                
 
                        
<A NAME="LoadLib"></a><H3>Loading a Library</H3>

<PRE>procedure TForm1.Button1Click(Sender: TObject);
type
  TFunc = function (c: Integer): Integer; cdecl;
var
  lib: Pointer;
  MyFunc: TFunc;
begin
//  dlopen(Filename: PChar; Flag: Integer): Pointer;
  try
    lib := dlopen('libc.so.6', RTLD_NOW );
    if lib <> nil then begin
     // dlsym = GetProcAddress
      MyFunc := dlsym(lib,'isupper');
      if @MyFunc <> nil then begin
        if MyFunc(Ord('A')) <> 0 then
          ListBox1.Items.Add('Yes')
        else
          ListBox1.Items.Add('No');
      end;
    end;
  finally
    dlclose(lib);
  end;
end;
</PRE>


<A NAME="Pipes"><H3>Pipes</H3></A>

                           
<H3>Pipe a Small Amount of Data Between Programs</H3>
<PRE>program simplePipe;

{ Simple use of pipes to send data to another program
  Based on a program by Neil Mathew and Richard Stones }

uses
  Libc;
  
{$APPTYPE CONSOLE}

var
  buffer: PChar;
  fp: PIOFile;
begin
  getmem(buffer, 250);
  strcpy(buffer, 'Sam is going crazy!');
  // od writes data in a particular format. Try -x for hex, or -o for octal
  fp := popen('od -c' , 'w');
  fwrite(buffer, sizeof(char), length(buffer), fp);
  pclose(fp);
end.</PRE> 
                          
<H3>Piping Lots of Data</H3>

<PRE>program processInfo;
 
{
 Example of reading lots of data from a pipe

 This program calls popen to open another process and pipe the data
 from it back to our program.

 Based on a C program by Neil Mathew and Richard Stones

 Copyright (c) 2000 by Charlie Calvert
}


uses
  Libc;

 {$APPTYPE CONSOLE}
const
  BUFSIZE = 1024;
var
  fp: PIOFile;
  Buffer: PChar;
  CharsRead: Integer;
begin
  GetMem(Buffer, BUFSIZE);
  { Create a new stream connected to a pipe. Run the ps command in the pipe }
  fp := popen('ps -ax', 'r');
  if (fp <> nil) then begin
    CharsRead := fread(Buffer, sizeof(char), BUFSIZE, fp);
    while CharsRead > 0 do begin
      Write(Buffer);
      CharsRead := fread(Buffer, sizeof(char), BUFSIZE, fp);
    end;
  end;
  pclose(fp);
  FreeMem(Buffer, BUFSIZE);
end.</PRE>


                  
<H3>Count the Words in a File</H3>

<PRE>program wordCount;


uses
  SysUtils, Libc;

const
  BUFSIZE = 1024;

var
  fp: PIOFile;
  Buffer: PChar;
  CharsRead: Integer;
  CountCommand: string;
begin { wordCount }
  if ParamCount < 1 then begin
    WriteLn('Pass in a text file and I will count the words in it');
    Exit;
  end;
  CountCommand := SysUtils.Format('cat %s | wc --words', [ParamStr(1)]);
  GetMem(Buffer, BUFSIZE);
  fp := popen(PChar(CountCommand), 'r');
  if (fp <> nil) then begin
    CharsRead := fread(Buffer, sizeof(char), BUFSIZE, fp);
    while CharsRead > 0 do begin
      Write(Buffer);
      CharsRead := fread(Buffer, sizeof(char), BUFSIZE, fp);
    end;
  end;
  pclose(fp);
  FreeMem(Buffer, BUFSIZE);
end. </PRE>

                    
<H3>Using Uname To Query the System</H3>

<PRE>program simpleReceive;
 
// read information from a pipe
// Based on a program by Neil Mathew and Richard Stones

uses
  Libc;

{$APPTYPE CONSOLE}

const
  BUFSIZE = 1024;
var
  fp: PIOFile;
  Buffer: PChar;
  CharsRead: Integer;
begin
  getmem(Buffer, BUFSIZE);
  // uname prints information about the operating system, -a is the all option
  fp := popen('uname -a', 'r');
  if (fp <> nil) then begin
    CharsRead := fread(Buffer, sizeof(char), BUFSIZE, fp);
    if CharsRead > 0 then
      WriteLn('OS is: ', Buffer);
  end;
  freemem(Buffer, BUFSIZE);
end.</PRE>


<H3>Take Control of the Pipes</H3>

<PRE><PRE>program myFilePipe;

uses
  Libc;

const
  BUFSIZE = 1024;
var
  BytesSent: Integer;
  FilePipes: array[0..1] of Integer;
  TempStr: PChar;
  Buffer: PChar;

begin { myFilePipe }
  GetMem(Buffer, BUFSIZE);
  GetMem(TempStr, BUFSIZE);
  strcpy(TempStr, '123');
  if pipe(@FilePipes) = 0 then begin
    BytesSent := Libc.__write(FilePipes[1], TempStr, Length(TempStr));
    WriteLn('Wrote ', BytesSent);
    BytesSent := Libc.__read(FilePipes[0], Buffer, BUFSIZE);
    WriteLn('Read ', BytesSent, ' bytes with value: ', Buffer);
  end;
  FreeMem(Buffer, BUFSIZE);
  Freemem(TempStr, BUFSIZE);
end.</PRE>
</PRE>

</BODY>
</HTML>