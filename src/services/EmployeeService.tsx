const KEYS = {
  employees: "employees",
  employeeId: "employeeId",
};

export const getDepartmentCollections = () => [
  { id: "1", title: "Delelopment" },
  { id: "2", title: "Marketing" },
  { id: "3", title: "Accounting" },
  { id: "4", title: "HR" },
];

export const insertEmployees = (data: any) => {
  let employees: any = getAllEmployees();
  data["id"] = generateEmployeeId();
  employees.push(data);
  localStorage.setItem(KEYS.employees, JSON.stringify(employees));
};

export const updateEmployees = (data: any) => {
  let employees: any = getAllEmployees();
  let recordIndex = employees.findIndex((x: any) => x.id === data.id);
  employees[recordIndex] = { ...data };
  localStorage.setItem(KEYS.employees, JSON.stringify(employees));
};

export const deleteEmployee = (id: any) => {
  let employees: any = getAllEmployees();
  employees = employees.filter((x: any) => x.id !== id);
  localStorage.setItem(KEYS.employees, JSON.stringify(employees));
};

export const generateEmployeeId = () => {
  if (localStorage.getItem(KEYS.employeeId) === null)
    localStorage.setItem(KEYS.employeeId, "0");
  let id = parseInt(localStorage.getItem(KEYS.employeeId)!);
  localStorage.setItem(KEYS.employeeId, (++id).toString());
  return id;
};

export const getAllEmployees = () => {
  if (localStorage.getItem(KEYS.employees) === null)
    localStorage.setItem(KEYS.employees, JSON.stringify([]));
  let employees = JSON.parse(localStorage.getItem(KEYS.employees)!);
  let departments = getDepartmentCollections();
  return employees.map((x: any) => ({
    ...x,
    department: departments[x.departmentId - 1].title,
  }));
};

//As the error says, localStorage.getItem()
//can return either a string or null. JSON.parse()
//requires a string, so you should test the result
//of localStorage.getItem() before you try to use it.

// this.currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');

// this.currentUser = JSON.parse(localStorage.getItem('currentUser')!);
