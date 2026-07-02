const provider = new firebase.auth.GoogleAuthProvider();

async function signInWithGoogle() {

    try {

        const result = await auth.signInWithPopup(provider);

        const user = result.user;

        await db.collection("users").doc(user.uid).set({

            uid: user.uid,
            name: user.displayName,
            email: user.email,
            photo: user.photoURL,
            createdAt: firebase.firestore.FieldValue.serverTimestamp()

        }, { merge: true });

        alert("Welcome " + user.displayName);

    }

    catch(error){

        console.error(error);

        alert(error.message);

    }

}
auth.onAuthStateChanged((user) => {

    if(user){

        console.log("Logged In");

        console.log(user);

    }

    else{

        console.log("Not Logged In");

    }

});