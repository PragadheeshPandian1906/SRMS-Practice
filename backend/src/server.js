import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import supabase from "./config/supabase.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());


// GET all students
app.get("/students", async (req, res) => {
    const { data, error } = await supabase
        .from("student")
        .select("*");

    if (error) {
        return res.status(500).json({
            error: error.message
        });
    }

    res.json(data);
});


// GET student by ID
app.get("/students/:id", async (req, res) => {
    const { id } = req.params;

    const { data, error } = await supabase
        .from("student")
        .select("*")
        .eq("id", id)
        .single();

    if (error) {
        return res.status(404).json({
            error: error.message
        });
    }

    res.json(data);
});


// CREATE student
app.post("/students", async (req, res) => {
    const { name, email, age, cgpa } = req.body;

    const { data, error } = await supabase
        .from("student")
        .insert({
            name,
            email,
            age,
            cgpa
        })
        .select();

    if (error) {
        return res.status(500).json({
            error: error.message
        });
    }

    res.status(201).json(data);
});


// UPDATE student
app.put("/students/:id", async (req, res) => {
    const { id } = req.params;
    const { name, email, age, cgpa } = req.body;

    const { data, error } = await supabase
        .from("student")
        .update({
            name,
            email,
            age,
            cgpa
        })
        .eq("id", id)
        .select();

    if (error) {
        return res.status(500).json({
            error: error.message
        });
    }

    res.json(data);
});


// DELETE student
app.delete("/students/:id", async (req, res) => {
    const { id } = req.params;

    const { error } = await supabase
        .from("student")
        .delete()
        .eq("id", id);

    if (error) {
        return res.status(500).json({
            error: error.message
        });
    }

    res.json({
        message: "Student deleted successfully"
    });
});


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});