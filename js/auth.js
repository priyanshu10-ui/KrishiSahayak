// ==========================================
// Krishi Sahayak Authentication
// ==========================================

const provider = new firebase.auth.GoogleAuthProvider();


// ==========================================
// GOOGLE LOGIN
// ==========================================

async function signInWithGoogle() {

    try {

        // Show loading screen
        navigateTo("loading");

        const result = await auth.signInWithPopup(provider);

        const user = result.user;

        // Save basic user information
        await db.collection("users").doc(user.uid).set({

            uid: user.uid,
            name: user.displayName,
            email: user.email,
            photo: user.photoURL,
            language: localStorage.getItem("language"),

            createdAt:
                firebase.firestore.FieldValue.serverTimestamp()

        }, { merge: true });

        console.log("Welcome:", user.displayName);

        // DON'T call checkUserProfile() here.
        // auth.onAuthStateChanged() will do it automatically.

    } catch (error) {

        console.error("Login Error:", error);

        alert(error.message);

        navigateTo("login");
    }

}

async function signInAsGuest() {

    try {

        navigateTo("loading");

        await auth.signInAnonymously();

        console.log("Guest login successful");

        // Don't navigate here.
        // auth.onAuthStateChanged() will handle it.

    } catch (error) {

        console.error(error);

        alert(error.message);

        navigateTo("login");

    }

}



// ==========================================
// AUTH STATE
// ==========================================

auth.onAuthStateChanged(async (user) => {

    console.log("Auth State Changed");
    console.log(user);

    updateUserUI(user);

    // ------------------------
    // NOT LOGGED IN
    // ------------------------

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

    // ------------------------
    // USER LOGGED IN
    // ------------------------

    hideAppNavigation();

    navigateTo("loading");

    await checkUserProfile(user);

});



// ==========================================
// CHECK PROFILE
// ==========================================

async function checkUserProfile(user) {

    console.log("Checking profile...");

    try {

        // Guest Login
        if (user.isAnonymous) {

            console.log("Guest User");

            showAppNavigation();

            navigateTo("dashboard");

            return;
        }

        const doc = await db.collection("users")
                            .doc(user.uid)
                            .get();

        console.log("Firestore Document Exists:", doc.exists);

        // New User
        if (!doc.exists) {

            console.log("New user");

            hideAppNavigation();

            navigateTo("profile");

            return;
        }

        const data = doc.data();

        console.log("User Data:", data);

        const profileComplete =

            data.phone &&
            data.state &&
            data.district &&
            data.village &&
            data.crops;

        if (!profileComplete) {

            console.log("Profile Incomplete");

            hideAppNavigation();

            navigateTo("profile");

        }

        else {

            console.log("Profile Complete");

            showAppNavigation();

            navigateTo("dashboard");

        }

    }

    catch (error) {

        console.error("Firestore Error:", error);

        alert(error.message);

        navigateTo("login");

    }

}



// ==========================================
// LOGOUT
// ==========================================

function logout() {

    auth.signOut()

        .then(() => {

            console.log("Logged Out");

        })

        .catch((error) => {

            console.error(error);

            alert(error.message);

        });

}