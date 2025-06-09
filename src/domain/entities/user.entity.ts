export enum UserRole{
  CLIENT =  `client`,
  ADMIN = `admin`,
}

export class User{
  constructor(
    public name: string,
    public email: string,
    public password: string,
    public role: UserRole,    
    public id?: string,

  ){}



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
      email:this.email,
      name: this.name,
      password: this.password,
      role: this.role
    }
  }
}
