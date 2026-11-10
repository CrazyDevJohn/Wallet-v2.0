import rateLimit from "../configs/upstash.js";

export const rateLimitMiddleware = async (req, res, next) => {
  try {
    const { success } = await rateLimit.limit("ex"); // Limit based on IP address
    if (!success) {
      return res.status(429).json({
        message: "Too many requests, please try again later.",
      });
    }
    next();
  } catch (error) {
    console.error("Error in rate limit middleware:", error);
    next(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
