// ==========================================
// KRISHI SAHAYAK
// GOVERNMENT SCHEMES & SUBSIDIES
// ==========================================

function initSubsidiesPage() {

    const page = document.getElementById("page-subsidies");

    // Safety check
    if (!page) {
        console.error("❌ page-subsidies container not found");
        return;
    }

    // Render Subsidies Page
    page.innerHTML = `

        <div class="p-4 md:p-8 max-w-7xl mx-auto w-full">

            <!-- ===================================== -->
            <!-- PAGE HEADER -->
            <!-- ===================================== -->

            <div class="mb-8">

                <div class="flex items-center gap-3 mb-3">

                    <div class="
                        w-12 h-12
                        rounded-xl
                        bg-green-100
                        flex items-center justify-center
                    ">

                        <span class="
                            material-symbols-outlined
                            text-green-800
                            text-2xl
                        ">
                            account_balance
                        </span>

                    </div>

                    <div>

                        <h1 class="
                            text-2xl
                            md:text-3xl
                            font-bold
                            text-green-900
                        ">
                            Government Schemes & Subsidies
                        </h1>

                        <p class="
                            text-stone-500
                            text-sm
                            mt-1
                        ">
                            Find government support relevant to your farming needs.
                        </p>

                    </div>

                </div>

            </div>


            <!-- ===================================== -->
            <!-- SEARCH BAR -->
            <!-- ===================================== -->

            <div class="mb-8">

                <div class="relative">

                    <span class="
                        material-symbols-outlined
                        absolute
                        left-4
                        top-1/2
                        -translate-y-1/2
                        text-stone-400
                    ">
                        search
                    </span>

                    <input
                        type="text"
                        id="subsidy-search"
                        placeholder="Search schemes, subsidies or farming support..."
                        class="
                            w-full
                            pl-12
                            pr-4
                            py-4
                            bg-white
                            border
                            border-stone-200
                            rounded-xl
                            text-sm
                            outline-none
                            focus:ring-2
                            focus:ring-green-700/20
                            focus:border-green-700
                            shadow-sm
                        "
                    />

                </div>

            </div>


            <!-- ===================================== -->
            <!-- FIND SCHEMES CARD -->
            <!-- ===================================== -->

            <div class="
                bg-white
                border
                border-stone-200
                rounded-2xl
                shadow-sm
                p-5
                md:p-7
                mb-8
            ">

                <div class="mb-6">

                    <h2 class="
                        text-xl
                        font-bold
                        text-green-900
                    ">
                        Find Schemes For Me
                    </h2>

                    <p class="
                        text-sm
                        text-stone-500
                        mt-1
                    ">
                        Tell us about your farming needs to find relevant schemes.
                    </p>

                </div>


                <!-- FILTER GRID -->

                <div class="
                    grid
                    grid-cols-1
                    md:grid-cols-2
                    gap-5
                ">


                    <!-- STATE -->

                    <div>

                        <label
                            for="subsidy-state"
                            class="
                                block
                                text-sm
                                font-semibold
                                text-stone-700
                                mb-2
                            "
                        >
                            📍 State
                        </label>

                        <select
                            id="subsidy-state"
                            class="
                                w-full
                                px-4
                                py-3
                                rounded-xl
                                border
                                border-stone-200
                                bg-stone-50
                                text-sm
                                outline-none
                                focus:ring-2
                                focus:ring-green-700/20
                            "
                        >

                            <option value="">
                                Select State
                            </option>

                            <option value="andhra-pradesh">
                                Andhra Pradesh
                            </option>

                            <option value="bihar">
                                Bihar
                            </option>

                            <option value="gujarat">
                                Gujarat
                            </option>

                            <option value="haryana">
                                Haryana
                            </option>

                            <option value="madhya-pradesh">
                                Madhya Pradesh
                            </option>

                            <option value="maharashtra">
                                Maharashtra
                            </option>

                            <option value="punjab">
                                Punjab
                            </option>

                            <option value="rajasthan">
                                Rajasthan
                            </option>

                            <option value="uttar-pradesh">
                                Uttar Pradesh
                            </option>

                        </select>

                    </div>


                    <!-- DISTRICT -->

                    <div>

                        <label
                            for="subsidy-district"
                            class="
                                block
                                text-sm
                                font-semibold
                                text-stone-700
                                mb-2
                            "
                        >
                            📍 District
                        </label>

                        <select
                            id="subsidy-district"
                            class="
                                w-full
                                px-4
                                py-3
                                rounded-xl
                                border
                                border-stone-200
                                bg-stone-50
                                text-sm
                                outline-none
                                focus:ring-2
                                focus:ring-green-700/20
                            "
                        >

                            <option value="">
                                Select District
                            </option>

                        </select>

                    </div>


                    <!-- CROP -->

                    <div>

                        <label
                            for="subsidy-crop"
                            class="
                                block
                                text-sm
                                font-semibold
                                text-stone-700
                                mb-2
                            "
                        >
                            🌱 Crop
                        </label>

                        <select
                            id="subsidy-crop"
                            class="
                                w-full
                                px-4
                                py-3
                                rounded-xl
                                border
                                border-stone-200
                                bg-stone-50
                                text-sm
                                outline-none
                                focus:ring-2
                                focus:ring-green-700/20
                            "
                        >

                            <option value="">
                                Select Crop
                            </option>

                            <option value="wheat">
                                Wheat
                            </option>

                            <option value="rice">
                                Rice
                            </option>

                            <option value="maize">
                                Maize
                            </option>

                            <option value="mustard">
                                Mustard
                            </option>

                            <option value="sugarcane">
                                Sugarcane
                            </option>

                            <option value="vegetables">
                                Vegetables
                            </option>

                            <option value="fruits">
                                Fruits
                            </option>

                            <option value="horticulture">
                                Horticulture
                            </option>

                            <option value="all">
                                All Crops
                            </option>

                        </select>

                    </div>


                    <!-- REQUIREMENT -->

                    <div>

                        <label
                            for="subsidy-requirement"
                            class="
                                block
                                text-sm
                                font-semibold
                                text-stone-700
                                mb-2
                            "
                        >
                            🚜 What do you need?
                        </label>

                        <select
                            id="subsidy-requirement"
                            class="
                                w-full
                                px-4
                                py-3
                                rounded-xl
                                border
                                border-stone-200
                                bg-stone-50
                                text-sm
                                outline-none
                                focus:ring-2
                                focus:ring-green-700/20
                            "
                        >

                            <option value="">
                                Select Requirement
                            </option>

                            <option value="seeds">
                                Seeds
                            </option>

                            <option value="fertilizer">
                                Fertilizer
                            </option>

                            <option value="irrigation">
                                Irrigation
                            </option>

                            <option value="solar">
                                Solar Pump / Solar Equipment
                            </option>

                            <option value="machinery">
                                Farm Machinery
                            </option>

                            <option value="insurance">
                                Crop Insurance
                            </option>

                            <option value="storage">
                                Storage
                            </option>

                            <option value="organic">
                                Organic Farming
                            </option>

                            <option value="horticulture">
                                Horticulture
                            </option>

                            <option value="financial">
                                Financial Assistance
                            </option>

                        </select>

                    </div>


                    <!-- FARMER CATEGORY -->

                    <div class="md:col-span-2">

                        <label
                            for="farmer-category"
                            class="
                                block
                                text-sm
                                font-semibold
                                text-stone-700
                                mb-2
                            "
                        >
                            👨‍🌾 Farmer Category
                        </label>

                        <select
                            id="farmer-category"
                            class="
                                w-full
                                px-4
                                py-3
                                rounded-xl
                                border
                                border-stone-200
                                bg-stone-50
                                text-sm
                                outline-none
                                focus:ring-2
                                focus:ring-green-700/20
                            "
                        >

                            <option value="">
                                Select Farmer Category
                            </option>

                            <option value="marginal">
                                Marginal Farmer
                            </option>

                            <option value="small">
                                Small Farmer
                            </option>

                            <option value="other">
                                Other Farmer
                            </option>

                            <option value="women">
                                Women Farmer
                            </option>

                            <option value="fpo">
                                FPO / Farmer Group
                            </option>

                        </select>

                    </div>

                </div>


                <!-- FIND BUTTON -->

                <div class="mt-6">

                    <button
                        id="find-schemes-btn"
                        type="button"
                        class="
                            w-full
                            md:w-auto
                            px-8
                            py-3
                            bg-[#2d5a27]
                            text-white
                            rounded-xl
                            font-bold
                            hover:bg-[#23481f]
                            transition-all
                            flex
                            items-center
                            justify-center
                            gap-2
                        "
                    >

                        <span class="material-symbols-outlined">
                            search
                        </span>

                        Find My Schemes

                    </button>

                </div>

            </div>


            <!-- ===================================== -->
            <!-- RESULTS SECTION -->
            <!-- ===================================== -->

            <div id="scheme-results">

                <div class="
                    bg-white
                    border
                    border-stone-200
                    rounded-2xl
                    p-8
                    text-center
                ">

                    <span class="
                        material-symbols-outlined
                        text-5xl
                        text-green-700
                    ">
                        account_balance
                    </span>

                    <h3 class="
                        text-xl
                        font-bold
                        text-stone-800
                        mt-4
                    ">
                        Find Government Support
                    </h3>

                    <p class="
                        text-sm
                        text-stone-500
                        mt-2
                        max-w-md
                        mx-auto
                    ">
                        Select your state, crop and farming requirement
                        to discover relevant government schemes.
                    </p>

                </div>

            </div>

        </div>

    `;

    console.log("✅ Government Schemes page initialized");
}

// ==========================================
// INITIALIZE GOVERNMENT SCHEMES PAGE
// ==========================================

console.log("📦 subsidies.js loaded");

initSubsidiesPage();