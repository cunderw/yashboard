import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../lib/prisma';

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
    if (req.method == "POST") {
        const { name, url } = req.body
        const result = await prisma.service.create({
            data: {
                name,
                url
            },
        })
        return res.json(result)
    } else if (req.method == "PUT") {
        const { id, name, url } = req.query;
        const post = await prisma.service.update({
            where: { id: String(id) },
            data: { },
        })
        return res.json(post);
    } else if (req.method == "DELETE") {
        const { id } = req.body;
        const post = await prisma.service.delete({
            where: {
                id: String(id),
            },
        });
        return res.json(post);
    }
}
