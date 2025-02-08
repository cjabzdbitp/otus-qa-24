import { faker } from "@faker-js/faker";

export const petData = {
    getValidPet: () => ({
        id: faker.number.int(100000),
        category: { id: faker.number.int(100), name: faker.animal.dog() },
        name: faker.person.firstName(),
        photoUrls: [faker.image.url()],
        tags: [
            {
                id: faker.number.int(100),
                name: faker.word.noun()
            }
        ],
        status: faker.helpers.arrayElement(["available", "pending", "sold"])
    }),

    getInvalidTypePet: () => ({
        id: "not_a_number",
        category: { id: "wrong", name: 123 },
        name: 12345,
        photoUrls: "not an array",
        tags: "wrong type",
        status: 404
    })
};