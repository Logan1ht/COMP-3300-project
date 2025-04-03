import express from "express";
import cors from "cors";
import fs from "fs";

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 3000;

// Read db.json file
const getData = () => JSON.parse(fs.readFileSync("./db.json", "utf8"));

// Route to get student data
app.get("/students", (req, res) => {
    const data = getData();
    res.json(data.students);
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});