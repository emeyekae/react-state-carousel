import React from "react";
import { render, fireEvent,  screen, findByLabelText } from "@testing-library/react";
import Carousel from "./Carousel";
import TEST_IMAGES from "./_testCommon.js";


it("works when you click on the right arrow", function() {
  const { container } = render(
    <Carousel
      photos={TEST_IMAGES}
      title="images for testing"
    />
  );
  // expect the first image to show, but not the second
  expect(
    container.querySelector('img[alt="testing image 1"]')
  ).toBeInTheDocument();
  expect(
    container.querySelector('img[alt="testing image 2"]')
  ).not.toBeInTheDocument();

  // move forward in the carousel
  const rightArrow = container.querySelector(".bi-arrow-right-circle");
  fireEvent.click(rightArrow);

  // expect the second image to show, but not the first
  expect(
    container.querySelector('img[alt="testing image 1"]')
  ).not.toBeInTheDocument();
  expect(
    container.querySelector('img[alt="testing image 2"]')
  ).toBeInTheDocument();
  
});

// smoke test
test("renders without crashing", function() {
  const photos = [
    { title: 'Title 1', src: './image1.jpg' },
    { title: 'Title 2', src: './image2.jpg' },
    { title: 'Title 3', src: './image3.jpg' },
  ];
  const title = 'Test Carousel';
  
  // Render the Carousel component
  const { getByText } = render(<Carousel photos={photos} title={title} />);
  
  // Check if the title is rendered
  const titleElement = getByText(title);
  expect(titleElement).toBeInTheDocument();
});


// snapshot test
test('renders component correctly', () => {
  const photos = [
    { title: 'Title 1', src: './image1.jpg' },
    { title: 'Title 2', src: './image2.jpg' },
    { title: 'Title 3', src: './image3.jpg' },
  ];
  const title = 'Test Carousel';
  
  // Render the Carousel component
  const { container } = render(<Carousel photos={photos} title={title} />);
  
  // Rendered component should match the snapshot
  expect(container).toMatchSnapshot();
});


//Part 3: Bug! Left arrow.  It should go to the first image from the 
//second immage


test("the left arrow works when you click on the right arrow to go to second image and then the left arrow to return to the first image", function() {
  const { container } = render(
    <Carousel
      photos={TEST_IMAGES}
      title="images for testing"
    />
  );
  // expect the first image to show, but not the second
  expect(
    container.querySelector('img[alt="testing image 1"]')
  ).toBeInTheDocument();
  expect(
    container.querySelector('img[alt="testing image 2"]')
  ).not.toBeInTheDocument();

  // go to second image with right arrow
  const rightArrow = container.querySelector(".bi-arrow-right-circle");
  fireEvent.click(rightArrow);

  expect(
    container.querySelector('img[alt="testing image 2"]')
  ).toBeInTheDocument();
  expect(
    container.querySelector('img[alt="testing image 1"]')
  ).not.toBeInTheDocument();

  // now got to the first image from the second with the left arrow
  const leftArrow = container.querySelector(".bi-arrow-left-circle");
  fireEvent.click(leftArrow);

 // expect the first image to show
 expect(
   container.querySelector('img[alt="testing image 2"]')
 ).not.toBeInTheDocument();
 expect(
   container.querySelector('img[alt="testing image 1"]')
 ).toBeInTheDocument();
});

//Part4: Bug! Exhausting the image array

/**if you’re on the last image and try to move forward, 
 * or if you’re on the first image and try to move backward, 
 * you get an error. To fix this, let’s just hide the left 
 * arrow on the first image and the right arrow on the last. */

test("the left arrow should not work or be visible while on the first image", function() {
  const { container } = render(
    <Carousel
      photos={TEST_IMAGES}
      title="images for testing"
    />
  );
  // expect the first image to show, but not the second
  expect(
    container.querySelector('img[alt="testing image 1"]')
  ).toBeInTheDocument();
  expect(
    container.querySelector('img[alt="testing image 2"]')
  ).not.toBeInTheDocument();

  // get the needed attributes
  let leftArrow = container.querySelector(".bi-arrow-left-circle")
  let rightArrow = container.querySelector(".bi-arrow-right-circle")

 
  // expect the left color to be white and right be default ("")
  expect(leftArrow).toHaveStyle('color: white');
  expect(rightArrow).toHaveStyle('color: ""');  //default

  //click the right arrow
  const rightArrowButton = container.querySelector(".bi-arrow-right-circle")
  fireEvent.click(rightArrowButton);

  // should be on the 2nd photo
  expect(
    container.querySelector('img[alt="testing image 2"]')
  ).toBeInTheDocument();
  expect(
    container.querySelector('img[alt="testing image 1"]')
  ).not.toBeInTheDocument();

  // get the needed attributes
  leftArrow = container.querySelector(".bi-arrow-left-circle")
  rightArrow = container.querySelector(".bi-arrow-right-circle")

  // both left and right arrows should be the default color.
  expect(leftArrow).toHaveStyle('color: ""');  //default
  expect(rightArrow).toHaveStyle('color: ""');  //default

  // click the right arrow again
  fireEvent.click(rightArrowButton);

  // should be on the 3rd photo
  expect(
    container.querySelector('img[alt="testing image 3"]')
  ).toBeInTheDocument();
  expect(
    container.querySelector('img[alt="testing image 2"]')
  ).not.toBeInTheDocument();

  // get the needed attributes
  leftArrow = container.querySelector(".bi-arrow-left-circle")
  rightArrow = container.querySelector(".bi-arrow-right-circle")

  // the left arrow should be default color and right should be white.
  expect(leftArrow).toHaveStyle('color: ""');  //default
  expect(rightArrow).toHaveStyle('color: white');  

  });

