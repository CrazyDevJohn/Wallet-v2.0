import type { Request, Response } from "express";
import { db } from "../prisma/db";

export const getTransections = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params as { userId: string };

    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    // const transections = await sql`

    //   SELECT * FROM transections WHERE user_id = ${userId} ORDER BY created_at DESC
    // `;

    const transections = await db.orm.public.Transaction.where({
      user_id: Number(userId),
    })
      .orderBy((createTransection) => createTransection.createdAt.desc())
      .all();

    return res.status(200).json(transections);
  } catch (error) {
    console.error("Error fetching transections:", error);
    return res.status(500).json({ message: "Internal Server Error", error });
  }
};

export const createTransection = async (req: Request, res: Response) => {
  try {
    const { userId, title, amount, category, createAt } = req.body;

    console.log(userId, title, amount, category, createAt);

    if (!userId || !title || !category || amount === undefined) {
      return res.status(400).json({ message: "Require all fields!" });
    }

    // const transection = await sql`
    //   INSERT INTO transections (user_id, title, amount, category) VALUES (${userId}, ${title}, ${amount}, ${category})
    //   RETURNING *
    // `;

    const transection = await db.orm.public.Transaction.create({
      user_id: Number(userId),
      title: title,
      //   amount: amount as string,
      category: category,
      amount: "" + amount, // Convert number to string
      createdAt: createAt,
    });

    if (!transection) {
      return res.status(400).json({
        message: "Teansection Creation done with error!",
      });
    }

    return res.status(201).json({
      message: "Transaction created successfully!",
    });
  } catch (error) {
    console.error("Error creating transections:", error);
    return res.status(500).json({ message: "Internal Server Error", error });
  }
};

export const deleteTransection = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "Tracsection ID is required!" });
    }

    // const transection = await sql`

    //   DELETE FROM transections WHERE id = ${id}
    //   RETURNING *

    // `;

    const transection = await db.orm.public.Transaction.where({
      id: Number(id),
    }).delete();

    if (transection) {
      return res.status(400).json({
        message: "Teansection deleting done with error!",
      });
    }

    return res.status(200).json({
      message: "Transection Deleted Successully!",
    });
  } catch (error) {
    console.error("Error deleting transections:", error);
    return res.status(500).json({ message: "Internal Server Error", error });
  }
};

export const getSummery = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    const plan = await db.raw.sql`
  SELECT COALESCE(SUM(amount), 0) AS balance 
  FROM transections 
  WHERE user_id = ${Number(userId)}
`
      .returnsRow({ balance: "pg/int4@1" })
      .build();

    const [row] = await db.query(plan);

    console.log("row", row);

    const incomeResult = await db.raw.sql`
      SELECT COALESCE(SUM(amount), 0) as income FROM transections
      WHERE user_id = ${Number(userId)} AND amount > 0
    `
      .returnsRow({ income: "pg/int4@1" })
      .build();

    const [income] = await db.query(incomeResult);

    const expenseResult = await db.raw.sql`
      SELECT COALESCE(SUM(amount), 0) as expense FROM transections
      WHERE user_id = ${Number(userId)} AND amount < 0
    `
      .returnsRow({ expense: "pg/int4@1" })
      .build();

    const [expense] = await db.query(expenseResult);

    return res.status(200).json({
      balance: row?.balance ?? 0,
      income: income?.income ?? 0,
      expense: expense?.expense ?? 0,
    });
  } catch (error) {
    console.error("Error getting transections summery:", error);
    return res.status(500).json({ message: "Internal Server Error", error });
  }
};
