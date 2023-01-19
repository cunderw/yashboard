import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method == 'GET') {
    return res.json({
      status: 'ok',
    })
  }
}
