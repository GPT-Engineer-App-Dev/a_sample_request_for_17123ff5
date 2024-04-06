import { Box, Button, Container, FormControl, FormLabel, Input, Text, VStack, useToast } from "@chakra-ui/react";
import { useState } from "react";
import { FaPrint } from "react-icons/fa";

const Index = () => {
  const [formData, setFormData] = useState({
    email: "",
    sampleInfo: "",
  });
  const [uniqueNumber, setUniqueNumber] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const toast = useToast();

  const generateUniqueNumber = () => {
    return Math.random().toString(36).substr(2, 9).toUpperCase();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.email && formData.sampleInfo) {
      const generatedNumber = generateUniqueNumber();
      setUniqueNumber(generatedNumber);
      setSubmitted(true);
      // Simulating email automation
      toast({
        title: "Form Submitted.",
        description: "A unique tracking number has been generated and emailed to the customer.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      // In a real application, you would send the email here
    } else {
      toast({
        title: "Error.",
        description: "All fields are required.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const handlePrintLabel = () => {
    // In a real application, you would implement actual printing functionality here
    toast({
      title: "Print Shipping Label.",
      description: "Label printing is not actually implemented in this demo.",
      status: "info",
      duration: 5000,
      isClosable: true,
    });
  };

  return (
    <Box bg="#002F5D" minH="100vh" color="white" py={10}>
      <Container>
        <VStack spacing={4} as="form" onSubmit={handleSubmit}>
          <FormControl id="email" isRequired>
            <FormLabel>Email address</FormLabel>
            <Input name="email" type="email" value={formData.email} onChange={handleInputChange} bg="white" color="black" />
          </FormControl>
          <FormControl id="sampleInfo" isRequired>
            <FormLabel>Sample Information</FormLabel>
            <Input name="sampleInfo" type="text" value={formData.sampleInfo} onChange={handleInputChange} bg="white" color="black" />
          </FormControl>
          <Button type="submit" colorScheme="green">
            Submit
          </Button>
          {submitted && (
            <VStack spacing={2}>
              <Text>
                Unique Number: <strong>{uniqueNumber}</strong>
              </Text>
              <Button leftIcon={<FaPrint />} colorScheme="green" onClick={handlePrintLabel}>
                Print Shipping Label
              </Button>
              <Text fontSize="sm">Cyklop CSC Att.: SampleLab M.Slot [{uniqueNumber}] Wilhelm Röntgenstraat 10, 8013NC, Zwolle, Nederland</Text>
            </VStack>
          )}
        </VStack>
      </Container>
    </Box>
  );
};

export default Index;
