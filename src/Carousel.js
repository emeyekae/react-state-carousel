import { useState } from "react";
import "./Carousel.css";
import Card from "./Card";

/** Carousel: displays images and arrows to navigate through them
 * 
 * Props:
 * - photos: array of {src, caption} objects
 * - title: string describing the collection of images
 * 
 * State:
 * - currCardIdx: integer for current card index
 * 
 * App --> Carousel --> Card
 */

 function Carousel({ photos, title }) {
  const [currCardIdx, setCurrCardIdx] = useState(0);

  const currCard = photos[currCardIdx];
  const total = photos.length;


  const goForward = () => {
    // Move forward only if not on the last photo
    if (currCardIdx < photos.length - 1) {    //fix
      setCurrCardIdx(currCardIdx + 1);
    }
  };
  
  //fix
  const goBackward = () => {                   
    // Move backward only if not on the first photo
    if (currCardIdx > 0) {
      setCurrCardIdx(currCardIdx - 1);
    }
  };

  return (
    <div className="Carousel">
      <h1>{title}</h1>
      <div className="Carousel-main">
        {/* remove left arrow if on first photo and fill empty space*/}
        {currCardIdx === 0 && 
        (<i className="bi bi-arrow-left-circle" style={{ color: 'white' }} />)}

        {currCardIdx > 0 && 
        (<i className= "bi bi-arrow-left-circle ps-35" onClick={goBackward}/>)}
        <Card
          caption={currCard.caption}
          src={currCard.src}
          currNum={currCardIdx + 1}
          totalNum={total}
        />
        {/* remove right arrow if on last photo and fill empty space */}
        {currCardIdx >= photos.length -1 && (
        <i className= "bi bi-arrow-right-circle" style={{ color: 'white' }} />)}
      
        {currCardIdx < photos.length -1 && (
        <i className= "bi bi-arrow-right-circle" onClick={goForward}/>)}
      </div>
    </div>
  );
}

export default Carousel;
