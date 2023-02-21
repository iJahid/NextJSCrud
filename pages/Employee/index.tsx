import AllEmployee from "../../components/Employee/EmployeeList";
import { Button, Center } from "@chakra-ui/react";

export default function Home(req, res) {
  console.log("Request", req);
  /*const { emp = [] } = req.query;

  if (emp[0] === "CreateEmployee")
    return (
      <>
        <EmpBasic />
      </>
    );
*/

  return <AllEmployee />;
}
/*
export async function getServerSideProps() {
  const employees = await prisma.employee.findMany();

  return {
    props: { initialEmp: JSON.parse(JSON.stringify(employees)) },
  };
}
*/
