import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../prismacl";

export default async function Delete(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method != "POST") {
    return res.json({ msg: "Only Post Data!!!!" });
  }

  try {
    const { empid } = req.body;
    if (!empid) {
      return res.json({ msg: "ID Not Found" });
    }
    const deletedEmployee = await prisma.employee.delete({
      where: { empid: empid },
    });
    res.status(200).json({ EM: empid, emp: deletedEmployee });
  } catch (err) {
    res.json({ msg: "Err" + err });
  }
}
