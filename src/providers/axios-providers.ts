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
    await this.axiosProvider?.post(url, data)
  }

  async delleter (url: string){
    await this.axiosProvider?.delete(url)
  }

  async updatter (url: string, data: any){
    await this.axiosProvider?.put(url, data)
  }

  async patcher (url: string, data: any){
    await this.axiosProvider?.patch(url, data)
  }
}
