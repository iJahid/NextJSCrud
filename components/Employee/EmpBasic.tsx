import { AddIcon, CopyIcon, EditIcon, ViewIcon } from "@chakra-ui/icons";
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
  Divider,
  ListIcon,
} from "@chakra-ui/react";

import { Prisma } from "@prisma/client";
import moment from "moment";
import { useEffect, useState } from "react";
import Loading from "../Loading";

import EmpBasicView from "./EmpBasicView";

export default function EmpBasic({ _empid }) {
  console.log("incomp", _empid);
  const [showForm, SetShowForm] = useState(true);
  const [idReadonly, setIdReadonly] = useState(false);
  const [loading, setLoading] = useState(false);

  const [emps, setEmps] = useState<Prisma.EmployeeUncheckedCreateInput>({
    empid: "",
    father: "",
    name: "",
    phone: "",
    address: "",
    bloodgrp: "U",
    prmaddress: "",
    tin: "",
    gender: "M",
    relegion: 1,
    married: "U",
    email: "",
    dob: "0000-00-00",
    lasteducation: "",
  });

  const [isEdit, setEdit] = useState(false);
  useEffect(() => {
    setLoading(true);
    const getEmp = async (iempid: string) => {
      const sl = (await fetch("/api/Employee/GETSINGLE", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ empid: iempid }),
      }).then((er) => {
        return er.json();
      })) as unknown as Prisma.EmployeeUncheckedCreateInput;
      if (sl) {
        setEmps(sl);
        EditForm();
      }
    };
    console.log(_empid, "new imp");
    if (_empid) getEmp(_empid);

    setLoading(false);
  }, []); /*
 
      console.log(iempid, "asdsad");

     
      console.log("sl", sl);
      if (sl) {
        setEmps(sl);
      } else {
        return (
          <Flex>
            <h1>No Data Found</h1>
          </Flex>
        );
      }
      getEmp(_empid);
      // if (_empid) {
    };

    setLoading(false);
  }, []);*/
  console.log("PP", _empid);

  //}
  if (loading) return <Loading msg={""} />;

  console.log("found", emps);
  // setEmps(initEmp);
  /*  setEdit(true);
      setIdReadonly(true);
      SetShowForm(true);*/

  const EditForm = () => {
    setEdit(true);
    setIdReadonly(true);
    SetShowForm(true);
  };
  const AddForm = () => {
    _empid = null;
    setEdit(false);
    setIdReadonly(false);
    const sl = () =>
      ({
        empid: "",
        father: "",
        name: "",
        phone: "",
        address: "",
        bloodgrp: "U",
        prmaddress: "",
        tin: "",
        gender: "M",
        relegion: 1,
        married: "U",
        email: "",
        dob: "0000-00-00",
        lasteducation: "",
      } as Prisma.EmployeeUncheckedCreateInput);
    setEmps(sl);

    SetShowForm(true);
  };
  const handleGender = (value) => {
    //alert(value);
    setEmps({ ...emps, gender: value });
    console.log("G", emps.gender);
  };

  const handleRelegion = (value) => {
    //alert(value);
    setEmps({ ...emps, relegion: value });
    console.log(emps);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let rsl;
    if (!isEdit)
      rsl = (await fetch("/api/Employee/create", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ emp: emps }),
      }).then((er) => {
        return er.json();
      })) as unknown as Prisma.EmployeeCreateInput;
    else
      rsl = (await fetch("/api/Employee/update", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ emp: emps }),
      }).then((er) => {
        return er.json();
      })) as unknown as Prisma.EmployeeCreateInput;

    if (rsl.empid) {
      alert("Data Saved");
      SetShowForm(false);
    }
  };
  return (
    <Flex>
      {showForm ? (
        <form onSubmit={handleSubmit}>
          <Flex direction={["column", "column", "row"]} w={"100vh"}>
            <FormControl
              id="empid"
              w={"30vh"}
              m="4"
              isReadOnly={idReadonly}
              isRequired={true}
            >
              <FormLabel>Employee ID</FormLabel>

              <Input
                type="text"
                size="sm"
                value={emps.empid}
                onChange={(e) => setEmps({ ...emps, empid: e.target.value })}
              />
            </FormControl>

            <FormControl id="name" m="4" isRequired>
              <FormLabel>Employee Name</FormLabel>

              <Input
                type="text"
                size="sm"
                value={emps.name}
                onChange={(e) => setEmps({ ...emps, name: e.target.value })}
              />
            </FormControl>
          </Flex>

          <Flex direction={["column", "column", "row"]} w={"100vh"}>
            <FormControl id="lasteducation" m="4" isRequired width={"30vh"}>
              <FormLabel>Education</FormLabel>
              <Select
                size="sm"
                value={emps.lasteducation}
                onChange={(e) =>
                  setEmps({
                    ...emps,
                    lasteducation: e.target.value,
                  })
                }
              >
                <option value="">-Select-</option>
                <option value="Phd">Phd</option>
                <option value="Masters">Masters</option>
                <option value="Bachelor">Bachelor</option>
                <option value="Diploma">Diploma</option>
                <option value="HSC">HSC</option>
                <option value="SSC">SSC</option>
                <option value="Under SSC">Under SSC</option>
                <option value="Under 8">Under 8</option>
              </Select>
            </FormControl>
            <FormControl id="prmaddress" m="4" isRequired>
              <FormLabel>Contact Address</FormLabel>

              <Input
                type="text"
                size="sm"
                value={emps.prmaddress}
                onChange={(e) =>
                  setEmps({ ...emps, prmaddress: e.target.value })
                }
              />
            </FormControl>
          </Flex>
          <Divider orientation="horizontal" />
          <Flex direction={["column", "column", "row"]} w={"100vh"}>
            <FormControl id="email" m="4">
              <FormLabel>Email</FormLabel>
              <Input
                type="email"
                size="sm"
                value={emps.email}
                onChange={(e) => setEmps({ ...emps, email: e.target.value })}
              />
            </FormControl>
            <FormControl id="phone" m="4" isRequired>
              <FormLabel>Contact Number</FormLabel>
              <Input
                type="text"
                size="sm"
                value={emps.phone}
                onChange={(e) => setEmps({ ...emps, phone: e.target.value })}
              />
            </FormControl>
            <FormControl id="nid" m="4">
              <FormLabel>National ID</FormLabel>{" "}
              <Input
                type="text"
                size="sm"
                value={emps.nid}
                onChange={(e) => setEmps({ ...emps, nid: e.target.value })}
              />
            </FormControl>
          </Flex>
          <Flex direction={["column", "column", "row"]} w={"100vh"}>
            <FormControl id="dob" m="4" isRequired>
              <FormLabel>Date Of Birth</FormLabel>{" "}
              <Input
                type="date"
                size="sm"
                value={moment(new Date(emps.dob)).format("YYYY-MM-DD")} //emps.dob?.toLocaleString() as unknown as Date}
                onChange={(e) =>
                  setEmps({
                    ...emps,
                    dob: new Date(e.target.value),
                  })
                }
              />
            </FormControl>
            <FormControl id="gender" m="4">
              <FormLabel>Gender</FormLabel>{" "}
              <RadioGroup onChange={handleGender} value={emps.gender}>
                <Stack direction="row">
                  <Radio value="M">Male</Radio>
                  <Radio value="F">Female</Radio>
                  <Radio value="T">TrnG</Radio>
                </Stack>
              </RadioGroup>
            </FormControl>

            <FormControl id="relegion" m="4">
              <FormLabel>Relegion</FormLabel>{" "}
              <Select
                size="sm"
                value={emps.relegion}
                onChange={(e) =>
                  setEmps({
                    ...emps,
                    relegion: Number(e.target.value),
                  })
                }
              >
                <option value="1">ISLAM</option>
                <option value="2">HINDU</option>
                <option value="3">CHRISTIAN</option>
                <option value="4">BUDDHISM</option>
              </Select>
            </FormControl>
          </Flex>
          <Flex>
            <FormControl id="married" m="4">
              <FormLabel>Marital Status</FormLabel>{" "}
              <Select
                size="sm"
                value={emps.married}
                onChange={(e) => setEmps({ ...emps, married: e.target.value })}
              >
                <option value="U">Un-Married</option>
                <option value="M">Married</option>
                <option value="W">WIDOWED</option>
                <option value="D">DIVORSED</option>
              </Select>
            </FormControl>
            <FormControl id="tin" m="4">
              <FormLabel>Tax ID (TIN)</FormLabel>{" "}
              <Input
                type="text"
                size="sm"
                value={emps.tin}
                onChange={(e) => setEmps({ ...emps, tin: e.target.value })}
              />
            </FormControl>
            <FormControl id="bloodgrp" m="4">
              <FormLabel>Blood Group</FormLabel>{" "}
              <Select
                size="sm"
                value={emps.bloodgrp}
                onChange={(e) => setEmps({ ...emps, bloodgrp: e.target.value })}
              >
                <option value="U">Unknown</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
              </Select>
            </FormControl>
          </Flex>
          <Button colorScheme="teal" variant="solid" m={4} type="submit">
            Update
          </Button>
        </form>
      ) : (
        <>
          <Box m={6} width={"100%"}>
            <div>
              <EmpBasicView emps={emps} />
            </div>

            <Divider />

            <Button onClick={EditForm} margin={6}>
              <EditIcon margin={6} /> Edit Again
            </Button>
            <Button onClick={AddForm} margin={6}>
              Create New
            </Button>
            <Button margin={6}>
              <CopyIcon />
              <a href="/Employee/">List</a>
            </Button>
          </Box>
        </>
      )}
    </Flex>
  );
}
