import useSWR from 'swr'
import fetcher from '../lib/fetcher'
import {Application} from '../models/Application'

export const useApplication = (id: string) => {
  const { data, error, isLoading } = useSWR<Application, Error>(`/api/applications/${id}`, fetcher, { refreshInterval: 1000 });
  return {
    application: data,
    isLoading,
    isError: error
  }
}

export const useApplications = () => {
  const { data, error, isLoading } = useSWR<Application[], Error>('/api/applications/', fetcher, { refreshInterval: 1000 });
  return {
    applications: data,
    isLoading,
    isError: error
  }
}
