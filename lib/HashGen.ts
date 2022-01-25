import { compareSync, hashSync } from 'bcryptjs';

const HashGen = (password: string) => {
    return hashSync(password, 8);
}

const CompareHash = (password: string, hash: string) => {
    return compareSync(password, hash);
}

export { HashGen, CompareHash };