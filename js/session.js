function renderUserMenu(user) {

    const menu = document.getElementById("user-menu");

    if (!menu) return;

    menu.innerHTML = `
        <div class="flex items-center gap-3">

            <img
                src="${user.photoURL}"
                class="w-10 h-10 rounded-full border-2 border-green-700">

            <div class="hidden md:block">
                <p class="font-semibold">
                    ${user.displayName}
                </p>
            </div>

            <button
                onclick="logout()"
                class="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600">
                Logout
            </button>

        </div>
    `;
}

function updateSidebar(user) {

    const name = document.getElementById("sidebar-user-name");

    if (name) {
        name.textContent = user.displayName;
    }

}