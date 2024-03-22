"use server";
import { faker } from "@faker-js/faker";

export const getFakeUsers = async () => {
  const users = Array.from({ length: 100 }).map((_, i) => ({
    id: i + 1,
    name: faker.person.fullName(),
    age: faker.number.int({ min: 18, max: 70 }),
    internet: {
      email: faker.internet.email(),
      ip: faker.internet.ip(),
      username: faker.internet.userName(),
    },
    location: {
      city: faker.location.city(),
      country: faker.location.country(),
      street: faker.location.street(),
    },
  }));

  return users;
};
