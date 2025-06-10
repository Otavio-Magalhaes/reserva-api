export enum UserRole{
  CLIENT =  'client',
  ADMIN = 'admin',
}
export type UserProps = {
  name: string;
  email: string;
  password: string;
  role: UserRole;
  id?: string;
};

export class User{
  public readonly id?: string;
  public name: string;
  public email: string;
  public password: string;
  public role: UserRole;

  constructor(props:UserProps){
    this.id = props.id;
    this.name = props.name;
    this.email = props.email;
    this.password = props.password;
    this.role = props.role;
  }

  toPlubicObject(){
    return {
      id: this.id,
      email: this.email,
      name: this.name,
      role: this.role
    }
  }

  toPlainObject(){
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      password: this.password,
      role: this.role
    }
  }
}
