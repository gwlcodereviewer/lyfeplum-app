import React from 'react';
import {shadowStyle} from '../../../styles/style';
import {rpx} from '../../../styles/styleUtils';
import PrimaryButton from '../../components/button';
import {strings} from '../../localization';
import {
  ChapterContainer,
  ChapterText,
  ChildContainer,
  ChildRightContainer,
  PlanTypeText,
  PriceText,
  RowContainer,
  RowMainContainer,
} from './styled';

interface RowProps {
  item: any;
  onPurchase: (item: any) => void;
  showLoader?: boolean;
}

const SubscriptionRow: React.FC<RowProps> = ({
  item,
  onPurchase,
  showLoader,
}: RowProps) => {
  const {buy} = strings;
  return (
    <RowMainContainer>
      <RowContainer style={shadowStyle.shadowProp}>
        <ChildContainer>
          <PriceText>{item.price_label}</PriceText>
          <ChapterContainer>
            <ChapterText>{item.access}</ChapterText>
          </ChapterContainer>
        </ChildContainer>
        <ChildRightContainer>
          <PlanTypeText>{item.plan}</PlanTypeText>
          <PrimaryButton
            buttonStyle={{
              height: rpx(28),
              width: rpx(100),
              paddingHorizontal: rpx(10),
              marginTop: rpx(10),
            }}
            title={buy}
            onPress={() => onPurchase(item)}
            showLoader={showLoader}
          />
        </ChildRightContainer>
      </RowContainer>
    </RowMainContainer>
  );
};

export default SubscriptionRow;
