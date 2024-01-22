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
  BulletView,
  Bullet,
  BulletText,
} from '../styles/account.styles';
import { LoadingSpinner } from '../../../../assets/loading-spinner';
import { SafeArea } from '../../../components/utils/safe-area.component';

export const PrivacyPolicyScreen = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(true);

  const { navigate } = navigation;

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
      onLoadEnd={() => setIsLoading(false)}
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
              <MainTitle variant='title'>PRIVACY POLICY</MainTitle>
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
                  This Privacy Notice outlines how and why we collect, store,
                  use, and share your information when you use our services ('
                  <BoldText variant='body'>Services</BoldText>').
                </NormalText>
                <NormalText variant='body'>
                  Reading this privacy notice will help you understand your
                  privacy rights and choices. If you do not agree with our
                  policies and practices, please do not use our Services.
                </NormalText>
              </TextView>

              <TextView>
                <SubTitle variant='title'>SUMMARY OF KEY POINTS</SubTitle>
                <BoldText variant='body'>
                  This summary provides key points from our Privacy Notice. For
                  detailed information, follow the links provided or refer to
                  the{' '}
                  <LinkText variant='body' onPress={() => scrollToSection(0)}>
                    table of contents
                  </LinkText>{' '}
                  below.
                </BoldText>
              </TextView>
              <TextView>
                <BoldTitle variant='body'>
                  What personal information do we process?
                </BoldTitle>
                <NormalText variant='body'>
                  When you visit, use, or navigate our Services, we may process
                  personal information depending on how you interact with us and
                  the Services, the choices you make, and the features you use.
                  Learn more about{' '}
                  <LinkText variant='body' onPress={() => scrollToSection(1)}>
                    personal information you disclose to us.
                  </LinkText>
                </NormalText>
              </TextView>
              <TextView>
                <BoldTitle variant='body'>
                  How do we process your information?
                </BoldTitle>
                <NormalText variant='body'>
                  We process your information to provide, improve, and
                  administer our Services, communicate with you, for security
                  and fraud prevention, and to comply with law. We may also
                  process your information for other purposes with your consent.
                  We process your information only when we have a valid legal
                  reason to do so. Learn more about{' '}
                  <LinkText variant='body' onPress={() => scrollToSection(2)}>
                    how we process your information.
                  </LinkText>
                </NormalText>
              </TextView>
              <TextView>
                <BoldTitle variant='body'>
                  In what situations and with which parties do we share personal
                  information?
                </BoldTitle>
                <NormalText variant='body'>
                  We may share information in specific situations and with
                  specific third parties. Learn more about{' '}
                  <LinkText variant='body' onPress={() => scrollToSection(3)}>
                    when and with whom we share your personal information.
                  </LinkText>
                </NormalText>
              </TextView>
              <TextView>
                <BoldTitle variant='body'>What are your rights?</BoldTitle>
                <NormalText variant='body'>
                  Depending on where you are located geographically, the
                  applicable privacy law may mean you have certain rights
                  regarding your personal information. Learn more about{' '}
                  <LinkText variant='body' onPress={() => scrollToSection(7)}>
                    your privacy rights.
                  </LinkText>
                </NormalText>
              </TextView>
              <TextView>
                <BoldTitle variant='body'>
                  How do you exercise your rights?{' '}
                </BoldTitle>
                <NormalText variant='body'>
                  The easiest way to exercise your rights is by contacting us.
                  We will consider and act upon any request in accordance with
                  applicable data protection laws.
                </NormalText>
              </TextView>
              <TextView>
                <NormalText variant='body'>
                  Want to learn more about what we do with any information we
                  collect?{' '}
                  <LinkText variant='body' onPress={() => scrollToSection(1)}>
                    Read the privacy notice in full.
                  </LinkText>
                </NormalText>
              </TextView>

              <TextView ref={(ref) => (sectionRefs.current[0] = ref)}>
                <SubTitle variant='title'>TABLE OF CONTENTS</SubTitle>
                <Contents>
                  <ContentsItem>
                    <LinkText
                      variant='title'
                      onPress={() => scrollToSection(1)}
                    >
                      1. WHAT INFORMATION DO WE COLLECT?
                    </LinkText>
                  </ContentsItem>
                  <ContentsItem>
                    <LinkText
                      variant='title'
                      onPress={() => scrollToSection(2)}
                    >
                      2. HOW DO WE PROCESS YOUR INFORMATION?
                    </LinkText>
                  </ContentsItem>
                  <ContentsItem>
                    <LinkText
                      variant='title'
                      onPress={() => scrollToSection(3)}
                    >
                      3. WHEN AND WITH WHOM DO WE SHARE YOUR PERSONAL
                      INFORMATION?
                    </LinkText>
                  </ContentsItem>
                  <ContentsItem>
                    <LinkText
                      variant='title'
                      onPress={() => scrollToSection(4)}
                    >
                      4. DO WE USE COOKIES AND OTHER TRACKING TECHNOLOGIES?
                    </LinkText>
                  </ContentsItem>
                  <ContentsItem>
                    <LinkText
                      variant='title'
                      onPress={() => scrollToSection(5)}
                    >
                      5. IS YOUR INFORMATION TRANSFERRED INTERNATIONALLY?
                    </LinkText>
                  </ContentsItem>
                  <ContentsItem>
                    <LinkText
                      variant='title'
                      onPress={() => scrollToSection(6)}
                    >
                      6. HOW LONG DO WE KEEP YOUR INFORMATION?
                    </LinkText>
                  </ContentsItem>
                  <ContentsItem>
                    <LinkText
                      variant='title'
                      onPress={() => scrollToSection(7)}
                    >
                      7. WHAT ARE YOUR PRIVACY RIGHTS?
                    </LinkText>
                  </ContentsItem>
                  <ContentsItem>
                    <LinkText
                      variant='title'
                      onPress={() => scrollToSection(8)}
                    >
                      8. CONTROLS FOR DO-NOT-TRACK FEATURES
                    </LinkText>
                  </ContentsItem>
                  <ContentsItem>
                    <LinkText
                      variant='title'
                      onPress={() => scrollToSection(9)}
                    >
                      9. DO WE MAKE UPDATES TO THIS NOTICE?
                    </LinkText>
                  </ContentsItem>
                  <ContentsItem>
                    <LinkText
                      variant='title'
                      onPress={() => scrollToSection(10)}
                    >
                      10. HOW CAN YOU CONTACT US ABOUT THIS NOTICE?
                    </LinkText>
                  </ContentsItem>
                  <ContentsItem>
                    <LinkText
                      variant='title'
                      onPress={() => scrollToSection(11)}
                    >
                      11. HOW CAN YOU REVIEW, UPDATE, OR DELETE THE DATA WE
                      COLLECT FROM YOU?
                    </LinkText>
                  </ContentsItem>
                </Contents>
              </TextView>

              <TextView ref={(ref) => (sectionRefs.current[1] = ref)}>
                <SubTitle variant='title'>
                  1. WHAT INFORMATION DO WE COLLECT?
                </SubTitle>
                <BoldTitle variant='body'>
                  Personal information you disclose to us
                </BoldTitle>
                <NormalText variant='body'>
                  <BoldText variant='body'>In Short: </BoldText>
                  We collect personal information that you provide to us.
                </NormalText>
                <NormalText variant='body'>
                  We collect personal information that you voluntarily provide
                  to us when you register on the Services, express an interest
                  in obtaining information about us or our products and
                  Services, when you participate in activities on the Services,
                  or otherwise when you contact us.
                </NormalText>
                <BoldTitle variant='body'>
                  Information automatically detected
                </BoldTitle>
                <NormalText variant='body'>
                  <BoldText variant='body'>In Short: </BoldText>
                  Some information - such as your Internet Protocol (IP) address
                  and/or browser and device characteristics - is collected
                  automatically when you visit our Services.
                </NormalText>
                <NormalText variant='body'>
                  We automatically collect certain information when you visit,
                  use, or navigate the Services. This information does not
                  reveal your specific identity (like your name or contact
                  information) but may include device and usage information,
                  such as your IP address, browser and device characteristics,
                  operating system, language preferences, referring URLs, device
                  name, country, location, information about how and when you
                  use our Services, and other technical information. This
                  information is primarily needed to maintain the security and
                  operation of our Services, and for our internal analytics and
                  reporting purposes.
                </NormalText>
                <NormalText variant='body'>
                  Like many businesses, we also collect information through
                  cookies and similar technologies.
                </NormalText>
              </TextView>

              <TextView ref={(ref) => (sectionRefs.current[2] = ref)}>
                <SubTitle variant='title'>
                  2. HOW DO WE PROCESS YOUR INFORMATION
                </SubTitle>
                <NormalText variant='body'>
                  <BoldText variant='body'>In Short: </BoldText>
                  We process your information to provide, improve, and
                  administer our Services, communicate with you, for security
                  and fraud prevention, and to comply with law. We may also
                  process your information for other purposes with your consent.
                </NormalText>
                <NormalText variant='body'>
                  We process your information for a variety of reasons,
                  depending on how you interact with our Services, including:
                </NormalText>
                <BulletView>
                  <Bullet variant='body'>•</Bullet>
                  <BulletText variant='body'>
                    <BoldText variant='body'>
                      Service Provision and Improvement.{' '}
                    </BoldText>
                    We process your information to ensure the effective
                    provision of our Services. This includes tailoring the user
                    experience, enhancing functionality, and optimizing
                    performance based on user interactions and feedback.
                  </BulletText>
                </BulletView>
                <BulletView>
                  <Bullet variant='body'>•</Bullet>
                  <BulletText variant='body'>
                    <BoldText variant='body'>Communication with You. </BoldText>
                    Processing information enables us to communicate with you
                    effectively. This includes responding to inquiries,
                    providing updates on Services, and addressing any concerns
                    or issues you may encounter during your engagement with us.
                  </BulletText>
                </BulletView>
                <BulletView>
                  <Bullet variant='body'>•</Bullet>
                  <BulletText variant='body'>
                    <BoldText variant='body'>
                      Security and Fraud Prevention.{' '}
                    </BoldText>
                    Your information is processed as part of our security
                    measures to safeguard our Services and prevent fraudulent
                    activities. This involves monitoring user interactions,
                    detecting unusual patterns, and taking necessary actions to
                    maintain a secure environment for all users.
                  </BulletText>
                </BulletView>
                <BulletView>
                  <Bullet variant='body'>•</Bullet>
                  <BulletText variant='body'>
                    <BoldText variant='body'>
                      Compliance with Legal Requirements.{' '}
                    </BoldText>
                    We process your information to comply with applicable laws
                    and regulations. This includes, but is not limited to, legal
                    obligations related to data protection, privacy, and any
                    other relevant legislation governing the use of our
                    Services.
                  </BulletText>
                </BulletView>
                <BulletView>
                  <Bullet variant='body'>•</Bullet>
                  <BulletText variant='body'>
                    <BoldText variant='body'>
                      Additional Purposes with Your Consent.{' '}
                    </BoldText>
                    In certain instances, we may seek your consent to process
                    your information for purposes beyond those explicitly
                    mentioned. This could include participation in surveys,
                    promotions, or other activities where your consent is
                    integral to the processing of specific data.
                  </BulletText>
                </BulletView>
              </TextView>

              <TextView ref={(ref) => (sectionRefs.current[3] = ref)}>
                <SubTitle variant='title'>
                  3. WHEN AND WITH WHOM DO WE SHARE YOUR PERSONAL INFORMATION?
                </SubTitle>
                <NormalText variant='body'>
                  <BoldText variant='body'>In Short: </BoldText>
                  We may share information in specific situations described in
                  this section and/or with the following third parties.
                </NormalText>
                <NormalText variant='body'>
                  We may need to share your personal information in the
                  following situations:
                </NormalText>
                <BulletView>
                  <Bullet variant='body'>•</Bullet>
                  <BulletText variant='body'>
                    <BoldText variant='body'>Business Transfers. </BoldText>
                    We may share or transfer your information in connection
                    with, or during negotiations of, any merger, sale of company
                    assets, financing, or acquisition of all or a portion of our
                    business to another company.
                  </BulletText>
                </BulletView>
                <BulletView>
                  <Bullet variant='body'>•</Bullet>
                  <BulletText variant='body'>
                    <BoldText variant='body'>Affiliates. </BoldText>
                    We may share your information with our affiliates, in which
                    case we will require those affiliates to honor this privacy
                    notice. Affiliates include any subsidiaries, joint venture
                    partners, or other companies that we control or that are
                    under common control with us.
                  </BulletText>
                </BulletView>
                <BulletView>
                  <Bullet variant='body'>•</Bullet>
                  <BulletText variant='body'>
                    <BoldText variant='body'>Business Partners. </BoldText>
                    We may share your information with our business partners to
                    offer you certain products, services, or promotions.
                  </BulletText>
                </BulletView>
              </TextView>

              <TextView ref={(ref) => (sectionRefs.current[4] = ref)}>
                <SubTitle variant='title'>
                  4. DO WE USE COOKIES AND OTHER TRACKING TECHNOLOGIES?
                </SubTitle>
                <NormalText variant='body'>
                  <BoldText variant='body'>In Short: </BoldText>
                  We may use cookies and other tracking technologies to collect
                  and store your information.
                </NormalText>
                <NormalText variant='body'>
                  We may use cookies and similar tracking technologies (like web
                  beacons and pixels) to access or store information. Specific
                  information about how we use such technologies and how you can
                  refuse certain cookies is set out in our{' '}
                  <LinkText
                    variant='body'
                    onPress={() => navigate('CookiesPolicy')}
                  >
                    Cookie Policy
                  </LinkText>
                  .
                </NormalText>
              </TextView>

              <TextView ref={(ref) => (sectionRefs.current[5] = ref)}>
                <SubTitle variant='title'>
                  5. IS YOUR INFORMATION TRANSFERRED INTERNATIONALLY?
                </SubTitle>
                <NormalText variant='body'>
                  <BoldText variant='body'>In Short: </BoldText>
                  We may transfer, store, and process your information in
                  countries other than your own.
                </NormalText>
                <NormalText variant='body'>
                  Our servers are located in the United States (US). If you are
                  accessing our Services from outside the US, please be aware
                  that your information may be transferred to, stores, and
                  processed by us in our facilities and by those third parties
                  with whom we share your personal information (see{' '}
                  <LinkText variant='body' onPress={() => scrollToSection(3)}>
                    WHEN AND WITH WHOM DO WE SHARE YOUR PERSONAL INFORMATION?
                  </LinkText>{' '}
                  above), in the US and other countries.
                </NormalText>
                <NormalText variant='body'>
                  If you are a resident in the European Economic Area (EEA),
                  United Kingdom (UK), or Switzerland, then these countries may
                  not necessarily have data protection laws or other similar
                  laws as comprehensive as those in your country. However, we
                  will take all necessary measures to protect your personal
                  information in accordance with this privacy notice and
                  applicable law.
                </NormalText>
              </TextView>

              <TextView ref={(ref) => (sectionRefs.current[6] = ref)}>
                <SubTitle variant='title'>
                  6. HOW LONG DO WE KEEP YOUR INFORMATION?
                </SubTitle>
                <NormalText variant='body'>
                  <BoldText variant='body'>In Short: </BoldText>
                  We keep your information for as long as necessary to fulfill
                  the purposes outlined in this privacy notice unless otherwise
                  required by law.
                </NormalText>
                <NormalText variant='body'>
                  We will only keep your personal information for as long as it
                  is necessary for the purposes set out in this privacy notice,
                  unless a longer retention period is required by law (such as
                  tax, accounting, or other legal requirements).
                </NormalText>
                <NormalText variant='body'>
                  When we have no ongoing legitimate business need to process
                  your personal information, we will either delete or anonymize
                  such information, or, if this is not possible (for example,
                  because your personal information has been stored in backup
                  archives), then we will securely store your personal
                  information and isolate it from any further processing until
                  deletion is possible.
                </NormalText>
              </TextView>

              <TextView ref={(ref) => (sectionRefs.current[7] = ref)}>
                <SubTitle variant='title'>
                  7. WHAT ARE YOUR PRIVACY RIGHTS?
                </SubTitle>
                <NormalText variant='body'>
                  <BoldText variant='body'>In Short: </BoldText>
                  You may review, change, or terminate your account at any time.
                </NormalText>
                <NormalText variant='body'>
                  <BoldText variant='body'>Withdrawing your consent: </BoldText>
                  If we are relying on your consent to process your personal
                  information, which may be express and/or implied consent
                  depending on the applicable law, you have the right to
                  withdraw your consent at any time. You can withdraw your
                  consent at any time by contacting us by using the contact
                  details provided in the section{' '}
                  <LinkText variant='body' onPress={() => scrollToSection(10)}>
                    HOW CAN YOU CONTACT US ABOUT THIS NOTICE?
                  </LinkText>{' '}
                  below.
                </NormalText>
                <NormalText variant='body'>
                  However, please note that this will not affect the lawfulness
                  of the processing before its withdrawal nor, when applicable
                  law allows, will it affect the processing of your personal
                  information conducted in reliance on lawful processing grounds
                  other than consent.
                </NormalText>
                <BoldTitle variant='body'>Account Information</BoldTitle>
                <NormalText variant='body'>
                  If you would at any time like to review or change the
                  information in your account or terminate your account, you
                  can.
                </NormalText>
                <NormalText variant='body'>
                  Upon your request to terminate your account, we will
                  deactivate or delete your account and information from our
                  active databases. However, we may retain some information in
                  our files to prevent fraud, troubleshoot problems, assist with
                  any investigations, enforce our legal terms and/or comply with
                  applicable legal requirements.
                </NormalText>
              </TextView>

              <TextView ref={(ref) => (sectionRefs.current[8] = ref)}>
                <SubTitle variant='title'>
                  8. CONTROLS FOR DO-NOT-TRACK FEATURES
                </SubTitle>
                <NormalText variant='body'>
                  Some mobile operating systems and mobile applications include
                  a Do-Not-Track ('DNT') feature or setting you can activate to
                  signal your privacy preference not to have data about your
                  online browsing activities monitored and collected. At this
                  stage no uniform technology standard for recognizing and
                  implementing DNT signals has been finalized. As such, we do
                  not currently respond to DNT browser signals or any other
                  mechanism that automatically communicates your choice not to
                  be tracked online. If a standard for online tracking is
                  adopted that we must follow in the future, we will inform you
                  about that practice in a revised version of this privacy
                  notice.
                </NormalText>
              </TextView>

              <TextView ref={(ref) => (sectionRefs.current[9] = ref)}>
                <SubTitle variant='title'>
                  9. DO WE MAKE UPDATES TO THIS NOTICE?
                </SubTitle>
                <NormalText variant='body'>
                  <BoldText variant='body'>In Short: </BoldText>
                  We may update this privacy notice from time to time. The
                  updated version will be indicated by an updated 'Revised' date
                  and the updated version will be effective as soon as it is
                  accessible. If we make material changes to this privacy
                  notice, we may notify you either by prominently posting a
                  notice of such changes or by directly sending you a
                  notification. We encourage you to review this privacy notice
                  frequently to be informed of how we are protecting your
                  information.
                </NormalText>
              </TextView>

              <TextView ref={(ref) => (sectionRefs.current[10] = ref)}>
                <SubTitle variant='title'>
                  10. HOW CAN YOU CONTACT US ABOUT THIS NOTICE?
                </SubTitle>
                <NormalText variant='body'>
                  If you have questions or comments about this notice, you may
                  contact us by email at{' '}
                  <LinkText variant='body'>info@nolancode.com</LinkText>
                </NormalText>
              </TextView>

              <TextView ref={(ref) => (sectionRefs.current[11] = ref)}>
                <SubTitle variant='title'>
                  11. HOW CAN YOU REVIEW, UPDATE, OR DELETE THE DATA WE COLLECT
                  FROM YOU?
                </SubTitle>
                <NormalText variant='body'>
                  Based on the applicable laws of your country, you may have the
                  right to request access to the personal information we collect
                  from you, change the information, or delete it. To request to
                  review, update, or delete your personal information, please
                  contact us.
                </NormalText>
              </TextView>
            </LegalScroll>
          </LegalDocView>
        </SafeArea>
      )}
    </ImageBackground>
  );
};
