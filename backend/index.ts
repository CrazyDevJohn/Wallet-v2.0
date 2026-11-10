import cors from "cors";

import app from "./src/server";
import userRoutes from "./src/routes/user.routes";
import transectionRoutes from "./src/routes/transections.routes";

const PORT = process.env.PORT as string;

app.use(cors());

app.use("/api/users", userRoutes);
app.use("/api/transections", transectionRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
