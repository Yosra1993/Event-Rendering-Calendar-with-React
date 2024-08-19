# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

## Event Rendering Calendar

This project addresses the challenge of rendering events on a calendar while avoiding visual overlap. The solution ensures that:

1. **Overlapping Events**: All events that overlap have the same width.
2. **Maximum Width Utilization**: Each event uses the maximum width available, complying with the first constraint.

### Details

- **Functionality**: Events are displayed in a responsive container, using `div` elements that span the full width of the window. The vertical position and height of events are determined by their start time and duration.
- **Input Format**: Events are provided as an array with each event containing an `id`, `start` time, and `duration` in minutes.
- **Output**: Events are rendered with a background color and border, and their `id` is displayed. The calendar view ranges from 09:00 am to 09:00 pm.
- **Dependencies**: The project can be implemented using React, vanilla JavaScript, or a lightweight templating library. Optional libraries like lodash may be used.

### Evaluation Criteria

- Correctness of the algorithm
- Code readability (structure, naming, comments)
- Responsiveness to window resizing

### Visual Representation

The calendar visualizes events ensuring correct width allocation and adherence to constraints. Examples are provided to illustrate valid configurations.

