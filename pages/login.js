// ==========================================
// LOGIN PAGE
// ==========================================

function renderLogin() {

    document.getElementById("page-login").innerHTML = `

    <div class="flex justify-center items-center min-h-[80vh]">

        <div class="bg-white shadow-2xl rounded-3xl p-10 w-full max-w-md">

            <!-- Logo -->
            <div class="text-center">

                <div class="text-6xl mb-4">🌾</div>

                <h1 class="text-4xl font-bold text-green-700">
                    Krishi Sahayak
                </h1>

                <p class="text-gray-500 mt-2">
                    Get expert farming advice in your own language
                </p>

            </div>

            <!-- Heading -->
            <div class="mt-10 text-center">

                <h2 class="text-2xl font-semibold">
                    Welcome 👋
                </h2>

                <p class="text-gray-500 mt-2">
                    Choose a login method
                </p>

            </div>

            <!-- Google Login -->
            <button
                onclick="signInWithGoogle()"
                class="w-full mt-8 bg-white border border-gray-300 rounded-xl px-5 py-4 flex items-center justify-center gap-4 hover:shadow-lg transition">
                <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" class="w-6 h-6">
                
                <span class="font-semibold">
                Continue with Google

                </span>

            </button>

<!-- Phone Login -->
<button
    onclick="signInWithPhone()"
    class="w-full mt-4 bg-green-50 text-green-700 border border-green-600 rounded-xl py-4 hover:bg-green-100 transition">

    📱 Continue with Phone Number

</button>
<!-- Firebase reCAPTCHA -->
<div id="recaptcha-container" class="mt-4"></div>

            <div class="mt-8">

    <label class="block text-sm font-semibold text-gray-700 mb-2">

        🌐 Language

    </label>

    <select

id="languageSelector"

onchange="changeLanguage(this.value)"

class="w-full border rounded-xl p-3">

<option value="English"
${localStorage.getItem("language")=="English"?"selected":""}>

English

</option>

<option value="Hindi"
${localStorage.getItem("language")=="Hindi"?"selected":""}>

हिन्दी

</option>

<option value="Marathi"
${localStorage.getItem("language")=="Marathi"?"selected":""}>

मराठी

</option>

<option value="Punjabi"
${localStorage.getItem("language")=="Punjabi"?"selected":""}>

ਪੰਜਾਬੀ

</option>

<option value="Gujarati"
${localStorage.getItem("language")=="Gujarati"?"selected":""}>

ગુજરાતી

</option>

<option value="Telugu"
${localStorage.getItem("language")=="Telugu"?"selected":""}>

తెలుగు

</option>

</select>

<div class="mt-10 text-center">

<p class="text-xs text-gray-400">

By continuing you agree to our

</p>

<p class="text-xs">

<a href="#" class="text-green-700">

Terms of Service

</a>

•

<a href="#" class="text-green-700">

Privacy Policy

</a>

</p>

</div>

    `;
}