import EmpBasic from "../../components/Employee/EmpBasic";

import { useRouter } from "next/router";
export default function Home() {
  const router = useRouter();
  const { empid } = router.query;
  //console.log(empid);
  //alert(empid);

  return (
    <>
      <EmpBasic _empid={empid ? empid : ""} />
    </>
  );
}
