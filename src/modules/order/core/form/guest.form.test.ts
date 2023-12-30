import { IIDProvider } from '@ratatouille/modules/core/id-prover';
import { GuestForm } from '@ratatouille/modules/order/core/form/guest.form';
import { OrderingDomainModel } from '@ratatouille/modules/order/core/model/ordering.domain-model';

class StubIDProvider implements IIDProvider {
  generate(): string {
    return '1';
  }
}

const idProvider = new StubIDProvider();
const form = new GuestForm(idProvider);
const emptyInitialState: OrderingDomainModel.Form = {
  guests: [],
  organizedid: null,
};
const stateWithOneGuest: OrderingDomainModel.Form = {
  guests: [
    {
      id: '1',
      firstName: 'John',
      lastName: 'Doe',
      age: 0,
    },
  ],
  organizedid: null,
};

const stateWithTwoGuest: OrderingDomainModel.Form = {
  guests: [
    {
      id: '1',
      firstName: 'John',
      lastName: 'Doe',
      age: 0,
    },
    {
      id: '2',
      firstName: 'John',
      lastName: 'Doe',
      age: 0,
    },
  ],
  organizedid: null,
};

describe('add a guest', () => {
  it('should add a guest', () => {
    const state = form.addGuest(emptyInitialState);
    expect(state.guests).toEqual(stateWithOneGuest.guests);
  });
});

describe('removing a guest', () => {
  it('should remove nobody when the state is empty', () => {
    const state = form.removeGuest(emptyInitialState, '1');
    expect(state.guests).toEqual([]);
  });

  it('should remove the  guest given the id', () => {
    const state = form.removeGuest(stateWithOneGuest, '1');
    expect(state.guests).toEqual([]);
  });
  it('should remove the  guest given the id', () => {
    const state = form.removeGuest(stateWithTwoGuest, '1');
    expect(state.guests).toEqual([
      {
        id: '2',
        firstName: 'John',
        lastName: 'Doe',
        age: 0,
      },
    ]);
  });
});
