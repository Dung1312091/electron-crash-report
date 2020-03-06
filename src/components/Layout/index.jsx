import React, { memo } from "react";
import { Link } from "react-router-dom";
import "./style.scss";
const Header = memo(() => {
  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/post">Post</Link>
    </nav>
  );
});
export default function Layout({ children }) {
  return (
    <div className="layout">
      <div className="layout__header">
        <Header />
      </div>
      <div className="layout__content">{children}</div>
    </div>
  );
}
