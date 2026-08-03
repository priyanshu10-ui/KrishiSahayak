function renderLogin() {

    const page = document.getElementById("page-login");

    if (!page) return;

    page.innerHTML = `
        <div class="flex flex-col items-center justify-center min-h-screen">

            <h1 class="text-4xl font-bold text-green-700">
                Krishi Sahayak
            </h1>

            <p class="mt-3 mb-6">
                Sign in to continue
            </p>

            <button onclick="signInWithGoogle()"
                class="bg-green-700 text-white px-6 py-3 rounded-lg">

                Continue with Google

            </button>

        </div>
    `;

}