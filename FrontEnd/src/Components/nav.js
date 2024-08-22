import React, { useState } from 'react';
import { Bar, Hamburger, NavLink, NavLinks, Logo, Navbar, Input, Spacer, MiniSpacer } from '../styles/navStyle';
import AuthModal from '../Components/authModal'; // Make sure you import the AuthModal component
import { AuthContextProvider } from '../Context/AuthContext';
import { useNavigate } from 'react-router-dom';


const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTab, setModalTab] = useState('signIn');

  const navigate = useNavigate();

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

  const goToMoviesPage = () => {
    navigate('/movies');
  };

  return (
    <>
      <Navbar>
        <Logo>MovieLand</Logo>
        <NavLinks isOpen={isOpen}>
          <NavLink href="#intro">Home</NavLink>
          <MiniSpacer />
          <NavLink href="#intro">About</NavLink>
          <MiniSpacer />
          <NavLink onClick={goToMoviesPage}>Movies</NavLink>
          <MiniSpacer />
          <NavLink href="#movies">Trending</NavLink>
          <MiniSpacer />
          <NavLink href="#contact">Contact</NavLink>
          <Spacer/>
          <Input type="text" placeholder="Search..." />
          <NavLink onClick={() => openModal('signIn')}>Sign In</NavLink>
          <NavLink onClick={() => openModal('signUp')}>Sign Up</NavLink>
        </NavLinks>
        <Hamburger onClick={toggleMenu}>
          <Bar />
          <Bar />
          <Bar />
        </Hamburger>
      </Navbar>
      {isModalOpen && <AuthContextProvider><AuthModal onClose={closeModal} initialTab={modalTab} /></AuthContextProvider>}
    </>
  );
};

export default Nav;
