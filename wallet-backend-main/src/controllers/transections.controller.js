import sql from "../configs/db.js";

export const getTransections = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    const transections = await sql`
      SELECT * FROM transections WHERE user_id = ${userId} ORDER BY created_at DESC
    `;

    return res.status(200).json(transections);
  } catch (error) {
    console.error("Error fetching transections:", error);
    return res.status(500).json({ message: "Internal Server Error", error });
  }
};

export const createTransection = async (req, res) => {
  try {
    const { userId, title, amount, category } = req.body;

    console.log(userId, title, amount, category);

    if (!userId || !title || !category || amount === undefined) {
      return res.status(400).json({ message: "Require all fields!" });
    }

    const transection = await sql`
      INSERT INTO transections (user_id, title, amount, category) VALUES (${userId}, ${title}, ${amount}, ${category})
      RETURNING *
    `;

    if (transection.length === 0) {
      return res.status(400).json({
        message: "Teansection Creation done with error!",
      });
    }

    return res.status(201).json({
      message: "Transection created successfully!",
    });
  } catch (error) {
    console.error("Error creating transections:", error);
    return res.status(500).json({ message: "Internal Server Error", error });
  }
};

export const deleteTransection = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "Tracsection ID is required!" });
    }

    const transection = await sql`
      DELETE FROM transections WHERE id = ${id}
      RETURNING *
    `;

    if (transection.length === 0) {
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

export const getSummery = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    const balanceResult = await sql`
      SELECT COALESCE(SUM(amount), 0) as balance FROM transections
      WHERE user_id = ${userId}
    `;

    const incomeResult = await sql`
      SELECT COALESCE(SUM(amount), 0) as income FROM transections
      WHERE user_id = ${userId} AND amount > 0
    `;

    const expenseResult = await sql`
      SELECT COALESCE(SUM(amount), 0) as expense FROM transections
      WHERE user_id = ${userId} AND amount < 0
    `;

    return res.status(200).json({
      balance: balanceResult[0].balance,
      income: incomeResult[0].income,
      expense: expenseResult[0].expense,
    });
  } catch (error) {
    console.error("Error getting transections summery:", error);
    return res.status(500).json({ message: "Internal Server Error", error });
  }
};
