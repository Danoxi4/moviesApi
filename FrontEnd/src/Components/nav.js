import React, { useState } from 'react';
import { Bar, Hamburger, NavLink, NavLinks, Logo, Navbar, Input, Spacer } from '../styles/navStyle';
import AuthModal from '../Components/authModal'; // Make sure you import the AuthModal component

const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTab, setModalTab] = useState('signIn');

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const openModal = (tab) => {
    setModalTab(tab);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Navbar>
        <Logo>MovieLand</Logo>
        <NavLinks isOpen={isOpen}>
          <Input type="text" placeholder="Search..." />
          <NavLink href="#intro">Home</NavLink>
          <NavLink href="#intro">About</NavLink>
          <NavLink href="#intro">Movies</NavLink>
          <NavLink href="#movies">Trending</NavLink>
          <NavLink href="#contact">Contact</NavLink>
          <Spacer/>
          <NavLink onClick={() => openModal('signIn')}>Sign In</NavLink>
          <NavLink onClick={() => openModal('signUp')}>Sign Up</NavLink>
        </NavLinks>
        <Hamburger onClick={toggleMenu}>
          <Bar />
          <Bar />
          <Bar />
        </Hamburger>
      </Navbar>
      {isModalOpen && <AuthModal onClose={closeModal} initialTab={modalTab} />}
    </>
  );
};

export default Nav;
