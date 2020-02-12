import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import uuid from 'uuid';

import { GeneralContext } from '../../context/GeneralContext';
import { Card, CustomModal } from '../../components';
import { validateBusiness } from '../../utils/helper';
import plus from '../../assets/plus.svg';

const inputDefaultValues = {
  id: '',
  name: '',
  description: '',
  phoneNumber: '',
  email: '',
  website: '',
  category: [],
  images: []
};

const images = [
  'https://placeimg.com/288/164',
  'https://placeimg.com/288/164',
  'https://placeimg.com/288/164'
];

const HomeWrapper = styled.div`
  height: 100vh;
`;

const HomeTitle = styled.h2`
  margin: 1.5rem 0;
  color: #122330;
`;

const Input = styled.input`
  height: 2.2rem;
  width: 25rem;
  padding: 0.1rem 0.4rem;
  border-radius: 0.4rem;
  border: 1px solid #e3e9ed;
  font-size: 1rem;
  background-color: #fff;
  box-shadow: 0 0 1px #4065e0;
  &:focus {
    outline: 0;
  }
  @media(max-width: 460px) {
    width: 100%;
  }
`;

const CardWrapper = styled.div`
  max-width: 1280px;
  display: grid;
  grid-gap: 1rem;
  @media(min-width: 600px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (min-width: 900px) {
    grid-template-columns: repeat(3, 1fr);
  }
  @media(min-width: 1200px) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

const LogoutBtn = styled.button`
  width: 4rem;
  height: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 1rem;
  border-radius: 0.4rem;
  border: 1px solid #e3e9ed;
  background-color: #fff;
  cursor: pointer;
`;

const Home = () => {
  const data = JSON.parse(localStorage.getItem('businesses'));
  const carouselIndex = {};
  data && data.length && data.forEach(({ id }) => {
    carouselIndex[id] = 0;
  });
  const [businesses, setBusiness] = useState({
    businesses: data || [],
    businessesCopy: data || []
  });
  const [searchValue, setInput] = useState('');
  const [inputValues, setBusinessInput] = useState(inputDefaultValues);
  const [errorMessages, setErrorMessages] = useState(false);
  const { isAdmin, logout } = useContext(GeneralContext);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [defaultValue, setSelectDefault] = useState([]);
  const [isEdit, setEdit] = useState(false);

  const handleSearchInput = (event) => {
    const searchTerm = event.target.value;
    setInput(searchTerm);
    setBusiness(state => {
      const filteredBusiness = state.businessesCopy.filter(business =>
        business.name.toLowerCase().includes(searchTerm.toLowerCase()) || business.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
      return { ...state, businesses: searchTerm ? filteredBusiness : state.businessesCopy };
    });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setBusinessInput(state => ({ ...state, [name]: value }));
  };

  const handleMultiSelect = (selectedOption) => {
    setBusinessInput(state => ({
      ...state,
      category: selectedOption ? selectedOption.map(({ value }) => value) : []
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const { isValid, errors } = validateBusiness(inputValues);
    const { id = '' } = inputValues;
  
    if (isValid) {
      if (isEdit) {
        setBusiness(state => {
          const updatedBusiness = state.businessesCopy.map(business => {
            if (business.id === id) {
              return {
                ...business,
                ...inputValues,
                images
              };
            } else {
              return business;
            }
          });
          localStorage.setItem('businesses', JSON.stringify(updatedBusiness));

          return {
            ...state,
            businesses: updatedBusiness,
            businessesCopy: updatedBusiness
          }
        });
      } else {
        setBusiness(state => {
          const updatedBusiness = [...state.businessesCopy, { ...inputValues, id: uuid.v4(), images }];
          localStorage.setItem('businesses', JSON.stringify(updatedBusiness));

          return {
            ...state,
            businesses: updatedBusiness,
            businessesCopy: updatedBusiness
          }
        });
      }
      toggleModal();
    } else {
      setErrorMessages(errors);
    }
  };

  const handleEditButton = (businessId) => {
    const currentBusiness = businesses.businessesCopy.find(({ id }) => id === businessId);
    setBusinessInput(state => ({ ...state, ...currentBusiness }));
    setSelectDefault(currentBusiness.category.map(currentCategory => ({ label: currentCategory, value: currentCategory })));
    setEdit(true);
    setIsOpen(state => !state);
  };

  const handleDelete = (businessId) => {
    const filteredBusiness = businesses.businesses.filter(business => business.id !== businessId);
    localStorage.setItem('businesses', JSON.stringify(filteredBusiness));
    setBusiness(state => ({
      ...state,
      businesses: filteredBusiness,
      businessesCopy: filteredBusiness
    }));
  };

  const toggleModal = () => {
    setBusinessInput(inputDefaultValues);
    setSelectDefault([{ label: '', value: '' }]);
    setEdit(false);
    setIsOpen(state => !state);
  };

  return (
    <HomeWrapper>
      <div style={{ height: '4rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem', borderBottom: '1px solid #fbf9f9', backgroundColor: '#fff' }}>
        <h1 style={{ margin: 0, color: '#122330' }}>Impact</h1>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Input
            name="search"
            placeholder="Search"
            onChange={handleSearchInput}
            autoComplete="off"
            value={searchValue}
          />
          {isAdmin ? <LogoutBtn onClick={logout}>Logout</LogoutBtn> : null}
        </div>
      </div>
      <div style={{ padding: '1rem' }}>
        {isAdmin ?
          (
            <div onClick={toggleModal} style={{ display: 'flex', alignItems: 'center' }}>
              <HomeTitle>Add Business</HomeTitle>
              <div style={{ width: '3rem', height: '3rem', display: 'flex', alignItems: 'center', justifyContent: 'center', marginLeft: '2rem', borderRadius: '1.5rem', border: '1px solid #4065E0', backgroundColor: '#fff'}}>
                <img src={plus} width="20px" height="20px" alt="add" />
              </div>
            </div>
          ) :
          (
            <HomeTitle>Business List</HomeTitle>
          )}
        <CardWrapper>
          {businesses.businesses.map(({ id, name, description, email, phoneNumber, website, category, images: businessImages }) => {
            return (
              <Card
                key={id}
                businessImages={businessImages}
                carouselIndex={carouselIndex}
                id={id}
                name={description}
                email={email}
                phoneNumber={phoneNumber}
                website={website}
                category={category}
                handleDelete={handleDelete}
                handleEditButton={handleEditButton}
                isAdmin={isAdmin}
              />
            );
          })}
        </CardWrapper>
      </div>
      <CustomModal
        modalIsOpen={modalIsOpen}
        toggleModal={toggleModal}
        handleInputChange={handleInputChange}
        inputValues={inputValues}
        defaultValue={defaultValue}
        handleSubmit={handleSubmit}
        handleMultiSelect={handleMultiSelect}
      />
    </HomeWrapper>
  );
}

export default Home;
