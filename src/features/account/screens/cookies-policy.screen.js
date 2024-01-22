import { useState, useEffect, useRef } from 'react';
import { ImageBackground } from 'react-native';
import {
  LegalDocView,
  LegalScroll,
  TextView,
  MainTitle,
  SubTitle,
  BoldTitle,
  NormalText,
  BoldText,
  LinkText,
  Contents,
  ContentsItem,
} from '../styles/account.styles';
import { LoadingSpinner } from '../../../../assets/loading-spinner';
import { SafeArea } from '../../../components/utils/safe-area.component';

export const CookiesPolicyScreen = () => {
  const [isLoading, setIsLoading] = useState(true);

  const scrollViewRef = useRef();
  const sectionRefs = useRef([]);
  const sectionOffsets = useRef([]);

  useEffect(() => {
    if (!isLoading) {
      setTimeout(() => {
        calculateOffsets();
      }, 500);
    }
  }, [isLoading]);

  const calculateOffsets = () => {
    sectionOffsets.current = sectionRefs.current.map((ref) => {
      return new Promise((resolve, reject) => {
        ref.measureLayout(
          scrollViewRef.current.getInnerViewNode(),
          (x, y, width, height) => {
            resolve(y);
          },
          (error) => reject(error)
        );
      });
    });

    Promise.all(sectionOffsets.current)
      .then((offsets) => {
        sectionOffsets.current = offsets;
      })
      .catch((error) => console.error('Unable to measure layout.', error));
  };

  const scrollToSection = (index) => {
    const offsetY = sectionOffsets.current[index];
    if (offsetY !== undefined) {
      console.log(`Scrolling to offset: ${offsetY}`);
      scrollViewRef.current.scrollTo({ y: offsetY, animated: true });
    }
  };

  return (
    <ImageBackground
      onLoadEnd={() => {
        setIsLoading(false);
      }}
      source={{
        uri: 'https://res.cloudinary.com/dntxhyxtx/image/upload/v1705855683/legal_dwbns5.gif',
      }}
      style={{ flex: 1 }}
    >
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <SafeArea>
          <LegalDocView>
            <TextView>
              <MainTitle variant='title'>COOKIE POLICY</MainTitle>
              <NormalText variant='body'>
                Last updated: January 20, 2024
              </NormalText>
            </TextView>

            <LegalScroll ref={scrollViewRef}>
              <TextView>
                <NormalText variant='body'>
                  We are Nolancode ('<BoldText variant='body'>Company</BoldText>
                  ', '<BoldText variant='body'>we</BoldText>', '
                  <BoldText variant='body'>us</BoldText>', or '
                  <BoldText variant='body'>our</BoldText>').
                </NormalText>
                <NormalText variant='body'>
                  This Cookie Policy explains how we handle data storage and
                  retrieval processes in our mobile application NovaQuest (the '
                  <BoldText variant='body'>App</BoldText>').
                </NormalText>
              </TextView>

              <TextView>
                <SubTitle variant='title'>TABLE OF CONTENTS</SubTitle>
                <Contents>
                  <ContentsItem>
                    <LinkText
                      variant='title'
                      onPress={() => scrollToSection(0)}
                    >
                      1. DATA STORAGE MECHANISMS
                    </LinkText>
                  </ContentsItem>
                  <ContentsItem>
                    <LinkText
                      variant='title'
                      onPress={() => scrollToSection(1)}
                    >
                      2. SERVER-SIDE DEPENDENCIES
                    </LinkText>
                  </ContentsItem>
                  <ContentsItem>
                    <LinkText
                      variant='title'
                      onPress={() => scrollToSection(2)}
                    >
                      3. USER CONSENT
                    </LinkText>
                  </ContentsItem>
                  <ContentsItem>
                    <LinkText
                      variant='title'
                      onPress={() => scrollToSection(3)}
                    >
                      4. DATA SECURITY
                    </LinkText>
                  </ContentsItem>
                  <ContentsItem>
                    <LinkText
                      variant='title'
                      onPress={() => scrollToSection(4)}
                    >
                      5. THIRD-PARTY INTEGRATIONS
                    </LinkText>
                  </ContentsItem>
                  <ContentsItem>
                    <LinkText
                      variant='title'
                      onPress={() => scrollToSection(5)}
                    >
                      6. CHANGES TO THIS POLICY
                    </LinkText>
                  </ContentsItem>
                  <ContentsItem>
                    <LinkText
                      variant='title'
                      onPress={() => scrollToSection(6)}
                    >
                      7. CONTACT US
                    </LinkText>
                  </ContentsItem>
                </Contents>
              </TextView>

              <TextView ref={(ref) => (sectionRefs.current[0] = ref)}>
                <SubTitle variant='title'>1. DATA STORAGE MECHANISMS</SubTitle>
                <NormalText variant='body'>
                  <BoldText variant='body'>Redux and Context API: </BoldText>
                  We utilize the Redux state management and React Context API
                  within the App to store and manage application state. This
                  includes user preferences, session data, and other relevant
                  information required for the proper functioning of the App.
                </NormalText>
                <NormalText variant='body'>
                  <BoldText variant='body'>MongoDB: </BoldText>
                  Our App may interact with a MongoDB database for the storage
                  and retrieval of user-specific data. This data is securely
                  stored and accessed to enhance user experience and provide
                  personalized features.
                </NormalText>
              </TextView>

              <TextView ref={(ref) => (sectionRefs.current[1] = ref)}>
                <SubTitle variant='title'>2. SERVER-SIDE DEPENDENCIES</SubTitle>
                <BoldTitle variant='body'>
                  Firebase Admin and Expo Server SDK
                </BoldTitle>
                <NormalText variant='body'>
                  Firebase Admin and Expo Server SDK are used for server-side
                  authentication and push notifications. These services may
                  involve the use of tokens for authentication, but they do not
                  directly utilize traditional cookies.
                </NormalText>
                <BoldTitle variant='body'>Express and Cors</BoldTitle>
                <NormalText variant='body'>
                  Express is used as the backend framework, and Cors
                  (Cross-Origin Resource Sharing) is configured to handle
                  cross-origin requests. While Express itself doesn't use
                  cookies, Cors may involve handling cookies for cross-origin
                  requests, depending on your configuration.
                </NormalText>
                <BoldTitle variant='body'>
                  Express-jwt and Jsonwebtoken
                </BoldTitle>
                <NormalText variant='body'>
                  Express-jwt and Jsonwebtoken are used for handling JWT (JSON
                  Web Tokens) for authentication. The use of tokens doesn't
                  inherently involve cookies, but storing tokens in cookies for
                  web-based authentication might be configured explicitly.
                </NormalText>
                <BoldTitle variant='body'>Cloudinary</BoldTitle>
                <NormalText variant='body'>
                  The Cloudinary package on the server side may involve
                  interactions with Cloudinary APIs. Please refer to the
                  Cloudinary documentation for any specific use of sessions or
                  cookies.
                </NormalText>
                <BoldTitle variant='body'>Socket.io</BoldTitle>
                <NormalText variant='body'>
                  Socket.io is used for real-time communication. While it
                  involves session handling, it typically doesn't use
                  traditional cookies.
                </NormalText>
              </TextView>

              <TextView ref={(ref) => (sectionRefs.current[2] = ref)}>
                <SubTitle variant='title'>3. USER CONSENT</SubTitle>
                <NormalText variant='body'>
                  By using our App, you consent to the storage and retrieval of
                  data as outlined in this policy. You can manage your data
                  preferences within the App settings.
                </NormalText>
              </TextView>

              <TextView ref={(ref) => (sectionRefs.current[3] = ref)}>
                <SubTitle variant='title'>4. DATA SECURITY</SubTitle>
                <NormalText variant='body'>
                  We take data security seriously. The data stored within the
                  App and server-side components is treated with the utmost
                  confidentiality and is protected using industry-standard
                  security measures.
                </NormalText>
              </TextView>

              <TextView ref={(ref) => (sectionRefs.current[4] = ref)}>
                <SubTitle variant='title'>5. THIRD-PARTY INTEGRATIONS</SubTitle>
                <NormalText variant='body'>
                  If third-party services are integrated into the App or
                  server-side components, they may have their own data storage
                  and retrieval mechanisms. Please refer to the privacy policies
                  of these third parties for more information.
                </NormalText>
              </TextView>

              <TextView ref={(ref) => (sectionRefs.current[5] = ref)}>
                <SubTitle variant='title'>6. CHANGES TO THIS POLICY</SubTitle>
                <NormalText variant='body'>
                  We may update this Data Storage and Retrieval Policy from time
                  to time to reflect changes in our practices or for other
                  operational, legal, or regulatory reasons. The date of the
                  latest revision will be indicated at the top of the policy.
                </NormalText>
              </TextView>

              <TextView ref={(ref) => (sectionRefs.current[6] = ref)}>
                <SubTitle variant='title'>7. CONTACT US</SubTitle>
                <NormalText variant='body'>
                  If you have any questions about how we handle data storage and
                  retrieval in our App or this policy, please contact us at{' '}
                  <LinkText variant='body'>info@nolancode.com</LinkText>.
                </NormalText>
              </TextView>
            </LegalScroll>
          </LegalDocView>
        </SafeArea>
      )}
    </ImageBackground>
  );
};
