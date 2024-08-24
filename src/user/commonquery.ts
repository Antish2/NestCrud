import { Injectable } from '@nestjs/common';
import { join } from 'path';

@Injectable()
export class commonquery {
  insert(data: any): string {
    let obj = data;
    console.log(obj);

    let query: string = `INSERT INTO users(name, email, password, role) VALUES 
        ('${data.name}','${data.email}','${data.password}','${data.role}') RETURNING *;`;

    console.log(query);
    return query;
  }

  update(data: any, id: string): string {
    let qryParam: string = ``;
    let strParam: string = ``;
    //console.log(updateuserdto);
    for (let key in data) {
      if (data[key] != null || data[key] != 'undefined')
        strParam += join(`${key} ='${data[key]}',`);
    }
    // console.log(strParam.substring(0, strParam.length - 1));

    qryParam = `update users set ${strParam.substring(0, strParam.length - 1)} where user_id='${id}' RETURNING *`;
    return qryParam;
  }

  select(id: string): string {
    let qry: string = `select * from users where user_id='${id}'`;
    return qry;
  }
  selectName(name: string): string {
    let qry: string = `select * from users where name='${name}'`;
    return qry;
  }
}
