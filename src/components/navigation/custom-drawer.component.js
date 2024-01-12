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
import Logout from '../../../assets/svg/logout.svg';

export const CustomDrawer = (props) => {
  const dispatch = useDispatch();
  const { profileImage, rank, name, daysInSpace, role } = useSelector(
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
            style={{ marginTop: 10, color: '#fff', fontSize: 16 }}
          >
            {rank} {name}
          </Text>
          <Text
            variant='title'
            style={{ marginBottom: 10, color: '#fff', fontSize: 16 }}
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
          onPress={logout}
          style={{
            paddingVertical: 15,
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <Logout height={32} width={32} />
          <Text
            variant='title'
            style={{ fontSize: 20, marginLeft: 10, color: '#009999' }}
          >
            Logout
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
