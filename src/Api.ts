import random from 'lodash/random';
import faker from 'faker';
import { Observable } from 'rxjs';

enum Priority {
  Error,
  Warn,
  Info,
}

export interface Message {
  message: string;
  priority: Priority;
}

let timer:any

const observable = new Observable<Message>(subscriber => {
  const generate = () => {
    const message = faker.lorem.sentence();
    const priority = random(0, 2) as Priority;
    const nextInMS = random(500, 3000);
    subscriber.next({ message, priority });
    timer = setTimeout(generate, nextInMS);
  };
  generate();
});

const generateMessage = (callback: (message: Message) => void) => {
  const subscription = observable.subscribe({
    next: callback,
  });
  return () => subscription.unsubscribe();
};

const stopMessage = () => {
    clearTimeout(timer)
};

export {generateMessage,stopMessage};
