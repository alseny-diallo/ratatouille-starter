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
  organizerId: null,
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
  organizerId: null,
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
  organizerId: null,
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

describe('add an organizer', () => {
  it('set organizer when the user does not exist', () => {
    const state = form.changeOrganizer(emptyInitialState, '1');
    expect(state.organizerId).toEqual(null);
  });
  it('set organizer when the user exist', () => {
    const state = form.changeOrganizer(stateWithOneGuest, '1');
    expect(state.organizerId).toEqual('1');
  });
});

describe('Is  submittable', () => {
  it('when none is organizer, it should not be submittable', () => {
    const isSubmittable = form.isSubmittable(emptyInitialState);
    expect(isSubmittable).toEqual(false);
  });
  it('when one is organizer, it should  be submittable', () => {
    const stateWithOrganizer = {
      ...stateWithTwoGuest,
      organizerId: '1',
    };
    const isSubmittable = form.isSubmittable(stateWithOrganizer);
    expect(isSubmittable).toEqual(true);
  });
});
