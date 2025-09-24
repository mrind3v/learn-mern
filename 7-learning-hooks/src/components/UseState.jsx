import React from "react";
import { useState } from "react";
function UseState() {
  // EG-1
  const [color, setColor] = useState("Red");

  function changeColor() {
    if (color == "Red") {
      setColor("Blue");
    } else {
      setColor("Red");
    }
  }

  // EG-2
  // const [brand, setBrand] = useState("Ferrari")
  // const [model, setModel] = useState("Roma")
  // const [year, setYear] = useState('2023')
  // const [carColor, setCarColor] = useState('Red')

  // instead of this, we can create a state object
  const [car, setCar] = useState({
    brand: "Ferrari",
    model: "Roma",
    year: 2023,
    color: "red",
  });

  function updateCarColor() {
    // setCar({
    //   color: "red" // this will replace whole object in useState with this new object - AVOID!
    // })
    // instead do
    setCar((prev) => {
      // here prev represents the prev data in the car useState or state
      return { ...prev, color: "yellow" }; // new object with prev data + new color
    });
  }

  // EG-3 Updating state based on prev state
  const [count, setCount] = useState(0);

  const increaseCount = () => {
    // setCount((prev) => {
    //   return (prev + 1);
    // });
    // OR
    //setCount(count + 1);

    // imp observation
    // setCount(count+1)
    // setCount(count+1)
    // setCount(count+1)
    // setCount(count+1)
    // wont increase the count by 4 when you tap on increase because all of these setCounts are taking the
    // initial value of count only which is 0, hence UI is not getting updated. To fix that, use prev value
    setCount((prev) => prev + 1);
    setCount((prev) => prev + 1);
    setCount((prev) => prev + 1);
    setCount((prev) => prev + 1); // This would indeed increase by 4. Directly using count would just use the
    // the initial value
  };

  return (
    <>
      <h1>Hello world! My Fav color is {color}</h1>
      <button onClick={changeColor}>Color Change</button>

      <h1>My {car.brand}</h1>
      <h3>
        It is a {car.color} {car.model} from {car.year}
      </h3>
      <button onClick={updateCarColor}>Change Car Color</button>

      <h1>Count: {count}</h1>
      <button onClick={increaseCount}>Increase</button>
    </>
  );
}

export default UseState;
