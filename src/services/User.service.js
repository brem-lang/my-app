import { projectStorage, projectFirestore, timestamp } from '../firebase';

const db = projectFirestore.collection("USERS");

class Userservice {
  create(tutorial) {
    return db.add(tutorial);
  }
  update(userName,firstName,lastName,contactNumber,email,key){
    return db.doc(key).update({
      userName: userName,
      firstName: firstName,
      lastName: lastName,
      contactNumber: contactNumber,
      email : email,
    })
  }
  userRole(email){
    const response = projectFirestore.collection("USERS").where("email", "==",email)

    response.get().then(function(snapshot) {

        snapshot.docs.forEach((doc) => {
          const data = doc.data().type;
          localStorage.setItem("currentUserRole",data );
        });
    });
  }
}

export default new Userservice();