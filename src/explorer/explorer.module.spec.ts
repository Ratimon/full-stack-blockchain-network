import { ExplorerModule } from './explorer.module';

describe('ExplorerModule', () => {
  let explorerModule: ExplorerModule;

  beforeEach(() => {
    explorerModule = new ExplorerModule();
  });

  it('should create an instance', () => {
    expect(explorerModule).toBeTruthy();
  });
});
