import { AxiosProvider } from "@/providers/axios-providers"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

export type QueryGetAllProps = {
  filter?: {typeQuery: string, query: string}
  page?: string
}

export class BaseHookQuery<Model>{
  private api: AxiosProvider  = new AxiosProvider()

  constructor(readonly key: string){}

  useCreate(url: string){
    const queryClient = useQueryClient()

    return useMutation({
      mutationFn: async (data: any): Promise<Model> => {
        const response = await this.api.postter(url, data)
        return response?.data
      },
      onSuccess: ()=> {
        queryClient.invalidateQueries({
          queryKey: [this.key],
        })
      }
    })
  }

  useGetById(url: string, id: string){
    return useQuery<Model>({
      queryKey: [this.key, id],
      queryFn: async () => {
        const response = await this.api.getter(`/${url}/${id}`)
        return response?.data
      },
      enabled: !!id
    })
  }

  useGetByAll(url: string, query?: QueryGetAllProps, optional?: any){
    return useQuery<Model[]>({
      queryKey: [this.key, query?.page, query?.filter],
      queryFn: async ()=> {
        const page = !!query && query.page && `page=${query.page}&limit=100`
        const filter = !!query && query.filter && `${query.filter.typeQuery}=${query.filter.query}&`
        const response = await this.api.getter(`${url}${query && `?${filter}${page}`}`)
        return response?.data as Model
      },
      ...optional,
      }
    )
  }

  useUpdate(url: string){
    const queryClient = useQueryClient()

    return useMutation({
      mutationFn: async(data: any)=>{
        const { id, ...rest } = data
        const response = await this.api.updatter(url, id, rest)
        return response?.data
      },
      onSuccess: ()=>{
        queryClient.invalidateQueries({
          queryKey: [this.key]
        })
      }
    })
  }

  useDelete(url: string){
    const queryClient = useQueryClient()

    return useMutation({
      mutationFn: async(data: any)=>{
        const response = await this.api.delleter(url, data.id)
        return response?.data
      },
      onSuccess: ()=>{
        queryClient.invalidateQueries({
          queryKey: [this.key]
        })
      }
    })
  }

  usePatch(url: string){
    const queryClient = useQueryClient()

    return useMutation({
      mutationFn: async(data: any)=>{
        const {id, ...rest} = data
        const response = await this.api.patcher(url, id, rest)
        return response?.data
      },
      onSuccess: ()=>{
        queryClient.invalidateQueries({
          queryKey: [this.key]
        })
      }
    })
  }
}