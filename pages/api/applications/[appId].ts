import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../lib/prisma'

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method == 'GET') {
    const { appId } = req.query
    const application = await prisma.application.findUnique({
      where: { id: String(appId) },
    })
    return res.json(application)
  }
}
