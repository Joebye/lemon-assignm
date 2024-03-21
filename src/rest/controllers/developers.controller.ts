import {
	interfaces,
	controller,
	BaseHttpController,
	httpGet, requestParam
} from 'inversify-express-utils';
import { ApiOperationGet, ApiPath } from 'swagger-express-ts';
import {
	path, getDevelopers, getDeveloperById
} from '../swagger/developers.swagger.docs';
import { inject } from 'inversify'
import { DevelopersService } from '../../domain/developers/services/developers.service'
import { DeveloperDto } from '../dto/developers.responses.dto'

@controller('/api/developers')
@ApiPath(path)
export class DevelopersController extends BaseHttpController implements interfaces.Controller {

	constructor(
		@inject('DevelopersService') private developersService: DevelopersService,
	){ super() }

	@httpGet('/')
	@ApiOperationGet(getDevelopers)
	public async getDevelopers(): Promise<DeveloperDto[]> {
		const devs = await this.developersService.getDevelopers();  
	//	console.log(devs);
		return devs;
	}

	@httpGet('/:id')
	@ApiOperationGet(getDeveloperById)
	public async getDeveloperById(@requestParam('id') id: string): Promise<DeveloperDto> {
		const getDevById = await this.developersService.getDeveloperById(id)
		return getDevById;
	}

}
