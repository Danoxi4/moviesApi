import styled from 'styled-components';

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const Header = styled.header`
  background: #041D56;
  color: #ADE1FB;
  padding: 1rem;
  text-align: center;
  font-size: 1.5rem;
`;

const Body = styled.div`
  flex: 1;
  padding: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Footer = styled.footer`
  background: #041D56;
  color: #ADE1FB;
  padding: 1rem;
  text-align: center;
`;

const MoviesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1rem;
  width: 100%;
`;

const MovieCard = styled.div`
  position: relative;
  background: url(${props => props.backgroundImage}) no-repeat center center;
  background-size: cover;
  border-radius: 10px;
  overflow: hidden;
  color: #fff;
  text-align: left;
  height: 300px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 1rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    z-index: 0;
  }

  div {
    position: relative;
    z-index: 1;
  }
`;

const MovieTitle = styled.h3`
  margin: 0;
`;

const MovieDetails = styled.p`
  margin: 0.5rem 0;
`;

const RemoveButton = styled.button`
  background: #e74c3c;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  cursor: pointer;
  transition: background 0.3s;

  &:hover {
    background: #c0392b;
  }
`;

export { 
    PageContainer,
    Header,
    Body,
    Footer,
    MoviesGrid,
    MovieCard,
    MovieTitle,
    MovieDetails,
    RemoveButton
}