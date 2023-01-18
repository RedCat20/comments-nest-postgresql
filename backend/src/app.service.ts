import { Injectable } from "@nestjs/common";


@Injectable()
export class AppService {

    getTestUsers() {
        return (
            JSON.parse(
                JSON.stringify([
                    {id: 1, name: 'Alex', age: 25},
                    {id: 2, name: 'Mary', age: 30},
                    {id: 3, name: 'John', age: 20},
                ]
            ))
        );
    }
}