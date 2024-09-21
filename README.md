# NPM Clone

A web application that replicates core functionalities of the npm (Node Package Manager) website, allowing users to search for packages, view package details, and access installation instructions.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [Routing](#routing)
- [Components](#components)
- [Contributing](#contributing)
- [License](#license)

## Features

- **Search Functionality**: Users can search for npm packages using a search bar, with live search results displayed in a dropdown.
- **Package Details Page**: Users can view detailed information about individual packages, including:
  - Description
  - Maintainers
  - Installation instructions
  - Repository links
  - README content
- **Version Navigation**: View details for specific package versions.
- **Responsive Design**: Optimized for various screen sizes using Tailwind CSS.

## Technologies Used

  - React
  - React Router
  - Tailwind CSS
  - Markdown rendering with `@uiw/react-markdown-preview`
  - Toast notifications with `react-toastify`
  - React Query
  - Typescript

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/npm-clone.git
   
2. Navigate to the project directory:
   ```bash
   cd npm-clone
   
3. Install the dependencies:
   ```bash
   npm install
   
4. Start the development server:
   ```bash
   npm run dev

## Usage

1. Open your browser and navigate to http://localhost:3000.
2. Use the search bar on the home page to find any npm packages.
3. Click on a package name to view its details, including installation commands and maintainers.

## Routes

- Home Page: `/` - Displays the main landing interface.
- Search Results Page: `/search?query=<search-term>` - Displays the results for the search query.
- Package Detail Page: `/package/<package-name>/<version>` - Displays details for the specified package and version.
