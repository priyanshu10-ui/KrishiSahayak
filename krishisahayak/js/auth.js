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

        console.log("Welcome " + user.displayName);

    }

    catch(error){

        console.error(error);

        alert(error.message);

    }

}
auth.onAuthStateChanged(async (user) => {

    if (!user) {

        navigateTo("login");

        return;

    }

    await checkUserProfile(user);

});
async function checkUserProfile(user) {

    try {

        const doc = await db.collection("users")
                            .doc(user.uid)
                            .get();

        if (!doc.exists) {

            navigateTo("profile");
            return;

        }

        const data = doc.data();

        if (!data.phone) {

            navigateTo("profile");

        } else {

            navigateTo("dashboard");

        }

    }

    catch(error){

        console.error(error);

        alert("Unable to load your profile.");

    }

}
function logout() {

    auth.signOut()
        .then(() => {

            navigateTo("login");

        })
        .catch((error) => {

            console.error(error);

        });

}