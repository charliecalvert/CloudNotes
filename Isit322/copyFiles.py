#! /usr/bin/python3

import shutil

def step01(): 
	for x in range(1, 10):
		source = 'Isit322-Week0' + str(x) + '-2015.md'
		destination = 'Isit322-Week0' + str(x) + '-2016.md'
		shutil.copyfile(source, destination);

def step02(): 
	for x in range(0, 2):
		source = 'Isit322-Week1' + str(x) + '-2015.md'
		destination = 'Isit322-Week1' + str(x) + '-2016.md'
		shutil.copyfile(source, destination);

#step01()
step02()
