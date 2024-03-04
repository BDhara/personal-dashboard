
# Dashboard Application

This is a simple dashboard application built with React, using the `react-router-dom` library for navigation. The application consists of three main components: Weather, TodoList, and UserProfile.

## Design Decisions

### Component Structure

- **Weather Component**: Fetches and displays weather information based on the user's input.

- **TodoList Component**: Manages a to-do list where users can add, remove, and mark tasks as completed.

- **UserProfile Component**: Serves as the main dashboard, providing navigation links to Weather and TodoList. It also displays user information on click of a profile picture.

### Navigation

- **React Router**: The application uses the `react-router-dom` library for client-side routing. Navigation between Weather and TodoList is handled through `NavLink` components, ensuring a smooth and responsive user experience.

### Styling

- **CSS Modules**: Styles are scoped to individual components using CSS Modules, providing better modularity and preventing global style conflicts.

- **Responsive Design**: Media queries are used to make the application responsive, adjusting the layout for different screen sizes.

- **src/assets**: Contains static assets like images.

- **src/components**: Individual React components, each in its own file.

- **src/styles**: Holds stylesheets, with CSS Modules for component-specific styling.

- **src/App.js**: The main application component that includes the routing logic.

- **src/index.js**: The entry point of the application.

## Getting Started

1. Clone the repository: `git clone https://github.com/your-username/dashboard-app.git`

2. Install dependencies: `npm install`

3. Run the application: `npm run start`

4. Open the application in your browser: [http://localhost:3000](http://localhost:3000)

## To run the test

1. Run the command: `npm run test`

