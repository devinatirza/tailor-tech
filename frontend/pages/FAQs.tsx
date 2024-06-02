import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Dimensions, Image } from 'react-native';

const FAQsScreen = () => {
  const upIcon = '../assets/upIcon.png';
  const downIcon = '../assets/downIcon.png';

  const [expanded, setExpanded] = useState<number | null>(null);

  const faqs = [
    {
      question: 'What is TailorTech?',
      answer: 'TailorTech is your go-to platform for booking services to sew or fix your tops, bottoms, dresses, suits, and bags. Our talented tailors also offer unique, ready-made items for purchase.',
    },
    {
      question: 'How do I book a service?',
      answer: 'Simply browse through our list of skilled tailors, select the service you need, and follow the easy on-screen instructions to complete your booking.',
    },
    {
      question: 'Can I choose my own tailor?',
      answer: 'Absolutely! You can pick from a variety of talented tailors available on our platform.',
    },
    {
      question: 'What types of measurements are available?',
      answer: 'We offer four convenient measurement options:\n• Self Measurement\n• Video-guide Measurement\n• Chat or Call Assistant\n• Home Service',
    },
    {
      question: 'How does the self-measurement option work?',
      answer: 'The self-measurement option provides you with easy-to-follow guidelines and tools within the app to help you take accurate measurements by yourself.',
    },
    {
      question: 'What is the video-guide measurement?',
      answer: 'Our video-guide measurement offers a detailed step-by-step video tutorial to help you measure yourself accurately.',
    },
    {
      question: 'What is the chat or call assistant measurement?',
      answer: 'This option lets you chat or call an assistant who will guide you through the measurement process in real-time.',
    },
    {
      question: 'How does the home service measurement work?',
      answer: 'With the home service measurement, you can schedule a visit, and our team will come to your place to take precise measurements.',
    },
    {
      question: 'What specialties do tailors have?',
      answer: 'Each tailor has their own specialties such as:\n• Tops\n• Bottoms\n• Dresses\n• Suits\n• Bags\n\nThey also set their base prices, which can be adjusted based on your specific requests.',
    },
    {
      question: 'What payment methods are accepted?',
      answer: 'We accept a range of payment options including:\n• Credit/Debit cards\n• PayPal\n• Other local methods',
    },
    {
      question: 'How can I exchange my points for a coupon code?',
      answer: 'You can exchange 1000 points to redeem a coupon code, which can be used during the payment process.',
    },
    {
      question: 'Can I use the coupon code on any order?',
      answer: 'Yes, the coupon code can be applied to any order during the payment process.',
    },
    {
      question: 'How do I earn points in TailorTech?',
      answer: 'You earn points with each transaction. Once you accumulate 1000 points, you can redeem them for a coupon code.',
    },
    {
      question: 'What are the shipping options?',
      answer: 'We offer two shipping options:\n• Standard (3-5 days)\n• Express (1-2 days)\n\nThe express option costs more due to its quicker delivery time.',
    },
    {
      question: 'How can I track my order?',
      answer: 'You can easily track your order status in the "Orders" section of the app. We’ll also send you notifications with updates.',
    },
    {
      question: 'Can I cancel a booking after it\'s made?',
      answer: 'Unfortunately, once a booking is made, it cannot be canceled.',
    },
    {
      question: 'Can I modify my order after placing it?',
      answer: 'No, modifications cannot be made after placing an order.',
    },
    {
      question: 'How can I contact customer support?',
      answer: 'You can chat with our friendly customer support team through WhatsApp by clicking [here].',
    },
    {
      question: 'How can I communicate with tailors?',
      answer: 'Communication with tailors is available only through our built-in messaging feature to ensure a smooth and secure interaction.',
    },
    {
      question: 'How are tailor ratings and reviews handled?',
      answer: 'After each service, you can rate and review your tailor. These reviews help other users make informed decisions.',
    },
    {
      question: 'What should I do if I\'m not satisfied with the service?',
      answer: 'If you\'re not happy with the service, please reach out to our customer support team. We’re committed to resolving any issues promptly and fairly.',
    },
  ];

  const toggleExpand = (index: number) => {
    setExpanded(expanded === index ? null : index);
  };

  return (
    <View style={styles.mainContainer}>
      <Text style={styles.titleText}>FAQs</Text>
      <ScrollView style={styles.scrollContainer}>
        <View style={styles.innerContainer}>
          {faqs.map((faq, index) => (
            <View key={index} style={styles.faqItem}>
              <TouchableOpacity style={styles.questionContainer} onPress={() => toggleExpand(index)}>
                <Text style={styles.questionText}>{faq.question}</Text>
                <Image source={{uri: expanded === index ? upIcon : downIcon}} style={styles.icon} />
              </TouchableOpacity>
              {expanded === index && <Text style={styles.answerText}>{faq.answer}</Text>}
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const { width: deviceWidth, height: deviceHeight } = Dimensions.get('window');

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  scrollContainer: {
    flex: 1,
  },
  innerContainer: {
    flex: 1,
    paddingHorizontal: deviceWidth * 0.1,
    width: '100%',
  },
  titleText: {
    fontSize: deviceWidth * 0.09,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
    color: '#260101',
    textAlign: 'center',
  },
  faqItem: {
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  questionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 5,
  },
  questionText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#260101',
  },
  icon: {
    width: 24,
    height: 24,
    tintColor: '#260101',
  },
  answerText: {
    paddingVertical: 10,
    fontSize: 18,
    fontWeight: '400',
    color: 'black',
  },
});

export default FAQsScreen;