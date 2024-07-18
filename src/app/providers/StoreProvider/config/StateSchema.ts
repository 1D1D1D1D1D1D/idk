import { CounterSchema } from 'entities';
import { UserSchema } from 'entities/User';
import { LoginSchema } from 'features';

export interface StateSchema {
    counter: CounterSchema;
    user: UserSchema;
    loginForm?: LoginSchema;
}
