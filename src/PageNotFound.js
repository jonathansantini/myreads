import React from 'react';
import { Link } from 'react-router-dom';

/**
* Functional component used to display a page not found.
* @extends React
*/
function PageNotFound () {
  return (
    <div className="page-not-found">
      <div className="page-not-found__copy">
        Oops...Looks like something went wrong!
      </div>
      <div className="page-not-found__actions">
        <Link to="/">Click here</Link> to return to the MyReads homepage.
      </div>
    </div>
  )
}

export default PageNotFound;