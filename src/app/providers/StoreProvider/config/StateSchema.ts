import { CounterSchema } from "entities";
import { UserSchema } from "entities/User";


export interface StateSchema {
    counter: CounterSchema;
    user: UserSchema
}
