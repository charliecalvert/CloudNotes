---
fullPath: /home/ubuntu/Git/CloudNotes/elvenware/development/android/SimpleHttpGetThread.md
relativePath: elvenware/development/android/SimpleHttpGetThread.md
title: SimpleHttpGetThread
debug: aec has both but checking ELF code
creationLocalTime: 3/18/2022, 8:21:00 AM
fileNameMarkdown: SimpleHttpGetThread.md
fileNameHTML: SimpleHttpGetThread.html
---

<!-- toc -->
<!-- tocstop -->

Toggle Menu

Charlie Calvert on Elvenware
============================

Writing Code and Prose on Computers
-----------------------------------

Menu
----

Core Code
---------

-   [Strongly Typed](../index.html)
-   [Web & Scripts](../web/index.html)
-   [Cloud](../cloud/index.shtml)

OS and Tools
------------

-   [OS](../../os/index.html)
-   [Database](../database/index.html)
-   [My Writing](../../books/index.html)

Art
---

-   [Poems & Photos](../../Art/index.html)
-   [Book Reviews](../../books/reading/index.html)
-   [Spiritual](../../spirit/index.html)

Links
-----

-   [My Links](../../links.html)
-   [Falafel](http://www.falafel.com/)
-   [Sourceforge](http://sourceforge.net/projects/elvenware/)

![Elvenware](../../images/elvenwarelogo.png)

HttpGet and HttpPost
====================

In the manifest, before the Application, put this:

~~~~ {.code}
<uses-permission android:name="android.permission.INTERNET"></uses-permission>
~~~~

Basic HttpGet
-------------

To perform an HTTPGet, you can create a an implementation of the
abstract class called
**[AsyncTask](http://developer.android.com/reference/android/os/AsyncTask.html)**:

~~~~ {.code}
 AsyncTask<Params, Progress, Result>.
~~~~

This class allows you to perform tasks in the background on a separate
thread, and then publish the results to the UI. This is a recommended
technique for two reasons:

-   If you try to perform an HTTP request on the main thread, it can
    hang your application for an unspecified period of time while
    waiting for a network request to time out.
-   To avoid freezing the UI during a timeout, you want to run on a
    second thread. But when running on a second thread, you cannot
    normally touch the UI on the main thread without risking a thread
    conflict which can permanently lock up your code.

 There are a number of methods in the **AsyncTask** class that you
override including **doInBackground, onPostExecute**and
**onProgressUpdate.**

AsyncTask has three generic types:

1.  **Params**: An array of parameters you want to pass in to the class
    you create when you subclass **AsyncTask**.
2.  **Progress**: If you override **onProgressUpdate**, this is the type
    that method returns.
3.  **Result**: This is the type that **doInBackground**returns.

In a typical example, such as the one below, you pass in a **TextView.**
This TextView is part of your main UI. In the **onPostExecute** method,
you display text in the **TextView**. This is how the background task
you have created talks to the UI. In particular, the **onPostExecute**
method gets passed a string (or whatever type you specified in the
generic type **Result**). You can display this string in the
**TextView**. In the example shown below the second parameter is set to
Void since we do not override **onProgressUpdate.**We do, however, state
that **doInBackground** will return a **String**.

Here is your code:

~~~~ {.code}
package elvenware.MyTester;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;

import org.apache.http.HttpResponse;
import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.impl.client.DefaultHttpClient;

import android.os.AsyncTask;
import android.widget.TextView;
//  
public class HttpGetDemo extends AsyncTask<TextView, Void, String> {
    TextView t;
    String result = "fail";
    
    @Override
    protected String doInBackground(TextView... params) {
        // TODO Auto-generated method stub
        this.t = params[0];
        return GetSomething();
    }
    
    final String GetSomething()
    {
        String url = "http://www.elvenware.com/cgi-bin/LatLongReadData.py";
        BufferedReader inStream = null;
        try {
            HttpClient httpClient = new DefaultHttpClient();
            HttpGet httpRequest = new HttpGet(url);
            HttpResponse response = httpClient.execute(httpRequest);
            inStream = new BufferedReader(
                new InputStreamReader(
                    response.getEntity().getContent()));

            StringBuffer buffer = new StringBuffer("");
            String line = "";
            String NL = System.getProperty("line.separator");
            while ((line = inStream.readLine()) != null) {
                buffer.append(line + NL);
            }
            inStream.close();

            result = buffer.toString();         
        } catch (Exception e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        } finally {
            if (inStream != null) {
                try {
                    inStream.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        }
        return result;
    }
    
    protected void onPostExecute(String page)
    {       
          t.setText(page);      
    }   
}
~~~~

You would call it like this:

~~~~ {.code}
public void onGetClick(View v) 
{
    TextView textView = (TextView)findViewById(R.id.viewText1);
    new HttpGetDemo().execute(textView);        
}
~~~~

Posting
-------

Here is the code:

~~~~ {.code}
package Elvenware.MyTester;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.List;

import org.apache.http.HttpResponse;
import org.apache.http.NameValuePair;
import org.apache.http.client.HttpClient;
import org.apache.http.client.entity.UrlEncodedFormEntity;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.impl.client.DefaultHttpClient;
import org.apache.http.message.BasicNameValuePair;

import android.os.AsyncTask;
import android.widget.TextView;

public class HttpPostDemo extends AsyncTask<TextView, Void, String> 
{
    TextView textView;
    
    @Override
    protected String doInBackground(TextView... params)     
    {
        this.textView = params[0];
        BufferedReader inBuffer = null;
        String url = "http://www.elvenware.com/cgi-bin/JQueryTest01.py";
        String result = "fail";
        try {
            HttpClient httpClient = new DefaultHttpClient();
            HttpPost request = new HttpPost(url);
            List<NameValuePair> postParameters = 
                new ArrayList<NameValuePair>();
            postParameters.add(new BasicNameValuePair("operanda", "5"));
            postParameters.add(new BasicNameValuePair("operandb", "6"));
            postParameters.add(new BasicNameValuePair("answer", "11"));
            UrlEncodedFormEntity formEntity = new UrlEncodedFormEntity(
                    postParameters);

            request.setEntity(formEntity);
            HttpResponse httpResponse = httpClient.execute(request);
            inBuffer = new BufferedReader(
                new InputStreamReader(
                    httpResponse.getEntity().getContent()));

            StringBuffer stringBuffer = new StringBuffer("");
            String line = "";
            String newLine = System.getProperty("line.separator");
            while ((line = inBuffer.readLine()) != null) {
                stringBuffer.append(line + newLine);
            }
            inBuffer.close();

            result = stringBuffer.toString();
            
        } catch(Exception e) {
            // Do something about exceptions
            result = e.getMessage();
        } finally {
            if (inBuffer != null) {
                try {
                    inBuffer.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        }
        return result;
    }
    
    protected void onPostExecute(String page)
    {       
        textView.setText(page);     
    }   
}
~~~~

You would call it like this:

~~~~ {.code}
public void onPostClick(View v) 
{
    TextView textView = (TextView)findViewById(R.id.viewText1);
    new HttpPostDemo().execute(textView); 
}
~~~~

 
-

Links
-----

-   Get the [sample code.](../../downloads/Android/MyHttpTester.zip)
-   Back to [Android Main](index.html)

Copyright © [Charlie Calvert](../../index.html) | [Elvenware
Home](../../index.html) | [Writing Code](../index.html) |
[Delphi](../delphi/index.html) | [CSharp](../csharp/index.html) | [My
Books](../../books/index.html)
