import express from "express";
import {getUserByEmail, createUser} from "../models/User";
import {random, authenticate} from "../helpers";

export const login = async (req: express.Request, res: express.Response) => {
    try {
        const {email, password} = req.body;

        if (!email || !password) {
            return res.sendStatus(400);
        }

        const user = await getUserByEmail(email).select('+authentication.salt +authentication.password');

        if (!user) {
            return res.sendStatus(404);
        }

        const expectedHash = authenticate(password, user.authentication.salt);

        if (user.authentication.password !== expectedHash) {
            return res.sendStatus(401);
        }

        const salt = random();
        user.authentication.sessionToken = authenticate(user._id.toString(), salt);
        await user.save();

        res.cookie('NOBARKUY_SESSION', user.authentication.sessionToken, {domain: 'localhost', path: '/'});

        return res.status(200).json(user).end();
    } catch (e) {
        console.error(e);
        return res.sendStatus(400);
    }
}
export const register = async (req: express.Request, res: express.Response) => {
    try {
        const {username, email, password} = req.body;

        if (!email || !password || !username) {
            return res.sendStatus(400);
        }

        const existingUser = await getUserByEmail(email);

        if (existingUser) {
            return res.sendStatus(400);
        }

        const salt = random();
        const user = await createUser({
            username,
            email,
            authentication: {
                salt,
                password: authenticate(password, salt),
            }
        });

        return res.status(200).json(user).end();
    } catch (e) {
        console.error(e);
        return res.sendStatus(400);
    }
}