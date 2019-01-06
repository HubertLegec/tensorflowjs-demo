# TensorFlow.js example project (MNIST)
This application has been created to demonstrate possible usage of TensorFlow.js to recognize handwritten digits.

Convolutional network is trained with MNIST data fetched directly from web resource.

## How to use
Application consists of two main sections:
- Training - it has to be done before recognition. User can train network for selected number of epochs.
Progress will be presented on progress bar and charts.
- Recognition - When training is finished user can draw digit on canvas.
When `Recognize` button is clicked recognized digit will appear on the right side.

## Available Scripts

In the project directory, you can run:

- `npm start`  
Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.  
The page will reload if you make edits.<br>
You will also see any lint errors in the console.

- `npm test`  
Launches the test runner in the interactive watch mode.<br>

- `npm run build`  
Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.  
The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

- `npm run eject`  
**Note: this is a one-way operation. Once you `eject`, you can’t go back!**  
If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.
