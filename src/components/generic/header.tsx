import React from "react";
import { Link } from "react-router-dom";

const RMHeader = () => {
  return (
    // <nav className="navbar navbar-light bg-light">
    //   <a className="navbar-brand">Navbar</a>
    //   <Link className="nav-item nav-link disabled" to="favourites">Favourite List </Link>
    //   <form className="form-inline">
    //     <input
    //       className="form-control mr-sm-2"
    //       type="search"
    //       placeholder="Search"
    //       aria-label="Search"
    //     />
    //   </form>
    // </nav>
    <header className="bg-light">
      <div className="container d-flex justify-content-between">
        <div>
          <Link to="/">Ricky Morty App</Link>
        </div>
        <div>
          <Link to="/favourite">
            <i className="bi bi-heart px-2 btn btn-link"></i>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default RMHeader;
