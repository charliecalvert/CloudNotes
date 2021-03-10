## Windows Terminal

- wt -p "Ubuntu-20.04"
- wt -p "Ubuntu-20.04" ; split-pane -p "Ubuntu-20.04" ; new-tab -p "Ubuntu-20.04" -d C:\Users\charl\Source ; split-pane -p "Ubuntu-20.04" ; split-pane -p "Ubuntu-20.04"
- wt -p "Ubuntu-20.04" ; split-pane -H -p "Ubuntu-20.04" 
- wt -p "Ubuntu-20.04" -d C:\Users\charl\Source ; split-pane -p "Ubuntu-20.04" ; split-pane -p "Ubuntu-20.04"

- Bring up settings: select V
- switch to tab: CTRL+ALT+[TAB-NUMBER]
- List commands: CTRL+SHIFT+P
- wsl charlie@charlie@HP-Desktop wttg

## PowerPoint 

- PS C:\> cd $Env:homedrive
- PS C:\> cd $Env:homepath
- PS C:\Users\charl>
- cd $env:homepath

## Docker Network 

- micros_micro_bar_1
- docker network connect myNetwork micros_micro_qux_1
- docker network inspect myNetwork
 docker network connect micros_default call-you-rang
- docker network inspect micros_default

## Docker Commands 

- docker image build -t charliecalvert/micro-qux .
- docker run --rm -it 89f3c9d9434f bash
- docker run --rm -it micros_micro_qux bash
- docker run --rm -it micros_micro_bar bash


## Inside Docker Container

- apt update
- apt install curl
- curl micro-qux:30027
- curl -IL micro-qux:30027

## Key Commands

- docker container ls -a
- docker image ls
- docker image rm 81c8ee471f4f
- docker network inspect myNetwork
- ./build
- ./reset
- docker network connect myNetwork call-you-rang
