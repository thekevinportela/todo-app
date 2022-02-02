import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import useAuthStore from '../stores/auth';

function CustomDrawerContent() {
  const logout = useAuthStore((state) => state.logout);
  return (
    <DrawerContentScrollView style={{ backgroundColor: '#181A25' }}>
      <DrawerItem
        style={{ backgroundColor: '#41145E' }}
        label='Logout'
        labelStyle={{ color: 'white' }}
        onPress={() => logout()}
      />
    </DrawerContentScrollView>
  );
}

export default CustomDrawerContent;
