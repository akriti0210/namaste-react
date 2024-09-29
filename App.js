
/*
<div id="parent">
    <div id="child">
        <h1>I'm h1 tag</h1>
        <h2>I'm h2 tag</h2>
    </div>
    <div id="child2">
        <h1>I'm h1 tag</h1>
        <h2>I'm h2 tag</h2>
    </div>  
</div> 
*/

/* complex, so JSX comes. React can be written in JSX */
const parent = React.createElement(
    "div",
    { id: "parent" },
    [
        React.createElement("div",
            { id: "child1" },
            [React.createElement("h1", {}, "I'm h1 tag"),
            React.createElement("h2", {}, "I'm h2 tag")]
        ),
        React.createElement("div",
            { id: "child2" },
            [React.createElement("h1", {}, "I'm h1 tag"),
            React.createElement("h2", {}, "I'm h2 tag")]
        )
    ]
);


// const heading = React.createElement("h1", { id: "heading", xyz: "abc" }, "Hello World from React");
const root = ReactDOM.createRoot(document.getElementById("root"));
// root.render(heading);

root.render(parent);
console.log(parent); //object

// if something is present inside div root it will be replace by root.render(parent)
// React only works inside the element we create as root

// We can run react inside a small portion of the already existing app
