## Windows Terminal

- wt wsl.exe
- wt -p "UbuntuFoo"
- wt -p "Ubuntu-20.04"
- wt -p "Ubuntu-20.04" ; split-pane -p "Ubuntu-20.04" ; new-tab -p "Ubuntu-20.04" -d C:\Users\charl\Source ; split-pane -p "Ubuntu-20.04" ; split-pane -p "Ubuntu-20.04"
- wt -p "Ubuntu-20.04" ; split-pane -H -p "Ubuntu-20.04" 
- wt -p "Ubuntu-20.04" -d C:\Users\charl\Source ; split-pane -p "Ubuntu-20.04" ; split-pane -p "Ubuntu-20.04"

- Bring up settings: select V
- switch to tab: CTRL+ALT+[TAB-NUMBER]
- List commands: CTRL+SHIFT+P
- wsl charlie@charlie@HP-Desktop wttg

### Start in home directory:

    {
        "guid": "{07b52e3e-de2c-5db4-bd2d-ba144ed6c273}",
        "hidden": false,
        "name": "Ubuntu-20.04",
        "startingDirectory": "//wsl$/Ubuntu-20.04/home/charlie/",
        "source": "Windows.Terminal.Wsl"
    },

###  Other

    {
        "guid": "{e71ad31e-5479-45cf-80de-954bba533fd2}",
        "hidden": false,
        "name": "UbuntuFoo",
        "commandline": "wsl.exe ~ -d Ubuntu-20.04",
    }
## PowerShell 

- PS C:\> cd $Env:homedrive
- PS C:\> cd $Env:homepath
- PS C:\Users\charl>
- cd $env:homepath
- [guid]::NewGuid()

## Docker Compose

- docker-compose ps

## Docker Network 

- micros_micro_bar_1
- docker network connect myNetwork micros_micro_qux_1
- docker network inspect myNetwork
- docker network connect micros_default call-you-rang
- docker network inspect micros_default

## Docker Commands 

- docker image build -t charliecalvert/micro-qux .
- docker run --rm -it 89f3c9d9434f bash
- docker run --rm -it micros_micro_qux bash
- docker run --rm -it micros_micro_bar bash

## Docker Push

- docker container commit micro-qux elf-micro-qux
- docker image tag elf-micro-qux:latest elf-micro-qux:latest
- docker push charliecalvert/micro-qux:latest

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
