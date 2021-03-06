const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
let userList = [];
let userId =1;
async function main()
{
    const managerInfo = await inquirer.prompt
    ([
        {
          name: "name",
          message: "What is you name? "
        },
        {
            name: "email",
            message: "What is you email id?"
          },
          {
            name: "officenum",
            message: "What is your office number? "
          },
          {
            name: "empNo",
            message: "How many team members you have? "
          },

    ])

    const manager = new Manager(managerInfo.name,userId++,managerInfo.email,managerInfo.officenum);
    userList.push(manager);

    for(var i=0; i<managerInfo.empNo;i++)
    {
        let employeeType = await inquirer.prompt([

            {
                type: "list",
                name: "type",
                message: "Employee type to add?",
                choices: [
                  "Engineer",
                  "Intern"
                ]
              }


        ])
        
        employeeType = employeeType.type
        

        const team = await inquirer.prompt
        ([
            {
                name: "name",
                message: `What is the ${employeeType}'s Name?`
            },
            {
                name: "email",
                message: `What is the ${employeeType}'s Email?`
            },            
            {
                name: "info", // this is either 'github' or 'school' depending on employeeType
                message: `What is the ${employeeType}'s ${employeeType=='Engineer' ? 'GitHub' : 'School'}?`
            }

        ])
        const employee = employeeType==='Engineer' 
        ? new Engineer( team.name, userId++, team.email, team.info )
        : new Intern( team.name, userId++, team.email, team.info )
    userList.push( employee )

    }
    fs.writeFileSync("main.html", render(userList), "utf-8");
  console.log(render(userList));
    console.log(userList);

}
main();



// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
