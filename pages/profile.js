function renderProfile() {

    const page = document.getElementById("page-profile");

page.innerHTML = `
<div class="max-w-2xl mx-auto bg-white shadow-lg rounded-xl p-8 mt-8">

    <h2 class="text-3xl font-bold text-green-700 mb-6">
        Complete Your Profile
    </h2>

    <div class="space-y-4">

        <input
            id="phone"
            type="tel"
            placeholder="Phone Number"
            class="w-full border rounded-lg p-3">

        <input
            id="state"
            type="text"
            placeholder="State"
            class="w-full border rounded-lg p-3">

        <input
            id="district"
            type="text"
            placeholder="District"
            class="w-full border rounded-lg p-3">

        <input
            id="village"
            type="text"
            placeholder="Village"
            class="w-full border rounded-lg p-3">

        <input
            id="language"
            type="text"
            placeholder="Preferred Language"
            class="w-full border rounded-lg p-3">

        <input
            id="crops"
            type="text"
            placeholder="Main Crops (e.g. Wheat, Rice)"
            class="w-full border rounded-lg p-3">

        <button
            onclick="saveProfile()"
            class="w-full bg-green-700 text-white py-3 rounded-lg hover:bg-green-800">
            Save Profile
        </button>

    </div>

</div>
`;

}

async function saveProfile() {

    const user = auth.currentUser;

    if (!user) {
        alert("Please login first.");
        return;
    }

    await db.collection("users").doc(user.uid).set({

        phone: document.getElementById("phone").value,
        state: document.getElementById("state").value,
        district: document.getElementById("district").value,
        village: document.getElementById("village").value,
        language: localStorage.getItem("language"),
        crops: document.getElementById("crops").value

    }, { merge: true });

    alert("Profile saved successfully!");

    showAppNavigation();

    navigateTo("dashboard");

}