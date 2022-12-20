import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../lib/prisma'
import { ApplicationStatus, Application } from '../../../models/Application'

const getApplicationStatus = async (application: Application) => {
  let url = application.livenessUrl
  if (application.keyParam) {
    url += `?${application.keyParam}=${application.apiKey}`
  }
  try {
    const response = await fetch(url)

    if (response.ok) {
      return ApplicationStatus.OK
    }
    return ApplicationStatus.ERR
  } catch (err) {
    console.error(err)
    return ApplicationStatus.ERR
  }
}

const handle = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method == 'GET') {
    const { appId } = req.query
    const dbApp = await prisma.application.findUnique({
      where: { id: String(appId) },
    })

    const application: Application = {
      id: dbApp?.id ?? '',
      name: dbApp?.name ?? '',
      url: dbApp?.url ?? '',
      livenessUrl: dbApp?.livenessUrl ?? '',
      apiKey: dbApp?.apiKey ?? '',
      keyParam: dbApp?.keyParam ?? '',
      status: ApplicationStatus.ERR,
    }
    application.status = await getApplicationStatus(application)
    return res.json(application)
  }
}

export default handle
