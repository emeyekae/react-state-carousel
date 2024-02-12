import React from "react";
import { render } from "@testing-library/react";
import Card from "./Card";

// smoke test
test("renders withoout crashing", () => {
    render(<Card />);
  })

// snapshot Test 
test("matches snapshot", function() {
    const {asFragment} = render(<Card />);
    expect(asFragment()).toMatchSnapshot();
  });
  



  

  