import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { FavCountContext, FavCountContextType } from "../../core/context/app-context";
import styles from './header.module.scss';

const RMHeader = () => {
    const {favCount} = useContext(FavCountContext) as FavCountContextType;  
  return (
    <header className="bg-light">
      <div className="container d-flex justify-content-between">
        <div>
          <Link to="/" className={`"btn btn-link ${styles.rmLinkBtn}`}>Ricky Morty App</Link>
        </div>
        <div>
          <Link to="/favourite" className={`"btn btn-link ${styles.rmLinkBtn}`}>
            <i className="bi bi-heart-fill btn btn-link"></i> 
          </Link>
         <span className={styles.counter}>{favCount}</span>
        </div>
      </div>
    </header>
  );
};

export default RMHeader;
