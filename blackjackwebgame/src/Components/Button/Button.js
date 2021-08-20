import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core";


const useStyles = makeStyles({
  container: {
    backgroundColor: "transparent",
    width: (styleProps) => styleProps.width,
    height: (styleProps) => styleProps.height,
    position: "relative",
    "&:hover": {
      "& $btnContainer": {
        backgroundColor: (styleProps) => styleProps.backgroundColor,
      },
    },
    "&:hover": {
      "& $btnContainer:before": {
        backgroundColor: (styleProps) => styleProps.backgroundColor,
      },
    },
    "&:hover": {
      "& $btn": {
        color: "black",
        backgroundPosition: "-100% 0",
      },
    },
  },
  btnContainer: {
    backgroundColor: (styleProps) => styleProps.borderColor,
    border: "none",
    width: (styleProps) => styleProps.width + "px",
    height: (styleProps) => styleProps.height + "px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    overflow: "hidden",
    clipPath: (styleProps) => styleProps.polygonValues,
    "&:before": {
      content: `''`,
      position: "absolute",
      backgroundColor: "#222324",
      border: "none",
      width: (styleProps) => styleProps.widthY + "px",
      height: (styleProps) => styleProps.heightY + "px",
      clipPath: (styleProps) => styleProps.polygonValuesInside,
    },
    "&:hover": {
      backgroundColor: (styleProps) => styleProps.backgroundColor,
    },
    "&:hover:before": {
      backgroundColor: (styleProps) => styleProps.backgroundColor,
    },
  },
  btn: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "white",
    width: (styleProps) => styleProps.widthY + "px",
    height: (styleProps) => styleProps.heightY + "px",
    position: "relative",
    transition: "all 1s",
    overflow: "hidden",
    zIndex: "10",
    cursor: "pointer",
    backgroundImage: (styleProps) => styleProps.backgroundGradient,
    clipPath: (styleProps) => styleProps.polygonValuesInside,
    backgroundSize: "200%",
    transition: "0.5s ease-out",
  },
});

const Button = (props) => {
  const {
    width,
    height,
    bottomRightCorner,
    bottomLeftCorner,
    topRightCorner,
    topLeftCorner,
    backgroundColor,
    cutLenght,
    margin,
    children,
    borderColor,
    handleOnClick
  } = props;

  const [polygonValues, setPolygonValues] = useState("");
  const [polygonValuesInside, setPolygonValuesInside] = useState("");

  const [corners, setCorners] = useState([
    {
      coords: [ 0, 0 , 0, 0 ],
      affect:[1,1] 
    },
    {
      coords: [width, 0 , width, 0 ],
      affect:[-1,1] 
    },
    {
      coords: [ width, height, width, height ],
      affect:[-1,-1] 
    },
    {
      coords: [0, height, 0,height ],
      affect:[1,-1] 
    },
  ]);

  const [cornersInside, setCornersInside] = useState([
    {
      coords: [ 0, 0 , 0, 0 ],
      affect:[1,1] 
    },
    {
      coords: [width  - margin , 0 , width  - margin, 0 ],
      affect:[-1,1] 
    },
    {
      coords: [ width  - margin, height  - margin, width  - margin, height   - margin],
      affect:[-1,-1] 
    },
    {
      coords: [0, height  - margin, 0,height - margin ],
      affect:[1,-1] 
    },
  ]);

  
  let backgroundGradient =
    "linear-gradient(to right, #222311 50%, " + backgroundColor + " 50%)";
  let heightY = height - margin - 1;
  let widthY = width - margin - 1;
  let cutLenghtInside = cutLenght - 1;
 

  let generatePoly = (cutLenght, useCorners) => {
    return [topLeftCorner,topRightCorner,bottomRightCorner,bottomLeftCorner].map((el,index) => {
   
      if(el) {
        let corner = useCorners[index]['coords'].map(el=>parseInt(el));
        let affect = useCorners[index]['affect'];
        let flipper =  [[corner[0] + affect[0] * cutLenght,corner[1]],[corner[2],corner[3] + affect[1] * cutLenght]]
        if((index%2)) {
            return [...flipper[0],...flipper[1]];
        } else {
          return [...flipper[1],...flipper[0]];
        }
      } else {
        return useCorners[index]['coords'].map(el=>parseInt(el));;
      }
  }).map(el=> {
    return el[0] + "px " + el[1] + "px, " + el[2] + "px " + el[3] + "px";
  }).join(",")

  }

  useEffect(() => {
  let myCorners = generatePoly(cutLenght,corners);
  let myCornersInside = generatePoly(cutLenghtInside,cornersInside)
  setPolygonValues(
    `polygon(${myCorners})`
  );
  setPolygonValuesInside(
    `polygon(${myCornersInside})`
  );

   
  }, []);

  const styleProps = {
    width,
    height,
    heightY,
    widthY,
    cutLenght,
    backgroundColor,
    polygonValues,
    polygonValuesInside,
    backgroundGradient,
    borderColor,
  };


  const classes = useStyles(styleProps);

  return (
    <div>
      <div className={classes.container} onClick={handleOnClick}>
        <div className={classes.btnContainer}>
          <div className={classes.btn} >{children}</div>
        </div>
      </div>
    </div>
  );
};

export default Button;
