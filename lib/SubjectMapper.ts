import { Subjects } from "./types"

class SubjectMapperClass {
    private readonly '18CS51' = ['Entrepreneurship for IT Industry' , 'ME']
    private readonly '18CS52' = ['Computer Networks and Security' , 'CNS']
    private readonly '18CS53' = ['Database Management System' , 'DBMS']
    private readonly '18CS54' = ['Automata Theory and Computability' , 'ATC']
    private readonly '18CS55' = ['Application Development using Python' , 'ADP']
    private readonly '18CS56' = ['Unix Sysytem Programming' , 'USP']
    
    getFullNameSubject(subcode: Subjects) {
        return this[subcode][0]
    }
    getShortNameSubject(subcode: Subjects) {
        return this[subcode][1]
    }
    getPathName(subcode: Subjects) {
        const path = {code: subcode, name: this[subcode][0]}
        return path;
    }
}

const SubjectMapper = new SubjectMapperClass();

export { SubjectMapper };