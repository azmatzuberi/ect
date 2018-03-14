export class Ministry{
    ministryName: string; 
    role: string; 

    constructor(options: {}){
        this.ministryName = options['ministryName'] || "";
        this.role = options['role'] || ""; 
    }

}