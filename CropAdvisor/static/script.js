document.addEventListener('DOMContentLoaded', () => {
    // --- ELEMENT SELECTORS ---
    const form = document.getElementById('crop-form');
    const resultSection = document.getElementById('result-section');
    const recommendationsDiv = document.getElementById('recommendations');
    const loader = document.getElementById('loader');
    const languageSelector = document.getElementById('language-selector');
    const askBtn = document.getElementById('ask-btn');
    const voiceBtn = document.getElementById('voice-btn');
    const userQuestionInput = document.getElementById('user-question');
    const chatBox = document.getElementById('chat-box');
    const cropImageInput = document.getElementById('crop-image-input');
    const imagePreviewContainer = document.getElementById('image-preview-container');
    const imagePreview = document.getElementById('image-preview');
    const analyzeImageBtn = document.getElementById('analyze-image-btn');
    const imageAnalysisResult = document.getElementById('image-analysis-result');


    // --- TRANSLATIONS OBJECT ---
    // FIX 2: Added new keys for the hardcoded text
    const translations = {
        en: {
            title: '<i class="fas fa-leaf"></i> AI Crop Advisor',
            subtitle: 'Your Smart Farming Partner',
            form_title: "<i class='fas fa-map-marker-alt'></i> Enter Your Farm's Details",
            location_label: "Location:",
            location_placeholder: "e.g., Kolhapur, Maharashtra",
            ph_label: "Soil pH:",
            ph_placeholder: "e.g., 6.5",
            moisture_label: "Soil Moisture (%):",
            moisture_placeholder: "e.g., 60",
            nutrients_label: "Nitrogen (N) Content (kg/ha):",
            nutrients_placeholder: "e.g., 50",
            recommend_btn: 'Get Recommendation <i class="fas fa-search"></i>',
            result_title: '<i class="fas fa-seedling"></i> Recommended Crops',
            chat_title: '<i class="fas fa-comments"></i> Ask a Question',
            chat_welcome: 'Hello! Ask me anything about your farm.',
            chat_placeholder: 'Type your question here...',
            footer_text: '&copy; 2025 Smart Farming Solutions',
            image_upload_title: '<i class="fas fa-camera"></i> Check Crop Health',
            image_upload_desc: 'Upload a picture of a crop leaf to detect diseases.',
            upload_btn: '<i class="fas fa-upload"></i> Choose Image',
            analyze_btn: '<i class="fas fa-vials"></i> Analyze Picture',
            analysis_result_header: 'Analysis Result',
            diagnosis_label: 'Diagnosis:',
            recommendation_label: 'Recommendation:',
            disease_detected: 'Leaf Blight Detected',
            recommendation: 'Apply a suitable fungicide and ensure proper irrigation.',
            est_yield: 'Est. Yield',
            est_profit: 'Est. Profit',
            sustainability: 'Sustainability'
        },
        hi: {
            title: '<i class="fas fa-leaf"></i> एआई फसल सलाहकार',
            subtitle: 'आपका स्मार्ट खेती पार्टनर',
            form_title: "<i class='fas fa-map-marker-alt'></i> अपने खेत का विवरण दर्ज करें",
            location_label: "स्थान:",
            location_placeholder: "उदा., कोल्हापुर, महाराष्ट्र",
            ph_label: "मिट्टी का पीएच (pH):",
            ph_placeholder: "उदा., 6.5",
            moisture_label: "मिट्टी की नमी (%):",
            moisture_placeholder: "उदा., 60",
            nutrients_label: "नाइट्रोजन (N) सामग्री (किग्रा/हेक्टेयर):",
            nutrients_placeholder: "उदा., 50",
            recommend_btn: 'सिफारिश प्राप्त करें <i class="fas fa-search"></i>',
            result_title: '<i class="fas fa-seedling"></i> अनुशंसित फसलें',
            chat_title: '<i class="fas fa-comments"></i> प्रश्न पूछें',
            chat_welcome: 'नमस्ते! अपने खेत के बारे में कुछ भी पूछें।',
            chat_placeholder: 'अपना प्रश्न यहां टाइप करें...',
            footer_text: '&copy; 2025 स्मार्ट फार्मिंग सॉल्यूशंस',
            image_upload_title: '<i class="fas fa-camera"></i> फसल स्वास्थ्य की जाँच करें',
            image_upload_desc: 'बीमारियों का पता लगाने के लिए फसल के पत्ते की तस्वीर अपलोड करें।',
            upload_btn: '<i class="fas fa-upload"></i> छवि चुनें',
            analyze_btn: '<i class="fas fa-vials"></i> चित्र का विश्लेषण करें',
            analysis_result_header: 'विश्लेषण परिणाम',
            diagnosis_label: 'निदान:',
            recommendation_label: 'सिफारिश:',
            disease_detected: 'लीफ ब्लाइट का पता चला',
            recommendation: 'उपयुक्त कवकनाशी का प्रयोग करें और उचित सिंचाई सुनिश्चित करें।',
            est_yield: 'अनुमानित उपज',
            est_profit: 'अनुमानित लाभ',
            sustainability: 'स्थिरता'
        },
        bn: {
            title: '<i class="fas fa-leaf"></i> এআই ফসল উপদেষ্টা',
            subtitle: 'আপনার স্মার্ট চাষের সঙ্গী',
            form_title: "<i class='fas fa-map-marker-alt'></i> আপনার খামারের বিবরণ লিখুন",
            location_label: "অবস্থান:",
            location_placeholder: "উদাঃ কোলাপুর, মহারাষ্ট্র",
            ph_label: "মাটির পিএইচ (pH):",
            ph_placeholder: "উদাঃ 6.5",
            moisture_label: "মাটির আর্দ্রতা (%):",
            moisture_placeholder: "উদাঃ 60",
            nutrients_label: "নাইট্রোজেন (N) পরিমাণ (কেজি/হেক্টর):",
            nutrients_placeholder: "উদাঃ 50",
            recommend_btn: 'সুপারিশ পান <i class="fas fa-search"></i>',
            result_title: '<i class="fas fa-seedling"></i> প্রস্তাবিত ফসল',
            chat_title: '<i class="fas fa-comments"></i> একটি প্রশ্ন জিজ্ঞাসা করুন',
            chat_welcome: 'নমস্কার! আপনার খামার সম্পর্কে কিছু জিজ্ঞাসা করুন।',
            chat_placeholder: 'আপনার প্রশ্ন এখানে টাইপ করুন...',
            footer_text: '&copy; 2025 স্মার্ট ফার্মিং সলিউশনস',
            image_upload_title: '<i class="fas fa-camera"></i> ফসলের স্বাস্থ্য পরীক্ষা করুন',
            image_upload_desc: 'রোগ সনাক্ত করতে ফসলের পাতার একটি ছবি আপলোড করুন।',
            upload_btn: '<i class="fas fa-upload"></i> ছবি বাছুন',
            analyze_btn: '<i class="fas fa-vials"></i> ছবির বিশ্লেষণ করুন',
            analysis_result_header: 'বিশ্লেষণের ফলাফল',
            diagnosis_label: 'রোগ নির্ণয়:',
            recommendation_label: 'সুপারিশ:',
            disease_detected: 'লিফ ব্লাইট সনাক্ত করা হয়েছে',
            recommendation: 'উপযুক্ত ছত্রাকনাশক প্রয়োগ করুন এবং সঠিক সেচ ব্যবস্থা নিশ্চিত করুন।',
            est_yield: 'আনুমানিক ফলন',
            est_profit: 'আনুমানিক লাভ',
            sustainability: 'স্থায়িত্ব'
        },
        mr: {
            title: '<i class="fas fa-leaf"></i> एआय पीक सल्लागार',
            subtitle: 'तुमचा स्मार्ट शेती भागीदार',
            form_title: "<i class='fas fa-map-marker-alt'></i> तुमच्या शेतीचा तपशील प्रविष्ट करा",
            location_label: "स्थान:",
            location_placeholder: "उदा. कोल्हापूर, महाराष्ट्र",
            ph_label: "मातीचा पीएच (pH):",
            ph_placeholder: "उदा. 6.5",
            moisture_label: "मातीचा ओलावा (%):",
            moisture_placeholder: "उदा. 60",
            nutrients_label: "नायट्रोजन (N) सामग्री (किलो/हेक्टर):",
            nutrients_placeholder: "उदा. 50",
            recommend_btn: 'शिफारस मिळवा <i class="fas fa-search"></i>',
            result_title: '<i class="fas fa-seedling"></i> शिफारस केलेली पिके',
            chat_title: '<i class="fas fa-comments"></i> प्रश्न विचारा',
            chat_welcome: 'नमस्कार! तुमच्या शेताबद्दल काहीही विचारा.',
            chat_placeholder: 'तुमचा प्रश्न येथे टाइप करा...',
            footer_text: '&copy; 2025 स्मार्ट फार्मिंग सोल्युशन्स',
            image_upload_title: '<i class="fas fa-camera"></i> पिकाचे आरोग्य तपासा',
            image_upload_desc: 'रोगांचे निदान करण्यासाठी पिकाच्या पानाचे चित्र अपलोड करा.',
            upload_btn: '<i class="fas fa-upload"></i> चित्र निवडा',
            analyze_btn: '<i class="fas fa-vials"></i> चित्राचे विश्लेषण करा',
            analysis_result_header: 'विश्लेषण परिणाम',
            diagnosis_label: 'निदान:',
            recommendation_label: 'शिफारस:',
            disease_detected: 'पानावरील करपा आढळला',
            recommendation: 'योग्य बुरशीनाशक वापरा आणि योग्य सिंचनाची खात्री करा.',
            est_yield: ' अंदाजित उत्पन्न',
            est_profit: 'अंदाजित नफा',
            sustainability: 'शाश्वती'
        }
    };

    // --- LANGUAGE CHANGE FUNCTIONALITY ---
    const changeLanguage = (lang) => {
        document.querySelectorAll('[data-key]').forEach(element => {
            const key = element.getAttribute('data-key');
            if (translations[lang] && translations[lang][key]) {
                element.innerHTML = translations[lang][key];
            }
        });
        document.querySelectorAll('[data-key-placeholder]').forEach(element => {
            const key = element.getAttribute('data-key-placeholder');
            if (translations[lang] && translations[lang][key]) {
                element.placeholder = translations[lang][key];
            }
        });
    };

    languageSelector.addEventListener('change', (event) => {
        changeLanguage(event.target.value);
    });

    // --- CROP RECOMMENDATION FORM ---
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        loader.classList.remove('hidden');
        resultSection.classList.remove('hidden');
        recommendationsDiv.innerHTML = '';

        setTimeout(() => {
            const recommendations = getMockRecommendations();
            loader.classList.add('hidden');
            displayRecommendations(recommendations);
        }, 2000);
    });
    
    // --- IMAGE UPLOAD & ANALYSIS ---
    cropImageInput.addEventListener('change', function() {
        const file = this.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                imagePreview.setAttribute('src', e.target.result);
                imagePreviewContainer.classList.remove('hidden');
                analyzeImageBtn.classList.remove('hidden');
                imageAnalysisResult.classList.add('hidden');
            }
            reader.readAsDataURL(file);
        }
    });

    analyzeImageBtn.addEventListener('click', function() {
        const currentLang = languageSelector.value;
        imageAnalysisResult.classList.remove('hidden');
        imageAnalysisResult.innerHTML = `<span>Analyzing... <i class="fas fa-spinner fa-spin"></i></span>`;

        setTimeout(() => {
            // FIX 3: Replaced hardcoded text with translation keys
            imageAnalysisResult.innerHTML = `
                <h4>${translations[currentLang].analysis_result_header}</h4>
                <p><strong>${translations[currentLang].diagnosis_label}</strong> ${translations[currentLang].disease_detected}</p>
                <p><strong>${translations[currentLang].recommendation_label}</strong> ${translations[currentLang].recommendation}</p>
            `;
        }, 2500);
    });


    // --- MOCK DATA & DISPLAY FUNCTIONS ---
    function getMockRecommendations() {
        return [
            { crop: 'Rice', yield: '4.5 tons/ha', profit: '₹60,000/ha', sustainability: 'High', details: 'Well-suited for the current moisture and pH levels. Strong market demand.'},
            { crop: 'Jute', yield: '2.5 tons/ha', profit: '₹48,000/ha', sustainability: 'Medium', details: 'Good rotational crop. Helps improve soil health. Moderate water requirement.'},
            { crop: 'Maize', yield: '6.0 tons/ha', profit: '₹55,000/ha', sustainability: 'Medium', details: 'Requires slightly more nitrogen but offers a high yield.'}
        ];
    }

    function displayRecommendations(recommendations) {
        const currentLang = languageSelector.value; // Get current language
        recommendationsDiv.innerHTML = ''; // Clear previous results

        recommendations.forEach(rec => {
            const item = document.createElement('div');
            item.className = 'recommendation-item';

            // FIX 2: Replaced hardcoded text with translation keys
            item.innerHTML = `
                <h3>${rec.crop}</h3>
                <p>${rec.details}</p>
                <div class="metrics">
                    <div class="metric">
                        <span><i class="fas fa-tractor"></i> ${translations[currentLang].est_yield}</span>
                        <p>${rec.yield}</p>
                    </div>
                    <div class="metric">
                        <span><i class="fas fa-rupee-sign"></i> ${translations[currentLang].est_profit}</span>
                        <p>${rec.profit}</p>
                    </div>
                    <div class="metric">
                        <span><i class="fas fa-recycle"></i> ${translations[currentLang].sustainability}</span>
                        <p>${rec.sustainability}</p>
                    </div>
                </div>
            `;
            recommendationsDiv.appendChild(item);
        });
    }

    // --- CHAT & VOICE FUNCTIONALITY ---
    const handleChatSubmit = () => {
        const question = userQuestionInput.value.trim();
        if (question === '') return;
        addMessageToChat(question, 'user');
        userQuestionInput.value = '';
        setTimeout(() => {
            const botResponse = getBotResponse(question);
            addMessageToChat(botResponse, 'bot');
        }, 1000);
    };

    askBtn.addEventListener('click', handleChatSubmit);
    userQuestionInput.addEventListener('keypress', (e) => e.key === 'Enter' && handleChatSubmit());

    function addMessageToChat(message, sender) {
        const messageElement = document.createElement('p');
        messageElement.textContent = message;
        messageElement.className = sender === 'user' ? 'user-message' : 'bot-message';
        chatBox.appendChild(messageElement);
        chatBox.scrollTop = chatBox.scrollHeight;
    }

    function getBotResponse(question) {
        question = question.toLowerCase();
        if (question.includes('fertilizer') || question.includes('खाद')) {
            return "For rice, a balanced NPK fertilizer like 10-26-26 is recommended during the initial phase.";
        } else if (question.includes('weather') || question.includes('मौसम')) {
            return "The forecast for the next 5 days shows sunny conditions with a 20% chance of light rain on Friday.";
        } else {
            return "I can answer questions about fertilizers, weather, and market prices. Please ask a more specific question.";
        }
    }

    voiceBtn.addEventListener('click', () => {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (!SpeechRecognition) {
            alert("Sorry, your browser doesn't support speech recognition.");
            return;
        }
        const recognition = new SpeechRecognition();
        
        // FIX 1: Use a switch statement for all languages
        switch (languageSelector.value) {
            case 'hi':
                recognition.lang = 'hi-IN';
                break;
            case 'bn':
                recognition.lang = 'bn-BD';
                break;
            case 'mr':
                recognition.lang = 'mr-IN';
                break;
            default:
                recognition.lang = 'en-US';
                break;
        }

        recognition.start();

        voiceBtn.innerHTML = '<i class="fas fa-microphone-alt fa-beat"></i>';
        recognition.onresult = (event) => {
            const spokenText = event.results[0][0].transcript;
            userQuestionInput.value = spokenText;
            handleChatSubmit();
        };
        recognition.onend = () => voiceBtn.innerHTML = '<i class="fas fa-microphone"></i>';
        recognition.onerror = (event) => {
            console.error('Speech recognition error:', event.error);
            voiceBtn.innerHTML = '<i class="fas fa-microphone"></i>';
        };
    });

    // Initialize with default language
    changeLanguage('en');
});