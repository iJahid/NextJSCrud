import prisma from "../../../prismacl";
import { NextApiRequest, NextApiResponse } from "next";

async function main(req: NextApiRequest, res: NextApiResponse) {
  if (req.method != "POST") {
    return res.json({ msg: "Only Post Data" });
  }

  const { emp = [] } = req.query;
  console.log("serv", emp);
  if (emp.length > 0) {
    switch (emp[0]) {
      case "GETSINGLE": {
        const data = req.body;
        const lngData = data.length;
        //console.log("Get Emp", data);

        if (data.empid) {
          const user = await prisma.employee.findFirst({
            where: { empid: data.empid },
          });
          // console.log("Serverside", user);
          return res.json(user);
        }
      }
      case "GET": {
        const user = await prisma.employee.findMany({
          orderBy: {
            empid: "desc",
          },
        });
        // console.log("Serverside", user);
        return res.json(user);
      }
      case "GETNEWID": {
        const user = await prisma.employee.aggregate({
          _max: { empid: true },
        });
        // console.log("Serverside", user);
        let emp = user._max.empid;
        if (emp) {
          const empno = parseInt(emp) + 1;
          emp = empno + "";
        }

        return res.json({ empid: emp });
      }
      case "ADD": {
        const data = JSON.parse(req.body);
        const lngData = data.length;
        console.log("ADD Params", data);
        if (data.empid) {
          try {
            const user = await prisma.employee.create({ data });
            console.log("Added User", user);
            return res.json(user);
          } catch (error) {
            console.log(error);
          }
        } else {
          return res.json({ msg: "Nosdfo" });
        }
        break;
      }
      case "DEL": {
        const data = req.body;
        console.log("ToDelete", data);
        try {
          const user = await prisma.employee.delete({
            where: { id: parseInt(data) },
          });
          console.log("Deleted User", user);
          return res.json(user);
        } catch (er) {
          console.log("Deleted Err", er);
          return res.json({ msg: "unable to delete" });
        }
      }

      case "UPDATE": {
        const data = JSON.parse(req.body);
        const lngData = data.length;
        console.log("Update Params", data.empid);
        if (data.empid) {
          try {
            const user = await prisma.employee.updateMany({
              where: { empid: data.empid },
              data: data,
            });
            console.log("Update User", user);
            return res.json(user);
          } catch (error) {
            console.log(error);
          }
        } else {
          return res.json({ msg: "Nosdfo" });
        }
        break;
      }
      default:
        return res.json({ msg: "Nothing to do" });
    }
  } else res.json({ msg: "No Action Defined" });
  //return res.json({ msg: "Good" });
  /*
  const { Where = [] } = req.body;
  const { data = [] } = req.body;
  const { userparms = [] } = req.query;
  const lng = Object.keys(Where).length;
  const lngData = Object.keys(data).length;
  const lngData1 = Object.values(userparms[0]);
  console.log(userparms);
  // lngData1.map((x, y) => console.log(y));
  switch (req.method) {
    case "POST": {
      if (lngData === 0) {
        return res.status(201).json("No DATA");
      }
      if (!data.password) {
        return res.status(201).json("No Password");
      }

      const user = await prisma.user.create({
        data: data,
      });
      res.status(200).json(user);
      break;
    }
    case "PUT": {
      const iData = req.body.data;
      if (iData) {
        const user = await prisma.user.updateMany({
          where: Where,
          data: iData,
        });
        res.status(200).json(user);
      } else {
        console.log("No Data For Update");
        res.status(400).json("No Data For Update");
      }
      break;
    }
    case "GET": {
      try {
        const params = JSON.parse(userparms);
        const WHR = Object.values(params);
        const prm = Object.entries(WHR[0]);
        const jsonObj = JSON.parse(JSON.stringify(WHR[0]));

        const lng1 = prm.length;

        console.log(jsonObj, lng1, WHR[0].id);
        if (lng1 > 0) {
          if (WHR[0].id === -999) {
            const user = await prisma.user.findMany({});
            res.status(200).json(user);
          } else {
            const user1 = await prisma.user.findMany({
              where: jsonObj,
            });
            res.status(200).json(user1);
          }
        } else res.status(200).json("ERRor");
      } catch (err) {
        res.status(400).json("ERR");
        console.log(err);
      }
      break;
    }
    case "DELETE": {
      const user = await prisma.user.deleteMany({
        where: Where,
      });
      res.status(200).json(user);
      break;
    }
    default: {
      res.status(404).json("ERROR");
      break;
    }
  }*/
}

export default main;
/*.then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });*/
