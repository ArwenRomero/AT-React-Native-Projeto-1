import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, StyleSheet, Image, Dimensions, ScrollView } from 'react-native';
import LottieView from 'lottie-react-native';
import Animated, { Easing, withTiming} from 'react-native-reanimated';

export default function LoginScreen({ navigation }) {
  const [isPortrait, setIsPortrait] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const updateLayout = () => {
      const { width, height } = Dimensions.get('window');
      setIsPortrait(height >= width);
    };

    Dimensions.addEventListener('change', updateLayout);
    return () => {
      Dimensions.removeEventListener('change', updateLayout);
    };
  }, []);

  const handleLogin = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigation.navigate('Transacoes');
    }, 2000);
  };

  const fadeInStyle = withTiming(1, { duration: 800, easing: Easing.ease });
  const slideUpStyle = withTiming(0, { duration: 800, easing: Easing.ease });

  return (
    <ScrollView contentContainerStyle={[styles.container, isPortrait ? styles.portrait : styles.landscape]}>
      {loading ? (
        <View style={styles.loadingContainer}>
          <View style={styles.loadingWrapper}>
            <LottieView
              source={require('../assets/animations/loading.json')}
              autoPlay
              loop
              style={styles.loadingAnimation}
            />
          </View>
        </View>
      ) : (
        <>
          <Animated.View style={[styles.profileImageContainer, { opacity: fadeInStyle }]}>
            <Image
              style={styles.profileImage}
              source={{ uri: 'https://i.pravatar.cc/300' }}
            />
          </Animated.View>

          <Animated.Text style={[styles.welcomeText, { opacity: fadeInStyle, transform: [{ translateY: slideUpStyle }] }]}>
            Bem-vindo de volta!
          </Animated.Text>

          <Animated.View style={{ opacity: fadeInStyle, transform: [{ translateY: slideUpStyle }] }}>
            <TextInput
              style={styles.input}
              placeholder="Usuário"
              placeholderTextColor="#aaa"
            />
          </Animated.View>

          <Animated.View style={{ opacity: fadeInStyle, transform: [{ translateY: slideUpStyle }] }}>
            <TextInput
              style={styles.input}
              placeholder="Senha"
              placeholderTextColor="#aaa"
              secureTextEntry={true}
            />
          </Animated.View>

          <Animated.View style={{ opacity: fadeInStyle, transform: [{ translateY: slideUpStyle }] }}>
            <Button
              title="Acessar"
              onPress={handleLogin}
              color="#45b1f5"
            />
          </Animated.View>
        </>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 24, backgroundColor: '#f3f4f6' },
  portrait: { flexDirection: 'column' },
  landscape: { flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' },
  profileImageContainer: { marginBottom: 24 },
  profileImage: { width: 120, height: 120, borderRadius: 60, borderWidth: 4, borderColor: '#45b1f5' },
  welcomeText: { fontSize: 24, fontWeight: 'bold', color: '#333', marginBottom: 24 },
  input: { width: '100%', height: 55, borderWidth: 1, borderRadius: 10, paddingHorizontal: 15, marginBottom: 16, backgroundColor: '#fff', fontSize: 16, borderColor: '#ddd' },
  inputContainer: { marginBottom: 16 },

  //mudar aq para estilizar animacao
  loadingContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingWrapper: {
    width: 150,
    height: 150,
  },
  loadingAnimation: {
    width: '100%',
    height: '100%',
  },
});