/**
 * 
 * <div id="parent">
 *      <div id="child">
 *          <h1>Sumita</h1>
 *      </div>
 * </div>
 */


const parent=React.createElement(
    "div",
    {id:"parent"}, 
    React.createElement(
        "div", 
        {id:"child"}, React.createElement("h1",{}, "Sumita")
    )
);

/**
 * 
 * <div id="par">
 *      <div id="child">
 *          <h1>Sumita</h1>
 *          <h1>Life</h1>
 *      </div>
 * </div>
 */

const par=React.createElement(
    "div",
    {id:"parent"}, 
    React.createElement(
        "div", 
        {id:"child"}, 
        [React.createElement("h1",{}, "Sumita"),React.createElement("h1",{}, "Life")]
    )
);


const heading= React.createElement("h1", {}, "hello")
console.log(heading)// retun an object
//need to reander the heading inside root/parent where it will do dom manupulation
const root=ReactDOM.createRoot(document.getElementById("root"));
root.render(heading);

