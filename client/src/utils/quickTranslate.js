// Quick comprehensive translations for all languages
export const quickTranslations = {
  'season': {
    'en': 'Season', 'hi': 'सीजन'
  },
  'current_activity': {
    'en': 'Current Activity', 'hi': 'वर्तमान गतिविधि'
  },
  'profit': {
    'en': 'profit', 'hi': 'लाभ'
  },
  'margin': {
    'en': 'margin', 'hi': 'मार्जिन'
  },
  'tip': {
    'en': 'Tip', 'hi': 'सुझाव'
  },
  'market_price': {
    'en': 'Market Price', 'hi': 'बाजार मूल्य'
  },
  'production_cost': {
    'en': 'Production Cost', 'hi': 'उत्पादन लागत'
  },
  'market_trends': {
    'en': 'Market Trends', 'hi': 'बाजार के रुझान'
  },
  'risk_factors': {
    'en': 'Risk Factors', 'hi': 'जोखिम कारक'
  },
  'soil_health_restoration': {
    'en': 'Soil Health Restoration', 'hi': 'मिट्टी के स्वास्थ्य की बहाली'
  },
  'nitrogen_fixing_crops': {
    'en': 'Nitrogen-Fixing Crops', 'hi': 'नाइट्रोजन फिक्सिंग फसलें'
  },
  'green_manure_crops': {
    'en': 'Green Manure Crops', 'hi': 'हरी खाद फसलें'
  },
  'recommendation': {
    'en': 'Recommendation', 'hi': 'सिफारिश'
  }
};

export const qt = (key, language = 'en') => {
  return quickTranslations[key]?.[language] || quickTranslations[key]?.['en'] || key;
};

// Crop translations
quickTranslations['Cotton'] = { 'en': 'Cotton', 'hi': 'कपास' };
quickTranslations['Maize'] = { 'en': 'Maize', 'hi': 'मक्का' };
quickTranslations['Soybean'] = { 'en': 'Soybean', 'hi': 'सोयाबीन' };
quickTranslations['Wheat'] = { 'en': 'Wheat', 'hi': 'गेहूं' };
quickTranslations['Rice'] = { 'en': 'Rice', 'hi': 'चावल' };
quickTranslations['Chickpea'] = { 'en': 'Chickpea', 'hi': 'चना' };
quickTranslations['Lentil'] = { 'en': 'Lentil', 'hi': 'मसूर' };
quickTranslations['Mustard'] = { 'en': 'Mustard', 'hi': 'सरसों' };
quickTranslations['Barley'] = { 'en': 'Barley', 'hi': 'जौ' };
quickTranslations['Sugarcane'] = { 'en': 'Sugarcane', 'hi': 'गन्ना' };
quickTranslations['Groundnut'] = { 'en': 'Groundnut', 'hi': 'मूंगफली' };
quickTranslations['Sunflower'] = { 'en': 'Sunflower', 'hi': 'सूरजमुखी' };
quickTranslations['Black Gram'] = { 'en': 'Black Gram', 'hi': 'उड़द' };
quickTranslations['Green Gram'] = { 'en': 'Green Gram', 'hi': 'मूंग' };
quickTranslations['Pigeon Pea'] = { 'en': 'Pigeon Pea', 'hi': 'अरहर' };
quickTranslations['Field Pea'] = { 'en': 'Field Pea', 'hi': 'मटर' };
quickTranslations['Fenugreek'] = { 'en': 'Fenugreek', 'hi': 'मेथी' };

// UI translations
quickTranslations['FarmAssist'] = { 'en': 'Farm Navigator', 'hi': 'फार्म नेवीगेटर' };
quickTranslations['Smart Farming'] = { 'en': 'Smart Farming', 'hi': 'स्मार्ट फार्मिंग' };
quickTranslations['Soil Test'] = { 'en': 'Soil Test', 'hi': 'मिट्टी परीक्षण' };
quickTranslations['Government Schemes'] = { 'en': 'Government Schemes', 'hi': 'सरकारी योजनाएं' };
quickTranslations['Talk to Expert'] = { 'en': 'Talk to Expert', 'hi': 'विशेषज्ञ से बात करें' };
quickTranslations['Machine Rental'] = { 'en': 'Machine Rental', 'hi': 'मशीन किराया' };
quickTranslations['Crop Insurance'] = { 'en': 'Crop Insurance', 'hi': 'फसल बीमा' };
quickTranslations['Emergency Alerts'] = { 'en': 'Emergency Alerts', 'hi': 'आपातकालीन अलर्ट' };
quickTranslations['Market Prices'] = { 'en': 'Market Prices', 'hi': 'बाजार भाव' };
quickTranslations['Training Videos'] = { 'en': 'Training Videos', 'hi': 'प्रशिक्षण वीडियो' };
quickTranslations['Location'] = { 'en': 'Location', 'hi': 'स्थान' };
quickTranslations['Clear'] = { 'en': 'Clear', 'hi': 'साफ' };

// Dashboard translations
quickTranslations['smart_farm_dashboard'] = { 'en': 'Smart Farm Dashboard', 'hi': 'स्मार्ट फार्म डैशबोर्ड' };
quickTranslations['your_complete_farming_assistant'] = { 'en': 'Your Complete Farming Assistant', 'hi': 'आपका संपूर्ण कृषि सहायक' };
quickTranslations['weather forecast'] = { 'en': '7-Day Weather Forecast', 'hi': '7-दिन का मौसम पूर्वानुमान' };
quickTranslations['recommended crops for'] = { 'en': 'के लिए अनुशंसित फसलें', 'hi': 'के लिए अनुशंसित फसलें' };

// Month translations
quickTranslations['January'] = { 'en': 'January', 'hi': 'जनवरी' };
quickTranslations['February'] = { 'en': 'February', 'hi': 'फरवरी' };
quickTranslations['March'] = { 'en': 'March', 'hi': 'मार्च' };
quickTranslations['April'] = { 'en': 'April', 'hi': 'अप्रैल' };
quickTranslations['May'] = { 'en': 'May', 'hi': 'मई' };
quickTranslations['June'] = { 'en': 'June', 'hi': 'जून' };
quickTranslations['July'] = { 'en': 'July', 'hi': 'जुलाई' };
quickTranslations['August'] = { 'en': 'August', 'hi': 'अगस्त' };
quickTranslations['September'] = { 'en': 'September', 'hi': 'सितंबर' };
quickTranslations['October'] = { 'en': 'October', 'hi': 'अक्टूबर' };
quickTranslations['November'] = { 'en': 'November', 'hi': 'नवंबर' };
quickTranslations['December'] = { 'en': 'December', 'hi': 'दिसंबर' };

// Market translations
quickTranslations['most_profitable_crops'] = { 'en': 'Most Profitable Crops (Based on Current Mandi Prices)', 'hi': 'सबसे लाभदायक फसलें (वर्तमान मंडी भावों के आधार पर)' };
quickTranslations['market'] = { 'en': 'Market', 'hi': 'बाजार' };
quickTranslations['view_live_mandi_prices'] = { 'en': 'View live mandi prices on agmarknet.gov.in', 'hi': 'agmarknet.gov.in पर लाइव मंडी भाव देखें' };

// Soil restoration translations
quickTranslations['soil_nutrient_restoration_needed'] = { 'en': 'Soil Nutrient Restoration Needed', 'hi': 'मिट्टी पोषक तत्व बहाली आवश्यक' };
quickTranslations['previous_crops_depleted_nitrogen'] = { 'en': 'Your previous crops (Wheat, Rice, Cotton) may have depleted soil nitrogen', 'hi': 'आपकी पिछली फसलें (गेहूं, चावल, कपास) ने मिट्टी का नाइट्रोजन कम किया हो सकता है' };
quickTranslations['crops_add_nitrogen_naturally'] = { 'en': 'These crops add nitrogen to soil naturally', 'hi': 'ये फसलें मिट्टी में प्राकृतिक रूप से नाइट्रोजन जोड़ती हैं' };
quickTranslations['plow_into_soil_organic_matter'] = { 'en': 'Plow these into soil for organic matter', 'hi': 'जैविक पदार्थ के लिए इन्हें मिट्टी में जोतें' };
quickTranslations['crop_rotation_recommendation'] = { 'en': 'Consider crop rotation with legumes to restore soil nitrogen. This will improve yields for your next cereal crops.', 'hi': 'मिट्टी में नाइट्रोजन बहाल करने के लिए दलहन के साथ फसल चक्र पर विचार करें। इससे आपकी अगली अनाज की फसलों की पैदावार में सुधार होगा।' };

// Additional translations
quickTranslations['prices_updated_from_live_mandi'] = { 'en': 'Prices updated from live mandi data. Consider seasonal demand patterns.', 'hi': 'लाइव मंडी डेटा से दरें अपडेट की गईं। मौसमी मांग पैटर्न पर विचार करें।' };
quickTranslations['weather_storage_transport_costs'] = { 'en': 'Weather, storage, and transport costs may affect final profits.', 'hi': 'मौसम, भंडारण और परिवहन लागत अंतिम लाभ को प्रभावित कर सकती है।' };

// Location selection translations
quickTranslations['select_location'] = {
  'en': 'Select Location', 'hi': 'स्थान चुनें', 'pa': 'ਸਥਾਨ ਚੁਣੋ', 'te': 'స్థానం ఎంచుకోండి', 'mr': 'स्थान निवडा', 'gu': 'સ્થાન પસંદ કરો',
  'ml': 'സ്ഥലം തിരഞ്ഞെടുക്കുക', 'bn': 'স্থান নির্বাচন করুন', 'ta': 'இடத்தைத் தேர்ந்தெடுக்கவும்', 'kn': 'ಸ್ಥಳವನ್ನು ಆಯ್ಕೆಮಾಡಿ', 'or': 'ସ୍ଥାନ ବାଛନ୍ତୁ', 'as': 'স্থান নিৰ্বাচন কৰক',
  'ur': 'مقام منتخب کریں', 'sa': 'स्थानं चिनुत', 'sd': 'جاءِ چونڊيو'
};

quickTranslations['getting_location'] = {
  'en': 'Getting Location...', 'hi': 'स्थान प्राप्त कर रहे हैं...', 'pa': 'ਸਥਾਨ ਪ੍ਰਾਪਤ ਕਰ ਰਹੇ ਹਾਂ...', 'te': 'స్థానం పొందుతున్నాము...', 'mr': 'स्थान मिळवत आहे...', 'gu': 'સ્થાન મેળવી રહ્યા છીએ...',
  'ml': 'സ്ഥലം നേടുന്നു...', 'bn': 'অবস্থান পাচ্ছি...', 'ta': 'இடத்தைப் பெறுகிறோம்...', 'kn': 'ಸ್ಥಳವನ್ನು ಪಡೆಯುತ್ತಿದ್ದೇವೆ...', 'or': 'ସ୍ଥାନ ପାଇବା...', 'as': 'স্থান পাই আছো...',
  'ur': 'مقام حاصل کر رہے ہیں...', 'sa': 'स्थानं प्राप्नुवन्ति...', 'sd': 'جاءِ حاصل ڪري رهيا آهيون...'
};

quickTranslations['use_my_location'] = {
  'en': 'Use My Location', 'hi': 'मेरा स्थान उपयोग करें', 'pa': 'ਮੇਰਾ ਸਥਾਨ ਵਰਤੋ', 'te': 'నా స్థానాన్ని ఉపయోగించండి', 'mr': 'माझे स्थान वापरा', 'gu': 'મારું સ્થાન વાપરો',
  'ml': 'എന്റെ സ്ഥലം ഉപയോഗിക്കുക', 'bn': 'আমার অবস্থান ব্যবহার করুন', 'ta': 'என் இடத்தைப் பயன்படுத்துங்கள்', 'kn': 'ನನ್ನ ಸ್ಥಳವನ್ನು ಬಳಸಿ', 'or': 'ମୋର ସ୍ଥାନ ବ୍ୟବହାର କରନ୍ତୁ', 'as': 'মোৰ স্থান ব্যৱহাৰ কৰক',
  'ur': 'میرا مقام استعمال کریں', 'sa': 'मम स्थानं प्रयुञ्जताम्', 'sd': 'منهنجو جاءِ استعمال ڪريو'
};

quickTranslations['loading_locations'] = {
  'en': 'Loading locations...', 'hi': 'स्थान लोड हो रहे हैं...', 'pa': 'ਸਥਾਨ ਲੋਡ ਹੋ ਰਹੇ ਹਨ...', 'te': 'స్థానాలు లోడ్ అవుతున్నాయి...', 'mr': 'स्थाने लोड होत आहेत...', 'gu': 'સ્થાનો લોડ થઈ રહ્યા છે...',
  'ml': 'സ്ഥലങ്ങൾ ലോഡ് ചെയ്യുന്നു...', 'bn': 'অবস্থান লোড হচ্ছে...', 'ta': 'இடங்கள் ஏற்றப்படுகின்றன...', 'kn': 'ಸ್ಥಳಗಳು ಲೋಡ್ ಆಗುತ್ತಿವೆ...', 'or': 'ସ୍ଥାନଗୁଡ଼ିକ ଲୋଡ୍ ହେଉଛି...', 'as': 'স্থানসমূহ লোড হৈ আছে...',
  'ur': 'مقامات لوڈ ہو رہے ہیں...', 'sa': 'स्थानानि लोड् भवन्ति...', 'sd': 'جايون لوڊ ٿي رهيون آهن...'
};

quickTranslations['select_state'] = {
  'en': 'Select State', 'hi': 'राज्य चुनें', 'pa': 'ਰਾਜ ਚੁਣੋ', 'te': 'రాష్ట్రం ఎంచుకోండి', 'mr': 'राज्य निवडा', 'gu': 'રાજ્ય પસંદ કરો',
  'ml': 'സംസ്ഥാനം തിരഞ്ഞെടുക്കുക', 'bn': 'রাজ্য নির্বাচন করুন', 'ta': 'மாநிலத்தைத் தேர்ந்தெடுக்கவும்', 'kn': 'ರಾಜ್ಯವನ್ನು ಆಯ್ಕೆಮಾಡಿ', 'or': 'ରାଜ୍ୟ ବାଛନ୍ତୁ', 'as': 'ৰাজ্য নিৰ্বাচন কৰক',
  'ur': 'ریاست منتخب کریں', 'sa': 'राज्यं चिनुत', 'sd': 'رياست چونڊيو'
};

quickTranslations['select_district'] = {
  'en': 'Select District', 'hi': 'जिला चुनें', 'pa': 'ਜ਼ਿਲ੍ਹਾ ਚੁਣੋ', 'te': 'జిల్లా ఎంచుకోండి', 'mr': 'जिल्हा निवडा', 'gu': 'જિલ્લો પસંદ કરો',
  'ml': 'ജില്ല തിരഞ്ഞെടുക്കുക', 'bn': 'জেলা নির্বাচন করুন', 'ta': 'மாவட்டத்தைத் தேர்ந்தெடுக்கவும்', 'kn': 'ಜಿಲ್ಲೆಯನ್ನು ಆಯ್ಕೆಮಾಡಿ', 'or': 'ଜିଲ୍ଲା ବାଛନ୍ତୁ', 'as': 'জিলা নিৰ্বাচন কৰক',
  'ur': 'ضلع منتخب کریں', 'sa': 'जनपदं चिनुत', 'sd': 'ضلعو چونڊيو'
};

quickTranslations['select_town_village'] = {
  'en': 'Select Town/Village', 'hi': 'शहर/गांव चुनें', 'pa': 'ਸ਼ਹਿਰ/ਪਿੰਡ ਚੁਣੋ', 'te': 'పట్టణం/గ్రామం ఎంచుకోండి', 'mr': 'शहर/गाव निवडा', 'gu': 'શહેર/ગામ પસંદ કરો',
  'ml': 'പട്ടണം/ഗ്രാമം തിരഞ്ഞെടുക്കുക', 'bn': 'শহর/গ্রাম নির্বাচন করুন', 'ta': 'நகரம்/கிராமத்தைத் தேர்ந்தெடுக்கவும்', 'kn': 'ಪಟ್ಟಣ/ಗ್ರಾಮವನ್ನು ಆಯ್ಕೆಮಾಡಿ', 'or': 'ସହର/ଗାଁ ବାଛନ୍ତୁ', 'as': 'চহৰ/গাঁও নিৰ্বাচন কৰক',
  'ur': 'شہر/گاؤں منتخب کریں', 'sa': 'नगरं/ग्रामं चिनुत', 'sd': 'شهر/ڳوٺ چونڊيو'
};

quickTranslations['continue'] = {
  'en': 'Continue', 'hi': 'जारी रखें', 'pa': 'ਜਾਰੀ ਰੱਖੋ', 'te': 'కొనసాగించండి', 'mr': 'सुरू ठेवा', 'gu': 'ચાલુ રાખો',
  'ml': 'തുടരുക', 'bn': 'চালিয়ে যান', 'ta': 'தொடரவும்', 'kn': 'ಮುಂದುವರಿಸಿ', 'or': 'ଜାରି ରଖନ୍ତୁ', 'as': 'অব্যাহত ৰাখক',
  'ur': 'جاری رکھیں', 'sa': 'चालयत', 'sd': 'جاري رکو'
};

quickTranslations['location_data'] = {
  'en': 'Location Data', 'hi': 'स्थान डेटा', 'pa': 'ਸਥਾਨ ਡੇਟਾ', 'te': 'స్థాన డేటా', 'mr': 'स्थान डेटा', 'gu': 'સ્થાન ડેટા',
  'ml': 'സ്ഥല ഡാറ്റ', 'bn': 'অবস্থান ডেটা', 'ta': 'இட தரவு', 'kn': 'ಸ್ಥಳ ಡೇಟಾ', 'or': 'ସ୍ଥାନ ତଥ୍ୟ', 'as': 'স্থান ডেটা',
  'ur': 'مقام کا ڈیٹا', 'sa': 'स्थान आंकडाः', 'sd': 'جاءِ جو ڊيٽا'
};

quickTranslations['soil_type'] = {
  'en': 'Soil Type', 'hi': 'मिट्टी का प्रकार', 'pa': 'ਮਿੱਟੀ ਦੀ ਕਿਸਮ', 'te': 'మట్టి రకం', 'mr': 'माती प्रकार', 'gu': 'માટીનો પ્રકાર',
  'ml': 'മണ്ണിന്റെ തരം', 'bn': 'মাটির ধরন', 'ta': 'மண் வகை', 'kn': 'ಮಣ್ಣಿನ ಪ್ರಕಾರ', 'or': 'ମାଟି ପ୍ରକାର', 'as': 'মাটিৰ প্ৰকাৰ',
  'ur': 'مٹی کی قسم', 'sa': 'मृत्तिका प्रकारः', 'sd': 'مٽي جو قسم'
};

quickTranslations['detected_from_coordinates'] = {
  'en': 'Detected from coordinates', 'hi': 'निर्देशांक से पता लगाया गया', 'pa': 'ਨਿਰਦੇਸ਼ਾਂਕਾਂ ਤੋਂ ਪਤਾ ਲਗਾਇਆ ਗਿਆ', 'te': 'కోఆర్డినేట్స్ నుండి గుర్తించబడింది', 'mr': 'निर्देशांकांवरून शोधले गेले', 'gu': 'કોઓર્ડિનેટ્સથી શોધાયેલ',
  'ml': 'കോഓർഡിനേറ്റുകളിൽ നിന്ന് കണ്ടെത്തി', 'bn': 'স্থানাঙ্ক থেকে সনাক্ত', 'ta': 'ஆயத்தொலைவுகளிலிருந்து கண்டறியப்பட்டது', 'kn': 'ನಿರ್ದೇಶಾಂಕಗಳಿಂದ ಪತ್ತೆಯಾಗಿದೆ', 'or': 'ନିର୍ଦ୍ଦେଶାଙ୍କରୁ ଚିହ୍ନଟ', 'as': 'স্থানাংকৰ পৰা চিনাক্ত',
  'ur': 'نقاط سے شناخت', 'sa': 'निर्देशांकेभ्यः ज्ञातम्', 'sd': 'نقطن مان سڃاڻپ'
};

quickTranslations['rainfall_pattern'] = {
  'en': 'Rainfall Pattern', 'hi': 'वर्षा पैटर्न', 'pa': 'ਬਰਸਾਤ ਦਾ ਪੈਟਰਨ', 'te': 'వర్షపాత నమూనా', 'mr': 'पाऊस पद्धती', 'gu': 'વરસાદ પેટર્ન',
  'ml': 'മഴയുടെ പാറ്റേൺ', 'bn': 'বৃষ্টিপাতের ধরন', 'ta': 'மழை வடிவம்', 'kn': 'ಮಳೆಯ ಮಾದರಿ', 'or': 'ବର୍ଷା ପ୍ରକାର', 'as': 'বৰষুণৰ আৰ্হি',
  'ur': 'بارش کا نمونہ', 'sa': 'वर्षा प्रतिमानम्', 'sd': 'برسات جو نمونو'
};

quickTranslations['nasa_data_available'] = {
  'en': 'NASA data available', 'hi': 'नासा डेटा उपलब्ध', 'pa': 'ਨਾਸਾ ਡੇਟਾ ਉਪਲਬਧ', 'te': 'NASA డేటా అందుబాటులో', 'mr': 'NASA डेटा उपलब्ध', 'gu': 'NASA ડેટા ઉપલબ્ધ',
  'ml': 'NASA ഡാറ്റ ലഭ്യം', 'bn': 'NASA ডেটা উপলব্ধ', 'ta': 'NASA தரவு கிடைக்கிறது', 'kn': 'NASA ಡೇಟಾ ಲಭ್ಯ', 'or': 'NASA ତଥ୍ୟ ଉପଲବ୍ଧ', 'as': 'NASA ডেটা উপলব্ধ',
  'ur': 'NASA ڈیٹا دستیاب', 'sa': 'NASA आंकडाः उपलब्धाः', 'sd': 'NASA ڊيٽا موجود'
};

// Navbar translations
quickTranslations['welcome'] = { 'en': 'Farm Navigator', 'hi': 'फार्म नेवीगेटर' };
quickTranslations['register'] = { 'en': 'Register', 'hi': 'पंजीकरण' };
quickTranslations['login'] = { 'en': 'Login', 'hi': 'लॉगिन' };
quickTranslations['language'] = { 'en': 'Language', 'hi': 'भाषा' };

// Voice assistant translations
quickTranslations['voice_enabled'] = { 'en': 'Voice assistant enabled', 'hi': 'वॉइस असिस्टेंट चालू' };
quickTranslations['voice_disabled'] = { 'en': 'Voice assistant disabled', 'hi': 'वॉइस असिस्टेंट बंद' };
quickTranslations['location_selected'] = { 'en': 'Location selected', 'hi': 'स्थान चुना गया' };
quickTranslations['state_selected'] = { 'en': 'State selected', 'hi': 'राज्य चुना गया' };
quickTranslations['district_selected'] = { 'en': 'District selected', 'hi': 'जिला चुना गया' };
quickTranslations['town_selected'] = { 'en': 'Town selected', 'hi': 'शहर चुना गया' };