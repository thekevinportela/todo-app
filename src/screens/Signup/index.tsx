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

const SignupScreen = () => {
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
  const signup = useAuthStore((state) => state.signup);
  const onSubmit = (data: any) => {
    signup(data.email, data.password);
  };
  const navigation = useNavigation();
  return (
    <Center>
      <Box safeArea p='2' w='90%' maxW='290' py='8'>
        <Heading
          size='lg'
          color='coolGray.800'
          _dark={{
            color: 'warmGray.50',
          }}
          fontWeight='semibold'
        >
          Welcome
        </Heading>
        <Heading
          mt='1'
          color='coolGray.600'
          _dark={{
            color: 'warmGray.200',
          }}
          fontWeight='medium'
          size='xs'
        >
          Sign up to continue!
        </Heading>
        <VStack space={3} mt='5'>
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <FormControl>
                <FormControl.Label>Email</FormControl.Label>
                <Input onBlur={onBlur} onChangeText={onChange} value={value} />
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
                <FormControl.Label>Password</FormControl.Label>
                <Input
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
            Sign up
          </Button>
          <HStack mt='6' justifyContent='center'>
            <Text
              fontSize='sm'
              color='coolGray.600'
              _dark={{
                color: 'warmGray.200',
              }}
            >
              Already have an account?{' '}
            </Text>
            <Link
              _text={{
                color: 'indigo.500',
                fontWeight: 'medium',
                fontSize: 'sm',
              }}
              onPress={() => navigation.navigate('Login')}
            >
              Login
            </Link>
          </HStack>
        </VStack>
      </Box>
    </Center>
  );
};

export default SignupScreen;

const styles = StyleSheet.create({});
