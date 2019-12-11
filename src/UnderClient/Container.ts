import { container } from 'src/Shared/SharedContainer';
import { TeamRepository, TeamRepositoryImpl } from 'UnderClient/repositories/TeamRepository';
import { TeamGatewayImpl, TeamGateway } from 'UnderClient/gateways/TeamGateway';

container
  .bind<TeamRepository>('teamRepository')
  .to(TeamRepositoryImpl)
  .inSingletonScope();
container
  .bind<TeamGateway>('teamGateway')
  .to(TeamGatewayImpl)
  .inSingletonScope();

export { container };
