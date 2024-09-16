import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1, // Flex to fill the available space
    backgroundColor: '#FFD700', // Background color for the container
    padding: 20,
    paddingTop: 50,
  },
  title: {
    fontSize: 32,
    color: '#000',
    marginBottom: 20,
    marginTop: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#FFF',
    color: '#000',
    padding: 10,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#000',
    marginBottom: 10,
    fontSize: 18,
  },
  button: {
    backgroundColor: '#000',
    borderRadius: 8,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  textButton: {
    color: 'white'
  }
});
