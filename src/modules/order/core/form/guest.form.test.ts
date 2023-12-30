import { IIDProvider } from '@ratatouille/modules/core/id-prover';
import { GuestForm } from '@ratatouille/modules/order/core/form/guest.form';
import { OrderingDomainModel } from '@ratatouille/modules/order/core/model/ordering.domain-model';

class StubIDProvider implements IIDProvider {
  generate(): string {
    return '1';
  }
}

const idProvider = new StubIDProvider();

describe('add a guest', () => {
  it('should add a guest', () => {
    const form = new GuestForm(idProvider);
    const inititialState: OrderingDomainModel.Guest[] = [];
    const state = form.addGuest(inititialState);
    expect(state).toEqual([
      {
        id: '1',
        firstName: 'John',
        lastName: 'Doe',
        age: 0,
      },
    ]);
  });
});
