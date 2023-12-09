import { describe, test, expect } from 'vitest';

import Person from '@/models/users/Person';

// import { sum } from "../HelloWorld.vue";

describe('Person', () => {
  test('constructor', async () => {
    const person = new Person('Sinisa', 'Rudan', 's.r@gmail.com', 'pass');
    expect(person.entity_id).toBeUndefined();
    expect(person.email).toEqual('s.r@gmail.com');
  });
});
