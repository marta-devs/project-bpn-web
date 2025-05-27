import { instanceAxios } from '@/lib/axios';
import type { AxiosInstance } from 'axios';

export class AxiosProvider{
	readonly axiosProvider: AxiosInstance | null = null;

	constructor() {
		this.axiosProvider = instanceAxios;
	}

	async getter(url: string) {
		return await this.axiosProvider?.get(url)
	}

  async postter(url: string, data: any){
    return await this.axiosProvider?.post(url, data)
  }

  async delleter (url: string, id: string){
    return await this.axiosProvider?.delete(`${url}/${id}`)
  }

  async updatter (url: string, id: string, data: any){
   return await this.axiosProvider?.put(`${url}/${id}`, data)
  }

  async patcher (url: string, id: string, data: any){
    return await this.axiosProvider?.patch(`${url}/${id}`, data)
  }
}
