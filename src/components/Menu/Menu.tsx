import React from 'react';
import { Link } from 'react-router-dom';
import './Menu.css';
import { CiMenuBurger } from 'react-icons/ci';
import { useState } from 'react';
import { IoMdClose } from 'react-icons/io';

const Menu = () => {
  const [isColumn, setIsColumn] = useState(false);
  return (
    <>
      <div>
        {isColumn ? (
          <IoMdClose
            className="nav-button"
            onClick={() => {
              setIsColumn(false);
            }}
          />
        ) : (
          <CiMenuBurger
            className="nav-button"
            onClick={() => {
              setIsColumn(true);
            }}
          />
        )}

        <div className={isColumn ? 'menu-nav open' : 'menu-nav'}>
          <div className="nav-item">
            <Link to="/">Home</Link>
          </div>
          <div className="nav-item">
            <Link to="/about">About</Link>
          </div>
          <div className="nav-item">
            <Link to="/contacts">Contacts</Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Menu;
