import { projectStorage, projectFirestore, timestamp } from '../firebase';


const db = projectFirestore.collection("SUBMMITED_FORM")
class Formservice{

    create(value){
        return db.add(value);
    }

    acceptform(value){
        return db.doc(value).update({
            status : "ACCEPTED"
        })
    }

    rejectform(value){
        return db.doc(value).update({
            status : "REJECTED"
        })
    }


}export default new Formservice;