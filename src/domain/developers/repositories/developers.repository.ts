// **************************************************************************
// Репозиторій імітує шар підключення до бази данних. Данні знаходяться в data.ts
// **************************************************************************

import { injectable } from 'inversify';
import { IDeveloper } from '../types'
import { contracts, developers } from './data'


@injectable()
export class DevelopersRepository {

	async getDevelopers(): Promise<IDeveloper[]>{
		const mapIdsAmountsStatus = {};
		contracts.forEach(con => {
			if (con.status === 'completed') {
		!mapIdsAmountsStatus[con.developerId] ? 
				mapIdsAmountsStatus[con.developerId] = {amount: con.amount, status: con.status}
				 : mapIdsAmountsStatus[con.developerId].amount += con.amount;
		}
	});
			return developers.map(item => {
			const amountField = mapIdsAmountsStatus[item.id]?.amount;
			const statusField = mapIdsAmountsStatus[item.id]?.status;
			
			if (amountField && statusField) {
				return {...item, revenue: amountField, status: statusField};
			} else {
				return item;
			}
		}) 
	}

	async getDeveloperById(id: string): Promise<IDeveloper>{
		return developers.find(d => d.id === id)
	}

	async getContracts(){
		return contracts
	}

}
