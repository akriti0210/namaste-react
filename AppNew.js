import React from "react";
import ReactDOM from "react-dom/client";

// React.createElement => ReactElement-JS Object => HTMLElement(render)
const heading = React.createElement(
    "h1",
    { id: "heading" },
    "Namaste React"
);

console.log(heading);

const elem=<span>React Element</span>
// JSX - is not HTML but HTML like syntax or XML-like syntax
// JSX (transpiled before it reaches the JS) - PARCEL - Babel
// JSX=>React.createElement => ReactElement-JS Object => HTMLElement(render)
const jsxHeading = (
    <h1 id="heading" className="heading">
        {/* {elem} */}
        Namaste React using JSX
        {/* <HeadingComponent /> */}
    </h1>
);

console.log(jsxHeading);

const root = ReactDOM.createRoot(document.getElementById("root"));

// root.render(heading);

// root.render(jsxHeading);

// React Functional Component
// const HeadingComponent = () => {
//     return <h1>Namaste React Functional Component</h1>
// }
const Title = () => (
    <h1 className="head" tabIndex="5">
        Namaste React using JSX - Component
    </h1>
)

// Component Composition
const number = 1000;
const HeadingComponent = () => (
    <div id="container">
        {number}
        <h2>{100 + 300}</h2>
        {/* <h3>{jsxHeading}</h3> */}
        <Title />
        {/* {Title()} */}
        <h4>Namaste React Functional Component</h4>
    </div>
);

// const HeadingComponent2 = () => (
//     <h1>Namaste React Functional Component</h1>
// )

root.render(<HeadingComponent />);
// root.render(jsxHeading);


