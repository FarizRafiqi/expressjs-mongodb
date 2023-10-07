import express from "express";
import {get, merge} from "lodash";
import {getUserBySessionToken} from "../models/User";

export const isOwner = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        const {id} = req.params;
        const currentUserId = get(req, 'identity._id') as string;

        if(!currentUserId) {
            return res.sendStatus(403);
        }

        if(currentUserId.toString() !== id) {
            return res.sendStatus(403);
        }

        next();
    } catch (e) {
        console.error(e);
        return res.sendStatus(400);
    }
}

export const isAuthenticated = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        const sessionToken = get(req, 'cookies.NOBARKUY_SESSION');

        if (!sessionToken) {
            return res.sendStatus(401);
        }

        const user = await getUserBySessionToken(sessionToken);

        if (!user) {
            return res.sendStatus(401);
        }

        merge(req, {identity: user});

        return next();
    } catch (e) {
        console.error(e);
        return res.sendStatus(400);
    }
}
