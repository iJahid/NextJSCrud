import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Input,
  Select,
  Table,
  TableContainer,
  Tbody,
  Td,
  Tr,
  Text,
  FormHelperText,
  Stack,
  RadioGroup,
  Radio,
} from "@chakra-ui/react";
import { Prisma } from "@prisma/client";
import moment from "moment";
import { useState } from "react";

export default function EmpBasicView({ emps }) {
  // console.log(emps);
  return (
    <Box w={"100vw"}>
      <Stack dir="row" spacing={4}>
        <FormLabel> ID : {emps.empid}</FormLabel>
        <FormLabel> Name : {emps.name}</FormLabel>
        <FormLabel> Email : {emps.email}</FormLabel>
        <FormLabel>
          {" "}
          Date OF Birth :{moment(new Date(emps.dob)).format("DD-MM-YYYY")}
        </FormLabel>
        <FormLabel>Address : {emps.prmaddress}</FormLabel>
        <FormLabel> Contact Number : {emps.phone}</FormLabel>
        <FormLabel> TIN : {emps.TIN}</FormLabel>
      </Stack>
      <Stack></Stack>
    </Box>
  );
}
