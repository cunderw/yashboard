import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../lib/prisma'

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method == 'GET') {
    const applications = await prisma.application.findMany({})
    return res.json(applications)
  } else if (req.method == 'POST') {
    const { name, url, livenessUrl, apiKey, keyParam } = req.body
    const result = await prisma.application.create({
      data: {
        name,
        url,
        livenessUrl,
        apiKey,
        keyParam,
      },
    })
    return res.json(result)
  } else if (req.method == 'PUT') {
    const { id, name, url, livenessUrl, apiKey, keyParam } = req.body
    const post = await prisma.application.update({
      where: { id: String(id) },
      data: {
        name: String(name),
        url: String(url),
        livenessUrl: String(livenessUrl),
        apiKey: String(apiKey),
        keyParam: String(keyParam),
      },
    })
    return res.json(post)
  } else if (req.method == 'DELETE') {
    const { id } = req.body
    const post = await prisma.application.delete({
      where: {
        id: String(id),
      },
    })
    return res.json(post)
  }
}
