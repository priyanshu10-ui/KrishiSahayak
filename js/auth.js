const provider = new firebase.auth.GoogleAuthProvider();


async function signInWithGoogle() {

    try {

        const result = await auth.signInWithPopup(provider);

        const user = result.user;

        await db.collection("users").doc(user.uid).set({

            language: localStorage.getItem("language"),

            uid: user.uid,
            name: user.displayName,
            email: user.email,
            photo: user.photoURL,

            createdAt:
                firebase.firestore.FieldValue.serverTimestamp()

        }, { merge: true });

        console.log("Welcome " + user.displayName);

        await checkUserProfile(user);

    } catch (error) {

        console.error(error);
        alert(error.message);

    }
}


auth.onAuthStateChanged(async (user) => {

    updateUserUI(user);

    if (!user) {

        hideAppNavigation();

        const language = localStorage.getItem("language");

        if (language) {
            navigateTo("login");
        } else {
            navigateTo("language");
        }

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

            hideAppNavigation();
            navigateTo("profile");
            return;

        }

        const data = doc.data();

        const profileComplete =
            data.phone &&
            data.state &&
            data.district &&
            data.village &&
            data.crops;

        if (!profileComplete) {

        console.log("Profile incomplete");

        hideAppNavigation();

        navigateTo("profile");

        } else {

        console.log("Profile complete");

        showAppNavigation();

        navigateTo("dashboard");

        }

    } catch (error) {

        console.error("Profile check error:", error);

        alert("Unable to load your profile.");

    }
}


function logout() {
    auth.signOut()
        .then(() => {
            console.log("User logged out successfully");
        })
        .catch((error) => {
            console.error("Logout error:", error);
            alert("Unable to logout.");
        });
}