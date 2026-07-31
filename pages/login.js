function renderLogin() {

    const page = document.getElementById("page-login");

    if (!page) {
        console.error("Login page container not found.");
        return;
    }

    page.innerHTML = `
        <div class="flex items-center justify-center min-h-[80vh]">

            <div class="bg-white rounded-xl shadow-lg p-8 w-full max-w-md">

                <div class="text-center">

                    <h1 class="text-3xl font-bold text-green-700">
                        🌾 Krishi Sahayak
                    </h1>

                    <p class="text-gray-500 mt-3">
                        AI Powered Farming Assistant
                    </p>

                    <p class="text-gray-600 mt-6">
                        Sign in to continue
                    </p>

                </div>

                <button
                    onclick="signInWithGoogle()"
                    class="mt-8 w-full bg-green-700 hover:bg-green-800 text-white py-3 px-4 rounded-lg font-semibold">

                    Continue with Google

                </button>

            </div>

        </div>
    `;
}