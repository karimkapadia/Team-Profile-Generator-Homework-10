// TODO: Write code to define and export the Employee class
class Employee
{

    constructor(name,id, email, role= "Employee")
    {
        this.name=name;
        this.id=id;
        this.email=email;
    }
        getName()
        {
            return this.name;
        }
        getId()
        {
            return this.id;

        }
        getEmail()
        {
            return this.email;

        }
        getRole()
        {
            this.role;
        }
}
module.exports = Employee;