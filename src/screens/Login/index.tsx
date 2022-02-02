import { StyleSheet, View } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import {
  Box,
  Heading,
  VStack,
  FormControl,
  Input,
  Button,
  Center,
  HStack,
  Text,
  Link,
} from 'native-base';
import { useNavigation } from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import useAuthStore from '../../stores/auth';

const LoginScreen = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  });
  const login = useAuthStore((state) => state.login);
  const onSubmit = (data: any) => {
    login(data.email, data.password);
  };
  const navigation = useNavigation();
  return (
    <Center
      width='full'
      height='full'
      bg={{
        linearGradient: {
          colors: ['#181A25', '#161F3C', '#41145E'],
          start: [1, 0],
          end: [1.7, 0.6],
        },
      }}
    >
      <Box safeArea p='2' w='90%' maxW='290' py='8'>
        <Heading size='lg' color='#eee' fontWeight='semibold'>
          Welcome
        </Heading>
        <Heading mt='1' color='#aaa' fontWeight='medium' size='xs'>
          login to continue!
        </Heading>
        <VStack space={3} mt='5'>
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <FormControl>
                <FormControl.Label
                  _text={{
                    color: '#aaa',
                    fontWeight: 'medium',
                    fontSize: 'sm',
                  }}
                >
                  Email
                </FormControl.Label>
                <Input
                  color='white'
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
              </FormControl>
            )}
            name='email'
          />
          {errors.email && <Text>This is required.</Text>}
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <FormControl>
                <FormControl.Label
                  _text={{
                    color: '#aaa',
                    fontWeight: 'medium',
                    fontSize: 'sm',
                  }}
                >
                  Password
                </FormControl.Label>
                <Input
                  color='white'
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  type='password'
                />
              </FormControl>
            )}
            name='password'
          />
          {errors.email && <Text>This is required.</Text>}

          <Button mt='2' colorScheme='indigo' onPress={handleSubmit(onSubmit)}>
            Login
          </Button>
          <HStack mt='6' justifyContent='center'>
            <Text fontSize='sm' color='#aaa'>
              Don't have an account?{' '}
            </Text>
            <Link
              _text={{
                color: 'indigo.500',
                fontWeight: 'medium',
                fontSize: 'sm',
              }}
              onPress={() => navigation.navigate('Signup')}
            >
              signup
            </Link>
          </HStack>
        </VStack>
      </Box>
    </Center>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({});
