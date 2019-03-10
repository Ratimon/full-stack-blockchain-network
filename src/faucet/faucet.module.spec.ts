import { FaucetModule } from './faucet.module';

describe('FaucetModule', () => {
  let faucetModule: FaucetModule;

  beforeEach(() => {
    faucetModule = new FaucetModule();
  });

  it('should create an instance', () => {
    expect(faucetModule).toBeTruthy();
  });
});
