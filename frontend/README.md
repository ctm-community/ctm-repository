# Frontend

This project uses [Create React App](https://github.com/facebook/create-react-app).

All frontend commands listed in this document are provided as Visual Studio Code tasks which can be run through the [Command Palette](https://code.visualstudio.com/docs/getstarted/userinterface#_command-palette).\
These tasks were included to simplify configuration settings across multiple operating systems.

## Install Dependencies
```
>Tasks: Run Task
>Install Dependencies
```
Installs dependencies using a compatability flag to allow installation with recent versions of npm.

## Running in Development Mode
```
>Tasks: Run Task
>Start React
```

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

```
>Tasks: Run Task
>Start React - Heroku API
```

When running in development, the project attempts to connect to the development server hosted locally. Running this task instead avoids the need to launch the backend and use the production API hosted on Heroku instead.


## Testing
```
>Tasks: Run Task
>Test React
```

Launches the test runner in the interactive watch mode.

See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

```
>Tasks: Run Task
>Test React - Coverage
```

Instead of running tests in interactive mode, the coverage task can be run instead to generate a coverage report at the end.

## Building for Deployment
```
>Tasks: Run Task
>Build React
```

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
This version of the app is what would be deployed when merged.

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.
