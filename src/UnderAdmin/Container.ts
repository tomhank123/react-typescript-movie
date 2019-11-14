import { container } from "src/Shared/SharedContainer";
import {
  HomeRepository,
  HomeRepositoryImpl
} from "./repositories/HomeRepository";

// Home
container
  .bind<HomeRepository>("homeRepository")
  .to(HomeRepositoryImpl)
  .inSingletonScope();

export { container };
