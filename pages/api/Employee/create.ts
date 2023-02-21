import prisma from "../../../prismacl";
import { NextApiRequest, NextApiResponse } from "next";

export default async function main(req: NextApiRequest, res: NextApiResponse) {
  if (req.method != "POST") {
    return res.status(400).json({ msg: "Only Post Data!!!!" });
  }

  const { emp } = req.body;
  try {
    const savedEmployee = await prisma.employee.create({
      data: emp,
    });
    res.status(200).json(savedEmployee);
  } catch (err) {
    res.status(400).json({ msg: "Err" + err });
  }
}
