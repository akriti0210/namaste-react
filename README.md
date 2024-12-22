# Namaste React

# Parcel

- Dev Build
- Local server
- HMR = Hot Module Replacement
- File Watching Alogorithm - written in C++
- Caching - Faster Builds
- Image Optimization
- Minification
- Bundling
- Compress
- Consistent Hashing
- Code Splitting
- Differential Bundling - supports older browsers
- Diagnostic
- Error Handling/Suggestions
- Hosting on https
- Tree Shaking - remove unused code
- Lazy mode
- Different dev and prod bundles


# Food ordering app

// Header
//     - Logo
//     - Nav Items
// Body
//     - Search
//     - RestaurantContainer
//         - RestaurantCard
//             - img
//             - Name of res, Star Rating, cuisines, delivery time, etc
// Footer
//     - Copyright
//     - Links
//     - Address
//     - Contacts

Two types of Export/Import

1. Default
export default Component;
import Component from "path";

2. Named
export const Component;
import {Component} from "path;

# Redux Toolkit
- Install @reduxjs/toolkit and react-redux
- Build our store
- Connect our store to our app
- Slice (cartSlice)
- dispatch(action)
- Selector

# Types of testing (developer)
- Unit Testing
- Integration Testing
- End to End Testing - e2e testing


# Setting up Testing in our app
- Install React Testing Library
- Install Jest
- Install Babel dependencies
- Configure Babel
- Configure Parcel Config file to disable default babel transpilation
- Jest Configuration
- Install JSDom library
- Install @babel/preset-react to make JSX work in test cases
- Include @babel/preset-react inside my babel config
- Install @testing-library/jest-dom