export namespace OrderingDomainModel {
  export type Guest = {
    id: string;
    firstName: string;
    lastName: string;
    age: number;
  };

  export type Form = {
    guests: Guest[];
    organizerId: string | null;
  };
}
