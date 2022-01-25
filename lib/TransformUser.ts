import { InitialUserFormState } from "../components/AddInstructorForm";

class CreateInstructorDto {
    FNAME: string;
    LNAME: string | null;
    EMAIL: string;
    PASS: string;
    SUB1: string;
    SUB2: string | null;
    constructor(formFields: typeof InitialUserFormState) {
        this.FNAME = formFields.fname;
        this.LNAME = formFields.lname;
        this.EMAIL = formFields.email.toLowerCase();
        this.PASS = formFields.password;
        this.SUB1 = formFields.sub1;
        this.SUB2 = formFields.sub2;
    }
  }

export { CreateInstructorDto }
  