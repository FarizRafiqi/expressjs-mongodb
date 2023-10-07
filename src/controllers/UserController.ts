import express from "express";
import {getUsers, deleteUserById, updateUserById} from "../models/User";

export const getAllUsers = async (req: express.Request, res: express.Response) => {
    try {
        const users = await getUsers();

        return res.status(200).json(users).end();
    } catch (e) {
        console.error(e);
        return res.sendStatus(400);
    }
}

export const updateUser = async (req: express.Request, res: express.Response) => {
    try {
        const {id} = req.params;
        const {username} = req.body;

        if (!username) {
            return res.sendStatus(400);
        }

        const user = await updateUserById(id, {username});

        return res.status(200).json(user).end();
    } catch (e) {
        console.error(e);
        return res.sendStatus(400);
    }
}

export const deleteUser = async (req: express.Request, res: express.Response) => {
    try {
        const {id} = req.params;

        if (!id) {
            return res.sendStatus(400);
        }

        const user = await deleteUserById(id);
        return res.status(200).json(user).end();
    } catch (e) {
        console.error(e);
        return res.sendStatus(400);
    }
}