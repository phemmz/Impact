import React from 'react';
import styled from 'styled-components';
import Select from 'react-select/creatable';

import close from '../assets/close.svg';
import Modal from 'react-modal';

Modal.setAppElement('#root');

const customStyles = {
  content : {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)'
  }
};

const options = [];

const Header = styled.h2`
  margin: 0 0 1rem 0;
`;

const Label = styled.span`
  margin: 0 0 0.5rem 0;
  font-size: 0.8rem;
  color: #4d5868;
`;

const Button = styled.button`
  width: 100%;
  height: 2rem;
  padding: 0.4rem 1rem;
  border: 1px solid #4065e0;
  border-radius: 0.4rem;
  font-size: 1rem;
  color: #fff;
  background-color: #4065E0;
  cursor: pointer;
  &:focus {
    outline: 0;
  }
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

const CloseBtn = styled.button`
  width: 2rem;
  height: 2rem;
  position: absolute;
  right: 0;
  top: 0;
  margin: 1.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 1rem;
  background-color: transparent;
  &:focus {
    outline: 0;
  }
`;

const inputFields = [
  {
    name: 'name',
    label: 'Name'
  },
  {
    name: 'description',
    label: 'Description'
  },
  {
    name: 'email',
    label: 'Email'
  },
  {
    name: 'phoneNumber',
    label: 'Phone Number'
  },
  {
    name: 'website',
    label: 'Website'
  },
  {
    name: 'category',
    label: 'Category'
  }
];

const CustomModal = ({
  modalIsOpen,
  toggleModal,
  handleSubmit,
  handleMultiSelect,
  handleInputChange,
  defaultValue,
  inputValues
}) => {
  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={toggleModal}
      style={customStyles}
    >
      <CloseBtn onClick={toggleModal}>
        <img src={close} width="14px" height="14px" alt="close"  />
      </CloseBtn>
      <div>
        <Header>Add Business</Header>
        <form onSubmit={handleSubmit}>
          {
            inputFields.map(({ name, label }) => {
              return (
                <div
                  key={name}
                  style={{ display: 'flex', flexDirection: 'column', marginBottom: '0.8rem' }}
                >
                  <Label>{label}</Label>
                  {name === 'category' ? (
                    <Select
                      isMulti
                      onChange={handleMultiSelect}
                      options={options}
                      defaultValue={defaultValue}
                      style={{
                        control: styles => ({ ...styles, width: '20rem' })
                      }}
                    />
                  ) : (
                    <Input
                      name={name}
                      onChange={handleInputChange}
                      autoComplete="off"
                      value={inputValues[name]}
                      required
                    />
                  )}
                </div>
              );
            })
          }
          <Button>
            Submit
          </Button>
        </form>
      </div>
    </Modal>
  );
}

export default CustomModal;
