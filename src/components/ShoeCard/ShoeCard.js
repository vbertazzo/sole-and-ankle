import React from 'react';
import styled, { css } from 'styled-components/macro';

import { COLORS, WEIGHTS } from '../../constants';
import { formatPrice, pluralize, isNewShoe } from '../../utils';
import Spacer from '../Spacer';

const ShoeCard = ({
  slug,
  name,
  imageSrc,
  price,
  salePrice,
  releaseDate,
  numOfColors,
}) => {
  // There are 3 variants possible, based on the props:
  //   - new-release
  //   - on-sale
  //   - default
  //
  // Any shoe released in the last month will be considered
  // `new-release`. Any shoe with a `salePrice` will be
  // on-sale. In theory, it is possible for a shoe to be
  // both on-sale and new-release, but in this case, `on-sale`
  // will triumph and be the variant used.
  // prettier-ignore
  const variant = typeof salePrice === 'number'
  ? 'on-sale'
  : isNewShoe(releaseDate)
  ? 'new-release'
  : 'default'

  return (
    <Link href={`/shoe/${slug}`}>
      <Wrapper>
        <ImageWrapper>
          <Image alt="" src={imageSrc} />
        </ImageWrapper>
        {variant === 'on-sale' && <SaleFlag>Sale</SaleFlag>}
        {variant === 'new-release' && <NewFlag>Just Released!</NewFlag>}
        <Spacer size={12} />
        <Row>
          <Name>{name}</Name>
          <Price isOnSale={variant === 'on-sale'}>{formatPrice(price)}</Price>
        </Row>
        <Row>
          <ColorInfo>{pluralize('Color', numOfColors)}</ColorInfo>
          {variant === 'on-sale' && <SalePrice>{formatPrice(salePrice)}</SalePrice>}
        </Row>
      </Wrapper>
    </Link>
  );
};

const Link = styled.a`
  text-decoration: none;
  color: inherit;
`;

const Wrapper = styled.article`
  position: relative;
`;

const Flag = styled.div`
  border-radius: 2px;
  color: ${COLORS.white};
  font-weight: ${WEIGHTS.bold};
  font-size: ${ 14 / 16 }rem;
  height: 32px;
  line-height: 32px;
  padding: 0 10px;
  position: absolute;
  right: -4px;
  top: 12px;
`

const SaleFlag = styled(Flag)`
  background-color: ${COLORS.primary};
`

const NewFlag = styled(Flag)`
  background-color: ${COLORS.secondary};
`

const ImageWrapper = styled.div`
  position: relative;
  overflow: hidden;
  border-radius: 16px 16px 4px 4px;
`;

const Image = styled.img`
  max-width: 100%;
`;

const Row = styled.div`
  font-size: 1rem;
  display: flex;
  justify-content: space-between;
`;

const Name = styled.h3`
  font-weight: ${WEIGHTS.medium};
  color: ${COLORS.gray[900]};
`;

const Price = styled.span`
  ${p => p.isOnSale && css`
    color: ${COLORS.gray[700]};
    text-decoration: line-through;
  `}
`;

const ColorInfo = styled.p`
  color: ${COLORS.gray[700]};
`;

const SalePrice = styled.span`
  font-weight: ${WEIGHTS.medium};
  color: ${COLORS.primary};
`;

export default ShoeCard;
