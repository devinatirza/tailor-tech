import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';

interface MeasurementDetailsProps {
  request: any;
}

const MeasurementDetails: React.FC<MeasurementDetailsProps> = ({ request }) => {
  const renderMeasurementDetails = () => {
    switch (request.RequestType) {
      case 1:
        return (
          <>
            <Text style={styles.detailText}>Chest: {request.Top.Chest} cm</Text>
            <Text style={styles.detailText}>Shoulder to Waist: {request.Top.ShoulderToWaist}</Text>
            <Text style={styles.detailText}>Shoulder: {request.Top.Shoulder}</Text>
            <Text style={styles.detailText}>Sleeve Length: {request.Top.SleeveLength}</Text>
            <Text style={styles.detailText}>Waist: {request.Top.Waist}</Text>
            <Text style={styles.detailText}>Neck: {request.Top.Neck}</Text>
            <Text style={styles.detailText}>Collar: {request.Top.Collar ? 'Yes' : 'No'}</Text>
          </>
        );
      case 2:
        return (
          <>
            <Text style={styles.detailText}>Waist to Ankle: {request.Bottom.WaistToAnkle}</Text>
            <Text style={styles.detailText}>Waist: {request.Bottom.Waist}</Text>
            <Text style={styles.detailText}>Hip: {request.Bottom.Hip}</Text>
            <Text style={styles.detailText}>Ankle: {request.Bottom.Ankle}</Text>
            <Text style={styles.detailText}>Thigh: {request.Bottom.Thigh}</Text>
            <Text style={styles.detailText}>Knee: {request.Bottom.Knee}</Text>
            <Text style={styles.detailText}>Cuff Width: {request.Bottom.CuffWidth}</Text>
          </>
        );
      case 3:
        return (
          <>
            <Text style={styles.detailText}>Chest: {request.Dress.Chest}</Text>
            <Text style={styles.detailText}>Shoulder: {request.Dress.Shoulder}</Text>
            <Text style={styles.detailText}>Dress Length: {request.Dress.DressLength}</Text>
            <Text style={styles.detailText}>Waist: {request.Dress.Waist}</Text>
            <Text style={styles.detailText}>Hip: {request.Dress.Hip}</Text>
          </>
        );
      case 4:
        return (
          <>
            <Text style={styles.detailText}>Chest: {request.Suit.Chest} cm</Text>
            <Text style={styles.detailText}>Waist: {request.Suit.Waist} cm</Text>
            <Text style={styles.detailText}>Hip: {request.Suit.Hip}</Text>
            <Text style={styles.detailText}>Shoulder: {request.Suit.Shoulder}</Text>
            <Text style={styles.detailText}>Sleeve Length: {request.Suit.SleeveLength}</Text>
            <Text style={styles.detailText}>Jacket Length: {request.Suit.JacketLength}</Text>
            <Text style={styles.detailText}>Inseam: {request.Suit.Inseam}</Text>
            <Text style={styles.detailText}>Outseam: {request.Suit.Outseam}</Text>
            <Text style={styles.detailText}>Thigh: {request.Suit.Thigh}</Text>
            <Text style={styles.detailText}>Knee: {request.Suit.Knee}</Text>
            <Text style={styles.detailText}>Ankle: {request.Suit.Ankle}</Text>
          </>
        );
      case 5:
        return (
          <>
            <Text style={styles.detailText}>Color: {request.ToteBag.Color}</Text>
            <Text style={styles.detailText}>Material: {request.ToteBag.Material}</Text>
            <Text style={styles.detailText}>Writing: {request.ToteBag.Writing}</Text>
            <Text style={styles.detailText}>Image Description: {request.ToteBag.ImageDesc}</Text>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <View style={styles.measurementDetails}>
      {renderMeasurementDetails()}
    </View>
  );
};

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  measurementDetails: {
    padding: 10,
    backgroundColor: '#F3EADE',
  },
  detailText: {
    fontSize: width * 0.043,
    color: '#593825',
    marginBottom: 3,
  },
});

export default MeasurementDetails;
