import { ActivationsModule } from './activations.module';

describe('ActivationsModule', () => {
  let activationsModule: ActivationsModule;

  beforeEach(() => {
    activationsModule = new ActivationsModule();
  });

  it('should create an instance', () => {
    expect(activationsModule).toBeTruthy();
  });
});
