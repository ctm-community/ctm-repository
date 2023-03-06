# Table of Contents

- [Table of Contents](#table-of-contents)
- [Source Code](#source-code)
  - [Windows](#windows)
  - [macOS](#macos)
- [Dependencies](#dependencies)
  - [Windows](#windows-1)
  - [macOS](#macos-1)
- [PostgreSQL Setup](#postgresql-setup)
  - [Windows](#windows-2)
  - [macOS](#macos-2)
- [Database Setup](#database-setup)

Note: Install dependencies before setting up VSCode.

# Source Code
To get started, you can clone the repository using the following command:
```
git clone https://github.com/ctm-community/ctm-repository.git
```

## Windows
>If using Windows, you may first need to install [Git for Windows](https://gitforwindows.org/). This can be done with the [Windows Pachage Manager CLI](https://winget.run/)* using the following command:
>```
>winget install -e --id Git.Git
>```
>
>\* *If following this guide on Windows, it is recommended to download winget if it is not already on your system, as the following instructions assume that winget is installed.*

## macOS

>If git is not installed, it can be installed it with either Xcode or [Homebrew](https://brew.sh/)* using one of the following commands:
>```
>xcode-select –install
>```
>```
>brew install git
>```
>\* *If following this guide on macOS, it is recommended to download homebrew if it is not already installed on your system, as the following instructions assume that homebrew is installed.*

# Dependencies
To run this project, there are several third-party applications that will need be installed on your system. These are listed below in addition to some optional applications which make development of the project easier.

- **Required**
    - Java 17
    - NodeJS
    - PostgreSQL
- **Recommended**
    - Visual Studio Code
        - *This project makes use of the VS Code workspace feature to enable development of the project. As a result, most instructions for navigating and running different project components are only applicable if VS Code is installed.*
    - Postman
        - *Although Postman requires an account to use, it is free and provides a helpful interface for testing http requests.*

## Windows
> The following is a list of terminal commands for installing required and recommended applications using the Windows Package Manager.
>
> **Required**
> ```
> winget install -e --id Microsoft.OpenJDK.17
> ```
> ```
> winget install -e --id OpenJS.NodeJS
> ```
> ```
> winget install -e --id PostgreSQL.PostgreSQL
> ```
>
> **Recommended**
> ```
> winget install -e --id Microsoft.VisualStudioCode
> ```
> ```
> winget install -e --id Postman.Postman
> ```

## macOS
> The following is a list of terminal commands for installing required and recommended applications using Homebrew.
>
> **Required**
> ```
> brew install openjdk@17
> ```
> ```
> brew install node
> ```
> ```
> brew install postgresql@13
> ```
>
> **Recommended**
> ```
> brew install --cask visual-studio-code
> ```
> ```
> brew install --cask postman
> ```



# PostgreSQL Setup

## Windows
> After installing PostgreSQL with winget, the default superuser account should be called `postgres` with a default password of `postgres`. It may be convenient to set this user as the default user for the `psql` utility so that it isn't necessary to specify a user every time the utility is run.
>
> This can be done by adding the `PGUSER` environment variable in the Advanced tab of System Properties, or by running the following command in an Administrator PowerShell terminal:
> ```powershell
> [Environment]::SetEnvironmentVariable('PGUSER','postgres',[EnvironmentVariableTarget]::Machine)
> ```
>
> Next, ensure that the `psql` utility is on your system path. You can do this by running the following PowerShell command, but note that if the path was just added you may need to open a new terminal for it to be detected:
> ```powershell
> [Environment]::GetEnvironmentVariable('PATH') -split ';'
> ```
>
> If `C:\Program Files\PostgreSQL\14\bin\` was not listed, then you can add it to your system path by running the following command in PowerShell as an Administrator:
> ```powershell
> [Environment]::SetEnvironmentVariable('PATH',[Environment]::GetEnvironmentVariable('PATH')+';C:\Program Files\PostgreSQL\14\bin\',[EnvironmentVariableTarget]::Machine)
> ```
> To finish applying these changes, a system restart will likely be required.

## macOS
> Setting `PGUSER` can be accomplished by running the following command, where the default user is `postgres`:
> ```bash
> echo "export PGUSER=postgres" >> ~/.bash_profile
> ```

# Database Setup
To create the project database, run `psql` in a terminal and sign-in to the postgres superuser account. If installed with winget, the password for the postgres account should be `postgres` by default. If `PGUSER` was not defined previously, then you can sign-in by running `psql` with a specific user by specifying them with the `-U` argument:
```
psql -U postgres
```

After signing in, you should first create a new user called `ctmadmin` with the password `s$cret`. Then, create a new database called `ctmdb` with `ctmadmin` as the database's owner:
```
CREATE ROLE ctmadmin WITH CREATEDB LOGIN PASSWORD 's$cret';
```
```
CREATE DATABASE ctmdb OWNER ctmadmin;
```

If these commands fail, then there might be another postgres account that has the necessary permissions. In this case, the admin postgres account is often set as your username on your computer.

With Linux or macOS, you can find the current username by running the following command in a terminal:
```
whoami
```
