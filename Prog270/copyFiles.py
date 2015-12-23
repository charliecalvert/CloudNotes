import shutil

def step01(): 
	for x in range(1, 10):
		source = 'Week0' + str(x) + '.md'
		destination = 'Prog270-Week0' + str(x) + '-2015.md'
		shutil.mv(source, destination);


step01()
