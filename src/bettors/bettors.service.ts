import { Injectable } from '@nestjs/common';

@Injectable()
export class BettorsService {
     getAllUsers()
    {
        return ["Ritesh", "Anuj"];
    }

    adduser(name: string)
    {
        ;
    }
}
