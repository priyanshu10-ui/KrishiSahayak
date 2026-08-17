// Crop Health & Diagnosis Page
function renderCropHealth() {

  const lang = localStorage.getItem("selectedLanguage") || "en";
  const t = translations[lang];

  const el = document.getElementById('page-crop-health');

  el.innerHTML = `
    <section class="mb-10">
      <div class="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h2 id="crop-management-title" class="font-[Lexend] text-2xl font-medium text-[#154212] mb-2">
            Crop Management & Diagnosis
          </h2>
          <p id="crop-management-description" class="text-[#42493e] max-w-xl">
            Identify plant diseases instantly with AI-powered diagnostics. Upload a photo or search for known symptoms.
          </p>
        </div>
        <div class="relative w-full md:w-80">
          <span class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#72796e]">search</span>
          <input
            id="crop-disease-search"
            class="w-full pl-10 pr-4 py-3 bg-white border border-[#c2c9bb] rounded-xl focus:ring-2 focus:ring-[#154212] outline-none transition-all shadow-sm"
            placeholder="${t.searchCropDiseases}"
            type="text"
          />
        </div>
      </div>
    </section>

    <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
      <!-- Upload Zone -->
      <div class="lg:col-span-8 group relative overflow-hidden bg-white border border-stone-100 rounded-[2rem] shadow-sm transition-all hover:shadow-md min-h-[400px]">
        <div class="absolute inset-0 bg-gradient-to-br from-green-50/50 to-transparent"></div>
       <div id="upload-zone" class="relative flex flex-col items-center justify-center p-8 border-4 border-dashed border-stone-100 m-4 rounded-[1.5rem] group-hover:border-[#2d5a27]/20 transition-colors">
          <div class="w-24 h-24 bg-[#bcf0ae] rounded-full flex items-center justify-center text-[#154212] mb-6 shadow-inner">
            <span class="material-symbols-outlined text-5xl">add_a_photo</span>
          </div>
          <h3 id="upload-crop-title" class="font-[Lexend] text-xl font-medium text-[#191c1c] mb-2">
            Upload Crop Photo
          </h3>
          <p id="upload-crop-description" class="text-[#42493e] text-center max-w-sm mb-8">
            Drag and drop your image here, or browse from your device. For best results, use high-quality close-ups of leaves.
          </p>
          <div class="flex gap-4">
          <button
            id="browse-gallery-btn"
            onclick="document.getElementById('file-input').click()"
            class="bg-[#2d5a27] text-white px-8 py-3 rounded-xl font-semibold shadow-lg shadow-[#2d5a27]/20 active:scale-95 transition-transform">
            ${t.browseGallery}
          </button>




          <button
              id="open-camera-btn"
              onclick="openCamera()"
              class="bg-white border-2 border-[#2d5a27] text-[#2d5a27] px-8 py-3 rounded-xl font-semibold active:scale-95 transition-transform">
              ${t.openCamera}
          </button>



          </div>
          <input id="file-input" type="file" accept="image/*" class="hidden" onchange="handleImageUpload(event)"/>
        
          






<!-- CAMERA SECTION -->
<div id="camera-area" class="hidden mt-4 w-full">

    <!-- LIVE CAMERA -->
    <video
        id="camera-preview"
        autoplay
        playsinline
        muted
        class="w-full rounded-xl bg-black">
    </video>

    <!-- CAPTURED PHOTO -->
    <img
        id="captured-photo"
        class="hidden w-full max-h-[350px] object-contain rounded-xl bg-black"
        alt="Captured crop">

    <!-- RECORDED VIDEO -->
    <video
        id="recorded-video"
        controls
        class="hidden w-full max-h-[350px] rounded-xl bg-black">
    </video>

    <canvas id="camera-canvas" class="hidden"></canvas>


    <!-- CAMERA BUTTONS -->
    <div
        id="camera-controls"
        class="flex flex-wrap justify-center gap-3 mt-4">

        <!-- PHOTO -->
        <button
            id="click-photo-btn"
            onclick="capturePhoto()"
            class="bg-[#2d5a27] text-white px-6 py-3 rounded-xl font-bold">
            📸 ${t.clickPhoto}
        </button>


        <!-- START VIDEO -->
        <button
            id="start-recording-btn"
            onclick="startRecording()"
            class="bg-red-600 text-white px-6 py-3 rounded-xl font-bold">
            🎥 ${t.startVideo}
        </button>


        <!-- STOP VIDEO -->
        <button
            id="stop-recording-btn"
            onclick="stopRecording()"
            class="hidden bg-gray-700 text-white px-6 py-3 rounded-xl font-bold">
            ⏹ ${t.stopVideo}
        </button>


        <!-- CLOSE CAMERA -->
        <button
            id="close-camera-btn"
            onclick="closeCamera()"
            class="bg-white border-2 border-[#2d5a27] text-[#2d5a27] px-6 py-3 rounded-xl font-bold">
            ✕ ${t.closeCamera}
        </button>

    </div>


    <!-- SAVE + ONE COMMON UPLOAD BUTTON -->
    <div
        id="media-actions"
        class="hidden flex flex-wrap justify-center gap-3 mt-4">

        <!-- SAVE -->
        <a
            id="save-media-btn"
            href="#"
            download
            class="bg-blue-600 text-white px-6 py-3 rounded-xl font-bold">
            💾 Save
        </a>


        <!-- SAME UPLOAD BUTTON FOR PHOTO + VIDEO -->
        <button
            id="upload-media-btn"
            onclick="uploadCapturedMedia()"
            class="bg-[#2d5a27] text-white px-6 py-3 rounded-xl font-bold">
            ⬆️ Upload
        </button>

    </div>

</div>






      <!-- Health Stats -->
      <div class="lg:col-span-4 flex flex-col gap-6">
        <div class="flex-1 bg-[#ffa536] p-6 rounded-[2rem] text-[#2c1700] shadow-sm">
          <div class="flex justify-between items-start mb-4">
            <div class="p-2 bg-white/30 rounded-lg"><span class="material-symbols-outlined">health_and_safety</span></div>
            <span id="weekly-status" class="text-xs font-bold uppercase tracking-wider opacity-70">
              ${t.weeklyStatus}
            </span>
          </div>
          <h4 id="health-score-title" class="font-[Lexend] text-xl font-medium mb-1">
            ${t.healthScore}
          </h4>
          <div class="text-4xl font-extrabold mb-4">84%</div>
          <div class="h-2 w-full bg-white/20 rounded-full overflow-hidden mb-2"><div class="h-full bg-white w-[84%]"></div></div>
          <p id="health-score-description" class="text-sm opacity-80">
            ${t.healthScoreDescription}
          </p>
        </div>
        <div class="flex-1 bg-white border border-stone-100 p-6 rounded-[2rem] shadow-sm">
          <h4 id="weather-impact-title" class="font-semibold text-sm mb-4">
            ${t.weatherImpact}
          </h4>
          <div class="flex items-center gap-4">
            <div class="w-12 h-12 bg-stone-50 rounded-xl flex items-center justify-center text-[#895100]">
              <span class="material-symbols-outlined text-3xl">partly_cloudy_day</span>
            </div>
            <div><div id="crop-weather-temperature" class="font-bold text-lg">32°C</div><div id="humidity-detected-text" class="text-xs text-[#42493e]">
              ${t.highHumidityDetected}
            </div></div>
          </div>
          <div class="mt-4 p-3 bg-[#ffdad6] text-[#93000a] rounded-xl text-xs flex gap-2">
            <span class="material-symbols-outlined text-sm">warning</span>
            <span id="fungal-risk-text">${t.fungalRisk}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Recent Diagnoses -->
    <section class="mt-16">
      <div class="flex items-center justify-between mb-8">
        <h3 id="recent-diagnoses-title" class="font-[Lexend] text-xl font-medium text-[#154212]">
          ${t.recentDiagnoses}
        </h3>
        <button
          id="view-history-btn"
          class="text-[#2d5a27] font-semibold flex items-center gap-1 hover:underline">
          ${t.viewHistory}
          <span class="material-symbols-outlined text-sm">arrow_forward</span>
        </button>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        ${[
      {
          name: 'Tomato (Roma)',
          disease: t.earlyBlight,
          time: t.twoHoursAgo,
          badge: t.critical,
          badgeColor: 'bg-[#ba1a1a]',
          diseaseColor: 'text-[#ba1a1a]',
          desc: t.earlyBlightDescription,
          btn: t.viewSolution,
          icon: 'medical_services',

        img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD08YZk0mgAvvRiMF5GmyFxFYJhip8f4eNlQWGIg_z23nXBmk5R8hdJaM1sWNSIaly1vV25pWEEYZkvoNw8S15StZKeF7j7Avg_vIWSTUhwsmUHzAUWqS1kSFVsCR33YIhMMULRngZ5-TeleDjda54Wi3uuHQewINfAhav5KtlOwGvJkj4k4lzj0j8W7tMTsApmaBr7Yzgf-ijax4nm4DD3Lo7wD2KMlng30Qtlw4UKDFl5fS8cT7_ojuMYhYVw8N7fflOg_W1ajnJS'
      },
      {
        name: 'Maize (Sweet Corn)',
        disease: t.noPathogens,
        time: t.yesterday,
        badge: t.healthy,
        badgeColor: 'bg-[#2d5a27]',
        diseaseColor: 'text-[#2d5a27]',
        desc: t.healthyCropDescription,
        btn: t.detailedReport,
        icon: 'description',
        img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBizTY3Ni0nLs6Nd_58ktaEORKIzB4gt_FNBmXTNAmnyZN0uMSK5Bg-wG7S8uUR4AHdQyj0Wn9rKGLIith9GT4JmNB4Zum9lJw4hYWamkB5z7ChycziOBwsGQclcxt9sRM8Nn6s_bmEz9xZg4FkUvEkSbXcROM9ytgt7b4QWfEjIrL-fe-N5tDHhFKkAIKuOhAOPnLGobuDHgpyO6ryTcqrtF-sPSw7bry6NS-g_PejFDvB9rQBq1Q0e5CExoA46FNUeKVLTFvPMFOQ'
      },
      {
        name: 'Wheat (Durum)',
        disease: t.leafRust,
        time: t.threeDaysAgo,
        badge: t.warning,
        badgeColor: 'bg-[#ffa536]',
        diseaseColor: 'text-[#895100]',
        desc: t.leafRustDescription,
        btn: t.viewSolution,
        icon: 'medical_services',
        
        img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB1O2tD8jWF7wptZo0fwlmx1okmwa8iT3AntGFRV32dgh53fmRrnu0QRbXkN8htQo4QD6Gr7UQ2RARjTc8B5NVSzHbKIJH-LYUQGNVnXi2Y25fuN2eYHTnp80GCLwiiSpj1vCORxPsMlx4ww0AJ3Wq4NglRnkIjoDUwzyPY6urv4fjmTrT4-7yWB9po8dOXZcEsGE3LKtxh2XOVro8IFBUNuYO9yHGXuNXE9vE1zZsjEmJrHAXceN-Z8N_siGHk3lQccOgPaRiMgVrU'
      }
    ].map(d => `
          <div class="bg-white border border-stone-100 rounded-[1.5rem] overflow-hidden shadow-sm hover:shadow-md transition-all group">
            <div class="relative h-48">
              <img class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" src="${d.img}" alt="${d.name}"/>
              <div class="absolute top-3 right-3 ${d.badgeColor} text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">${d.badge}</div>
            </div>
            <div class="p-5">
              <div class="flex justify-between items-start mb-2">
                <div><h4 class="font-bold text-lg">${d.name}</h4><p class="${d.diseaseColor} font-medium text-sm">${d.disease}</p></div>
                <span class="text-xs text-[#72796e]">${d.time}</span>
              </div>
              <p class="text-xs text-[#42493e] mb-6 line-clamp-2">${d.desc}</p>
              <button class="w-full bg-stone-50 border border-stone-200 text-[#2d5a27] py-2.5 rounded-xl font-bold hover:bg-[#2d5a27] hover:text-white transition-colors flex items-center justify-center gap-2">
                ${d.btn} <span class="material-symbols-outlined text-lg">${d.icon}</span>
              </button>
            </div>
          </div>
        `).join('')}
      </div>
    </section>

    <!-- AI Promo -->
    <section class="mt-16 mb-10 bg-[#2d5a27] rounded-[2.5rem] p-8 md:p-12 text-white relative overflow-hidden">
      <div class="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
      <div class="relative z-10 flex flex-col md:flex-row items-center gap-8">
        <div class="flex-1 text-center md:text-left">
          <h3 id="ai-symptom-title" class="font-[Lexend] text-3xl md:text-4xl font-semibold mb-4">
            ${t.unsureSymptom}
          </h3>
          <p
            id="ai-symptom-description"
            class="text-[#9dd090] text-lg mb-8 opacity-90">
            ${t.aiCropAdvice}
          </p>
          <button
            id="start-ai-chat-btn"
            onclick="navigateTo('ai-assistant')"
            class="bg-white text-[#2d5a27] px-10 py-4 rounded-full font-extrabold text-lg shadow-xl active:scale-95 transition-transform">
            ${t.startAIChat}
          </button>
        </div>
        <div class="w-48 h-48 bg-white/20 rounded-[2rem] flex items-center justify-center backdrop-blur-md border border-white/30">
          <span class="material-symbols-outlined text-[80px] text-white" style="font-variation-settings:'FILL' 1;">smart_toy</span>
        </div>
      </div>
    </section>
  `;
}

function handleImageUpload(event) {
  const file = event.target.files[0];
  if (!file) return;
  const zone = document.getElementById('upload-zone');
  const reader = new FileReader();
  reader.onload = function (e) {
    zone.innerHTML = `
      <img src="${e.target.result}" class="max-h-64 rounded-xl shadow-lg mb-4" alt="Uploaded crop"/>
      <p class="text-green-800 font-bold text-lg mb-2">${t.imageUploadedSuccessfully}</p>
      <p class="text-stone-500 text-sm mb-4">${t.analyzingCropImage}</p>
      <div class="flex gap-2"><span class="typing-dot w-2 h-2 rounded-full bg-green-600"></span><span class="typing-dot w-2 h-2 rounded-full bg-green-600"></span><span class="typing-dot w-2 h-2 rounded-full bg-green-600"></span></div>
    `;
    setTimeout(() => {
      zone.innerHTML += `
        <div class="mt-6 p-4 bg-[#ffdad6]/30 border border-[#ffdad6] rounded-xl text-left w-full max-w-md">
          <h4 class="font-bold text-[#93000a] mb-1">
            ⚠️ ${t.earlyBlightDetected}
          </h4>
          <p class="text-sm text-[#42493e]">
            ${t.earlyBlightConfidence}
          </p>
          <button onclick="navigateTo('ai-assistant')" class="mt-3 bg-[#2d5a27] text-white px-6 py-2 rounded-lg font-bold text-sm">Ask Krishak AI</button>
        </div>`;
    }, 3000);
  };
  reader.readAsDataURL(file);
}

let cameraStream = null;
let mediaRecorder = null;
let recordedChunks = [];

let capturedFile = null;
let capturedURL = null;



// ==========================================
// CROP HEALTH LANGUAGE
// ==========================================

function applyCropHealthLanguage(lang) {

  if (!translations[lang]) return;

  const t = translations[lang];

  renderCropHealth();

  const uploadTitle =
    document.getElementById("upload-crop-title");

    if (uploadTitle)
      uploadTitle.textContent =
        t.uploadCropPhoto || "Upload Crop Photo";

    const uploadDescription =
      document.getElementById("upload-crop-description");

    if (uploadDescription)
      uploadDescription.textContent =
        t.uploadCropDesc ||
        "Drag and drop your image here, or browse from your device. For best results, use high-quality close-ups of leaves.";

    // Page heading
    const title =
    document.getElementById("crop-management-title");

  if (title)
    title.textContent =
      t.cropManagement || "Crop Management & Diagnosis";

  // Page description
  const description =
    document.getElementById("crop-management-description");

  if (description)
    description.textContent =
      t.cropDiagnosisDesc ||
      "Identify plant diseases instantly with AI-powered diagnostics. Upload a photo or search for known symptoms.";

  // Search
  const search =
    document.getElementById("crop-disease-search");

  if (search)
    search.placeholder =
      t.searchCropDiseases || "Search crop diseases...";

  
  // Buttons
  const browse =
    document.getElementById("browse-gallery-btn");

  if (browse)
    browse.textContent =
      t.browseGallery || "Browse Gallery";

  const camera =
    document.getElementById("open-camera-btn");

  if (camera)
    camera.textContent =
      t.openCamera || "Open Camera";

  // Health
  const weekly =
    document.getElementById("weekly-status");

  if (weekly)
    weekly.textContent =
      t.weeklyStatus || "Weekly Status";

  const healthScore =
    document.getElementById("health-score-title");

  if (healthScore)
    healthScore.textContent =
      t.healthScore || "Health Score";

  const healthDescription =
    document.getElementById("health-score-description");

  if (healthDescription)
    healthDescription.textContent =
      t.healthScoreDescription ||
      "Your crops are generally healthy. 2 alerts need attention.";

  // Weather
  const weatherImpact =
    document.getElementById("weather-impact-title");

  if (weatherImpact)
    weatherImpact.textContent =
      t.weatherImpact || "Weather Impact";

  const humidity =
    document.getElementById("humidity-detected-text");

  if (humidity)
    humidity.textContent =
      t.highHumidityDetected || "High Humidity Detected";

  const fungalRisk =
    document.getElementById("fungal-risk-text");

  if (fungalRisk)
    fungalRisk.textContent =
      t.fungalRisk ||
      "Fungal risk elevated for tomato crops.";

  // Recent diagnoses
  const recent =
    document.getElementById("recent-diagnoses-title");

  if (recent)
    recent.textContent =
      t.recentDiagnoses || "Recent Diagnoses";

  const history =
    document.getElementById("view-history-btn");

  if (history) {
    history.childNodes[0].textContent =
      (t.viewHistory || "View History") + " ";
  }

  // AI section
  const aiTitle =
    document.getElementById("ai-symptom-title");

  if (aiTitle)
    aiTitle.textContent =
      t.unsureSymptom || "Unsure about a symptom?";

  const aiDescription =
    document.getElementById("ai-symptom-description");

  if (aiDescription)
    aiDescription.textContent =
      t.aiCropAdvice ||
      "Chat with Krishi AI to get instant expert advice on soil health, pest management, and local weather patterns.";

  const aiButton =
    document.getElementById("start-ai-chat-btn");

  if (aiButton)
    aiButton.textContent =
      t.startAIChat || "Start AI Chat";
}


// ===============================
// OPEN CAMERA
// ===============================

window.openCamera = async function () {

  try {

    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      alert("Camera is not supported by this browser.");
      return;
    }

    cameraStream = await navigator.mediaDevices.getUserMedia({
      video: {
        facingMode: "environment",
        width: { ideal: 1280 },
        height: { ideal: 720 }
      },
      audio: true
    });

    const video = document.getElementById("camera-preview");
    const container = document.getElementById("camera-area");

    video.srcObject = cameraStream;

    container.classList.remove("hidden");

    await video.play();

  } catch (error) {

    console.error("Camera Error:", error);

    if (error.name === "NotAllowedError") {
      alert("Camera permission denied. Please allow camera access.");
    }
    else if (error.name === "NotFoundError") {
      alert("No camera found on this device.");
    }
    else {
      alert("Unable to open camera.");
    }
  }
};


// ===============================
// CLICK PHOTO
// ===============================

window.capturePhoto = function () {

  const video = document.getElementById("camera-preview");
  const canvas = document.getElementById("camera-canvas");

  if (!video.videoWidth || !video.videoHeight) {
    alert("Camera is not ready yet.");
    return;
  }

  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;

  const context = canvas.getContext("2d");

  context.drawImage(
    video,
    0,
    0,
    canvas.width,
    canvas.height
  );

  canvas.toBlob(function (blob) {

    if (!blob) {
      alert("Unable to capture photo.");
      return;
    }

    capturedFile = new File(
      [blob],
      `crop-photo-${Date.now()}.jpg`,
      {
        type: "image/jpeg"
      }
    );

    // Create URL for captured photo
    if (capturedURL) {
      URL.revokeObjectURL(capturedURL);
    }

    capturedURL = URL.createObjectURL(blob);

    const photo =
      document.getElementById("captured-photo");

    const liveCamera =
      document.getElementById("camera-preview");

    const controls =
      document.getElementById("camera-controls");

    const mediaActions =
      document.getElementById("media-actions");

    const saveButton =
      document.getElementById("save-media-btn");


    // Show clicked photo
    photo.src = capturedURL;
    photo.classList.remove("hidden");


    // Hide live camera
    liveCamera.classList.add("hidden");


    // Hide Click Photo + Start Video buttons
    controls.classList.add("hidden");


    // Show separate Save + Upload buttons
    mediaActions.classList.remove("hidden");


    // Save Photo button
    saveButton.href = capturedURL;
    saveButton.download =
      `crop-photo-${Date.now()}.jpg`;

    saveButton.textContent = "💾 Save Photo";


    // STOP CAMERA
    if (cameraStream) {

      cameraStream
        .getTracks()
        .forEach(track => track.stop());

      cameraStream = null;
    }

    liveCamera.srcObject = null;

  }, "image/jpeg", 0.95);
};

// ===============================
// SHOW CAPTURED PHOTO / VIDEO
// ===============================
function showCapturedMedia(blob, type) {

  const liveCamera =
    document.getElementById("camera-preview");

  const photo =
    document.getElementById("captured-photo");

  const recordedVideo =
    document.getElementById("recorded-video");

  const controls =
    document.getElementById("camera-controls");

  const mediaActions =
    document.getElementById("media-actions");

  const saveButton =
    document.getElementById("save-media-btn");


  // Remove previous URL
  if (capturedURL) {
    URL.revokeObjectURL(capturedURL);
  }

  // Create new URL
  capturedURL =
    URL.createObjectURL(blob);


  // =========================
  // PHOTO
  // =========================

  if (type === "photo") {

    // Put captured image on screen
    photo.src = capturedURL;

    // Show image
    photo.classList.remove("hidden");

    // Hide recorded video
    recordedVideo.classList.add("hidden");

    // Save Photo
    saveButton.href = capturedURL;

    saveButton.download =
      `crop-photo-${Date.now()}.jpg`;

    saveButton.textContent =
      "💾 Save Photo";
  }


  // =========================
  // VIDEO
  // =========================

  if (type === "video") {

    // Put recorded video on screen
    recordedVideo.src = capturedURL;

    recordedVideo.controls = true;

    // Show video
    recordedVideo.classList.remove("hidden");

    // Hide photo
    photo.classList.add("hidden");

    // Save Video
    saveButton.href = capturedURL;

    saveButton.download =
      `crop-video-${Date.now()}.webm`;

    saveButton.textContent =
      "💾 Save Video";
  }


  // =========================
  // HIDE LIVE CAMERA
  // =========================

  liveCamera.classList.add("hidden");


  // =========================
  // HIDE CAMERA BUTTONS
  // =========================

  controls.classList.add("hidden");


  // =========================
  // SHOW SAVE + UPLOAD
  // =========================

  mediaActions.classList.remove("hidden");


  // =========================
  // STOP CAMERA
  // =========================

  if (cameraStream) {

    cameraStream
      .getTracks()
      .forEach(track => track.stop());

    cameraStream = null;
  }

  liveCamera.srcObject = null;
}


// ===============================
// START VIDEO RECORDING
// ===============================

window.startRecording = function () {

  if (!cameraStream) {
    alert("Please open the camera first.");
    return;
  }

  recordedChunks = [];

  try {

    mediaRecorder = new MediaRecorder(
      cameraStream,
      {
        mimeType: "video/webm"
      }
    );

  } catch (error) {

    console.error(error);

    try {
      mediaRecorder = new MediaRecorder(cameraStream);
    } catch (err) {
      alert("Video recording is not supported by this browser.");
      return;
    }
  }

  mediaRecorder.ondataavailable = function (event) {

    if (event.data && event.data.size > 0) {
      recordedChunks.push(event.data);
    }
  };


  mediaRecorder.onstop = function () {

    const videoBlob = new Blob(
      recordedChunks,
      {
        type: "video/webm"
      }
    );

    capturedFile = new File(
      [videoBlob],
      `crop-video-${Date.now()}.webm`,
      {
        type: "video/webm"
      }
    );

    showCapturedMedia(videoBlob, "video");
  };


  mediaRecorder.start();

  document
    .getElementById("start-recording-btn")
    .classList.add("hidden");

  document
    .getElementById("stop-recording-btn")
    .classList.remove("hidden");

  console.log("Video recording started");
};


// ===============================
// STOP VIDEO RECORDING
// ===============================

window.stopRecording = function () {

  if (
    mediaRecorder &&
    mediaRecorder.state !== "inactive"
  ) {

    mediaRecorder.stop();

    document
      .getElementById("start-recording-btn")
      .classList.remove("hidden");

    document
      .getElementById("stop-recording-btn")
      .classList.add("hidden");

    console.log("Video recording stopped");
  }
};


// ===============================
// UPLOAD CAPTURED MEDIA
// ===============================

window.uploadCapturedMedia = function () {

  if (!capturedFile) {
    alert("Please capture a photo or video first.");
    return;
  }

  // Photo
  if (capturedFile.type.startsWith("image/")) {

    const input = document.getElementById("file-input");

    const dataTransfer = new DataTransfer();

    dataTransfer.items.add(capturedFile);

    input.files = dataTransfer.files;

    // Use your existing upload function
    handleImageUpload({
      target: input
    });

    return;
  }

  // Video
  if (capturedFile.type.startsWith("video/")) {

    alert(
      "Video captured successfully! 🎥\n\n" +
      "Video is ready for upload."
    );

    /*
     * Later you can send capturedFile
     * to Firebase Storage / backend.
     */

    console.log("Video ready for upload:", capturedFile);
  }
};


// ===============================
// CLOSE CAMERA
// ===============================

window.closeCamera = function () {

  if (cameraStream) {

    cameraStream
      .getTracks()
      .forEach(track => track.stop());

    cameraStream = null;
  }

  const video = document.getElementById("camera-preview");
  const container = document.getElementById("camera-area");

  if (video) {
    video.srcObject = null;
  }

  if (container) {
    container.classList.add("hidden");
  }

  document
    .getElementById("media-actions")
    ?.classList.add("hidden");

  console.log("Camera closed");
};