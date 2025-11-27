import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {PurchaseError, requestSubscription, useIAP} from 'react-native-iap';
import {isIos, isPlay} from 'react-native-iap/lib/typescript/src/internal';
import PrimaryButton from '../../components/button';
import {contentContainerStyle, subscriptionSKU} from '../../utils';
import {Row} from './row';
import {MainContainer} from './styled';

export const SubscriptionsRequest = () => {
  const {subscriptions, getSubscriptions, currentPurchase, finishTransaction} =
    useIAP();
  const [ownedSubscriptions, setOwnedSubscriptions] = useState<string[]>([]);
  const handleGetSubscriptions = async () => {
    try {
      await getSubscriptions({skus: subscriptionSKU});
    } catch (error) {
      console.warn({message: 'handleGetSubscriptions', error});
    }
  };

  const handleBuySubscription = async (
    productId: string,
    offerToken?: string,
  ) => {
    if (isPlay && !offerToken) {
      console.warn(
        `There are no subscription Offers for selected product (Only required for Google Play purchases): ${productId}`,
      );
    }
    try {
      await requestSubscription({
        sku: productId,
        ...(offerToken && {
          subscriptionOffers: [{sku: productId, offerToken}],
        }),
      });
    } catch (error) {
      if (error instanceof PurchaseError) {
        console.warn({message: `[${error.code}]: ${error.message}`, error});
      } else {
        console.warn({message: 'handleBuySubscription', error});
      }
    }
  };

  useEffect(() => {
    const checkCurrentPurchase = async () => {
      try {
        if (currentPurchase?.productId) {
          await finishTransaction({
            purchase: currentPurchase,
            isConsumable: true,
          });

          setOwnedSubscriptions(prev => [...prev, currentPurchase?.productId]);
        }
      } catch (error) {
        if (error instanceof PurchaseError) {
          console.warn({message: `[${error.code}]: ${error.message}`, error});
        } else {
          console.warn({message: 'handleBuyProduct', error});
        }
      }
    };

    checkCurrentPurchase();
  }, [currentPurchase, finishTransaction]);

  return (
    <ScrollView contentContainerStyle={contentContainerStyle}>
      <MainContainer>
        <View style={styles.container}>
          {subscriptions.map((subscription, index) => {
            const owned = ownedSubscriptions.find(pId => {
              return pId === subscription.productId;
            });
            return (
              <Row
                key={subscription.productId}
                fields={[
                  {
                    label: 'Subscription Id',
                    value: subscription.productId,
                  },
                  {
                    label: 'type',
                    value:
                      'type' in subscription
                        ? subscription.type
                        : subscription.productType,
                  },
                ]}
                isLast={subscriptions.length - 1 === index}>
                {owned && <Text>Subscribed</Text>}
                {!owned &&
                  isPlay &&
                  // On Google Play Billing V5 you might have  multiple offers for a single sku
                  'subscriptionOfferDetails' in subscription &&
                  subscription?.subscriptionOfferDetails?.map(offer => (
                    <PrimaryButton
                      title={`Subscribe ${offer.pricingPhases.pricingPhaseList
                        .map(ppl => ppl.billingPeriod)
                        .join(',')}`}
                      onPress={() => {
                        handleBuySubscription(
                          subscription.productId,
                          offer.offerToken,
                        );
                      }}
                    />
                  ))}
                {!owned && isIos && (
                  <PrimaryButton
                    title="Subscribe"
                    onPress={() => {
                      handleBuySubscription(subscription.productId);
                    }}
                  />
                )}
              </Row>
            );
          })}
        </View>

        <PrimaryButton
          title="Get the subscriptions"
          onPress={handleGetSubscriptions}
        />
      </MainContainer>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
});
