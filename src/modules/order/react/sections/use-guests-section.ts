import { useRef, useState } from 'react';
import { OrderingDomainModel } from '@ratatouille/modules/order/core/model/ordering.domain-model';
import { GuestForm } from '@ratatouille/modules/order/core/form/guest.form';
import { useDependencies } from '@ratatouille/modules/app/react/DependenciesProvider';

export const useGuestsSection = () => {
  function addGuest() {
    const newGuest = guestForm.current.addGuest(form);
    setForm(newGuest);
  }

  function removeGuest(id: string) {
    const newGuest = guestForm.current.removeGuest(form, id);
    setForm(newGuest);
  }

  function updateGuest<T extends keyof OrderingDomainModel.Guest>(
    id: string,
    key: T,
    value: OrderingDomainModel.Guest[T]
  ) {
    const newGuest = guestForm.current.updateGuest(form, id, key, value);
    setForm(newGuest);
  }

  function changeOrganizer(id: string) {
    const newGuest = guestForm.current.changeOrganizer(form, id);
    setForm(newGuest);
  }

  function onNext() {}

  function isSubmittable() {
    return guestForm.current.isSubmittable(form);
  }
  const { idProvider } = useDependencies();
  const guestForm = useRef(new GuestForm(idProvider));
  const [form, setForm] = useState<OrderingDomainModel.Form>({
    guests: [],
    organizerId: null,
  });

  return {
    addGuest,
    removeGuest,
    updateGuest,
    changeOrganizer,
    onNext,
    isSubmittable: isSubmittable(),
    form,
  };
};
