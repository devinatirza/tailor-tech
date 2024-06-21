import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Modal, Dimensions } from 'react-native';
import axios from 'axios';

const RatingScreen: React.FC<{ transactionId: number, onClose: () => void }> = ({ transactionId, onClose }) => {
  const [rating, setRating] = useState<number>(0);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleRatingSubmit = async () => {
    if (rating < 1 || rating > 5) {
      setErrorMessage('Rating must be between 1 and 5');
      return;
    }

    try {
      const response = await axios.post('http://localhost:8000/submit-rating', { transactionId, rating });
      if (response.status === 200) {
        onClose();
      } else {
        setErrorMessage('Failed to submit rating');
      }
    } catch (error) {
      setErrorMessage('Failed to submit rating');
    }
  };

  return (
    <Modal
      transparent={true}
      animationType="slide"
      visible={true}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.title}>Rate Your Tailor</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter rating (1-5)"
            keyboardType="numeric"
            value={String(rating)}
            onChangeText={(text) => setRating(Number(text))}
          />
          {errorMessage && <Text style={styles.errorText}>{errorMessage}</Text>}
          <TouchableOpacity style={styles.submitButton} onPress={handleRatingSubmit}>
            <Text style={styles.submitButtonText}>Submit Rating</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  title: {
    fontSize: width * 0.06,
    fontWeight: 'bold',
    color: '#260101',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    padding: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 20,
    textAlign: 'center',
    fontSize: width * 0.045,
    color: '#260101',
  },
  submitButton: {
    backgroundColor: '#593825',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 10,
  },
  submitButtonText: {
    color: 'white',
    fontSize: width * 0.045,
    fontWeight: 'bold',
  },
  closeButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center',
    backgroundColor: '#D9C3A9',
  },
  closeButtonText: {
    color: '#260101',
    fontSize: width * 0.045,
  },
  errorText: {
    color: 'red',
    fontSize: width * 0.04,
    marginBottom: 20,
  },
});

export default RatingScreen;
