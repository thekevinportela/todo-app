import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import { Pressable, Text } from "native-base";
import useAuthStore from "../stores/auth";

function CustomDrawerContent() {
  const logout = useAuthStore((state) => state.logout);
  return (
    <DrawerContentScrollView
      style={{
        backgroundColor: "#41145E",
      }}
      contentContainerStyle={{
        justifyContent: "flex-end",
        alignItems: "center",
        flex: 1,
        paddingVertical: 30,
      }}
    >
      <Pressable
        width={"4/5"}
        height={10}
        bg={"violet.400"}
        alignItems={"center"}
        justifyContent={"center"}
        borderRadius={"full"}
      >
        <Text color={"white"}>Logout</Text>
      </Pressable>
    </DrawerContentScrollView>
  );
}

export default CustomDrawerContent;
