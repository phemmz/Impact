import React, { useState } from 'react';
import styled from 'styled-components';
import SwipeableViews from 'react-swipeable-views';

import emailIcon from '../assets/email.svg';
import global from '../assets/global.svg';
import phone from '../assets/phone.svg';
import edit from '../assets/edit.svg';
import trash from '../assets/trash.svg';

const CardWrapper = styled.div`
  width: 18rem;
  border-radius: 0.4rem;
  background-color: #fff;
  box-shadow: 0 5px 15px rgba(0,0,0,.08);
`;

const TopSection = styled.div`
  position: relative;
  height: 8rem;
  width: 100;
  border-top-right-radius: 0.4rem;
  border-top-left-radius: 0.4rem;
`;

const Image = styled.img`
  height: 8rem;
  border-top-right-radius: 0.4rem;
  border-top-left-radius: 0.4rem;
`;

const PaginationWrapper = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 0.5rem;
`;

const FlexContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const PaginationDot = styled.div`
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  margin-left: ${({ marginLeft }) => marginLeft};
  border-radius: ${({ borderRadius }) => borderRadius};
  background-color: #fbf9f9;
`;

const EditWrapper = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  margin: 0.7rem 0.7rem 0 0;
  display: flex;
  align-items: center;
`;

const EditContainer = styled.div`
  width: 2rem;
  height: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 1rem;
  margin-left: ${({ marginLeft }) => marginLeft || 0};
  background-color: #fff;
`;

const DetailsContainer = styled.div`
  height: 8rem;
  padding: 0.8rem;
  overflow: hidden;
  background-color: #fbf9f9;
`;

const Text = styled.h5`
  margin: 0;
  font-weight: 300;
  color: #91979f;
`;

const CategoryText = styled.h5`
  margin: 0;
  font-weight: 500;
  color: #727984;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Card = ({
  id,
  carouselIndex,
  businessImages,
  isAdmin,
  handleEditButton,
  handleDelete,
  name,
  description,
  email,
  phoneNumber,
  website,
  category
}) => {
  const [currentImage, setIndex] = useState(carouselIndex);
  return (
    <CardWrapper>
      <TopSection>
        <SwipeableViews autoPlay={false} index={currentImage[id]} onChangeIndex={(value) => setIndex(state => ({ ...state, [id]: value }))}>
          {businessImages.map((imageUrl, index) => {
            return (
              <Image key={index} src={imageUrl} width="100%" height="100%" alt="business-name" />
            );
          })}
        </SwipeableViews>
        <PaginationWrapper>
          <FlexContainer>
            {businessImages.map((image, index) => {
              return (
                <PaginationDot
                  key={index}
                  onClick={() => setIndex(state => ({ ...state, [id]: index }))}
                  width={currentImage[id] === index ? '0.5rem' : '0.4rem'}
                  height={currentImage[id] === index ? '0.5rem' :  '0.4rem'}
                  marginLeft={index === 0 ? 0 : '0.3rem'}
                  borderRadius={currentImage[id] === index ? '0.25rem' : '0.2rem'}
                />
              );
            })}
          </FlexContainer>
        </PaginationWrapper>
        {isAdmin ? (
          <EditWrapper>
            <EditContainer onClick={() => handleEditButton(id)}>
              <img src={edit} width="14px" height="14px" alt="edit" />
            </EditContainer>
            <EditContainer marginLeft="0.4rem" onClick={() => handleDelete(id)}>
              <img src={trash} width="14px" height="14px" alt="trash" />
            </EditContainer>
          </EditWrapper>
        ) : null}
      </TopSection>
      <DetailsContainer>
        <CategoryText>{category.filter(currentValue => currentValue).join(', ')}</CategoryText>
        <h2 style={{ margin: '0.2rem 0', fontWeight: 'bold', color: '#3a4454' }}>{name}</h2>
        <Text>{description}</Text>
      </DetailsContainer>
      <div style={{ height: '4rem', padding: '1rem', borderTop: '1px solid #f6f7f9' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <img src={emailIcon} width="14px" height="14px" alt="email" />
            <span style={{ marginLeft: '0.5rem', fontSize: '0.7rem', color: '#91979f' }}>{email}</span>
          </div>
          {phoneNumber ? (
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <img src={phone} width="14px" height="14px" alt="email" />
              <span style={{ marginLeft: '0.5rem', fontSize: '0.7rem', color: '#91979f' }}>{phoneNumber}</span>
            </div>
          ) : null}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', marginTop: '0.3rem' }}>
          <img src={global} width="14px" height="14px" alt="email" />
          <span style={{ marginLeft: '0.5rem', fontSize: '0.7rem', color: '#91979f' }}>{website}</span>
        </div>
      </div>
    </CardWrapper>
  );
}

export default Card;
