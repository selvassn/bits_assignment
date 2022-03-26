import React from "react";
import CharactersList from "../components/characters/characters-list";
import RMHeader from "../components/generic/header";
import { Outlet } from "react-router";
const Home = () => {
  return (
    <React.Fragment>
      <RMHeader />
      <main>
        <section className="jumbotron">
          <div className="container py-4">
            <Outlet />
          </div>
        </section>
      </main>
    </React.Fragment>
  );
};

export default Home;
