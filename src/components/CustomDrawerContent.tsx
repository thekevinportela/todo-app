import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import useAuthStore from '../stores/auth';

function CustomDrawerContent() {
  const logout = useAuthStore((state) => state.logout);
  return (
    <DrawerContentScrollView style={{ backgroundColor: '#41145E' }}>
      <DrawerItem
        style={{
          backgroundColor: '#181A2580',
        }}
        label='Logout'
        labelStyle={{ color: 'white', alignSelf: 'center' }}
        onPress={() => logout()}
      />
    </DrawerContentScrollView>
  );
}

export default CustomDrawerContent;
