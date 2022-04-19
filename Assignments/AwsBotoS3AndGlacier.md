---
creationLocalTime: 3/26/2022, 10:23:51 AM
debug: aec has both but checking ELF code
image: ./course/course-javascript.jpg
fullPath: /home/ubuntu/Git/CloudNotes/Assignments/AwsBotoS3AndGlacier.md
relativePath: Assignments/AwsBotoS3AndGlacier.md
title: AwsBotoS3AndGlacier
queryPath: Assignments/
subject: Assignments
fileNameMarkdown: AwsBotoS3AndGlacier.md
fileNameHTML: AwsBotoS3AndGlacier.html
---


<!-- toc -->
<!-- tocstop -->

## Boto3, S3, Glacier

If you haven't already, install the aws cli:

<pre>
sudo apt install awscli
</pre>

Run it and check the results:

<pre>
aws configure
cat ~/.aws/credentials
cat ~/.aws/
</pre>

My aws **config** file:

<pre>
[default]
region=us-west-2
</pre>

And then:

<pre>
git clone https://github.com/boto/boto3.git
cd boto3/
virtualenv -p /usr/bin/python3 venv
. venv/bin/activate
pip install -r requirements.txt
pip install -e .

</pre>

When you are done, you can deactivate the virtualenv:

<pre>
deactivate
</pre>

Run a simple test:

```python
import boto3

s3 = boto3.resource('s3')
for bucket in s3.buckets.all():
    print(bucket.name)
```

The [docs are probably also on the web](http://boto3.readthedocs.io/en/latest/), but if you want, you can make the docs locally, which takes perhaps two or three minutes on a fast machine:

<pre>
pip install -r requirements-docs.txt
cd docs
make html
</pre>

Optionally, run some tests, which take considerably longer:

<pre>
cd ..
sudo apt-get install tox
tox
</pre>
