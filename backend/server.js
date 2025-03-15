import express from "express";
import cors from 'cors';
import { PrismaClient } from "@prisma/client";
//const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

const app = express();
app.use(express.json());
app.use(cors())

const users = [];

app.post('/usuarios/', async (req, res) => {
    try {
        await prisma.user.create({
            data: {
                email: req.body.email,
                name: req.body.name,
                age: req.body.age
            }
        })
        //users.push(req.body)
        res.status(201).json(req.body)
        }
    catch(error) {
        console.error("Erro:", error);
        res.status(500).json({ error: "Erro interno do servidor" })
    }
})

app.get('/usuarios/', async (req, res) => {
    let users = [];
    if (req.query.name) {
        users = prisma.user.findMany({
            where: {
                name: req.query.name
            }
        })
    } else {
        users = await prisma.user.findMany()
        res.status(200).json(users);  
    }
    
})

app.put('/usuarios/:id', async (req, res) => {
    try {
        await prisma.user.update({
            where: {
                id: Number(req.params.id)
            },
            data: {
                email: req.body.email,
                name: req.body.name,
                age: req.body.age
            }
        })
    } catch (error) {
        console.error("Erro:", error)
        res.status(500).json({ error: "Erro interno do servidor" })
    }
})

app.delete('/usuarios/:id', async (req, res) => {
    try {
        await prisma.user.delete({
            where: {
                id: req.params.id
            }
        })
        res.status(200).json({ message: "Usuário deletado" })
    } catch (error) {
        console.error("Erro:", error)
        res.status(500).json({ error: "Erro interno do servidor" })
    }
})

app.listen(3000, () => {
    console.log('Servidor rodando em http://localhost:3000');
});

//app.listen(3000);