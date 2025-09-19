import { TFModel } from '../../src/ml/tf-model';

describe('TFModel', () => {
  test('basic model test', () => {
    const model = new TFModel();
    expect(model).toBeInstanceOf(TFModel);
  });
});