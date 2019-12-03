import React from "react";

import "./Spinner.scss";
const Spinner = props => {
  // const [timeOut, setTimer] = useState(false);
  let spinner = <div className="loader"></div>;
  // if (timeOut) {
  //   spinner = (
  //     <Row>
  //       <Col>
  //         <h4>Sorry! Something went wrong. Please try again later.</h4>
  //       </Col>
  //     </Row>
  //   );
  // }
  // useEffect(() => {
  //   setTimeout(() => {
  //     console.log("Done");
  //     setTimer(true);
  //   }, 10000);
  // }, []);

  return <> {spinner}</>;
};

export default Spinner;
