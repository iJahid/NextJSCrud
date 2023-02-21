import { ArrowRightIcon, DeleteIcon, EditIcon } from "@chakra-ui/icons";

import {
  Box,
  Button,
  Flex,
  FormLabel,
  Input,
  Spacer,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { Prisma } from "@prisma/client";
import moment from "moment";
import Link from "next/link";
import { useEffect, useState } from "react";
import { fetcher } from "../../pages/utils/fetcher";
import Loading from "../Loading";

import Pagination from "../Pagination";

export default function AllEmployee() {
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  let currentPage = 1;
  const [currentEmps, setCurrentEmps] =
    useState<Prisma.EmployeeUncheckedCreateInput[]>();

  const postPersPage = 6;
  let indexOfLastEmps = currentPage * postPersPage;
  let indexOfFirstEmps = indexOfLastEmps - postPersPage;
  const [emps, setEmps] = useState<Prisma.EmployeeUncheckedCreateInput[]>();
  useEffect(() => {
    const feetchEmps = async () => {
      setLoading(true);
      const empl = (await fetch("/api/Employee/GET", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      }).then((er) => {
        return er.json();
      })) as unknown as Prisma.EmployeeUncheckedCreateInput[];

      setEmps(empl);
      /*   setCurrentEmps(
        empl.filter((empname) => {
          return search.toLowerCase() == ""
            ? empname
            : empname.name.toLowerCase().includes(search);
        })
      );*/

      if (indexOfLastEmps - 1 < empl.length) {
        setCurrentEmps(empl.slice(indexOfFirstEmps, indexOfLastEmps));
      } else setCurrentEmps(empl);

      setLoading(false);
    };
    feetchEmps();
  }, []);
  console.log("sss", currentEmps);
  // const [emps, setEmps] =
  //useState<Prisma.EmployeeUncheckedCreateInput[]>(emplist);
  if (loading) return <Loading msg={"Loading Data.."} />;
  if (!currentEmps)
    return (
      <>
        <Loading msg={"Employee Searching"} />
      </>
    );
  const pagenumber = async (pg) => {
    currentPage = pg;
    indexOfLastEmps = currentPage * postPersPage;
    indexOfFirstEmps = indexOfLastEmps - postPersPage;
    //alert(indexOfFirstEmps + "." + indexOfLastEmps);
    await setCurrentEmps(emps.slice(indexOfFirstEmps, indexOfLastEmps));
  };
  const SearchEmp = (searhstr) => {
    console.log(searhstr);
    setCurrentEmps(
      emps
        ?.filter((empname) => {
          return searhstr.toLowerCase() == ""
            ? empname
            : empname.name.toLowerCase().includes(searhstr);
        })
        .slice(indexOfFirstEmps, indexOfLastEmps)
    );
  };
  function renderRelegion(param) {
    switch (param) {
      case 1:
        return "ISLAM";
      case 2:
        return "HINDUISM";
      case 2:
        return "BUDHISM";
      case 3:
        return "CHRISTIAN";
      default:
        return "UNKNOWN";
    }
  }
  return (
    <Flex direction={"column"} w={"100%"}>
      <Flex alignContent={"right"} width={"80%"}>
        <Spacer />
        <Box flex={"100vh"}>
          {" "}
          <FormLabel>
            <ArrowRightIcon /> Search Name :
          </FormLabel>
          <Input
            width={"250px"}
            type={"text"}
            onChange={(e) => {
              SearchEmp(e.target.value);
            }}
          ></Input>
        </Box>
        <Button
          alignContent={"center"}
          width={"230px"}
          variant="solid"
          margin={4}
        >
          <a href="/Employee/CRUD"> Create New Employee</a>
        </Button>
      </Flex>
      <Flex w={"100%"}>
        <TableContainer fontSize={"13px"} width="80%" margin={"15px"}>
          <Table variant="striped">
            <Thead>
              <Tr>
                <Th>EMPID</Th>
                <Th>Name</Th>
                <Th>Address</Th>
                <Th>Date of Birth</Th>
                <Th>Status</Th>
                <Th>BloodGrp</Th>
                <Th>Relegion</Th>
              </Tr>
            </Thead>
            <Tbody>
              {currentEmps.map((x, index) => (
                // console.log("key", index);

                <Tr key={index}>
                  <Td>
                    <Link
                      href={{
                        pathname: "/Employee/CRUD",
                        query: { empid: x.empid },
                      }}
                    >
                      <EditIcon color={"green.600"} />
                    </Link>
                    &nbsp;&nbsp;&nbsp;
                    {x.empid}
                  </Td>
                  <Td>{x.name}</Td>
                  <Td>{x.prmaddress}</Td>
                  <Td>{moment(new Date(x.dob)).format("DD-MM-YYYY")}</Td>
                  <Td>{x.status}</Td>
                  <Td> {x.bloodgrp}</Td>
                  <Td> {renderRelegion(x.relegion)}</Td>

                  <Td>
                    <Button
                      onClick={async () => {
                        if (!confirm("Delete Employee? " + x.empid)) return;
                        const s = await fetcher("/api/Employee/delete", {
                          empid: x.empid,
                        });
                        console.log("deleted", s);
                        await setCurrentEmps(emps.filter((em) => em !== x));
                      }}
                    >
                      <DeleteIcon color={"red"}></DeleteIcon>
                    </Button>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </Flex>
      <Flex width={"100vh"}>
        <Pagination
          dataPerPage={postPersPage}
          totalData={emps.length}
          paginate={pagenumber}
        />
      </Flex>
    </Flex>
  );
}
