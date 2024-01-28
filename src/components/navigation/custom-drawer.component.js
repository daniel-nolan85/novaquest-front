import { useState } from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { getAuth, signOut } from 'firebase/auth';
import { app } from '../../../firebase';
import { Text } from '../typography/text.component';
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import defaultProfile from '../../../assets/img/defaultProfile.png';
import ContactUs from '../../../assets/svg/contact-us.svg';
import Logout from '../../../assets/svg/logout.svg';
import { ContactUsModal } from '../modals/contact-us-modal';

export const CustomDrawer = (props) => {
  const [visible, setVisible] = useState(false);

  const dispatch = useDispatch();
  const { profileImage, rank, name, daysInSpace, role, xp } = useSelector(
    (state) => state.user
  );

  const auth = getAuth();

  const logout = async () => {
    if (role !== 'guest') await signOut(auth);
    dispatch({
      type: 'LOGOUT',
      payload: null,
    });
  };

  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={{ backgroundColor: '#009999' }}
      >
        <View style={{ alignItems: 'center' }}>
          <Image
            source={profileImage ? profileImage : defaultProfile}
            style={{
              height: 100,
              width: 100,
              borderRadius: 80,
              borderWidth: 4,
              borderColor: '#fff',
            }}
          />
          <Text
            variant='title'
            style={{
              marginTop: 10,
              color: '#fff',
              fontSize: 16,
              textAlign: 'center',
            }}
          >
            {rank} {name}
          </Text>
          <Text
            variant='title'
            style={{ marginTop: 10, color: '#fff', fontSize: 16 }}
          >
            {xp} XP
          </Text>
          <Text
            variant='title'
            style={{
              marginTop: 10,
              marginBottom: 10,
              color: '#fff',
              fontSize: 16,
            }}
          >
            {daysInSpace === 1 ? `${daysInSpace} day` : `${daysInSpace} days`}{' '}
            in space
          </Text>
        </View>
        <View style={{ flex: 1, backgroundColor: '#fff', paddingTop: 10 }}>
          <DrawerItemList {...props} />
        </View>
      </DrawerContentScrollView>
      <View
        style={{ padding: 20, borderTopWidth: 1, borderTopColor: '#009999' }}
      >
        <TouchableOpacity
          onPress={() => setVisible(true)}
          style={{
            paddingVertical: 15,
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <ContactUs height={24} width={24} />
          <Text
            variant='title'
            style={{ fontSize: 18, marginLeft: 10, color: '#009999' }}
          >
            Contact Us
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={logout}
          style={{
            paddingVertical: 15,
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <Logout height={24} width={24} />
          <Text
            variant='title'
            style={{ fontSize: 18, marginLeft: 10, color: '#009999' }}
          >
            Logout
          </Text>
        </TouchableOpacity>
      </View>
      <ContactUsModal visible={visible} setVisible={setVisible} />
    </View>
  );
};
