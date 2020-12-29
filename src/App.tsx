import React, { useEffect, useState } from "react";
import "./App.css";
import { ChakraProvider } from "@chakra-ui/react";
import { Box, Text, Flex, Heading, Progress } from "@chakra-ui/react";
import moment from "moment";

function App() {
  const [daysRemaining, setdaysRemaining] = useState(0);
  const [daysPercentageGone, setdaysPercentageGone] = useState(0);

  useEffect(() => {
    setdaysRemaining(getRemainingDays());
    setdaysPercentageGone(
      daysPercentageGone < getPercentageOfDays()
        ? daysPercentageGone + 1
        : getPercentageOfDays()
    );
  }, [daysPercentageGone]);

  const getRemainingDays = () => {
    var now = moment(new Date()); //todays date
    var endDate = moment().endOf("year");
    var duration = moment.duration(endDate.diff(now));
    var days = duration.asDays();
    return Math.round(days);
  };

  const getPercentageOfDays = () => {
    let currentDay = moment().dayOfYear();
    let totalDays = currentDay + getRemainingDays();
    return (currentDay / totalDays) * 100;
  };

  return (
    <ChakraProvider>
      <Flex
        justifyContent="center"
        height="100vh"
        flexDirection="column"
        alignItems="center"
        width="100%"
      >
        <Box maxWidth={380} width="90%">
          <Text textAlign="center" fontFamily="Inter">
            Today's date is:
          </Text>
          <Text
            fontSize={18}
            fontWeight={600}
            textAlign="center"
            fontFamily="Inter"
          >
            {moment(new Date()).format("DD MMMM YYYY")}
          </Text>

          <Heading
            fontSize={96}
            textAlign="center"
            marginTop={5}
            fontFamily="Inter"
          >
            {daysRemaining} Days
          </Heading>
          <Text
            fontSize={24}
            textAlign="center"
            marginTop={3}
            fontFamily="Inter"
            fontWeight={800}
          >
            Till {moment().add(1, "years").format("YYYY")}
          </Text>

          <Progress
            marginTop={10}
            marginBottom={5}
            colorScheme="green"
            width="100%"
            height="10px"
            bg="red"
            value={daysPercentageGone}
          />
          <Text fontSize={14} textAlign="center" fontFamily="Inter">
            {Math.round(daysPercentageGone * 100) / 100}% Complete
          </Text>
        </Box>
      </Flex>
    </ChakraProvider>
  );
}

export default App;
